/*
 * ============================================
 *  Nexyra Studio — Email API (Vercel Serverless)
 *  Sends fancy HTML emails via Resend
 *  1. Admin notification (beautiful template)
 *  2. Customer auto-reply (confirmation email)
 * ============================================
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "POST only" });

  const data = req.body;
  if (!data || !data.name || !data.email) {
    return res.status(400).json({ success: false, error: "Name and email required" });
  }

  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) {
    return res.status(500).json({ success: false, error: "RESEND_API_KEY not set" });
  }

  const ADMIN_EMAIL = "info.ahmadinnovate@gmail.com";
  const SITE_NAME = "Nexyra Studio";

  try {
    // ── 1. Send fancy email to ADMIN ──
    const adminHTML = data.type === "booking"
      ? buildBookingAdminEmail(data, SITE_NAME)
      : buildContactAdminEmail(data, SITE_NAME);

    const adminSubject = data.type === "booking"
      ? `New Meeting Booking - ${data.name}`
      : `New Contact: ${data.subject || "General"} - ${data.name}`;

    await sendEmail(RESEND_KEY, {
      from: `${SITE_NAME} <onboarding@resend.dev>`,
      to: ADMIN_EMAIL,
      reply_to: data.email,
      subject: adminSubject,
      html: adminHTML,
    });

    // ── 2. Send auto-reply to CUSTOMER ──
    const customerHTML = data.type === "booking"
      ? buildBookingCustomerEmail(data, SITE_NAME)
      : buildContactCustomerEmail(data, SITE_NAME);

    const customerSubject = data.type === "booking"
      ? `Your Meeting is Confirmed - ${SITE_NAME}`
      : `We Received Your Message - ${SITE_NAME}`;

    await sendEmail(RESEND_KEY, {
      from: `${SITE_NAME} <onboarding@resend.dev>`,
      to: data.email,
      subject: customerSubject,
      html: customerHTML,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ success: false, error: "Failed to send email" });
  }
}

// ── Send via Resend API ──
async function sendEmail(apiKey, payload) {
  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(err);
  }
  return resp.json();
}

/* ══════════════════════════════════════════════════
   EMAIL TEMPLATES
══════════════════════════════════════════════════ */

function emailWrapper(content, SITE_NAME) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin:0;padding:0;background:#f0f0f5;font-family:'Segoe UI',Arial,sans-serif;">
    <div style="max-width:600px;margin:0 auto;padding:20px;">

      <!-- Header -->
      <div style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);border-radius:20px 20px 0 0;padding:40px 30px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:26px;font-weight:800;letter-spacing:-0.5px;">${SITE_NAME}</h1>
        <div style="width:50px;height:3px;background:#a3e635;margin:12px auto 0;border-radius:2px;"></div>
      </div>

      <!-- Body -->
      <div style="background:#ffffff;padding:35px 30px;border-radius:0 0 20px 20px;box-shadow:0 10px 40px rgba(0,0,0,0.08);">
        ${content}
      </div>

      <!-- Footer -->
      <div style="text-align:center;padding:25px 0 10px;">
        <p style="color:#999;font-size:12px;margin:0;">&copy; ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.</p>
        <div style="margin-top:12px;">
          <a href="https://www.linkedin.com/in/ahmadinnovate/" style="display:inline-block;margin:0 6px;color:#4f46e5;text-decoration:none;font-size:13px;">LinkedIn</a>
          <span style="color:#ddd;">|</span>
          <a href="https://www.instagram.com/nexyra_studio/" style="display:inline-block;margin:0 6px;color:#4f46e5;text-decoration:none;font-size:13px;">Instagram</a>
          <span style="color:#ddd;">|</span>
          <a href="https://wa.me/923157558885" style="display:inline-block;margin:0 6px;color:#4f46e5;text-decoration:none;font-size:13px;">WhatsApp</a>
        </div>
      </div>
    </div>
  </body>
  </html>`;
}

function infoRow(label, value, highlight = false) {
  const bg = highlight ? "background:#f5f3ff;border-left:3px solid #4f46e5;padding-left:15px;" : "";
  return `
    <tr>
      <td style="padding:12px 0;${bg}">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#4f46e5;margin-bottom:4px;">${label}</div>
        <div style="font-size:15px;color:#1f1f23;">${value}</div>
      </td>
    </tr>`;
}

// ═══════ ADMIN: Booking Email ═══════
function buildBookingAdminEmail(d, SITE_NAME) {
  const content = `
    <div style="text-align:center;margin-bottom:25px;">
      <div style="display:inline-block;background:#f5f3ff;border-radius:50%;width:60px;height:60px;line-height:60px;font-size:28px;">&#128197;</div>
      <h2 style="color:#1f1f23;margin:15px 0 5px;font-size:22px;">New Meeting Booking</h2>
      <p style="color:#6b6b80;margin:0;font-size:14px;">Someone wants to schedule a call with you</p>
    </div>

    <div style="background:#f9f9fb;border-radius:12px;padding:20px;margin-bottom:20px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${infoRow("Full Name", d.name)}
        ${infoRow("Email", `<a href="mailto:${d.email}" style="color:#4f46e5;text-decoration:none;">${d.email}</a>`)}
        ${infoRow("WhatsApp", d.phone || "N/A")}
        ${infoRow("Company", d.company || "N/A")}
      </table>
    </div>

    <div style="background:linear-gradient(135deg,#f5f3ff,#ede9fe);border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid #e4e0f7;">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${infoRow("Service", d.service, true)}
        ${infoRow("Preferred Date", d.date, true)}
        ${infoRow("Preferred Time", d.time, true)}
      </table>
    </div>

    ${d.message && d.message !== "N/A" ? `
    <div style="background:#f9f9fb;border-radius:12px;padding:20px;margin-bottom:20px;">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#4f46e5;margin-bottom:8px;">Project Details</div>
      <p style="color:#1f1f23;font-size:14px;line-height:1.7;margin:0;">${d.message}</p>
    </div>` : ""}

    <div style="text-align:center;margin-top:25px;">
      <a href="mailto:${d.email}" style="display:inline-block;background:#4f46e5;color:#fff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:700;font-size:14px;">Reply to ${d.name}</a>
      <a href="https://wa.me/${(d.phone || "").replace(/[^0-9]/g, "")}" style="display:inline-block;background:#25D366;color:#fff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:700;font-size:14px;margin-left:10px;">WhatsApp</a>
    </div>`;

  return emailWrapper(content, SITE_NAME);
}

// ═══════ ADMIN: Contact Email ═══════
function buildContactAdminEmail(d, SITE_NAME) {
  const content = `
    <div style="text-align:center;margin-bottom:25px;">
      <div style="display:inline-block;background:#f5f3ff;border-radius:50%;width:60px;height:60px;line-height:60px;font-size:28px;">&#9993;</div>
      <h2 style="color:#1f1f23;margin:15px 0 5px;font-size:22px;">New Contact Message</h2>
      <p style="color:#6b6b80;margin:0;font-size:14px;">Someone reached out via the website</p>
    </div>

    <div style="background:#f9f9fb;border-radius:12px;padding:20px;margin-bottom:20px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${infoRow("Full Name", d.name)}
        ${infoRow("Email", `<a href="mailto:${d.email}" style="color:#4f46e5;text-decoration:none;">${d.email}</a>`)}
        ${infoRow("WhatsApp", d.phone || "N/A")}
        ${infoRow("Subject", d.subject || "General Inquiry", true)}
      </table>
    </div>

    <div style="background:#f9f9fb;border-radius:12px;padding:20px;margin-bottom:20px;">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#4f46e5;margin-bottom:8px;">Message</div>
      <p style="color:#1f1f23;font-size:14px;line-height:1.7;margin:0;">${d.message}</p>
    </div>

    <div style="text-align:center;margin-top:25px;">
      <a href="mailto:${d.email}" style="display:inline-block;background:#4f46e5;color:#fff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:700;font-size:14px;">Reply to ${d.name}</a>
    </div>`;

  return emailWrapper(content, SITE_NAME);
}

// ═══════ CUSTOMER: Booking Confirmation ═══════
function buildBookingCustomerEmail(d, SITE_NAME) {
  const content = `
    <div style="text-align:center;margin-bottom:25px;">
      <div style="display:inline-block;background:#ecfccb;border-radius:50%;width:60px;height:60px;line-height:60px;font-size:28px;">&#9989;</div>
      <h2 style="color:#1f1f23;margin:15px 0 5px;font-size:22px;">Meeting Confirmed!</h2>
      <p style="color:#6b6b80;margin:0;font-size:14px;">Thank you for booking a call with us</p>
    </div>

    <p style="color:#1f1f23;font-size:15px;line-height:1.7;">
      Hi <strong>${d.name}</strong>,
    </p>
    <p style="color:#6b6b80;font-size:14px;line-height:1.7;">
      We've received your meeting request and our team will confirm your slot within 24 hours. Here's a summary of your booking:
    </p>

    <div style="background:linear-gradient(135deg,#f5f3ff,#ede9fe);border-radius:16px;padding:25px;margin:20px 0;border:1px solid #e4e0f7;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:8px 0;">
            <span style="color:#6b6b80;font-size:13px;">Service:</span>
            <strong style="color:#4f46e5;font-size:14px;float:right;">${d.service}</strong>
          </td>
        </tr>
        <tr><td style="border-bottom:1px solid #e4e0f7;"></td></tr>
        <tr>
          <td style="padding:8px 0;">
            <span style="color:#6b6b80;font-size:13px;">Date:</span>
            <strong style="color:#1f1f23;font-size:14px;float:right;">${d.date}</strong>
          </td>
        </tr>
        <tr><td style="border-bottom:1px solid #e4e0f7;"></td></tr>
        <tr>
          <td style="padding:8px 0;">
            <span style="color:#6b6b80;font-size:13px;">Time:</span>
            <strong style="color:#1f1f23;font-size:14px;float:right;">${d.time}</strong>
          </td>
        </tr>
      </table>
    </div>

    <div style="background:#f0fdf4;border-radius:12px;padding:18px;margin-bottom:20px;border:1px solid #bbf7d0;">
      <p style="color:#166534;font-size:13px;margin:0;line-height:1.6;">
        <strong>What's Next?</strong><br>
        Our team will reach out via email or WhatsApp to confirm your meeting time and share the meeting link (Google Meet / Zoom).
      </p>
    </div>

    <p style="color:#6b6b80;font-size:14px;line-height:1.7;">
      If you have any questions before the meeting, feel free to reach out:
    </p>

    <div style="text-align:center;margin-top:25px;">
      <a href="https://wa.me/923157558885" style="display:inline-block;background:#25D366;color:#fff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:700;font-size:14px;">Chat on WhatsApp</a>
    </div>

    <p style="color:#6b6b80;font-size:13px;line-height:1.7;margin-top:25px;">
      Looking forward to speaking with you!<br>
      <strong style="color:#1f1f23;">The ${SITE_NAME} Team</strong>
    </p>`;

  return emailWrapper(content, SITE_NAME);
}

// ═══════ CUSTOMER: Contact Auto-Reply ═══════
function buildContactCustomerEmail(d, SITE_NAME) {
  const content = `
    <div style="text-align:center;margin-bottom:25px;">
      <div style="display:inline-block;background:#ecfccb;border-radius:50%;width:60px;height:60px;line-height:60px;font-size:28px;">&#128140;</div>
      <h2 style="color:#1f1f23;margin:15px 0 5px;font-size:22px;">We Got Your Message!</h2>
      <p style="color:#6b6b80;margin:0;font-size:14px;">Thanks for reaching out to us</p>
    </div>

    <p style="color:#1f1f23;font-size:15px;line-height:1.7;">
      Hi <strong>${d.name}</strong>,
    </p>
    <p style="color:#6b6b80;font-size:14px;line-height:1.7;">
      Thank you for contacting ${SITE_NAME}! We've received your message and our team will get back to you within <strong style="color:#1f1f23;">24 hours</strong>.
    </p>

    <div style="background:#f9f9fb;border-radius:12px;padding:20px;margin:20px 0;border-left:4px solid #4f46e5;">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#4f46e5;margin-bottom:8px;">Your Message</div>
      <p style="color:#1f1f23;font-size:14px;line-height:1.7;margin:0;font-style:italic;">"${d.message}"</p>
    </div>

    <p style="color:#6b6b80;font-size:14px;line-height:1.7;">
      Need a faster response? Chat with us directly:
    </p>

    <div style="text-align:center;margin-top:25px;">
      <a href="https://wa.me/923157558885" style="display:inline-block;background:#25D366;color:#fff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:700;font-size:14px;">Chat on WhatsApp</a>
    </div>

    <p style="color:#6b6b80;font-size:13px;line-height:1.7;margin-top:25px;">
      We appreciate your interest and look forward to working with you!<br>
      <strong style="color:#1f1f23;">The ${SITE_NAME} Team</strong>
    </p>`;

  return emailWrapper(content, SITE_NAME);
}
