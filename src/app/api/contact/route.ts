import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Aquí iría la lógica de envío de email (Resend, SendGrid, etc.)
    // Por ahora simulamos éxito y logeamos
    // console.log("Nuevo lead recibido:", body)
    
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Error en API contact:", error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
