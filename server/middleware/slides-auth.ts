export default defineEventHandler((event) => {
  if (!getRequestURL(event).pathname.startsWith('/slides')) return

  const cookie = getCookie(event, 'slides_auth')
  if (cookie !== 'granted') {
    // Let the page handle the gate — don't redirect server-side
    // (the Vue page checks this via an API call on mount)
  }
})
