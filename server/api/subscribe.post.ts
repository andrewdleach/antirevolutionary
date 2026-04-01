import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = body?.email?.trim()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, message: 'Invalid email address.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw createError({ statusCode: 500, message: 'Email service not configured.' })
  }

  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from: 'Antirevolutionary <info@antirevolutionary.org>',
    to: 'info@antirevolutionary.org',
    subject: 'New subscriber',
    text: `New subscriber signed up: ${email}`,
    html: `<p>New subscriber signed up: <strong>${email}</strong></p>`,
    replyTo: email,
  })

  if (error) {
    console.error('Resend error:', error)
    throw createError({ statusCode: 500, message: 'Failed to send email.' })
  }

  return { ok: true }
})
