"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { KeyRound, LockKeyhole, Mail, Phone, UserRound } from "lucide-react"
import { Logo } from "@/components/Logo"
import { postRegister, postVerifyRegisterOtp } from "@/api/auth"
import { useAuthStore } from "@/store"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const auth = useAuthStore()
  const nextPath = searchParams.get("next")

  const [step, setStep] = useState<"register" | "otp">("register")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [otp, setOtp] = useState("")

  const registerMutation = useMutation({
    mutationFn: postRegister,
    onSuccess: () => {
      setStep("otp")
    },
  })

  const verifyOtpMutation = useMutation({
    mutationFn: postVerifyRegisterOtp,
    onSuccess: (data) => {
      auth.login(data.user, data.accessToken)
      const redirectTo = nextPath?.startsWith("/") ? nextPath : "/account"
      router.push(redirectTo)
    },
  })

  const passwordMismatch =
    Boolean(password && confirmPassword) && password !== confirmPassword
  const canRegister = Boolean(name.trim() && email.trim() && password) && !passwordMismatch

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-teal-50 px-4 py-5">
      <div className="w-full max-w-[560px]">
        <div className="mb-5 text-center">
          <Logo className="mb-3 scale-90 justify-center" />
          <h1 className="text-[26px] font-bold leading-tight text-sky-600">
            HEALTHCARE
          </h1>
          <p className="mt-1 text-base text-slate-600">
            Tạo tài khoản để đặt lịch khám nhanh hơn
          </p>
        </div>

        {step === "register" ? (
          <Card className="rounded-2xl border-0 bg-white/95 px-4 py-3 shadow-[0_24px_70px_rgba(15,23,42,0.14)]">
            <CardHeader className="px-5 pt-4 pb-1">
              <CardTitle className="text-[25px] font-bold text-slate-800">
                Đăng ký
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault()

                  if (!canRegister) {
                    return
                  }

                  registerMutation.mutate({
                    name: name.trim(),
                    email: email.trim(),
                    phone: phone.trim() || undefined,
                    password,
                  })
                }}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="fullname" className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <UserRound className="h-4 w-4" />
                      Họ và tên
                    </Label>
                    <Input
                      id="fullname"
                      placeholder="Nguyễn Văn A"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      autoComplete="name"
                      className="h-11 rounded-xl border-slate-200 bg-blue-50 px-4 text-base text-slate-900 shadow-inner focus-visible:border-sky-500 focus-visible:ring-sky-500/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <Phone className="h-4 w-4" />
                      Số điện thoại
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0912345678"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      autoComplete="tel"
                      className="h-11 rounded-xl border-slate-200 bg-blue-50 px-4 text-base text-slate-900 shadow-inner focus-visible:border-sky-500 focus-visible:ring-sky-500/20"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    className="h-11 rounded-xl border-slate-200 bg-blue-50 px-4 text-base text-slate-900 shadow-inner focus-visible:border-sky-500 focus-visible:ring-sky-500/20"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="password" className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <LockKeyhole className="h-4 w-4" />
                      Mật khẩu
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete="new-password"
                      className="h-11 rounded-xl border-slate-200 bg-blue-50 px-4 text-base text-slate-900 shadow-inner focus-visible:border-sky-500 focus-visible:ring-sky-500/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="confirm-password" className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <LockKeyhole className="h-4 w-4" />
                      Xác nhận mật khẩu
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      autoComplete="new-password"
                      className="h-11 rounded-xl border-slate-200 bg-blue-50 px-4 text-base text-slate-900 shadow-inner focus-visible:border-sky-500 focus-visible:ring-sky-500/20"
                    />
                  </div>
                </div>

                {passwordMismatch && (
                  <div className="text-sm text-destructive">
                    Mật khẩu xác nhận không khớp.
                  </div>
                )}
                {registerMutation.isError && (
                  <div className="text-sm text-destructive">
                    Đăng ký thất bại. Email có thể đã tồn tại.
                  </div>
                )}

                <Button
                  type="submit"
                  className="h-11 w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-base font-bold shadow-lg shadow-cyan-700/20 hover:from-blue-700 hover:to-cyan-700"
                  disabled={registerMutation.isPending || !canRegister}
                >
                  {registerMutation.isPending ? "Đang gửi OTP..." : "Đăng ký"}
                </Button>

                <p className="text-center text-sm text-slate-600">
                  Đã có tài khoản?{" "}
                  <Link
                    href={`/login${nextPath ? `?next=${encodeURIComponent(nextPath)}` : ""}`}
                    className="font-medium text-sky-600 hover:text-sky-700 hover:underline"
                  >
                    Đăng nhập
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="rounded-2xl border-0 bg-white/95 px-4 py-3 shadow-[0_24px_70px_rgba(15,23,42,0.14)]">
            <CardHeader className="px-5 pt-5 pb-1 text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                <KeyRound className="h-6 w-6" />
              </div>
              <CardTitle className="text-[25px] font-bold text-slate-800">
                Xác nhận email
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault()

                  if (otp.length !== 6) {
                    return
                  }

                  verifyOtpMutation.mutate({ email, otp })
                }}
              >
                <p className="text-center text-sm text-slate-600">
                  Mã OTP gồm 6 chữ số đã được gửi đến{" "}
                  <span className="font-medium text-slate-800">{email}</span>
                </p>

                <div className="space-y-1.5">
                  <Label htmlFor="otp" className="text-sm font-semibold text-slate-600">
                    Mã xác nhận
                  </Label>
                  <Input
                    id="otp"
                    placeholder="123456"
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                    className="h-12 text-center text-lg font-medium tracking-[0.5em]"
                    maxLength={6}
                  />
                </div>

                {verifyOtpMutation.isError && (
                  <div className="text-sm text-destructive">
                    Mã OTP không đúng hoặc đã hết hạn.
                  </div>
                )}

                <Button
                  type="submit"
                  className="h-11 w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-base font-bold shadow-lg shadow-cyan-700/20 hover:from-blue-700 hover:to-cyan-700"
                  disabled={verifyOtpMutation.isPending || otp.length !== 6}
                >
                  {verifyOtpMutation.isPending ? "Đang xác nhận..." : "Xác nhận"}
                </Button>

                <Button
                  type="button"
                  variant="link"
                  className="w-full text-sm text-slate-600"
                  onClick={() => setStep("register")}
                >
                  Quay lại trang đăng ký
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="mt-4 text-center text-sm text-slate-500">
          <p>© 2026 HEALTHCARE. All rights reserved.</p>
        </div>
      </div>
    </main>
  )
}
