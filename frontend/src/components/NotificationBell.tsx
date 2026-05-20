"use client"

import { useEffect, useState } from "react"
import { Bell, CheckCheck } from "lucide-react"
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  type AppNotification,
} from "@/api/notifications"
import { registerWebPushToken } from "@/shared/lib/firebase-messaging"
import { Button } from "@/shared/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"

type Props = {
  enabled: boolean
}

export function NotificationBell({ enabled }: Props) {
  const [items, setItems] = useState<AppNotification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [permissionState, setPermissionState] = useState<NotificationPermission | "unsupported">("default")

  useEffect(() => {
    if (!enabled) return
    void refreshNotifications()

    if (typeof window === "undefined" || !("Notification" in window)) {
      setPermissionState("unsupported")
      return
    }

    setPermissionState(Notification.permission)
  }, [enabled])

  if (!enabled) return null

  const refreshNotifications = async () => {
    const res = await getNotifications()
    setItems(res.items)
    setUnreadCount(res.unreadCount)
  }

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

  return (
    <DropdownMenu onOpenChange={(open) => open && void refreshNotifications()}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-primary/10">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-[11px] font-bold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex items-center justify-between gap-2">
          <span>Thong bao</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-xs" onClick={markAllRead}>
              <CheckCheck className="h-3.5 w-3.5" />
              Da doc
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {permissionState === "default" && (
          <>
            <div className="px-2 py-2">
              <Button size="sm" className="w-full" onClick={enablePush}>
                Bat thong bao tren trinh duyet
              </Button>
            </div>
            <DropdownMenuSeparator />
          </>
        )}
        <div className="max-h-96 overflow-y-auto">
          {items.length === 0 ? (
            <div className="px-3 py-6 text-center text-sm text-muted-foreground">
              Chua co thong bao
            </div>
          ) : (
            items.map((item) => (
              <DropdownMenuItem
                key={item.id}
                className="flex cursor-pointer flex-col items-start gap-1 whitespace-normal py-3"
                onClick={() => void markRead(item)}
              >
                <div className="flex w-full items-start justify-between gap-2">
                  <p className="text-sm font-semibold">{item.title}</p>
                  {!item.readAt && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{item.body}</p>
                <p className="text-[11px] text-muted-foreground">{formatDate(item.createdAt)}</p>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value))
}
