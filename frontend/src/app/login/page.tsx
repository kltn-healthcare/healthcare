"use client"

import { useState } from "react"
import Link from "next/link"
import { Logo } from "@/components/Logo"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { LockKeyhole, LogIn, Mail } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { postLogin } from "@/api/auth"
import { useAuthStore } from "@/store"
import { useRouter, useSearchParams } from "next/navigation"
import { useTranslation } from "react-i18next"
import { AUTH_I18N_KEYS } from "@/shared/i18n/keys"

function normalizeRole(role?: string) {
  const normalized = String(role || "").toUpperCase()
  if (normalized === "SUPER_ADMIN") {
    return "ADMIN"
  }
  return normalized
}

function resolveLoginRedirect(role: string, nextPath: string | null) {
  const safeNext = nextPath?.startsWith("/") ? nextPath : null

  if (safeNext?.startsWith("/admin")) {
    return "/admin"
  }

  if (role === "ADMIN" || role === "DOCTOR" || role === "CLINIC_ADMIN") {
    return safeNext ?? "/admin"
  }

  return safeNext ?? "/account"
}

export default function LoginPage() {
  const { t } = useTranslation("auth")
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextPath = searchParams.get("next")
  const auth = useAuthStore()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      auth.login(data.user, data.accessToken)
      const normalizedRole = normalizeRole(data.user.role)
      const redirectTo = resolveLoginRedirect(normalizedRole, nextPath)
      router.replace(redirectTo)
    },
  })

  const canSubmit = Boolean(email.trim() && password)

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-teal-50 px-4 py-5">
      <div className="absolute right-4 top-4">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-[520px]">
        <div className="mb-6 text-center">
          <Logo className="mb-4 scale-90 justify-center" />
          <h1 className="text-[28px] font-bold leading-tight text-sky-600">
            {t(AUTH_I18N_KEYS.brandTitle)}
          </h1>
          <p className="mt-1 text-lg text-slate-600">
            {t(AUTH_I18N_KEYS.login.subtitle)}
          </p>
        </div>

        <Card className="rounded-2xl border-0 bg-white/95 px-4 py-3 shadow-[0_24px_70px_rgba(15,23,42,0.14)]">
          <CardHeader className="px-5 pt-5 pb-1">
            <CardTitle className="text-[26px] font-bold text-slate-800">
              {t(AUTH_I18N_KEYS.login.title)}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <form
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault()

                if (!canSubmit) {
                  return
                }

                loginMutation.mutate({ email: email.trim(), password })
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-3 text-base font-semibold text-slate-600">
                  <Mail className="h-5 w-5" />
                  {t(AUTH_I18N_KEYS.login.emailLabel)}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t(AUTH_I18N_KEYS.login.emailPlaceholder)}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  className="h-12 rounded-xl border-slate-200 bg-blue-50 px-5 text-base text-slate-900 shadow-inner focus-visible:border-sky-500 focus-visible:ring-sky-500/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-3 text-base font-semibold text-slate-600">
                  <LockKeyhole className="h-5 w-5" />
                  {t(AUTH_I18N_KEYS.login.passwordLabel)}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t(AUTH_I18N_KEYS.login.passwordPlaceholder)}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  className="h-12 rounded-xl border-slate-200 bg-blue-50 px-5 text-base text-slate-900 shadow-inner focus-visible:border-sky-500 focus-visible:ring-sky-500/20"
                />
              </div>

              {loginMutation.isError && (
                <div className="text-sm text-destructive">
                  {t(AUTH_I18N_KEYS.login.error)}
                </div>
              )}

              <Button
                type="submit"
                className="h-12 w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-base font-bold shadow-lg shadow-cyan-700/20 hover:from-blue-700 hover:to-cyan-700"
                disabled={loginMutation.isPending || !canSubmit}
              >
                <LogIn className="h-5 w-5" />
                {loginMutation.isPending ? t(AUTH_I18N_KEYS.login.submitting) : t(AUTH_I18N_KEYS.login.submit)}
              </Button>

              <p className="text-center text-sm text-slate-600">
                {t(AUTH_I18N_KEYS.login.noAccount)}{" "}
                <Link
                  href={`/register${nextPath ? `?next=${encodeURIComponent(nextPath)}` : ""}`}
                  className="font-medium text-sky-600 hover:text-sky-700 hover:underline"
                >
                  {t(AUTH_I18N_KEYS.login.registerLink)}
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>

        <div className="mt-5 text-center text-sm text-slate-500">
          <p>{t(AUTH_I18N_KEYS.copyright)}</p>
        </div>
      </div>
    </main>
  )
}
