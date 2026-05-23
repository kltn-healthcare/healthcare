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
          items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`flex w-full gap-3 text-left transition-colors hover:bg-muted/40 ${compact ? "px-3 py-3" : "p-4"} ${!item.readAt ? "bg-primary/5" : ""}`}
              onClick={() => void markRead(item)}
            >
              <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${item.readAt ? "bg-muted-foreground/30" : "bg-primary"}`} />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-foreground">{item.title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{item.body}</span>
                <span className="mt-1.5 block text-[11px] text-muted-foreground">{formatNotificationDate(item.createdAt, language)}</span>
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  )
}

function formatNotificationDate(value: string, language: string) {
  return new Intl.DateTimeFormat(language === "en" ? "en-US" : "vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value))
}
