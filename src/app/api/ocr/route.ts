import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
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
