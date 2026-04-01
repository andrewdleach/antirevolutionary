import { Resend } from 'resend'

const WELCOME_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Every square inch.</title>
</head>
<body style="margin:0;padding:0;background:#f0ebe0;font-family:Georgia,'Times New Roman',serif;">
  <!-- Preview text -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">There is not a square inch in the whole domain of human existence over which Christ does not cry: Mine!</div>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ebe0;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Top gold accent bar -->
          <tr>
            <td style="background:#c9a84c;height:3px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Main body -->
          <tr>
            <td style="background:#faf7f2;padding:52px 52px 44px;">

              <!-- Wordmark -->
              <p style="margin:0 0 24px;font-size:10px;letter-spacing:0.38em;text-transform:uppercase;color:#c9a84c;">
                Antirevolutionary
              </p>

              <!-- Top rule -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
                <tr>
                  <td style="background:#c9a84c;height:1px;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>

              <!-- Greeting -->
              <p style="margin:0 0 14px;font-size:30px;line-height:1.15;color:#1a1815;font-weight:normal;letter-spacing:-0.01em;">
                Thank you.
              </p>

              <p style="margin:0 0 40px;font-size:17px;line-height:1.75;color:#3d3830;">
                We'll be in touch when the work begins.
              </p>

              <!-- Diamond ornament rule -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
                <tr>
                  <td style="background:rgba(201,168,76,0.3);height:1px;font-size:0;line-height:0;width:44%;">&nbsp;</td>
                  <td align="center" style="font-size:9px;color:#c9a84c;padding:0 10px;width:12%;white-space:nowrap;">&#9670;</td>
                  <td style="background:rgba(201,168,76,0.3);height:1px;font-size:0;line-height:0;width:44%;">&nbsp;</td>
                </tr>
              </table>

              <!-- Pull quote -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
                <tr>
                  <td width="3" style="background:#c9a84c;font-size:0;line-height:0;">&nbsp;</td>
                  <td style="padding:4px 0 4px 20px;">
                    <p style="margin:0 0 12px;font-size:18px;line-height:1.65;color:#1a1815;font-style:italic;">
                      &ldquo;All authority of governments on earth originates from the Sovereignty of God alone.&rdquo;
                    </p>
                    <p style="margin:0;font-size:10px;letter-spacing:0.24em;text-transform:uppercase;color:#c9a84c;">
                      Abraham Kuyper &nbsp;&middot;&nbsp; 1837&ndash;1920
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Faint rule -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background:rgba(201,168,76,0.2);height:1px;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>

              <!-- Body copy -->
              <p style="margin:0 0 18px;font-size:16px;line-height:1.8;color:#3d3830;">
                Antirevolutionary is a platform for Christian political engagement &mdash; standing against the revolutionary spirit of the age, and for the sovereign lordship of God over every sphere of human life.
              </p>

              <p style="margin:0 0 40px;font-size:16px;line-height:1.8;color:#3d3830;">
                We are building something. You will hear from us.
              </p>

              <!-- Signature -->
              <p style="margin:0;font-size:16px;color:#1a1815;font-style:italic;">
                &mdash; Antirevolutionary
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#e8e2d5;padding:18px 52px;border-top:1px solid rgba(201,168,76,0.18);">
              <p style="margin:0;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#9a8f82;">
                <a href="https://antirevolutionary.org" style="color:#9a8f82;text-decoration:none;">antirevolutionary.org</a>
              </p>
            </td>
          </tr>

          <!-- Bottom gold accent bar -->
          <tr>
            <td style="background:#c9a84c;height:2px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

const WELCOME_TEXT = `Thank you.

We'll be in touch when the work begins.

"All authority of governments on earth originates from the Sovereignty of God alone."
— Abraham Kuyper, 1837–1920

Antirevolutionary is a platform for Christian political engagement — standing against the revolutionary spirit of the age, and for the sovereign lordship of God over every sphere of human life.

We are building something. You will hear from us.

— Antirevolutionary

antirevolutionary.org`

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = body?.email?.trim().toLowerCase()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, message: 'Invalid email address.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw createError({ statusCode: 500, message: 'Email service not configured.' })
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID
  const resend = new Resend(apiKey)

  // Check if already subscribed via audience — skip welcome email if so
  let isNew = true
  if (audienceId) {
    const { data: existing } = await resend.contacts.get({ audienceId, email }).catch(() => ({ data: null }))
    isNew = !existing

    // Add/update contact in audience
    await resend.contacts.create({ audienceId, email, unsubscribed: false }).catch((err) => {
      console.error('Resend contacts error:', err)
    })
  }

  // Notify info@ of new subscriber
  await resend.emails.send({
    from: 'Antirevolutionary <info@antirevolutionary.org>',
    to: 'info@antirevolutionary.org',
    subject: 'New subscriber',
    text: `New subscriber signed up: ${email}`,
    html: `<p>New subscriber signed up: <strong>${email}</strong></p>`,
    replyTo: email,
  })

  // Send welcome email only to new subscribers
  if (isNew) {
    const { error: welcomeError } = await resend.emails.send({
      from: 'Antirevolutionary <info@antirevolutionary.org>',
      to: email,
      subject: 'Every square inch.',
      html: WELCOME_HTML,
      text: WELCOME_TEXT,
    })

    if (welcomeError) {
      console.error('Resend welcome error:', welcomeError)
    }
  }

  return { ok: true }
})
