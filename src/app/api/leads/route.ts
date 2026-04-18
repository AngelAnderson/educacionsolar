import { NextRequest, NextResponse } from "next/server";

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
