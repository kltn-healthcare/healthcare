"use client"

import { useEffect, useState } from "react"
import { Bell, CheckCheck } from "lucide-react"
import { useTranslation } from "react-i18next"
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  type AppNotification,
} from "@/features/account/api/notifications.api"
import { registerWebPushToken } from "@/shared/lib/firebase-messaging"
import { Button } from "@/shared/ui/button"
import { ACCOUNT_I18N_KEYS } from "@/shared/i18n/keys"
import { useLanguage } from "@/shared/provider/LanguageProvider"

type NotificationListProps = {
  enabled: boolean
  compact?: boolean
  onUnreadCountChange?: (count: number) => void
}

export function NotificationList({ enabled, compact = false, onUnreadCountChange }: NotificationListProps) {
  const { t } = useTranslation("account")
  const { language } = useLanguage()
  const [items, setItems] = useState<AppNotification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [permissionState, setPermissionState] = useState<NotificationPermission | "unsupported">("default")

  const refreshNotifications = async () => {
    if (!enabled) return
    setIsLoading(true)
    try {
      const res = await getNotifications()
      setItems(res.items)
      setUnreadCount(res.unreadCount)
      onUnreadCountChange?.(res.unreadCount)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!enabled) return
    void refreshNotifications()

    if (typeof window === "undefined" || !("Notification" in window)) {
      setPermissionState("unsupported")
      return
    }

    setPermissionState(Notification.permission)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])

  const enablePush = async () => {
    const result = await registerWebPushToken()
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermissionState(Notification.permission)
    }
    if (result.ok) {
      await refreshNotifications()
    }
  }

  const markRead = async (item: AppNotification) => {
    if (!item.readAt) {
      await markNotificationRead(item.id)
      await refreshNotifications()
    }
  }

  const markAllRead = async () => {
    await markAllNotificationsRead()
    await refreshNotifications()
  }

  if (!enabled) {
    return (
      <div className="rounded-lg border border-dashed bg-muted/20 p-6 text-center text-sm text-muted-foreground">
        {t(ACCOUNT_I18N_KEYS.appointments.loginRequired)}
      </div>
    )
  }

  return (
    <div className={compact ? "w-full" : "rounded-xl border bg-background shadow-sm"}>
      <div className={compact ? "flex items-center justify-between gap-2 px-3 py-3" : "flex items-center justify-between gap-3 border-b p-4"}>
        <div className="flex items-center gap-2">
          {!compact && <Bell className="h-5 w-5 text-primary" />}
          <div>
            <h3 className={compact ? "text-sm font-semibold" : "font-semibold"}>{t(ACCOUNT_I18N_KEYS.notifications.title)}</h3>
            {!compact && <p className="text-sm text-muted-foreground">{t(ACCOUNT_I18N_KEYS.notifications.desc)}</p>}
          </div>
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-xs" onClick={markAllRead}>
            <CheckCheck className="h-3.5 w-3.5" />
            {t(ACCOUNT_I18N_KEYS.notifications.markAllRead)}
          </Button>
        )}
      </div>

      {permissionState === "default" && (
        <div className={compact ? "px-3 pb-3" : "border-b p-4"}>
          <Button size="sm" variant="outline" className="w-full" onClick={enablePush}>
            {t(ACCOUNT_I18N_KEYS.notifications.enableBrowser)}
          </Button>
        </div>
      )}

      <div className={compact ? "max-h-96 overflow-y-auto" : "divide-y"}>
        {isLoading && items.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">{t(ACCOUNT_I18N_KEYS.appointments.loading)}</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            <Bell className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
            {t(ACCOUNT_I18N_KEYS.notifications.empty)}
          </div>
        ) : (
          items.map((item) => {
            const { title: displayTitle, body: displayBody } = translateNotification(item.title, item.body, language)
            return (
              <button
                key={item.id}
                type="button"
                className={`group flex w-full gap-3 text-left transition-all duration-200 hover:bg-slate-50/80 dark:hover:bg-slate-900/40 relative border-l-2 ${
                  !item.readAt 
                    ? "bg-primary/[0.02] border-primary" 
                    : "border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                } ${compact ? "px-4 py-3" : "p-4"}`}
                onClick={() => void markRead(item)}
              >
                {!item.readAt && (
                  <span className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                )}
                <span className="min-w-0 flex-1">
                  <span className={`block text-xs sm:text-sm font-semibold transition-colors group-hover:text-primary ${
                    !item.readAt ? "text-slate-900 dark:text-slate-100" : "text-slate-600 dark:text-slate-400"
                  }`}>
                    {displayTitle}
                  </span>
                  <span className="mt-1 block text-[11px] sm:text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {displayBody}
                  </span>
                  <span className="mt-1.5 block text-[10px] font-medium text-slate-400 dark:text-slate-500">
                    {formatNotificationDate(item.createdAt, language)}
                  </span>
                </span>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}

function formatNotificationDate(value: string, language: string) {
  const d = new Date(value)
  if (isNaN(d.getTime())) return ""
  
  const pad = (n: number) => n.toString().padStart(2, "0")
  const hours = pad(d.getHours())
  const minutes = pad(d.getMinutes())
  const day = pad(d.getDate())
  const month = pad(d.getMonth() + 1)
  const year = d.getFullYear()
  
  if (language === "en") {
    return `${hours}:${minutes} ${month}/${day}/${year}`
  }
  return `${hours}:${minutes} ${day}/${month}/${year}`
}

function translateNotification(title: string, body: string, language: string): { title: string; body: string } {
  if (language !== "vi") {
    if (title === "Nhac lich kham sap toi") {
      return {
        title: "Upcoming Appointment Reminder",
        body: body
          .replace("Ban co lich kham tai ", "You have an appointment at ")
          .replace(" luc ", " at "),
      }
    }
    return { title, body }
  }

  let translatedTitle = title
  let translatedBody = body

  // Translate titles
  if (title === "Booking request received") {
    translatedTitle = "Yêu cầu đặt lịch mới"
  } else if (title === "Booking rescheduled") {
    translatedTitle = "Lịch hẹn đã đổi giờ"
  } else if (title === "Appointment confirmed") {
    translatedTitle = "Lịch hẹn đã xác nhận"
  } else if (title === "Booking cancelled" || title === "Appointment cancelled") {
    translatedTitle = "Lịch hẹn đã hủy"
  } else if (title === "Package booking confirmed") {
    translatedTitle = "Lịch hẹn gói khám đã xác nhận"
  } else if (title === "Package booking cancelled") {
    translatedTitle = "Lịch hẹn gói khám đã hủy"
  } else if (title === "Nhac lich kham sap toi") {
    translatedTitle = "Nhắc lịch khám sắp tới"
  }

  // Translate bodies
  if (body.includes("Your appointment request at") && body.includes("is waiting for confirmation")) {
    const clinicName = body.replace("Your appointment request at ", "").replace(" is waiting for confirmation.", "")
    translatedBody = `Yêu cầu đặt lịch hẹn của bạn tại ${clinicName} đang chờ xác nhận.`
  } else if (body.includes("Your appointment at") && body.includes("was rescheduled and is waiting for confirmation")) {
    const clinicName = body.replace("Your appointment at ", "").replace(" was rescheduled and is waiting for confirmation.", "")
    translatedBody = `Lịch hẹn của bạn tại ${clinicName} đã được đổi giờ và đang chờ xác nhận.`
  } else if (body.includes("Your appointment at") && body.includes("has been confirmed for")) {
    const match = body.match(/Your appointment at (.+?) has been confirmed for (.+?)\.?$/)
    if (match) {
      translatedBody = `Lịch hẹn của bạn tại ${match[1]} đã được xác nhận vào lúc ${match[2]}`
    } else {
      translatedBody = body
        .replace("Your appointment at ", "Lịch hẹn của bạn tại ")
        .replace(" has been confirmed for ", " đã được xác nhận vào lúc ")
    }
  } else if (body.includes("Your appointment at") && body.includes("has been cancelled")) {
    const clinicName = body.replace("Your appointment at ", "").replace(" has been cancelled.", "")
    translatedBody = `Lịch hẹn của bạn tại ${clinicName} đã bị hủy.`
  } else if (body.includes("Your package booking at") && body.includes("has been confirmed")) {
    const clinicName = body.replace("Your package booking at ", "").replace(" has been confirmed.", "")
    translatedBody = `Lịch hẹn gói khám của bạn tại ${clinicName} đã được xác nhận.`
  } else if (body.includes("Your package booking at") && body.includes("has been cancelled")) {
    const clinicName = body.replace("Your package booking at ", "").replace(" has been cancelled.", "")
    translatedBody = `Lịch hẹn gói khám của bạn tại ${clinicName} đã bị hủy.`
  } else if (body.includes("Ban co lich kham tai") && body.includes("luc")) {
    const match = body.match(/Ban co lich kham tai (.+?) luc (.+?)\.?$/)
    if (match) {
      translatedBody = `Bạn có lịch khám tại ${match[1]} lúc ${match[2]}`
    } else {
      translatedBody = body
        .replace("Ban co lich kham tai ", "Bạn có lịch khám tại ")
        .replace(" luc ", " lúc ")
    }
  }

  return { title: translatedTitle, body: translatedBody }
}
