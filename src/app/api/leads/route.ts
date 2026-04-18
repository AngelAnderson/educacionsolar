import { NextRequest, NextResponse } from "next/server";

const leadLimitMap = new Map<string, number>();
const MAX_LEADS_PER_BILL = 3;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bill_id, phone, email } = body as {
      bill_id: string;
      phone?: string;
      email?: string;
    };

    if (!bill_id) {
      return NextResponse.json(
        { success: false, error: "Falta el ID de la factura" },
        { status: 400 }
      );
    }

    if (!phone && !email) {
      return NextResponse.json(
        { success: false, error: "Necesitamos tu teléfono o email para conectarte" },
        { status: 400 }
      );
    }

    // Validate phone format (PR numbers)
    if (phone) {
      const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
      if (!/^(\+?1)?(787|939)\d{7}$/.test(cleanPhone)) {
        return NextResponse.json(
          { success: false, error: "Formato de teléfono no válido. Usa un número de PR (787 o 939)." },
          { status: 400 }
        );
      }
    }

    // Rate limit per bill_id
    const count = leadLimitMap.get(bill_id) || 0;
    if (count >= MAX_LEADS_PER_BILL) {
      return NextResponse.json(
        { success: false, error: "Ya procesamos esta factura. Si necesitas ayuda, texto SOLAR al 787-417-7711." },
        { status: 429 }
      );
    }
    leadLimitMap.set(bill_id, count + 1);

    const { supabaseAdmin } = await import("@/lib/supabase");

    // Get the first verified installer (Noel/MES for now)
    const { data: installer } = await supabaseAdmin
      .from("solar_installers")
      .select("id, name, contact_name")
      .eq("is_verified", true)
      .limit(1)
      .single();

    // Update the bill record with contact info and assign installer
    const { error: updateError } = await supabaseAdmin
      .from("solar_bills")
      .update({
        phone: phone || null,
        email: email || null,
        lead_status: "qualified",
        assigned_installer: installer?.id || null,
      })
      .eq("id", bill_id);

    if (updateError) {
      console.error("Lead update error:", updateError);
      return NextResponse.json(
        { success: false, error: "Error guardando tus datos" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "¡Listo! Un instalador verificado te contactará pronto.",
      installer_name: installer?.name,
    });
  } catch (error) {
    console.error("Leads API error:", error);
    return NextResponse.json(
      { success: false, error: "Error procesando tu solicitud" },
      { status: 500 }
    );
  }
}
