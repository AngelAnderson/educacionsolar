import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter (resets on cold start — fine for serverless)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 10; // max requests
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter(t => now - t < RATE_WINDOW);
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Demasiadas solicitudes. Intenta de nuevo en una hora." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { image, mimeType } = body as {
      image: string;
      mimeType: string;
    };

    if (!image || !mimeType) {
      return NextResponse.json(
        { success: false, error: "Falta la imagen de la factura" },
        { status: 400 }
      );
    }

    // Image size validation (~5MB max after base64 decode)
    if (image.length * 0.75 > 5_000_000) {
      return NextResponse.json(
        { success: false, error: "La imagen es muy grande (máximo 5MB). Intenta con una foto más pequeña." },
        { status: 413 }
      );
    }

    // Dynamic imports to keep these server-only
    const { processLumaBill } = await import("@/lib/ocr");
    const { calculateSavings } = await import("@/lib/savings-calculator");
    const { supabaseAdmin } = await import("@/lib/supabase");

    // Run OCR
    const ocrResult = await processLumaBill(image, mimeType);

    if (!ocrResult.success || !ocrResult.data) {
      return NextResponse.json(
        { success: false, error: ocrResult.error || "No se pudo leer la factura" },
        { status: 422 }
      );
    }

    // Calculate savings
    const savings = calculateSavings(
      ocrResult.data.kwh_monthly,
      ocrResult.data.bill_amount_usd
    );

    // Store in Supabase
    const { data: bill, error: dbError } = await supabaseAdmin
      .from("solar_bills")
      .insert({
        municipality: ocrResult.data.municipality,
        kwh_monthly: ocrResult.data.kwh_monthly,
        bill_amount_usd: ocrResult.data.bill_amount_usd,
        rate_per_kwh: ocrResult.data.rate_per_kwh,
        ocr_raw_json: ocrResult.raw_json,
        ocr_confidence: ocrResult.confidence,
        savings_estimate: savings,
        lead_status: "new",
        source: "web",
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("DB insert error:", dbError);
    }

    return NextResponse.json({
      success: true,
      data: ocrResult.data,
      savings,
      confidence: ocrResult.confidence,
      bill_id: bill?.id,
    });
  } catch (error) {
    console.error("OCR API error:", error);
    return NextResponse.json(
      { success: false, error: "Error procesando la factura" },
      { status: 500 }
    );
  }
}
