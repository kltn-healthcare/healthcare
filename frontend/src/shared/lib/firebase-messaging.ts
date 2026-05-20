import { registerDeviceToken } from '@/api/notifications'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const hasFirebaseConfig = Object.values(firebaseConfig).every(Boolean)

export async function registerWebPushToken() {
  if (typeof window === 'undefined') return { ok: false, reason: 'server' }
  if (!hasFirebaseConfig) return { ok: false, reason: 'missing-config' }
  if (!('Notification' in window)) return { ok: false, reason: 'unsupported' }
  if (!('serviceWorker' in navigator)) return { ok: false, reason: 'unsupported' }

  const permission = await Notification.requestPermission()
  if (permission !== 'granted') return { ok: false, reason: permission }

  const [{ initializeApp, getApps }, { getMessaging, getToken, onMessage }] = await Promise.all([
    import('firebase/app'),
    import('firebase/messaging'),
  ])

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
  const messaging = getMessaging(app)
  const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY

  if (!vapidKey) return { ok: false, reason: 'missing-vapid-key' }

  const token = await getToken(messaging, {
    vapidKey,
    serviceWorkerRegistration: registration,
  })

  if (!token) return { ok: false, reason: 'empty-token' }

  await registerDeviceToken(token)

  onMessage(messaging, (payload) => {
    if (!payload.notification?.title) return

    void registration.showNotification(payload.notification.title, {
      body: payload.notification.body,
      data: payload.data,
      icon: '/icon-light-32x32.png',
    })
  })

  return { ok: true, token }
}
