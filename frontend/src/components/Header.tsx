"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/shared/ui/button"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { NotificationBell } from "@/components/NotificationBell"
import { useTranslation } from "react-i18next"
import { Logo } from "@/components/Logo"
import { useAuthStore } from "@/store"
import { ROUTES } from "@/shared/constants"
import { COMMON_I18N_KEYS, NAV_I18N_KEYS } from "@/shared/i18n/keys"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { User, LogOut, Calendar, LayoutDashboard } from "lucide-react"

export function Header() {
  const { t } = useTranslation("nav")
  const { t: tc } = useTranslation("common")
  const [isMounted, setIsMounted] = useState(false)
  const auth = useAuthStore()
  const rawRole = String(auth.user?.role || "").toUpperCase()
  const role = rawRole === "SUPER_ADMIN" ? "ADMIN" : rawRole
  const canAccessAdmin = role === "ADMIN" || role === "DOCTOR" || role === "CLINIC_ADMIN"

  const handleLogout = () => {
    auth.logout()
    globalThis.location.href = "/"
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const navText = (key: string, fallback: string) => (isMounted ? t(key) : fallback)
  const commonText = (key: string, fallback: string) => (isMounted ? tc(key) : fallback)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center transition-transform hover:scale-105 active:scale-95">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href={ROUTES.CLINICS} className="text-sm font-semibold text-foreground/70 transition-colors hover:text-primary">
            {navText(NAV_I18N_KEYS.clinics, "Phòng khám")}
          </Link>
          <Link href={ROUTES.PACKAGES} className="text-sm font-semibold text-foreground/70 transition-colors hover:text-primary">
            {navText(NAV_I18N_KEYS.packages, "Gói khám")}
          </Link>
          <Link href={ROUTES.DOCTORS} className="text-sm font-semibold text-foreground/70 transition-colors hover:text-primary">
            {navText(NAV_I18N_KEYS.doctors, "Bác sĩ")}
          </Link>
          <Link href={ROUTES.HEALTH_GUIDE} className="text-sm font-semibold text-foreground/70 transition-colors hover:text-primary">
            {navText(NAV_I18N_KEYS.healthGuide, "Cẩm nang")}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isMounted ? (
            <>
              <LanguageSwitcher />
              <NotificationBell enabled={auth.isAuthenticated} />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-primary/10">
                    <Avatar className="h-9 w-9 border border-primary/20 transition-transform hover:scale-110">
                      <AvatarImage src={auth.user?.avatar || ""} alt={auth.user?.name || "User"} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {auth.isAuthenticated ? (auth.user?.name || "U").charAt(0).toUpperCase() : <User className="h-5 w-5" />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  {auth.isAuthenticated ? (
                    <>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-bold leading-none">{auth.user?.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">{auth.user?.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link href="/account?tab=profile">
                        <DropdownMenuItem className="cursor-pointer">
                          <User className="mr-2 h-4 w-4 text-primary" />
                          <span>{commonText(COMMON_I18N_KEYS.userMenuProfile, "Hồ sơ cá nhân")}</span>
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/account?tab=appointments">
                        <DropdownMenuItem className="cursor-pointer">
                          <Calendar className="mr-2 h-4 w-4 text-primary" />
                          <span>{commonText(COMMON_I18N_KEYS.userMenuAppointments, "Lịch hẹn của tôi")}</span>
                        </DropdownMenuItem>
                      </Link>
                      {canAccessAdmin && (
                        <Link href="/admin">
                          <DropdownMenuItem className="cursor-pointer">
                            <LayoutDashboard className="mr-2 h-4 w-4 text-primary" />
                            <span>{commonText(COMMON_I18N_KEYS.userMenuAdmin, "Trang quản trị")}</span>
                          </DropdownMenuItem>
                        </Link>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-50"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>{commonText(COMMON_I18N_KEYS.logout, "Đăng xuất")}</span>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuSeparator />
                      <Link href="/login?next=/account?tab=profile">
                        <DropdownMenuItem className="cursor-pointer">
                          <User className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{commonText(COMMON_I18N_KEYS.userMenuProfile, "Hồ sơ cá nhân")}</span>
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/login?next=/account?tab=appointments">
                        <DropdownMenuItem className="cursor-pointer">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{commonText(COMMON_I18N_KEYS.userMenuAppointments, "Lịch hẹn của tôi")}</span>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <Link href="/login">
                        <DropdownMenuItem className="cursor-pointer font-bold text-primary focus:text-primary focus:bg-primary/5">
                          <LogOut className="mr-2 h-4 w-4 rotate-180" />
                          <span>{commonText(COMMON_I18N_KEYS.userMenuLoginNow, "Đăng nhập ngay")}</span>
                        </DropdownMenuItem>
                      </Link>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <div className="h-8 w-12 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
              <div className="h-9 w-9 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
              <div className="h-9 w-9 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
            </div>
          )}

          <Button size="sm" className="bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20 transition-all active:scale-95 cursor-pointer" asChild>
            <Link href="/booking">
              {commonText(COMMON_I18N_KEYS.bookAppointment, "Đặt lịch khám")}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
