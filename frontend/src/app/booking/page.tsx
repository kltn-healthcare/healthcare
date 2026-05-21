"use client"

import { useState, useEffect, useMemo } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Calendar as CalendarIcon, CheckCircle2, ChevronRight, MapPin, User, Clock } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { useMutation, useQuery } from "@tanstack/react-query"
import { postBooking } from "@/api/bookings"
import { getDoctors, getDoctorAvailability, getDoctorDetail } from "@/api/doctors"
import { getClinics } from "@/api/clinics"
import { packageService } from "@/features/clinics/services/packageService"
import { useAuthStore } from "@/store"
import { useRouter, useSearchParams } from "next/navigation"
import { Calendar } from "@/shared/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover"
import { cn } from "@/shared/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"

type SlotReason = "PAST" | "BOOKING_PENDING" | "BOOKING_CONFIRMED" | null

type TimeSlot = {
  time: string
  isAvailable: boolean
  isPast?: boolean
  bookingStatus?: "PENDING" | "CONFIRMED" | null
  reason?: SlotReason
}

function isPastSlot(date: Date, time: string) {
  const [hoursRaw, minutesRaw] = time.split(":")
  const slotDateTime = new Date(date)
  slotDateTime.setHours(Number(hoursRaw), Number(minutesRaw), 0, 0)

  return slotDateTime.getTime() < Date.now()
}

function getSlotHint(slot: TimeSlot) {
  if (slot.reason === "PAST" || slot.isPast) {
    return "Slot này đã quá giờ"
  }

  if (slot.reason === "BOOKING_PENDING" || slot.bookingStatus === "PENDING") {
    return "Slot này đang được đặt bởi người khác"
  }

  if (slot.reason === "BOOKING_CONFIRMED" || slot.bookingStatus === "CONFIRMED") {
    return "Slot này đã được đặt bởi người khác"
  }

  return "Chọn khung giờ này"
}

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const auth = useAuthStore()

  const [step, setStep] = useState(1)

  useEffect(() => {
    if (!auth.isAuthenticated) {
      const query = searchParams.toString()
      router.push(`/login?next=${encodeURIComponent(`/booking${query ? `?${query}` : ""}`)}`)
    }
  }, [auth.isAuthenticated, router, searchParams])

  const [clinicId, setClinicId] = useState(searchParams.get("clinicId") || "")
  const [specialtyId, setSpecialtyId] = useState(searchParams.get("specialtyId") || "")
  const [doctorId, setDoctorId] = useState(searchParams.get("doctorId") || "")
  const [packageId, setPackageId] = useState(searchParams.get("packageId") || "")

  const [date, setDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState("")

  const [patientName, setPatientName] = useState("")
  const [patientPhone, setPatientPhone] = useState("")
  const [patientEmail, setPatientEmail] = useState("")

  useEffect(() => {
    if (auth.user) {
      setPatientName(auth.user.name || "")
      setPatientPhone(auth.user.phone || "")
      setPatientEmail(auth.user.email || "")
    }
  }, [auth.user])

  const clinicsQuery = useQuery({
    queryKey: ["clinics"],
    queryFn: () => getClinics({ limit: 50 }),
  })

  // Lấy danh sách bác sĩ theo phòng khám đã chọn
  const doctorsQuery = useQuery({
    queryKey: ["doctors", clinicId, specialtyId],
    enabled: !!clinicId,
    queryFn: () => getDoctors({ clinicId, specialtyId: specialtyId || undefined }),
  })

  const doctorDetailQuery = useQuery({
    queryKey: ["doctorDetail", doctorId],
    enabled: !!doctorId,
    queryFn: () => getDoctorDetail(doctorId),
  })

  const packageQuery = useQuery({
    queryKey: ["package", packageId],
    enabled: !!packageId,
    queryFn: () => packageService.getById(packageId),
  })

  const selectedPackage = packageQuery.data?.data
  const isPackageBooking = Boolean(packageId)
  const selectedClinic = (clinicsQuery.data?.items ?? []).find((clinic: any) => clinic.id === clinicId)
  const specialtyOptions = selectedClinic?.specialties ?? []

  // Nếu doctorId thay đổi và có dữ liệu detail, tự động set clinicId
  useEffect(() => {
    if (doctorDetailQuery.data && doctorDetailQuery.data.clinic) {
      setClinicId(doctorDetailQuery.data.clinic.id)
      setSpecialtyId(doctorDetailQuery.data.specialty?.id || "")
    }
  }, [doctorDetailQuery.data])

  useEffect(() => {
    const packageClinicId = selectedPackage?.clinicId || selectedPackage?.clinic?.id
    if (packageClinicId) {
      setClinicId(packageClinicId)
    }
    if (selectedPackage?.specialtyId) {
      setSpecialtyId(selectedPackage.specialtyId)
    }
    if (selectedPackage) {
      setDoctorId("")
    }
  }, [selectedPackage])

  const doctorAvailQuery = useQuery({
    queryKey: ["availability", doctorId, format(date, "yyyy-MM-dd")],
    enabled: !isPackageBooking && !!doctorId && !!date && step >= 2,
    queryFn: () => getDoctorAvailability(doctorId, format(date, "yyyy-MM-dd")),
  })

  const packageAvailQuery = useQuery({
    queryKey: ["packageAvailability", packageId, format(date, "yyyy-MM-dd")],
    enabled: isPackageBooking && !!packageId && !!date && step >= 2,
    queryFn: () => packageService.getAvailability(packageId, format(date, "yyyy-MM-dd")),
  })

  const availQuery = isPackageBooking ? packageAvailQuery : doctorAvailQuery

  const timeSlots = useMemo<TimeSlot[]>(() => {
    const res = availQuery.data as any
    if (!res) return []
    const rawSlots = res.slotDetails || res.slots || res.availableSlots || res.items || res
    if (!Array.isArray(rawSlots)) return []

    return rawSlots.map((slot: any) => {
      if (typeof slot === "string") {
        const isPast = isPastSlot(date, slot)
        return {
          time: slot,
          isAvailable: !isPast,
          isPast,
          bookingStatus: null,
          reason: isPast ? "PAST" : null,
        }
      }

      const time = slot.time
      const isPast = slot.isPast ?? isPastSlot(date, time)
      const bookingStatus = slot.bookingStatus ?? null

      return {
        time,
        isAvailable: Boolean(slot.isAvailable ?? (!isPast && !bookingStatus)),
        isPast,
        bookingStatus,
        reason: slot.reason ?? (isPast ? "PAST" : null),
      }
    })
  }, [availQuery.data, date])

  const createBookingMutation = useMutation({
    mutationFn: postBooking,
    onSuccess: (booking: any) => {
      const bookingId = booking?.id ? `&bookingId=${booking.id}` : ""
      router.push(`/account?tab=appointments${bookingId}`)
    },
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-bold">Đặt Lịch Khám</h1>
              <p className="text-muted-foreground">Hoàn thành các bước dưới đây để đặt lịch khám</p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8 flex items-center justify-between">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-1 items-center">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${s <= step ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {s < step ? <CheckCircle2 className="h-5 w-5" /> : s}
                  </div>
                  <div className={`hidden sm:block ml-2 ${s === step ? "font-semibold" : "text-muted-foreground"}`}>
                    {s === 1 && "Thông tin"}
                    {s === 2 && "Thời gian"}
                    {s === 3 && "Xác nhận"}
                  </div>
                  {s < 3 && <ChevronRight className="mx-2 sm:mx-4 h-5 w-5 shrink-0 text-muted-foreground" />}
                </div>
              ))}
            </div>

            {/* Step 1: Check info */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>{isPackageBooking ? "Thông tin người đặt & Gói khám" : "Thông tin người đặt & Bác sĩ"}</CardTitle>
                  <CardDescription>Kiểm tra thông tin trước khi chọn lịch</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">


                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Họ và Tên (*)</Label>
                      <Input
                        id="name"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số Điện Thoại (*)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        placeholder="Ví dụ: 0912345678"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (*)</Label>
                      <Input
                        id="email"
                        type="email"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="mt-6 border-t pt-6 space-y-4">
                    <Label className="text-base font-semibold">Chọn Cơ sở & Bác sĩ</Label>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Phòng khám</Label>
                        <Select value={clinicId} onValueChange={(val) => {
                          setClinicId(val)
                          setSpecialtyId("")
                          setDoctorId("") // Reset doctor when clinic changes
                          setPackageId("")
                        }}>
                          <SelectTrigger className="bg-white border-gray-200">
                            <SelectValue placeholder="Chọn phòng khám" />
                          </SelectTrigger>
                          <SelectContent>
                            {(clinicsQuery.data?.items ?? []).map((clinic: any) => (
                              <SelectItem key={clinic.id} value={clinic.id}>
                                {clinic.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Bác sĩ</Label>
                        <Select
                          value={doctorId}
                          onValueChange={setDoctorId}
                          disabled={isPackageBooking || !clinicId || doctorsQuery.isLoading}
                        >
                          <SelectTrigger className="bg-white border-gray-200">
                            <SelectValue placeholder={doctorsQuery.isLoading ? "Đang tải..." : "Chọn bác sĩ"} />
                          </SelectTrigger>
                          <SelectContent>
                            {(doctorsQuery.data?.items ?? []).map((doc: any) => (
                              <SelectItem key={doc.id} value={doc.id}>
                                {doc.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="rounded-xl border bg-white p-4">
                      <div className="mb-2 text-sm font-medium text-muted-foreground">Chuyên khoa</div>
                      <Select
                        value={specialtyId}
                        onValueChange={(val) => {
                          setSpecialtyId(val)
                          setDoctorId("")
                        }}
                        disabled={!clinicId || isPackageBooking}
                      >
                        <SelectTrigger className="bg-white border-gray-200">
                          <SelectValue placeholder="Chọn chuyên khoa" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialtyOptions.map((specialty: any) => (
                            <SelectItem key={specialty.id || specialty} value={specialty.id || specialty}>
                              {specialty.name || specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {doctorId && doctorDetailQuery.data && (
                      <div className="flex bg-primary/5 p-4 rounded-xl items-center gap-4 border border-primary/10 animate-in fade-in slide-in-from-top-2 duration-300 mt-2">
                        <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow-sm bg-background">
                          <img
                            src={doctorDetailQuery.data.avatar || "/modern-clinic-.jpg"}
                            alt={doctorDetailQuery.data.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{doctorDetailQuery.data.name}</h4>
                          <p className="text-xs text-muted-foreground flex items-center mt-0.5">
                            <MapPin className="mr-1 h-3 w-3 text-primary" /> {doctorDetailQuery.data.clinic?.name}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedPackage ? (
                      <div className="rounded-xl border border-primary/10 bg-primary/5 p-4">
                        <div className="text-sm text-muted-foreground">Gói khám đã chọn</div>
                        <div className="mt-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <div className="font-bold text-gray-900">{selectedPackage.name}</div>
                            <div className="text-xs text-muted-foreground">{selectedPackage.clinic?.name}</div>
                          </div>
                          <div className="text-base font-semibold text-primary">
                            {new Intl.NumberFormat("vi-VN").format(selectedPackage.promotionalPrice || selectedPackage.price)}đ
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={() => {
                        if (!patientName || !patientPhone || !patientEmail || !clinicId || !specialtyId || (!isPackageBooking && !doctorId)) {
                          alert("Vui lòng điền đầy đủ thông tin bắt buộc (*)")
                          return
                        }
                        setStep(2)
                      }}
                      className="bg-primary hover:bg-primary/90 shadow-md transition-all active:scale-95 px-8"
                    >
                      Tiếp Theo: Chọn Thời Gian
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Choose Date & Time */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Chọn Ngày và Giờ Khám</CardTitle>
                  <CardDescription>{isPackageBooking ? "Lịch trống thực tế của gói khám" : "Lịch trống thực tế của bác sĩ"}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">

                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Chọn Ngày</Label>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d) => {
                          if (d) {
                            setDate(d)
                            setSelectedTime("") // reset time when date changes
                          }
                        }}
                        disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                        className="rounded-md border shadow"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label>
                        Khung Giờ (Ngày {format(date, "dd/MM/yyyy")})
                      </Label>
                      {availQuery.isLoading ? (
                        <div className="text-sm text-muted-foreground italic">Đang tải lịch trống...</div>
                      ) : timeSlots.length === 0 ? (
                        <div className="text-sm text-amber-600 bg-amber-50 p-4 rounded-xl border border-amber-200">
                          {isPackageBooking ? "Gói khám không có slot ngày này. Vui lòng chọn ngày khác." : "Bác sĩ không có lịch làm việc ngày này. Vui lòng chọn ngày khác."}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {timeSlots.map((slot, idx) => {
                              const timeValue = slot.time
                              const hint = getSlotHint(slot)

                              return (
                                <Button
                                  key={`${timeValue}-${idx}`}
                                  variant={selectedTime === timeValue ? "default" : "outline"}
                                  title={hint}
                                  aria-label={`${timeValue} - ${hint}`}
                                  className={cn(
                                    "transition-all duration-200",
                                    selectedTime === timeValue && slot.isAvailable
                                      ? "bg-primary shadow-md scale-[1.02]"
                                      : slot.isPast || slot.reason === "PAST"
                                        ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-400"
                                        : slot.bookingStatus === "PENDING" || slot.reason === "BOOKING_PENDING"
                                          ? "cursor-not-allowed border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-200 hover:text-amber-700"
                                          : slot.bookingStatus === "CONFIRMED" || slot.reason === "BOOKING_CONFIRMED"
                                            ? "cursor-not-allowed border-rose-200 bg-rose-50 text-rose-700 hover:border-rose-200 hover:text-rose-700"
                                            : "hover:border-primary hover:text-primary"
                                  )}
                                  disabled={!slot.isAvailable}
                                  onClick={() => setSelectedTime(timeValue)}
                                >
                                  <Clock className="mr-2 h-4 w-4" />
                                  {timeValue}
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Quay Lại
                    </Button>
                    <Button onClick={() => setStep(3)} disabled={!selectedTime} className="bg-primary">
                      Tiếp Theo: Xác nhận
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Confirm Booking */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Xác Nhận Thông Tin Đặt Lịch</CardTitle>
                  <CardDescription>Vui lòng kiểm tra lại tất cả thông tin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg bg-muted/30 p-6 border">
                    <h3 className="mb-4 font-semibold text-lg border-b pb-2">Thông tin người bệnh</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 text-sm mb-6">
                      <div>
                        <span className="text-muted-foreground block mb-1">Họ và tên:</span>
                        <span className="font-medium text-base">{patientName}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block mb-1">Số điện thoại:</span>
                        <span className="font-medium text-base">{patientPhone}</span>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-muted-foreground block mb-1">Email:</span>
                        <span className="font-medium text-base">{patientEmail}</span>
                      </div>
                    </div>

                    <h3 className="mb-4 font-semibold text-lg border-b pb-2">Chi tiết lịch khám</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 text-sm bg-background p-4 rounded-lg border">
                      {isPackageBooking ? (
                        <div>
                          <span className="text-muted-foreground block mb-1">Gói khám:</span>
                          <span className="font-medium text-base text-primary">{selectedPackage?.name}</span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-muted-foreground block mb-1">Bác sĩ:</span>
                          <span className="font-medium text-base text-primary">{doctorDetailQuery.data?.name}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-muted-foreground block mb-1">Phòng khám:</span>
                        <span className="font-medium">{isPackageBooking ? selectedPackage?.clinic?.name || selectedClinic?.name : doctorDetailQuery.data?.clinic?.name}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block mb-1"><CalendarIcon className="h-4 w-4 inline mr-1" />Ngày khám:</span>
                        <span className="font-medium text-base">{format(date, "dd/MM/yyyy", { locale: vi })}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block mb-1"><Clock className="h-4 w-4 inline mr-1" />Giờ khám:</span>
                        <span className="font-medium text-base text-amber-600">{selectedTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Quay Lại
                    </Button>
                    <Button
                      className="bg-primary"
                      disabled={createBookingMutation.isPending}
                      onClick={() =>
                        createBookingMutation.mutate({
                          clinicId: clinicId,
                          specialtyId,
                          doctorId: isPackageBooking ? undefined : doctorId,
                          packageId: packageId || undefined,
                          bookingType: isPackageBooking ? "HEALTH_PACKAGE" : "DOCTOR_CONSULTATION",
                          patientName,
                          patientEmail,
                          patientPhone,
                          bookingDate: format(date, "yyyy-MM-dd"),
                          bookingTime: selectedTime,
                        })
                      }
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      {createBookingMutation.isPending ? "Đang xử lý..." : "Xác Nhận Đặt Lịch"}
                    </Button>
                  </div>
                  {createBookingMutation.isError && (
                    <div className="text-sm text-destructive mt-2 text-center p-2 rounded bg-destructive/10">
                      Đã có lỗi xảy ra. Slot khám có thể đã được đặt hoặc thông tin không hợp lệ. Vui lòng chọn giờ khác!
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
