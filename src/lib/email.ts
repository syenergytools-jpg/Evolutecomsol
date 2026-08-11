import { Resend } from "resend";
import { calBookingUrl, site } from "@/lib/site-config";

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

/**
 * The /consultation funnel's own confirmation. Sent instead of the
 * generic auto-reply for leads that came through that page, because
 * they need something the generic one can't give them: the Cal.com link
 * to actually pick a time.
 *
 * Note this fires when the qualifier is submitted, not when the booking
 * completes — the booking happens inside Cal.com's own embed, and
 * Cal.com sends its own calendar invite on top of this. So this email's
 * job is to carry the booking link out of the browser session, in case
 * they close the tab before choosing a slot.
 */
export async function sendConsultationConfirmation(
  payload: ContactPayload
): Promise<SendResult> {
  const c = client();
  if (!c) return { ok: false, error: "RESEND_API_KEY not set" };

  const first = payload.name.split(" ")[0];

  try {
    const { error } = await c.emails.send({
      from: FROM,
      to: payload.email,
      subject: `${first}, pick a time for your consultation`,
      html: renderConsultationEmail(payload),
      text: renderConsultationEmailText(payload),
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

/* ---------- /consultation confirmation ----------------------------- *
 * Palette is lifted straight from globals.css so the email reads as the
 * same brand as the page they just came from: canvas #f4f1ea ground,
 * obsidian header, copper accent, mono eyebrows. Table-based and fully
 * inline-styled — Outlook and Gmail strip <style> blocks and ignore
 * flex/grid, so neither is used anywhere below.
 * ------------------------------------------------------------------ */

const C = {
  canvas: "#f4f1ea",
  canvas2: "#ece8dd",
  surface: "#ffffff",
  obsidian: "#0a0a0b",
  ink: "#0f1115",
  inkSoft: "#2a2d35",
  mute: "#6b7280",
  hairline: "#e7e3d8",
  copper: "#e8704a",
} as const;

const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const MONO = "'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

const CALL_BEATS: [string, string][] = [
  ["We look at your real numbers", "Sessions, conversion, ACoS, margin — whatever you can share."],
  ["We name the one thing capping you", "Not ten things. The single bottleneck actually holding the account back."],
  ["You leave with a plan either way", "Yours to keep and run, whether or not you ever work with us."],
];

/** Turns the qualifier's "Label: Value" message lines into recap rows. */
function recapRows(p: ContactPayload): string {
  const pairs: [string, string][] = [];
  if (p.budget) pairs.push(["Budget", p.budget]);
  for (const line of p.message.split("\n")) {
    const i = line.indexOf(": ");
    if (i > 0 && i < 40) pairs.push([line.slice(0, i), line.slice(i + 2)]);
  }
  if (!pairs.length) return "";

  const rows = pairs
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:7px 0;font-family:${MONO};font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:${C.mute};vertical-align:top;width:44%">${escape(label)}</td>
          <td style="padding:7px 0;font-family:${SANS};font-size:14px;line-height:1.5;color:${C.ink};vertical-align:top">${escape(value)}</td>
        </tr>`
    )
    .join("");

  return `
    <tr><td style="background:${C.surface};padding:0 32px 32px;border-left:1px solid ${C.hairline};border-right:1px solid ${C.hairline}">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.canvas};border-radius:12px">
        <tr><td style="padding:18px 20px">
          <p style="margin:0 0 10px;font-family:${MONO};font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:${C.mute}">What you told us</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
        </td></tr>
      </table>
    </td></tr>`;
}

function renderConsultationEmail(p: ContactPayload): string {
  const first = escape(p.name.split(" ")[0]);
  const bookUrl = calBookingUrl();

  const beats = CALL_BEATS.map(
    ([title, detail], i) => `
      <tr>
        <td style="padding:0 14px 0 0;vertical-align:top;width:26px">
          <span style="font-family:${MONO};font-size:11px;color:${C.copper};letter-spacing:0.08em">0${i + 1}</span>
        </td>
        <td style="padding:0 0 16px;vertical-align:top">
          <p style="margin:0 0 3px;font-family:${SANS};font-size:15px;font-weight:600;color:${C.ink};line-height:1.4">${title}</p>
          <p style="margin:0;font-family:${SANS};font-size:14px;color:${C.inkSoft};line-height:1.55">${detail}</p>
        </td>
      </tr>`
  ).join("");

  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="color-scheme" content="light only"/>
<title>Pick a time for your consultation</title>
</head>
<body style="margin:0;padding:0;background:${C.canvas};-webkit-font-smoothing:antialiased">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">Your free 30-minute consultation with ${escape(site.name)} — pick a time that suits you.</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.canvas}">
<tr><td align="center" style="padding:32px 16px">

  <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="width:100%;max-width:600px">

    <!-- header band -->
    <tr><td style="background:${C.obsidian};border-radius:14px 14px 0 0;padding:26px 32px">
      <p style="margin:0 0 8px;font-family:${MONO};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:${C.copper}">Consultation requested</p>
      <p style="margin:0;font-family:${SANS};font-size:17px;font-weight:700;letter-spacing:0.22em;color:${C.canvas}">EVOLUT</p>
    </td></tr>

    <!-- headline + intro -->
    <tr><td style="background:${C.surface};padding:34px 32px 0;border-left:1px solid ${C.hairline};border-right:1px solid ${C.hairline}">
      <h1 style="margin:0 0 14px;font-family:${SANS};font-size:28px;line-height:1.15;letter-spacing:-0.02em;color:${C.ink};font-weight:700">You&rsquo;re in, ${first}.</h1>
      <p style="margin:0 0 8px;font-family:${SANS};font-size:15px;line-height:1.65;color:${C.inkSoft}">
        Thanks for the details &mdash; they&rsquo;re with our team. One thing left: pick the 30 minutes that suit you.
      </p>
    </td></tr>

    <!-- CTA -->
    <tr><td style="background:${C.surface};padding:22px 32px 26px;border-left:1px solid ${C.hairline};border-right:1px solid ${C.hairline}">
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr><td style="background:${C.ink};border-radius:999px">
          <a href="${bookUrl}" style="display:inline-block;padding:15px 30px;font-family:${SANS};font-size:15px;font-weight:600;color:${C.canvas};text-decoration:none;border-radius:999px">Pick your time &rarr;</a>
        </td></tr>
      </table>
      <p style="margin:12px 0 0;font-family:${SANS};font-size:13px;color:${C.mute};line-height:1.5">
        Takes about 30 seconds. You&rsquo;ll get a calendar invite the moment you choose.
      </p>
    </td></tr>

    <!-- what happens on the call -->
    <tr><td style="background:${C.surface};padding:0 32px 26px;border-left:1px solid ${C.hairline};border-right:1px solid ${C.hairline}">
      <p style="margin:0 0 16px;font-family:${MONO};font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:${C.mute}">What happens on the call</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${beats}</table>
      <p style="margin:4px 0 0;font-family:${SANS};font-size:14px;line-height:1.6;color:${C.inkSoft}">
        No deck, no pitch. If we&rsquo;re not the right fit we&rsquo;ll say so, and point you somewhere better.
      </p>
    </td></tr>

    ${recapRows(p)}

    <!-- footer -->
    <tr><td style="background:${C.canvas2};border-radius:0 0 14px 14px;padding:22px 32px;border:1px solid ${C.hairline};border-top:0">
      <p style="margin:0 0 6px;font-family:${SANS};font-size:13px;line-height:1.6;color:${C.inkSoft}">
        Need to reach us sooner? <a href="mailto:${escape(NOTIFY)}" style="color:${C.ink};font-weight:600;text-decoration:underline">${escape(NOTIFY)}</a> &middot; <a href="https://wa.me/923015574531" style="color:${C.ink};font-weight:600;text-decoration:underline">WhatsApp</a>
      </p>
      <p style="margin:0;font-family:${MONO};font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:${C.mute}">
        ${escape(site.fullName)} &middot; ${escape(site.contact.address)}
      </p>
    </td></tr>

  </table>

</td></tr>
</table>
</body></html>`;
}

function renderConsultationEmailText(p: ContactPayload): string {
  return [
    `You're in, ${p.name.split(" ")[0]}.`,
    "",
    "Thanks for the details — they're with our team. One thing left: pick the 30 minutes that suit you.",
    "",
    `Pick your time: ${calBookingUrl()}`,
    "",
    "What happens on the call:",
    ...CALL_BEATS.map(([title, detail], i) => `  0${i + 1}. ${title} — ${detail}`),
    "",
    "No deck, no pitch. If we're not the right fit we'll say so, and point you somewhere better.",
    "",
    `Need us sooner? ${NOTIFY} or https://wa.me/923015574531`,
    "",
    `— ${site.fullName}`,
  ].join("\n");
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
