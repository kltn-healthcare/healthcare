import { apiClient } from '@/shared/lib/apiClient'

export type AppNotification = {
  id: string
  type: string
  title: string
  body: string
  data?: Record<string, unknown>
  readAt?: string | null
  createdAt: string
}

export async function registerDeviceToken(token: string) {
  const res = await apiClient.post('/v1/notifications/device-tokens', {
    token,
    platform: 'WEB',
  })
  return res.data
}

export async function getNotifications() {
  const res = await apiClient.get('/v1/notifications')
  return res.data as { items: AppNotification[]; unreadCount: number }
}

export async function markNotificationRead(id: string) {
  const res = await apiClient.patch(`/v1/notifications/${id}/read`)
  return res.data
}

export async function markAllNotificationsRead() {
  const res = await apiClient.patch('/v1/notifications/read-all')
  return res.data
}
