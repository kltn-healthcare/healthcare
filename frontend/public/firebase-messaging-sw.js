self.addEventListener('push', (event) => {
  if (!event.data) return

  let payload = {}
  try {
    payload = event.data.json()
  } catch (_error) {
    payload = { notification: { title: 'Healthcare', body: event.data.text() } }
  }

  const notification = payload.notification || {}
  const data = payload.data || {}

  event.waitUntil(
    self.registration.showNotification(notification.title || 'Healthcare', {
      body: notification.body || '',
      icon: '/icon-light-32x32.png',
      data,
    }),
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const actionUrl = event.notification.data?.action_url || event.notification.data?.actionUrl || '/'
  event.waitUntil(clients.openWindow(actionUrl))
})
