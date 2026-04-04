export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const password = body?.password?.trim()

  if (!password) {
    throw createError({ statusCode: 400, message: 'Password required.' })
  }

  const correct = process.env.SLIDES_PASSWORD
  if (!correct) {
    throw createError({ statusCode: 500, message: 'Auth not configured.' })
  }

  if (password !== correct) {
    throw createError({ statusCode: 401, message: 'Incorrect password.' })
  }

  // Set a session cookie valid for 7 days
  setCookie(event, 'slides_auth', 'granted', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/slides',
  })

  return { ok: true }
})
