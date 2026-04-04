export default defineEventHandler((event) => {
  const cookie = getCookie(event, 'slides_auth')
  return { granted: cookie === 'granted' }
})
