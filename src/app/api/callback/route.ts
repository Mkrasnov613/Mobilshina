import { NextResponse } from "next/server";
import { z } from "zod";
import { sendMail } from "@/utils/mailer";
import { pruneRateLimit, rateLimit } from "@/utils/rateLimit";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().max(200).optional(),
  phone: z.string().trim().min(5).max(40),
  location: z.string().trim().max(500).optional(),
  // Honeypot.
  website: z.string().max(0).optional().or(z.literal("")),
});

function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

/** POST /api/callback — "Викликати майстра" hero form (name / phone / location). */
export async function POST(req: Request) {
  pruneRateLimit();
  const { allowed, retryAfterSeconds } = rateLimit(`callback:${clientIp(req)}`);
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

  const { name, phone, location } = parsed.data;
  try {
    await sendMail({
      subject: "Заявка на виклик майстра — mobilshina.com",
      fields: [
        ["Ім'я", name || "—"],
        ["Телефон", phone],
        ["Місцезнаходження", location || "—"],
      ],
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Callback error:", err);
    return NextResponse.json({ error: "Не вдалося надіслати заявку" }, { status: 500 });
  }
}
