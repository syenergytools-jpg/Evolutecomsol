import { Resend } from "resend";
import { site } from "@/lib/site-config";

/* ------------------------------------------------------------------ *
 * Email — Resend transactional layer
 *
 * Two emails per submission:
 *   1. Internal notification → CONTACT_NOTIFY_EMAIL
 *   2. User auto-reply       → submitter's email
 *
 * If RESEND_API_KEY is missing we no-op (return ok=false) so the
 * form still saves to the database. The admin will still see the
 * submission and can manually reply.
 * ------------------------------------------------------------------ */

let resend: Resend | null = null;
function client(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (resend) return resend;
  resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

const FROM = process.env.RESEND_FROM_EMAIL ?? `Evolut <hello@${stripUrlHost(site.url)}>`;
const NOTIFY = process.env.CONTACT_NOTIFY_EMAIL ?? site.contact.email;

function stripUrlHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "evolutecomsolutions.com";
  }
}

export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  reason?: string;
  budget?: string;
  message: string;
  sourceUrl?: string;
};

type SendResult = { ok: boolean; error?: string };

export async function notifyAdminOfSubmission(
  payload: ContactPayload
): Promise<SendResult> {
  const c = client();
  if (!c) return { ok: false, error: "RESEND_API_KEY not set" };

  const subject = `New brief · ${payload.name}${payload.service ? ` · ${payload.service}` : ""}`;

  try {
    const { error } = await c.emails.send({
      from: FROM,
      to: NOTIFY,
      reply_to: payload.email,
      subject,
      html: renderAdminEmail(payload),
      text: renderAdminEmailText(payload),
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function sendUserAutoReply(
  payload: ContactPayload
): Promise<SendResult> {
  const c = client();
  if (!c) return { ok: false, error: "RESEND_API_KEY not set" };

  try {
    const { error } = await c.emails.send({
      from: FROM,
      to: payload.email,
      subject: `We got your brief — ${site.name} ops will reply within 24h`,
      html: renderUserAutoReply(payload),
      text: renderUserAutoReplyText(payload),
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

/* ---------- HTML / text bodies ------------------------------------- */

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value?: string | null): string {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:8px 0;color:#6b6f76;font-family:system-ui,sans-serif;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;width:140px;vertical-align:top">${label}</td>
      <td style="padding:8px 0;color:#0f1115;font-family:system-ui,sans-serif;font-size:14px;line-height:1.5">${escape(value)}</td>
    </tr>`;
}

function renderAdminEmail(p: ContactPayload): string {
  const messageHtml = escape(p.message).replace(/\n/g, "<br/>");
  return `<!doctype html>
<html><body style="margin:0;background:#f4f1ea;padding:24px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;border:1px solid #e6e2da">
    <tr><td style="padding:24px 24px 8px">
      <p style="margin:0 0 4px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:#0066ff;letter-spacing:0.18em;text-transform:uppercase">New brief · ${escape(p.service ?? "general")}</p>
      <h1 style="margin:0;font-family:system-ui,sans-serif;font-size:22px;color:#0f1115">${escape(p.name)}</h1>
      <p style="margin:4px 0 0;font-family:system-ui,sans-serif;font-size:14px;color:#6b6f76">${escape(p.email)}${p.company ? ` · ${escape(p.company)}` : ""}</p>
    </td></tr>
    <tr><td style="padding:8px 24px 16px">
      <table cellpadding="0" cellspacing="0" width="100%">
        ${row("Reason", p.reason)}
        ${row("Service", p.service)}
        ${row("Budget", p.budget)}
        ${row("Phone", p.phone)}
        ${row("Source", p.sourceUrl)}
      </table>
    </td></tr>
    <tr><td style="padding:0 24px 24px">
      <div style="padding:16px;background:#f4f1ea;border-radius:10px;font-family:system-ui,sans-serif;font-size:14px;line-height:1.6;color:#0f1115;white-space:pre-wrap">${messageHtml}</div>
    </td></tr>
  </table>
</body></html>`;
}

function renderAdminEmailText(p: ContactPayload): string {
  return [
    `New brief — ${p.name} <${p.email}>`,
    p.company ? `Company: ${p.company}` : null,
    p.reason ? `Reason: ${p.reason}` : null,
    p.service ? `Service: ${p.service}` : null,
    p.budget ? `Budget: ${p.budget}` : null,
    p.phone ? `Phone: ${p.phone}` : null,
    p.sourceUrl ? `From: ${p.sourceUrl}` : null,
    "",
    p.message,
  ]
    .filter(Boolean)
    .join("\n");
}

function renderUserAutoReply(p: ContactPayload): string {
  return `<!doctype html>
<html><body style="margin:0;background:#f4f1ea;padding:24px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;border:1px solid #e6e2da">
    <tr><td style="padding:28px 28px 16px">
      <p style="margin:0 0 4px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:#0066ff;letter-spacing:0.18em;text-transform:uppercase">Brief received</p>
      <h1 style="margin:0;font-family:system-ui,sans-serif;font-size:24px;color:#0f1115">Thanks, ${escape(p.name.split(" ")[0])}.</h1>
    </td></tr>
    <tr><td style="padding:0 28px 24px;font-family:system-ui,sans-serif;font-size:15px;line-height:1.65;color:#0f1115">
      <p style="margin:0 0 12px">A real operator from the ${site.name} team will read your brief and reply within 24 hours — usually faster.</p>
      <p style="margin:0 0 12px">If you'd rather chat now, the ops line is open: <a href="https://wa.me/923015574531" style="color:#0066ff;text-decoration:none;font-weight:600">WhatsApp</a> or <a href="mailto:${escape(NOTIFY)}" style="color:#0066ff;text-decoration:none;font-weight:600">${escape(NOTIFY)}</a>.</p>
      <p style="margin:24px 0 0;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6b6f76">— The ${site.name} ops team</p>
    </td></tr>
  </table>
</body></html>`;
}

function renderUserAutoReplyText(p: ContactPayload): string {
  return [
    `Thanks, ${p.name.split(" ")[0]}.`,
    "",
    `A real operator from the ${site.name} team will read your brief and reply within 24 hours — usually faster.`,
    "",
    `If you'd rather chat now: https://wa.me/923015574531 or ${NOTIFY}`,
    "",
    `— The ${site.name} ops team`,
  ].join("\n");
}
