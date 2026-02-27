import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 })
    }

    const webhookUrl = process.env.N8N_SUBSCRIBE_WEBHOOK
    if (!webhookUrl) {
      return NextResponse.json({ error: "Subscription service unavailable" }, { status: 503 })
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "website", timestamp: new Date().toISOString() }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error("n8n webhook error:", text)
      return NextResponse.json({ error: "Subscription failed" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Subscribed!" })
  } catch (err) {
    console.error("Subscribe error:", err)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
