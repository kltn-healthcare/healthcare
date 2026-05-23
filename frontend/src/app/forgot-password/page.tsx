"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Logo } from "@/components/Logo"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { ArrowLeft, Mail, CheckCircle2, AlertCircle } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { postForgotPassword } from "@/features/auth/api/auth.api"
import { useSearchParams } from "next/navigation"
import { useTranslation } from "react-i18next"
import { AUTH_I18N_KEYS } from "@/shared/i18n/keys"
import { ROUTES } from "@/shared/constants"

export default function ForgotPasswordPage() {
  const { t } = useTranslation("auth")
  const searchParams = useSearchParams()
  const nextPath = searchParams.get("next")
  const [email, setEmail] = useState("")
  const [success, setSuccess] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [cooldown])

  const forgotPasswordMutation = useMutation({
    mutationFn: postForgotPassword,
    onSuccess: (data) => {
      setSuccess(true)
      // Set the 60s cooldown upon successful submission
      setCooldown(60)
    },
  })

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const isValid = validateEmail(email.trim())
  const canSubmit = isValid && cooldown === 0 && !forgotPasswordMutation.isPending

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!canSubmit) return
    forgotPasswordMutation.mutate({ email: email.trim().toLowerCase() })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-teal-50 px-4 py-5">
      <div className="absolute left-4 top-4">
        <Link href={ROUTES.HOME}>
          <Button variant="ghost" size="sm" className="gap-2 text-slate-600 hover:text-sky-700">
            <ArrowLeft className="h-4 w-4" />
            {t(AUTH_I18N_KEYS.backHome)}
          </Button>
        </Link>
      </div>

      <div className="absolute right-4 top-4">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-[520px]">
        <div className="mb-6 flex justify-center">
          <Logo className="mb-4 scale-90 justify-center" />
        </div>

        <Card className="rounded-2xl border-0 bg-white/95 px-4 py-3 shadow-[0_24px_70px_rgba(15,23,42,0.14)]">
          <CardHeader className="px-5 pt-5 pb-2">
            <CardTitle className="text-[26px] font-bold text-slate-800">
              {t(AUTH_I18N_KEYS.forgotPassword.title)}
            </CardTitle>
            <CardDescription className="text-sm text-slate-500 mt-2">
              {t(AUTH_I18N_KEYS.forgotPassword.description)}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            {success ? (
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center text-center p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4 animate-bounce" />
                  <p className="text-emerald-800 font-medium text-base">
                    {t(AUTH_I18N_KEYS.forgotPassword.successMessage)}
                  </p>
                </div>

                {cooldown > 0 && (
                  <div className="text-center text-sm text-slate-500 bg-slate-50 py-3 rounded-xl border border-slate-100">
                    {t(AUTH_I18N_KEYS.forgotPassword.cooldownMessage)} ({cooldown}s)
                  </div>
                )}

                <div className="space-y-3 pt-2">
                  {cooldown === 0 && (
                    <Button
                      variant="outline"
                      className="w-full h-12 rounded-xl text-base font-semibold border-slate-200 hover:bg-slate-50"
                      onClick={() => setSuccess(false)}
                    >
                      {t(AUTH_I18N_KEYS.forgotPassword.submit)}
                    </Button>
                  )}

                  <Link href={`/login${nextPath ? `?next=${encodeURIComponent(nextPath)}` : ""}`} className="block">
                    <Button
                      variant="link"
                      className="w-full text-sky-600 hover:text-sky-700 hover:underline font-semibold"
                    >
                      {t(AUTH_I18N_KEYS.forgotPassword.backToLogin)}
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-3 text-base font-semibold text-slate-600">
                    <Mail className="h-5 w-5" />
                    {t(AUTH_I18N_KEYS.forgotPassword.emailLabel)}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t(AUTH_I18N_KEYS.forgotPassword.emailPlaceholder)}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    className="h-12 rounded-xl border-slate-200 bg-blue-50 px-5 text-base text-slate-900 shadow-inner focus-visible:border-sky-500 focus-visible:ring-sky-500/20"
                    disabled={forgotPasswordMutation.isPending}
                  />
                  {email && !isValid && (
                    <p className="text-xs text-rose-500 flex items-center gap-1.5 mt-1 ml-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {t(AUTH_I18N_KEYS.forgotPassword.invalidEmail)}
                    </p>
                  )}
                </div>

                {forgotPasswordMutation.isError && (
                  <div className="text-sm text-destructive flex items-center gap-2 p-3 bg-red-50 rounded-xl border border-red-100">
                    <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
                    <span>{t(AUTH_I18N_KEYS.forgotPassword.error)}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  className="h-12 w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-base font-bold shadow-lg shadow-cyan-700/20 hover:from-blue-700 hover:to-cyan-700 transition-all duration-200"
                  disabled={!canSubmit || forgotPasswordMutation.isPending}
                >
                  {forgotPasswordMutation.isPending
                    ? t(AUTH_I18N_KEYS.forgotPassword.submitting)
                    : t(AUTH_I18N_KEYS.forgotPassword.submit)}
                </Button>

                <p className="text-center text-sm text-slate-600 pt-2">
                  <Link
                    href={`/login${nextPath ? `?next=${encodeURIComponent(nextPath)}` : ""}`}
                    className="font-semibold text-sky-600 hover:text-sky-700 hover:underline inline-flex items-center gap-1"
                  >
                    {t(AUTH_I18N_KEYS.forgotPassword.backToLogin)}
                  </Link>
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
