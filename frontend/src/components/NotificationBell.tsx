"use client"

import { useEffect, useState } from "react"
import { Bell } from "lucide-react"
import { getNotifications } from "@/features/account/api/notifications.api"
import { Button } from "@/shared/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { NotificationList } from "@/components/NotificationList"

type Props = {
  enabled: boolean
}

export function NotificationBell({ enabled }: Props) {
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (!enabled) return
    void getNotifications().then((res) => setUnreadCount(res.unreadCount))
  }, [enabled])

  if (!enabled) return null

  return (
    <DropdownMenu>
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
      <DropdownMenuContent className="w-80 overflow-hidden p-0" align="end">
        <NotificationList enabled={enabled} compact onUnreadCountChange={setUnreadCount} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
