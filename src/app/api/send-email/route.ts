import { NextResponse } from "next/server";
import { z } from "zod";
import { sendMail } from "@/lib/mailer";
import { pruneRateLimit, rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.email().max(200),
  phone: z.string().trim().max(40).optional(),
  company: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1).max(5000),
  // Honeypot: must stay empty.
  website: z.string().max(0).optional().or(z.literal("")),
});

function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: Request) {
  pruneRateLimit();
  const { allowed, retryAfterSeconds } = rateLimit(`send-email:${clientIp(req)}`);
  if (!allowed) {
    return NextResponse.json(
      { error: "Забагато запитів, спробуйте пізніше." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  if (parsed.data.website) {
    return NextResponse.json({ success: true });
  }

  const { name, email, phone, company, message } = parsed.data;
  try {
    await sendMail({
      subject: "Нове звернення з форми співпраці — mobilshina.com",
      replyTo: email,
      fields: [
        ["Ім'я", name],
        ["Email", email],
        ...(phone ? ([["Телефон", phone]] as [string, string][]) : []),
        ...(company ? ([["Компанія", company]] as [string, string][]) : []),
        ["Повідомлення", message],
      ],
    });
    return NextResponse.json({ success: true, message: "Лист надіслано!" });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "Не вдалося надіслати листа" }, { status: 500 });
  }
}
