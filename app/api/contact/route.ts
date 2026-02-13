import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactPayload {
  name: string;
  email: string;
  organization?: string;
  partnershipType?: string;
  message: string;
}

const RECIPIENT = "huynhtarn@gmail.com";

function buildTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    // Validation
    if (!body.name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!body.message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Send email
    const transporter = buildTransporter();

    await transporter.sendMail({
      from: `"IP Foundation" <${process.env.SMTP_USER}>`,
      to: RECIPIENT,
      replyTo: body.email,
      subject: `[IP Foundation] Liên hệ mới từ ${body.name}`,
      text: [
        `Họ tên: ${body.name}`,
        `Email: ${body.email}`,
        body.organization ? `Tổ chức: ${body.organization}` : "",
        body.partnershipType ? `Loại hợp tác: ${body.partnershipType}` : "",
        "",
        `Tin nhắn:`,
        body.message,
        "",
        `---`,
        `Gửi từ form liên hệ IP Foundation — ${new Date().toISOString()}`,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <h2>Liên hệ mới từ IP Foundation</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;">
          <tr><td style="padding:8px 12px;font-weight:bold;color:#555;">Họ tên</td><td style="padding:8px 12px;">${body.name}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#555;">Email</td><td style="padding:8px 12px;"><a href="mailto:${body.email}">${body.email}</a></td></tr>
          ${body.organization ? `<tr><td style="padding:8px 12px;font-weight:bold;color:#555;">Tổ chức</td><td style="padding:8px 12px;">${body.organization}</td></tr>` : ""}
          ${body.partnershipType ? `<tr><td style="padding:8px 12px;font-weight:bold;color:#555;">Loại hợp tác</td><td style="padding:8px 12px;">${body.partnershipType}</td></tr>` : ""}
        </table>
        <h3 style="margin-top:20px;">Tin nhắn</h3>
        <p style="white-space:pre-wrap;background:#f5f5f5;padding:16px;border-left:4px solid #2563EB;">${body.message}</p>
        <hr style="margin-top:24px;border:none;border-top:1px solid #ddd;" />
        <p style="color:#999;font-size:12px;">Gửi từ form liên hệ IP Foundation — ${new Date().toISOString()}</p>
      `,
    });

    return NextResponse.json({ success: true, message: "Form submitted successfully" });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Không thể gửi tin nhắn. Vui lòng thử lại." }, { status: 500 });
  }
}
