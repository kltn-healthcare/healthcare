"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Logo } from "@/components/Logo"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { ArrowLeft, LockKeyhole, CheckCircle2, AlertCircle, Eye, EyeOff, Check, X } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { postResetPassword } from "@/features/auth/api/auth.api"
import { useRouter, useSearchParams } from "next/navigation"
import { useTranslation } from "react-i18next"
import { AUTH_I18N_KEYS } from "@/shared/i18n/keys"
import { ROUTES } from "@/shared/constants"

export default function ResetPasswordPage() {
  const { t } = useTranslation("auth")
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [success, setSuccess] = useState(false)

  // Password rules validation states
  const isMinLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const allRulesMet = isMinLength && hasUppercase && hasLowercase && hasNumber

  const isMatching = password === confirmPassword && confirmPassword.length > 0
  const canSubmit = Boolean(token && allRulesMet && isMatching && !success)

  const resetPasswordMutation = useMutation({
    mutationFn: postResetPassword,
    onSuccess: () => {
      setSuccess(true)
    },
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!canSubmit) return

    resetPasswordMutation.mutate({
      token: token || "",
      newPassword: password,
      confirmPassword: confirmPassword,
    })
  }

  // If token is missing, show an warning card
  if (!token) {
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
            <CardHeader className="px-5 pt-5 pb-2 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 border border-rose-100 mb-3">
                <AlertCircle className="h-8 w-8 text-rose-500" />
              </div>
              <CardTitle className="text-xl font-bold text-slate-800">
                {t(AUTH_I18N_KEYS.resetPassword.invalidToken)}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 pt-2 text-center space-y-5">
              <p className="text-sm text-slate-500">
                The password reset link is invalid, malformed, or has already expired. Please request a new one.
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <Link href="/forgot-password">
                  <Button className="w-full h-11 bg-gradient-to-r from-blue-600 to-cyan-600 text-base font-bold shadow-md shadow-cyan-700/10 hover:from-blue-700 hover:to-cyan-700">
                    Request New Link
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="ghost" className="w-full text-slate-600 hover:text-slate-800">
                    {t(AUTH_I18N_KEYS.resetPassword.backToLogin)}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
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
              {t(AUTH_I18N_KEYS.resetPassword.title)}
            </CardTitle>
            <CardDescription className="text-sm text-slate-500 mt-2">
              {t(AUTH_I18N_KEYS.resetPassword.description)}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            {success ? (
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center text-center p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4 animate-bounce" />
                  <p className="text-emerald-800 font-medium text-base">
                    {t(AUTH_I18N_KEYS.resetPassword.successMessage)}
                  </p>
                </div>

                <div className="pt-2">
                  <Link href="/login" className="block">
                    <Button className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-base font-bold shadow-lg shadow-cyan-700/20 hover:from-blue-700 hover:to-cyan-700">
                      {t(AUTH_I18N_KEYS.resetPassword.backToLogin)}
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* New Password field */}
                <div className="space-y-2 relative">
                  <Label htmlFor="password" className="flex items-center gap-3 text-base font-semibold text-slate-600">
                    <LockKeyhole className="h-5 w-5" />
                    {t(AUTH_I18N_KEYS.resetPassword.passwordLabel)}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t(AUTH_I18N_KEYS.resetPassword.passwordPlaceholder)}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete="new-password"
                      className="h-12 rounded-xl border-slate-200 bg-blue-50 pl-5 pr-12 text-base text-slate-900 shadow-inner focus-visible:border-sky-500 focus-visible:ring-sky-500/20"
                      disabled={resetPasswordMutation.isPending}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Password Strength Checklist Indicator */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Password Requirements
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${isMinLength ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-400"}`}>
                        {isMinLength ? <Check className="h-3 w-3" /> : <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />}
                      </span>
                      <span className={isMinLength ? "text-emerald-700 font-medium" : "text-slate-500"}>
                        {t(AUTH_I18N_KEYS.resetPassword.ruleMinLength)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${hasUppercase ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-400"}`}>
                        {hasUppercase ? <Check className="h-3 w-3" /> : <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />}
                      </span>
                      <span className={hasUppercase ? "text-emerald-700 font-medium" : "text-slate-500"}>
                        {t(AUTH_I18N_KEYS.resetPassword.ruleUppercase)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${hasLowercase ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-400"}`}>
                        {hasLowercase ? <Check className="h-3 w-3" /> : <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />}
                      </span>
                      <span className={hasLowercase ? "text-emerald-700 font-medium" : "text-slate-500"}>
                        {t(AUTH_I18N_KEYS.resetPassword.ruleLowercase)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${hasNumber ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-400"}`}>
                        {hasNumber ? <Check className="h-3 w-3" /> : <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />}
                      </span>
                      <span className={hasNumber ? "text-emerald-700 font-medium" : "text-slate-500"}>
                        {t(AUTH_I18N_KEYS.resetPassword.ruleNumber)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Confirm Password field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="flex items-center gap-3 text-base font-semibold text-slate-600">
                    <LockKeyhole className="h-5 w-5" />
                    {t(AUTH_I18N_KEYS.resetPassword.confirmPasswordLabel)}
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={t(AUTH_I18N_KEYS.resetPassword.confirmPasswordPlaceholder)}
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      autoComplete="new-password"
                      className="h-12 rounded-xl border-slate-200 bg-blue-50 pl-5 pr-12 text-base text-slate-900 shadow-inner focus-visible:border-sky-500 focus-visible:ring-sky-500/20"
                      disabled={resetPasswordMutation.isPending}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {confirmPassword && !isMatching && (
                    <p className="text-xs text-rose-500 flex items-center gap-1.5 mt-1 ml-1">
                      <X className="h-3.5 w-3.5" />
                      {t(AUTH_I18N_KEYS.resetPassword.passwordMismatch)}
                    </p>
                  )}
                  {confirmPassword && isMatching && (
                    <p className="text-xs text-emerald-600 flex items-center gap-1.5 mt-1 ml-1 font-medium">
                      <Check className="h-3.5 w-3.5" />
                      Passwords match
                    </p>
                  )}
                </div>

                {resetPasswordMutation.isError && (
                  <div className="text-sm text-destructive flex items-center gap-2 p-3 bg-red-50 rounded-xl border border-red-100">
                    <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
                    <span>{t(AUTH_I18N_KEYS.resetPassword.error)}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  className="h-12 w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-base font-bold shadow-lg shadow-cyan-700/20 hover:from-blue-700 hover:to-cyan-700 transition-all duration-200"
                  disabled={!canSubmit || resetPasswordMutation.isPending}
                >
                  {resetPasswordMutation.isPending
                    ? t(AUTH_I18N_KEYS.resetPassword.submitting)
                    : t(AUTH_I18N_KEYS.resetPassword.submit)}
                </Button>

                <p className="text-center text-sm text-slate-600 pt-2">
                  <Link
                    href="/login"
                    className="font-semibold text-sky-600 hover:text-sky-700 hover:underline inline-flex items-center gap-1"
                  >
                    {t(AUTH_I18N_KEYS.resetPassword.backToLogin)}
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
