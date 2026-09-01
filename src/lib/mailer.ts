import nodemailer from "nodemailer";

/**
 * Contact / callback email sending. Ported from `api-server/server.js`
 * (nodemailer + Gmail). Requires EMAIL_USER / EMAIL_PASS (Gmail app password)
 * and EMAIL_TO.
 */

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export interface MailPayload {
  subject: string;
  /** ordered field label -> value pairs shown in the email body */
  fields: [label: string, value: string][];
  /** optional reply-to address */
  replyTo?: string;
}

export async function sendMail({ subject, fields, replyTo }: MailPayload): Promise<void> {
  const { EMAIL_USER, EMAIL_PASS, EMAIL_TO } = process.env;
  if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
    throw new Error("Email env vars are not configured");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });

  const text = fields.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = fields
    .map(
      ([label, value]) =>
        `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value).replace(/\n/g, "<br>")}</p>`,
    )
    .join("\n");

  await transporter.sendMail({
    from: `"Мобілшина сайт" <${EMAIL_USER}>`,
    replyTo: replyTo || EMAIL_USER,
    to: EMAIL_TO,
    subject,
    text,
    html,
  });
}
