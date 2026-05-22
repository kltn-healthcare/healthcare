"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
    Activity,
    Building2,
    CalendarCheck2,
    CalendarClock,
    ImageIcon,
    Newspaper,
    ShieldCheck,
    Stethoscope,
    UserRoundCheck,
    Users,
    User,
    Mail,
    Phone,
    Award,
    Sparkles,
    Check,
} from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Switch } from "@/shared/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Textarea } from "@/shared/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Badge } from "@/shared/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select"
import { useAuthStore } from "@/store"
import { ImageUpload } from "@/components"
import {
    createAdminArticle,
    createAdminClinic,
    createAdminDoctor,
    createAdminUser,
    deleteAdminArticle,
    deleteAdminClinic,
    deleteAdminDoctor,
    deleteAdminUser,
    getAdminArticles,
    getAdminClinics,
    getAdminDoctors,
    getAdminUsers,
    updateAdminArticle,
    updateAdminClinic,
    updateAdminDoctor,
    updateAdminUser,
    type AdminArticle,
    type AdminClinic,
    type AdminDoctor,
    type AdminRole,
} from "@/api/admin"
import {
    getDoctorBookings,
    getDoctorSettings,
    patchDoctorBookingStatus,
    putDoctorSchedule,
    getDoctorProfile,
    patchDoctorProfile,
    type DoctorBookingItem,
    type DoctorBookingStatus,
    type DoctorSpecialtySchedule,
    type DoctorWorkingHour,
    type DoctorProfileItem,
    type UpdateDoctorProfileInput,
} from "@/api/doctor-admin"
import { getSpecialties } from "@/api/specialties"
import { ARTICLE_DEFAULTS, ARTICLE_QUERY_KEYS } from "@/shared/constants"
import { ClinicAdminPanel } from "./ClinicAdminPanel"
import { PackageAdminPanel } from "./PackageAdminPanel"
import { ADMIN_DAY_OPTIONS, ADMIN_TEXT } from "./admin.constants"

type RoleFilter = "ALL" | AdminRole
type BookingFilter = "ALL" | DoctorBookingStatus

type WeeklyScheduleRow = {
    dayOfWeek: number
    enabled: boolean
    startTime: string
    endTime: string
}

type SpecialtyOption = {
    id: string
    name: string
}

type GeneratedDoctorSlot = {
    key: string
    dayOfWeek: number
    startTime: string
    endTime: string
}

const dayOptions = ADMIN_DAY_OPTIONS
const text = ADMIN_TEXT

function normalizeRole(role?: string) {
    const normalized = String(role || "").toUpperCase()
    if (normalized === "SUPER_ADMIN") {
        return "ADMIN"
    }
    return normalized
}

function getRoleLabel(role: string | undefined) {
    switch (normalizeRole(role)) {
        case "ADMIN":
            return text.roles.admin
        case "DOCTOR":
            return text.roles.doctor
        case "CLINIC_ADMIN":
            return text.roles.clinicAdmin
        case "PATIENT":
            return text.roles.patient
        default:
            return role || text.roles.unknown
    }
}

function getBookingStatusLabel(status: DoctorBookingStatus) {
    switch (status) {
        case "PENDING":
            return text.bookingStatus.pending
        case "CONFIRMED":
            return text.bookingStatus.confirmed
        case "COMPLETED":
            return text.bookingStatus.completed
        case "CANCELLED":
            return text.bookingStatus.cancelled
        default:
            return status
    }
}

function getBookingStatusClass(status: DoctorBookingStatus) {
    switch (status) {
        case "PENDING":
            return "bg-amber-100 text-amber-700 border-amber-200"
        case "CONFIRMED":
            return "bg-primary/10 text-primary border-primary/20"
        case "COMPLETED":
            return "bg-emerald-100 text-emerald-700 border-emerald-200"
        case "CANCELLED":
            return "bg-rose-100 text-rose-700 border-rose-200"
        default:
            return ""
    }
}

function formatDate(dateValue: string) {
    try {
        return new Date(dateValue).toLocaleDateString("vi-VN")
    } catch {
        return dateValue
    }
}

function getDefaultWeeklySchedule(): WeeklyScheduleRow[] {
    return dayOptions.map((day) => ({
        dayOfWeek: day.value,
        enabled: day.value >= 1 && day.value <= 5,
        startTime: "08:00",
        endTime: "17:00",
    }))
}

function buildWeeklySchedule(workingHours: DoctorWorkingHour[] | undefined): WeeklyScheduleRow[] {
    const defaults = getDefaultWeeklySchedule()
    if (!workingHours?.length) {
        return defaults
    }

    const byDay = new Map<number, DoctorWorkingHour>()
    for (const row of workingHours) {
        if (!byDay.has(row.dayOfWeek)) {
            byDay.set(row.dayOfWeek, row)
        }
    }

    return defaults.map((row) => {
        const current = byDay.get(row.dayOfWeek)
        if (!current) {
            return { ...row, enabled: false }
        }
        return {
            dayOfWeek: row.dayOfWeek,
            enabled: true,
            startTime: current.startTime,
            endTime: current.endTime,
        }
    })
}

function doctorSlotKey(dayOfWeek: number, startTime: string, endTime: string) {
    return `${dayOfWeek}-${startTime}-${endTime}`
}

function adminTimeToMinutes(value: string) {
    const [hour, minute] = value.split(":").map(Number)
    return hour * 60 + minute
}

function adminMinutesToTime(total: number) {
    return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`
}

function generateDoctorSlots(schedules: DoctorSpecialtySchedule[]): GeneratedDoctorSlot[] {
    return schedules
        .filter((row) => row.isActive)
        .flatMap((row) => {
            const slots: GeneratedDoctorSlot[] = []
            const start = adminTimeToMinutes(row.startTime)
            const end = adminTimeToMinutes(row.endTime)
            for (let cursor = start; cursor + row.slotDurationMinutes <= end; cursor += row.slotDurationMinutes) {
                const startTime = adminMinutesToTime(cursor)
                const endTime = adminMinutesToTime(cursor + row.slotDurationMinutes)
                slots.push({
                    key: doctorSlotKey(row.dayOfWeek, startTime, endTime),
                    dayOfWeek: row.dayOfWeek,
                    startTime,
                    endTime,
                })
            }
            return slots
        })
}

function workingHoursToSelectedSlots(workingHours: DoctorWorkingHour[] | undefined, slots: GeneratedDoctorSlot[]) {
    const selected = new Set<string>()
    const rows = workingHours ?? []
    slots.forEach((slot) => {
        const slotStart = adminTimeToMinutes(slot.startTime)
        const slotEnd = adminTimeToMinutes(slot.endTime)
        const isSelected = rows.some(
            (row) =>
                row.dayOfWeek === slot.dayOfWeek &&
                slotStart >= adminTimeToMinutes(row.startTime) &&
                slotEnd <= adminTimeToMinutes(row.endTime),
        )
        if (isSelected) selected.add(slot.key)
    })
    return selected
}

function selectedSlotsToWorkingHours(selected: Set<string>, slots: GeneratedDoctorSlot[]): DoctorWorkingHour[] {
    return dayOptions.flatMap((day) => {
        const daySlots = slots
            .filter((slot) => slot.dayOfWeek === day.value && selected.has(slot.key))
            .sort((a, b) => adminTimeToMinutes(a.startTime) - adminTimeToMinutes(b.startTime))
        const ranges: DoctorWorkingHour[] = []
        let current: DoctorWorkingHour | null = null
        daySlots.forEach((slot) => {
            if (!current) {
                current = { dayOfWeek: day.value, startTime: slot.startTime, endTime: slot.endTime }
                return
            }
            if (current.endTime === slot.startTime) {
                current.endTime = slot.endTime
                return
            }
            ranges.push(current)
            current = { dayOfWeek: day.value, startTime: slot.startTime, endTime: slot.endTime }
        })
        if (current) ranges.push(current)
        return ranges
    })
}

export default function AdminPage() {
    const router = useRouter()
    const auth = useAuthStore()
    const role = useMemo(() => normalizeRole(auth.user?.role), [auth.user?.role])

    useEffect(() => {
        if (!auth.isLoading && !auth.isAuthenticated) {
            router.replace("/login?next=/admin")
        }
    }, [auth.isAuthenticated, auth.isLoading, router])

    if (auth.isLoading) {
        return <div className="p-8 text-center">{text.common.loading}</div>
    }

    if (!auth.isAuthenticated) {
        return null
    }

    if (role === "PATIENT") {
        return (
            <main className="flex min-h-screen items-center justify-center bg-muted/40 p-6">
                <Card className="w-full max-w-xl border-rose-200">
                    <CardHeader>
                        <CardTitle>{text.accessDenied.title}</CardTitle>
                        <CardDescription>
                            {text.accessDenied.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-3">
                        <Link href="/">
                            <Button>{text.common.backHome}</Button>
                        </Link>
                        <Link href="/account">
                            <Button variant="outline">{text.common.goAccount}</Button>
                        </Link>
                    </CardContent>
                </Card>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-muted/40 py-8">
            <div className="container mx-auto max-w-7xl px-4">
                <AdminTopBar
                    role={role}
                    email={auth.user?.email || ""}
                    onLogout={() => auth.logout()}
                />

                {role === "DOCTOR" ? <DoctorAdminSection /> : role === "CLINIC_ADMIN" ? <ClinicAdminPanel /> : <SystemAdminSectionV2 />}
            </div>
        </main>
    )
}

function AdminTopBar({
    role,
    email,
    onLogout,
}: Readonly<{
    role: string
    email: string
    onLogout: () => void
}>) {
    return (
        <div className="mb-6 rounded-2xl border border-primary/20 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                        <h1 className="text-xl font-semibold">{text.topBar.title}</h1>
                    </div>
                    <p className="text-sm text-muted-foreground">{email}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{text.common.rolePrefix}: {getRoleLabel(role)}</p>
                </div>

                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
                        {getRoleLabel(role)}
                    </Badge>
                    <Button variant="outline" onClick={onLogout}>
                        {text.common.logout}
                    </Button>
                </div>
            </div>
        </div>
    )
}

function DoctorAdminSection() {
    const queryClient = useQueryClient()
    const doctorText = text.doctorAdmin

    const allBookingsQuery = useQuery({
        queryKey: ["doctor-admin", "bookings", "all"],
        queryFn: () => getDoctorBookings(),
    })

    const settingsQuery = useQuery({
        queryKey: ["doctor-admin", "settings"],
        queryFn: getDoctorSettings,
    })

    const profileQuery = useQuery({
        queryKey: ["doctor-admin", "profile"],
        queryFn: getDoctorProfile,
    })

    const [bookingFilter, setBookingFilter] = useState<BookingFilter>("ALL")
    const [slotDurationMinutes, setSlotDurationMinutes] = useState(30)
    const [specialtySchedules, setSpecialtySchedules] = useState<DoctorSpecialtySchedule[]>([])
    const [selectedDoctorSlots, setSelectedDoctorSlots] = useState<Set<string>>(new Set())
    const [scheduleError, setScheduleError] = useState<string | null>(null)
    const [cancelBookingTarget, setCancelBookingTarget] = useState<DoctorBookingItem | null>(null)
    const [cancelReason, setCancelReason] = useState("")

    const [profileName, setProfileName] = useState("")
    const [profilePhone, setProfilePhone] = useState("")
    const [profileAvatar, setProfileAvatar] = useState("")
    const [profileExperience, setProfileExperience] = useState<number>(0)
    const [profileBio, setProfileBio] = useState("")

    const [profileSuccessMsg, setProfileSuccessMsg] = useState<string | null>(null)
    const [profileErrorMsg, setProfileErrorMsg] = useState<string | null>(null)

    useEffect(() => {
        if (profileQuery.data) {
            setProfileName(profileQuery.data.name ?? "")
            setProfilePhone(profileQuery.data.user?.phone ?? "")
            setProfileAvatar(profileQuery.data.avatar ?? "")
            setProfileExperience(profileQuery.data.experience ?? 0)
            setProfileBio(profileQuery.data.bio ?? "")
        }
    }, [profileQuery.data])

    const isProfileDirty = useMemo(() => {
        if (!profileQuery.data) return false
        return (
            profileName !== (profileQuery.data.name ?? "") ||
            profilePhone !== (profileQuery.data.user?.phone ?? "") ||
            profileAvatar !== (profileQuery.data.avatar ?? "") ||
            profileExperience !== (profileQuery.data.experience ?? 0) ||
            profileBio !== (profileQuery.data.bio ?? "")
        )
    }, [profileName, profilePhone, profileAvatar, profileExperience, profileBio, profileQuery.data])

    const updateProfileMutation = useMutation({
        mutationFn: patchDoctorProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["doctor-admin", "profile"] })
            setProfileSuccessMsg("Cập nhật hồ sơ cá nhân thành công!")
            setProfileErrorMsg(null)
            setTimeout(() => setProfileSuccessMsg(null), 5000)
        },
        onError: (error: any) => {
            setProfileErrorMsg(error?.response?.data?.message || "Đã xảy ra lỗi khi cập nhật hồ sơ.")
            setProfileSuccessMsg(null)
        },
    })

    const handleSaveProfile = () => {
        setProfileSuccessMsg(null)
        setProfileErrorMsg(null)
        updateProfileMutation.mutate({
            name: profileName,
            phone: profilePhone,
            avatar: profileAvatar,
            experience: Number(profileExperience) || 0,
            bio: profileBio,
        })
    }

    const allBookings = allBookingsQuery.data?.items ?? []
    const generatedDoctorSlots = useMemo(() => generateDoctorSlots(specialtySchedules), [specialtySchedules])

    const filteredBookings = useMemo(() => {
        if (bookingFilter === "ALL") {
            return allBookings
        }
        return allBookings.filter((item) => item.status === bookingFilter)
    }, [allBookings, bookingFilter])

    const bookingStats = useMemo(() => {
        const total = allBookings.length
        const pending = allBookings.filter((item) => item.status === "PENDING").length
        const confirmed = allBookings.filter((item) => item.status === "CONFIRMED").length
        const completed = allBookings.filter((item) => item.status === "COMPLETED").length
        return { total, pending, confirmed, completed }
    }, [allBookings])

    // Khởi tạo các slot được chọn ban đầu từ DB để so sánh Dirty State
    const initialSelectedSlots = useMemo(() => {
        if (!settingsQuery.data?.settings) return new Set<string>()
        const schedules = settingsQuery.data.settings.specialtySchedules ?? []
        return workingHoursToSelectedSlots(
            settingsQuery.data.settings.workingHours,
            generateDoctorSlots(schedules)
        )
    }, [settingsQuery.data?.settings])

    // Tính toán xem người dùng đã thực hiện bất kỳ thay đổi nào chưa (isDirty)
    const isScheduleDirty = useMemo(() => {
        if (!settingsQuery.data?.settings) return false
        if (initialSelectedSlots.size !== selectedDoctorSlots.size) return true
        for (const key of selectedDoctorSlots) {
            if (!initialSelectedSlots.has(key)) return true
        }
        return false
    }, [initialSelectedSlots, selectedDoctorSlots, settingsQuery.data?.settings])

    // Lấy danh sách tất cả các khung giờ duy nhất của chuyên khoa để làm header bảng Grid
    const allUniqueTimeIntervals = useMemo(() => {
        const intervals = new Set<string>()
        generatedDoctorSlots.forEach((slot) => {
            intervals.add(`${slot.startTime}-${slot.endTime}`)
        })
        return Array.from(intervals).sort((a, b) => {
            const timeA = adminTimeToMinutes(a.split("-")[0])
            const timeB = adminTimeToMinutes(b.split("-")[0])
            return timeA - timeB
        })
    }, [generatedDoctorSlots])

    useEffect(() => {
        if (settingsQuery.data?.settings) {
            setSlotDurationMinutes(settingsQuery.data.settings.slotDurationMinutes ?? 30)
            const schedules = settingsQuery.data.settings.specialtySchedules ?? []
            setSpecialtySchedules(schedules)
            setSelectedDoctorSlots(workingHoursToSelectedSlots(settingsQuery.data.settings.workingHours, generateDoctorSlots(schedules)))
        }
    }, [settingsQuery.data])

    const updateBookingStatusMutation = useMutation({
        mutationFn: ({
            id,
            status,
            cancellationReason,
        }: {
            id: string
            status: "CONFIRMED" | "COMPLETED" | "CANCELLED"
            cancellationReason?: string
        }) => patchDoctorBookingStatus(id, { status, cancellationReason }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["doctor-admin", "bookings"] })
            setCancelBookingTarget(null)
            setCancelReason("")
        },
    })

    const saveScheduleMutation = useMutation({
        mutationFn: putDoctorSchedule,
        onSuccess: () => {
            setScheduleError(null)
            queryClient.invalidateQueries({ queryKey: ["doctor-admin", "settings"] })
        },
    })

    const handleSaveSchedule = () => {
        const workingHours = selectedSlotsToWorkingHours(selectedDoctorSlots, generatedDoctorSlots)

        if (!workingHours.length) {
            setScheduleError(doctorText.scheduleError)
            return
        }

        setScheduleError(null)
        saveScheduleMutation.mutate({ slotDurationMinutes, workingHours })
    }

    const toggleDoctorSlot = (slotKey: string) => {
        setSelectedDoctorSlots((prev) => {
            const next = new Set(prev)
            if (next.has(slotKey)) next.delete(slotKey)
            else next.add(slotKey)
            return next
        })
    }

    const requestCancelBooking = (booking: DoctorBookingItem) => {
        setCancelBookingTarget(booking)
        setCancelReason("")
    }

    const confirmCancelBooking = () => {
        if (!cancelBookingTarget) {
            return
        }

        updateBookingStatusMutation.mutate({
            id: cancelBookingTarget.id,
            status: "CANCELLED",
            cancellationReason: cancelReason.trim() || undefined,
        })
    }

    return (
        <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard icon={CalendarClock} title={doctorText.stats.total} value={String(bookingStats.total)} />
                <StatCard icon={Activity} title={doctorText.stats.pending} value={String(bookingStats.pending)} />
                <StatCard icon={CalendarCheck2} title={doctorText.stats.confirmed} value={String(bookingStats.confirmed)} />
                <StatCard icon={UserRoundCheck} title={doctorText.stats.completed} value={String(bookingStats.completed)} />
            </div>

            <Tabs defaultValue="bookings" className="space-y-4">
                <TabsList className="grid h-auto w-full grid-cols-3 gap-1 bg-muted p-1">
                    <TabsTrigger className="py-2 data-[state=active]:bg-primary data-[state=active]:text-white" value="bookings">
                        {doctorText.tabs.bookings}
                    </TabsTrigger>
                    <TabsTrigger className="py-2 data-[state=active]:bg-primary data-[state=active]:text-white" value="schedule">
                        {doctorText.tabs.schedule}
                    </TabsTrigger>
                    <TabsTrigger className="py-2 data-[state=active]:bg-primary data-[state=active]:text-white" value="profile">
                        Hồ sơ cá nhân
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="bookings" className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <CardTitle>{doctorText.allCard.title}</CardTitle>
                                <CardDescription>{doctorText.allCard.description}</CardDescription>
                            </div>

                            <div className="w-full md:w-56">
                                <Select value={bookingFilter} onValueChange={(v) => setBookingFilter(v as BookingFilter)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={doctorText.allCard.filterPlaceholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">{doctorText.allCard.filters.all}</SelectItem>
                                        <SelectItem value="PENDING">{doctorText.allCard.filters.pending}</SelectItem>
                                        <SelectItem value="CONFIRMED">{doctorText.allCard.filters.confirmed}</SelectItem>
                                        <SelectItem value="COMPLETED">{doctorText.allCard.filters.completed}</SelectItem>
                                        <SelectItem value="CANCELLED">{doctorText.allCard.filters.cancelled}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <BookingTable
                                items={filteredBookings}
                                emptyText={doctorText.allCard.empty}
                                renderActions={(item) => (
                                    <div className="space-x-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            disabled={item.status !== "PENDING" || updateBookingStatusMutation.isPending}
                                            onClick={() =>
                                                updateBookingStatusMutation.mutate({ id: item.id, status: "CONFIRMED" })
                                            }
                                        >
                                            {doctorText.allCard.confirm}
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            disabled={item.status !== "CONFIRMED" || updateBookingStatusMutation.isPending}
                                            onClick={() =>
                                                updateBookingStatusMutation.mutate({ id: item.id, status: "COMPLETED" })
                                            }
                                        >
                                            {doctorText.allCard.complete}
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            disabled={
                                                item.status === "COMPLETED" ||
                                                item.status === "CANCELLED" ||
                                                updateBookingStatusMutation.isPending
                                            }
                                            onClick={() => requestCancelBooking(item)}
                                        >
                                            {doctorText.allCard.cancel}
                                        </Button>
                                    </div>
                                )}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="schedule">
                    <Card>
                        <CardHeader>
                            <CardTitle>{doctorText.scheduleCard.title}</CardTitle>
                            <CardDescription>
                                {doctorText.scheduleCard.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="max-w-xs space-y-2">
                                <Label>{doctorText.scheduleCard.slotDurationLabel}</Label>
                                <Input
                                    type="number"
                                    min={5}
                                    max={180}
                                    value={slotDurationMinutes}
                                    disabled
                                    readOnly
                                />
                            </div>

                            {generatedDoctorSlots.length === 0 ? (
                                <div className="rounded-lg border p-4 text-sm text-muted-foreground bg-slate-50 text-center">
                                    Clinic admin cần cấu hình lịch chuyên khoa trước khi bác sĩ chọn slot làm việc.
                                </div>
                            ) : (
                                <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-slate-50 hover:bg-slate-50">
                                                <TableHead className="w-[120px] font-semibold text-slate-900 border-r">Ngày làm việc</TableHead>
                                                {allUniqueTimeIntervals.map((interval) => (
                                                    <TableHead key={interval} className="text-center font-semibold text-slate-900 min-w-[125px]">
                                                        {interval}
                                                    </TableHead>
                                                ))}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {dayOptions.map((day) => (
                                                <TableRow key={day.value} className="hover:bg-slate-50/50">
                                                    <TableCell className="font-medium text-slate-800 border-r">{day.label}</TableCell>
                                                    {allUniqueTimeIntervals.map((interval) => {
                                                        const [startTime, endTime] = interval.split("-")
                                                        const targetKey = doctorSlotKey(day.value, startTime, endTime)
                                                        const existsInSpecialty = generatedDoctorSlots.some((s) => s.key === targetKey)
                                                        const active = selectedDoctorSlots.has(targetKey)

                                                        if (!existsInSpecialty) {
                                                            return (
                                                                <TableCell key={interval} className="text-center bg-slate-50 text-slate-300 text-xs select-none">
                                                                    -
                                                                </TableCell>
                                                            )
                                                        }

                                                        return (
                                                            <TableCell key={interval} className="text-center p-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => toggleDoctorSlot(targetKey)}
                                                                    className={`w-full rounded-md border py-1.5 px-2 text-xs font-semibold tracking-wide transition shadow-sm ${
                                                                        active
                                                                            ? "border-primary bg-primary text-white hover:bg-primary/95 hover:border-primary/95"
                                                                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                                                                    }`}
                                                                >
                                                                    {active ? "Đăng ký" : "Trống"}
                                                                </button>
                                                            </TableCell>
                                                        )
                                                    })}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}

                            {scheduleError ? (
                                <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600">
                                    {scheduleError}
                                </div>
                            ) : null}

                            <div className="flex justify-end pt-2">
                                <Button 
                                    disabled={saveScheduleMutation.isPending || !isScheduleDirty} 
                                    onClick={handleSaveSchedule}
                                    className="px-6 py-2 shadow transition"
                                >
                                    {saveScheduleMutation.isPending ? text.common.saving : doctorText.scheduleCard.save}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab 3: Hồ sơ cá nhân */}
                <TabsContent value="profile" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Cập nhật hồ sơ cá nhân</CardTitle>
                            <CardDescription>
                                Quản lý thông tin cá nhân, ảnh đại diện, số năm kinh nghiệm và tiểu sử của bạn.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {profileSuccessMsg && (
                                <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-600 flex items-center gap-2">
                                    <Check className="h-4 w-4" />
                                    {profileSuccessMsg}
                                </div>
                            )}
                            {profileErrorMsg && (
                                <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-600">
                                    {profileErrorMsg}
                                </div>
                            )}

                            <div className="grid gap-6 md:grid-cols-3">
                                {/* Left column: Avatar preview & Fixed info badges */}
                                <div className="flex flex-col items-center space-y-5 rounded-lg border bg-slate-50/50 p-6 dark:bg-slate-900/50">
                                    <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border bg-white shadow-xs dark:bg-slate-950">
                                        {profileAvatar ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={profileAvatar}
                                                alt="Avatar preview"
                                                className="h-full w-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLElement).style.display = "none"
                                                }}
                                            />
                                        ) : null}
                                        {!profileAvatar && (
                                            <div className="flex flex-col items-center space-y-2 text-muted-foreground">
                                                <ImageIcon className="h-12 w-12 stroke-1" />
                                                <span className="text-xs">Chưa có ảnh</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="w-full space-y-3">
                                        <div className="flex justify-center w-full">
                                            <ImageUpload onUploadSuccess={(url) => setProfileAvatar(url)} label="Tải ảnh lên" />
                                        </div>
                                    </div>

                                    {/* Fixed info section with premium badges */}
                                    <div className="w-full pt-4 border-t border-slate-200/60 dark:border-slate-800/60 space-y-3">
                                        <div className="space-y-1">
                                            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                                                <Mail className="h-3 w-3" />
                                                Email đăng nhập
                                            </div>
                                            <div className="text-sm font-medium truncate text-slate-800 dark:text-slate-200">
                                                {profileQuery.data?.user?.email || "Chưa có email"}
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                                                <Building2 className="h-3 w-3" />
                                                Phòng khám
                                            </div>
                                            <div>
                                                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 max-w-full text-xs truncate block py-0.5">
                                                    {profileQuery.data?.clinic?.name || "Chưa gán phòng khám"}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                                                <Stethoscope className="h-3 w-3" />
                                                Chuyên khoa
                                            </div>
                                            <div>
                                                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900 max-w-full text-xs truncate block py-0.5">
                                                    {profileQuery.data?.specialty?.name || "Chưa gán chuyên khoa"}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right column: Edit Form */}
                                <div className="space-y-4 md:col-span-2">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="doctorName" className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-primary" />
                                                Họ và tên bác sĩ
                                            </Label>
                                            <Input
                                                id="doctorName"
                                                value={profileName}
                                                onChange={(e) => setProfileName(e.target.value)}
                                                placeholder="Bác sĩ Nguyễn Văn A"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="doctorPhone" className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-primary" />
                                                Số điện thoại
                                            </Label>
                                            <Input
                                                id="doctorPhone"
                                                value={profilePhone}
                                                onChange={(e) => setProfilePhone(e.target.value)}
                                                placeholder="0123456789"
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="doctorExperience" className="flex items-center gap-2">
                                                <Award className="h-4 w-4 text-primary" />
                                                Số năm kinh nghiệm
                                            </Label>
                                            <Input
                                                id="doctorExperience"
                                                type="number"
                                                min={0}
                                                max={100}
                                                value={profileExperience}
                                                onChange={(e) => setProfileExperience(Number(e.target.value) || 0)}
                                                placeholder="5"
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="doctorBio" className="flex items-center gap-2">
                                                <Sparkles className="h-4 w-4 text-primary" />
                                                Tiểu sử / Giới thiệu
                                            </Label>
                                            <Textarea
                                                id="doctorBio"
                                                value={profileBio}
                                                onChange={(e) => setProfileBio(e.target.value)}
                                                placeholder="Giới thiệu về quá trình công tác, thành tựu, triết lý chữa bệnh..."
                                                rows={6}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <Button
                                            onClick={handleSaveProfile}
                                            disabled={updateProfileMutation.isPending || !isProfileDirty}
                                            className="min-w-[150px] shadow-sm transition-all"
                                        >
                                            {updateProfileMutation.isPending ? "Đang lưu..." : (
                                                <span className="flex items-center gap-2">
                                                    <Check className="h-4 w-4" />
                                                    Lưu thay đổi
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>

            <Dialog
                open={Boolean(cancelBookingTarget)}
                onOpenChange={(open) => {
                    if (!open) {
                        setCancelBookingTarget(null)
                        setCancelReason("")
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{doctorText.cancelDialog.title}</DialogTitle>
                        <DialogDescription>
                            {doctorText.cancelDialog.descriptionPrefix}{" "}
                            <span className="font-medium text-foreground">
                                {cancelBookingTarget?.patientName}
                            </span>
                            {doctorText.cancelDialog.descriptionSuffix}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3">
                        <div className="rounded-lg border bg-muted/30 p-3 text-sm">
                            <div>{doctorText.cancelDialog.dateLabel}: {cancelBookingTarget ? formatDate(cancelBookingTarget.bookingDate) : ""}</div>
                            <div>{doctorText.cancelDialog.timeLabel}: {cancelBookingTarget?.bookingTime}</div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="doctor-cancel-reason">{doctorText.cancelDialog.reasonLabel}</Label>
                            <Textarea
                                id="doctor-cancel-reason"
                                value={cancelReason}
                                onChange={(event) => setCancelReason(event.target.value)}
                                placeholder={doctorText.cancelDialog.reasonPlaceholder}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setCancelBookingTarget(null)
                                setCancelReason("")
                            }}
                        >
                            {doctorText.cancelDialog.back}
                        </Button>
                        <Button
                            variant="destructive"
                            disabled={updateBookingStatusMutation.isPending}
                            onClick={confirmCancelBooking}
                        >
                            {updateBookingStatusMutation.isPending ? doctorText.cancelDialog.confirming : doctorText.cancelDialog.confirm}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

function BookingTable({
    items,
    renderActions,
    emptyText,
}: Readonly<{
    items: DoctorBookingItem[]
    renderActions: (item: DoctorBookingItem) => React.ReactNode
    emptyText: string
}>) {
    if (!items.length) {
        return <div className="text-sm text-muted-foreground">{emptyText}</div>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>{text.bookingTable.patient}</TableHead>
                    <TableHead>{text.bookingTable.date}</TableHead>
                    <TableHead>{text.bookingTable.time}</TableHead>
                    <TableHead>{text.bookingTable.status}</TableHead>
                    <TableHead>{text.bookingTable.actions}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <div className="font-medium">{item.patientName}</div>
                            <div className="text-xs text-muted-foreground">{item.patientPhone}</div>
                        </TableCell>
                        <TableCell>{formatDate(item.bookingDate)}</TableCell>
                        <TableCell>{item.bookingTime}</TableCell>
                        <TableCell>
                            <Badge
                                variant="outline"
                                className={`border ${getBookingStatusClass(item.status)}`}
                            >
                                {getBookingStatusLabel(item.status)}
                            </Badge>
                        </TableCell>
                        <TableCell>{renderActions(item)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

function SystemAdminSectionV2() {
    const queryClient = useQueryClient()
    const systemText = text.systemAdminV2

    const [userRoleFilter, setUserRoleFilter] = useState<"ALL" | "PATIENT" | "DOCTOR" | "CLINIC_ADMIN">("ALL")
    const [userKeyword, setUserKeyword] = useState("")
    const [doctorName, setDoctorName] = useState("")
    const [doctorEmail, setDoctorEmail] = useState("")
    const [doctorPhone, setDoctorPhone] = useState("")
    const [doctorPassword, setDoctorPassword] = useState("")
    const [clinicAdminName, setClinicAdminName] = useState("")
    const [clinicAdminEmail, setClinicAdminEmail] = useState("")
    const [clinicAdminPhone, setClinicAdminPhone] = useState("")
    const [clinicAdminPassword, setClinicAdminPassword] = useState("")
    const [clinicAdminClinicId, setClinicAdminClinicId] = useState("")

    const [clinicName, setClinicName] = useState("")
    const [clinicAddress, setClinicAddress] = useState("")
    const [clinicDescription, setClinicDescription] = useState("")
    const [clinicPhone, setClinicPhone] = useState("")
    const [clinicEmail, setClinicEmail] = useState("")
    const [clinicWebsite, setClinicWebsite] = useState("")
    const [clinicImage, setClinicImage] = useState("")
    const [clinicOpeningHours, setClinicOpeningHours] = useState("")
    const [clinicOpen, setClinicOpen] = useState(true)
    const [clinicSpecialtyIds, setClinicSpecialtyIds] = useState<string[]>([])
    const [editingClinic, setEditingClinic] = useState<AdminClinic | null>(null)
    const [clinicDialogOpen, setClinicDialogOpen] = useState(false)

    const [editingDoctor, setEditingDoctor] = useState<AdminDoctor | null>(null)
    const [doctorDialogOpen, setDoctorDialogOpen] = useState(false)
    const [doctorEditClinicId, setDoctorEditClinicId] = useState("")
    const [doctorEditSpecialtyId, setDoctorEditSpecialtyId] = useState("")
    const [doctorEditExperience, setDoctorEditExperience] = useState("0")
    const [doctorEditAvatar, setDoctorEditAvatar] = useState("")
    const [doctorEditBio, setDoctorEditBio] = useState("")
    const [doctorEditAvailable, setDoctorEditAvailable] = useState(true)

    const [articleTitle, setArticleTitle] = useState("")
    const [articleDescription, setArticleDescription] = useState("")
    const [articleCategory, setArticleCategory] = useState<string>(ARTICLE_DEFAULTS.CATEGORY)
    const [articleReadTime, setArticleReadTime] = useState<string>(ARTICLE_DEFAULTS.READ_TIME)
    const [articleImage, setArticleImage] = useState("")
    const [editingArticleId, setEditingArticleId] = useState<string | null>(null)

    const usersQuery = useQuery({ queryKey: ["admin", "users"], queryFn: () => getAdminUsers() })
    const clinicsQuery = useQuery({ queryKey: ["admin", "clinics"], queryFn: getAdminClinics })
    const doctorsQuery = useQuery({ queryKey: ["admin", "doctors"], queryFn: getAdminDoctors })
    const articlesQuery = useQuery({ queryKey: ARTICLE_QUERY_KEYS.ADMIN, queryFn: getAdminArticles })
    const specialtiesQuery = useQuery({ queryKey: ["specialties"], queryFn: getSpecialties })

    const users = useMemo(() => {
        const keyword = userKeyword.trim().toLowerCase()
        return (usersQuery.data?.items ?? [])
            .filter((user) => normalizeRole(user.role) !== "ADMIN")
            .filter((user) => userRoleFilter === "ALL" || user.role === userRoleFilter)
            .filter((user) => {
                if (!keyword) return true
                return [user.name, user.email, user.phone ?? ""].some((value) =>
                    value.toLowerCase().includes(keyword),
                )
            })
    }, [usersQuery.data?.items, userKeyword, userRoleFilter])

    const clinics = clinicsQuery.data?.items ?? []
    const doctors = doctorsQuery.data?.items ?? []
    const articles = articlesQuery.data?.items ?? []
    const specialties = specialtiesQuery.data ?? []

    const clinicSpecialtyOptions = clinics.find((clinic) => clinic.id === doctorEditClinicId)?.specialties ?? []

    const createUserMutation = useMutation({
        mutationFn: createAdminUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "users"] })
            setDoctorName("")
            setDoctorEmail("")
            setDoctorPhone("")
            setDoctorPassword("")
            setClinicAdminName("")
            setClinicAdminEmail("")
            setClinicAdminPhone("")
            setClinicAdminPassword("")
            setClinicAdminClinicId("")
        },
    })

    const updateUserMutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof updateAdminUser>[1] }) =>
            updateAdminUser(id, payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "users"] }),
    })

    const deleteUserMutation = useMutation({
        mutationFn: deleteAdminUser,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "users"] }),
    })

    const createClinicMutation = useMutation({
        mutationFn: createAdminClinic,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "clinics"] })
            closeClinicDialog()
        },
    })

    const updateClinicMutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof updateAdminClinic>[1] }) =>
            updateAdminClinic(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "clinics"] })
            queryClient.invalidateQueries({ queryKey: ["admin", "doctors"] })
            closeClinicDialog()
        },
    })

    const deleteClinicMutation = useMutation({
        mutationFn: deleteAdminClinic,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "clinics"] })
            queryClient.invalidateQueries({ queryKey: ["admin", "doctors"] })
        },
    })

    const createDoctorMutation = useMutation({
        mutationFn: createAdminDoctor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "doctors"] })
            queryClient.invalidateQueries({ queryKey: ["admin", "users"] })
            closeDoctorDialog()
        },
    })

    const updateDoctorMutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof updateAdminDoctor>[1] }) =>
            updateAdminDoctor(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "doctors"] })
            closeDoctorDialog()
        },
    })

    const deleteDoctorMutation = useMutation({
        mutationFn: deleteAdminDoctor,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "doctors"] }),
    })

    const toggleDoctorAvailabilityMutation = useMutation({
        mutationFn: ({ id, isAvailable }: { id: string; isAvailable: boolean }) =>
            updateAdminDoctor(id, { isAvailable }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "doctors"] }),
    })

    const createArticleMutation = useMutation({
        mutationFn: createAdminArticle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ARTICLE_QUERY_KEYS.ADMIN })
            resetArticleForm()
        },
    })

    const updateArticleMutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof updateAdminArticle>[1] }) =>
            updateAdminArticle(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ARTICLE_QUERY_KEYS.ADMIN })
            resetArticleForm()
        },
    })

    const deleteArticleMutation = useMutation({
        mutationFn: deleteAdminArticle,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ARTICLE_QUERY_KEYS.ADMIN }),
    })

    function toggleClinicSpecialty(id: string) {
        setClinicSpecialtyIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
        )
    }

    function resetClinicCreateForm() {
        setClinicName("")
        setClinicAddress("")
        setClinicDescription("")
        setClinicPhone("")
        setClinicEmail("")
        setClinicWebsite("")
        setClinicImage("")
        setClinicOpeningHours("")
        setClinicOpen(true)
        setClinicSpecialtyIds([])
    }

    function openCreateClinicDialog() {
        setEditingClinic(null)
        resetClinicCreateForm()
        setClinicDialogOpen(true)
    }

    function openClinicDialog(clinic: AdminClinic) {
        setEditingClinic(clinic)
        setClinicName(clinic.name)
        setClinicAddress(clinic.address)
        setClinicDescription(clinic.description ?? "")
        setClinicPhone(clinic.phone ?? "")
        setClinicEmail(clinic.email ?? "")
        setClinicWebsite(clinic.website ?? "")
        setClinicImage(clinic.image ?? "")
        setClinicOpeningHours(clinic.openingHours ?? "")
        setClinicOpen(clinic.isOpen)
        setClinicSpecialtyIds(clinic.specialties?.map((item) => item.id) ?? [])
        setClinicDialogOpen(true)
    }

    function closeClinicDialog() {
        setEditingClinic(null)
        setClinicDialogOpen(false)
        resetClinicCreateForm()
    }

    function getClinicPayload() {
        return {
            name: clinicName.trim(),
            address: clinicAddress.trim(),
            description: clinicDescription.trim() || undefined,
            phone: clinicPhone.trim() || undefined,
            email: clinicEmail.trim() || undefined,
            website: clinicWebsite.trim() || undefined,
            image: clinicImage.trim() || undefined,
            openingHours: clinicOpeningHours.trim() || undefined,
            isOpen: clinicOpen,
            specialtyIds: clinicSpecialtyIds,
        }
    }

    const isClinicChanged = Boolean(
        editingClinic &&
        JSON.stringify(getClinicPayload()) !==
        JSON.stringify({
            name: editingClinic.name,
            address: editingClinic.address,
            description: editingClinic.description || undefined,
            phone: editingClinic.phone || undefined,
            email: editingClinic.email || undefined,
            website: editingClinic.website || undefined,
            image: editingClinic.image || undefined,
            openingHours: editingClinic.openingHours || undefined,
            isOpen: editingClinic.isOpen,
            specialtyIds: editingClinic.specialties?.map((item) => item.id) ?? [],
        }),
    )

    function openDoctorDialog(doctor: AdminDoctor) {
        setEditingDoctor(doctor)
        setDoctorName(doctor.name)
        setDoctorEmail(doctor.user?.email ?? "")
        setDoctorPhone(doctor.user?.phone ?? "")
        setDoctorPassword("")
        setDoctorEditClinicId(doctor.clinic.id)
        setDoctorEditSpecialtyId(doctor.specialty.id)
        setDoctorEditExperience(String(doctor.experience ?? 0))
        setDoctorEditAvatar(doctor.avatar ?? "")
        setDoctorEditBio(doctor.bio ?? "")
        setDoctorEditAvailable(doctor.isAvailable)
        setDoctorDialogOpen(true)
    }

    function openCreateDoctorDialog() {
        setEditingDoctor(null)
        setDoctorName("")
        setDoctorEmail("")
        setDoctorPhone("")
        setDoctorPassword("")
        setDoctorEditClinicId("")
        setDoctorEditSpecialtyId("")
        setDoctorEditExperience("0")
        setDoctorEditAvatar("")
        setDoctorEditBio("")
        setDoctorEditAvailable(true)
        setDoctorDialogOpen(true)
    }

    function closeDoctorDialog() {
        setEditingDoctor(null)
        setDoctorDialogOpen(false)
        setDoctorName("")
        setDoctorEmail("")
        setDoctorPhone("")
        setDoctorPassword("")
        setDoctorEditClinicId("")
        setDoctorEditSpecialtyId("")
        setDoctorEditExperience("0")
        setDoctorEditAvatar("")
        setDoctorEditBio("")
        setDoctorEditAvailable(true)
    }

    const doctorPayload = {
        name: doctorName.trim(),
        clinicId: doctorEditClinicId,
        specialtyId: doctorEditSpecialtyId,
        experience: Number(doctorEditExperience) || 0,
        avatar: doctorEditAvatar.trim() || undefined,
        bio: doctorEditBio.trim() || undefined,
        isAvailable: doctorEditAvailable,
    }

    const isDoctorChanged = Boolean(
        editingDoctor &&
        JSON.stringify(doctorPayload) !==
        JSON.stringify({
            clinicId: editingDoctor.clinic.id,
            specialtyId: editingDoctor.specialty.id,
            name: editingDoctor.name,
            experience: editingDoctor.experience ?? 0,
            avatar: editingDoctor.avatar || undefined,
            bio: editingDoctor.bio || undefined,
            isAvailable: editingDoctor.isAvailable,
        }),
    )

    function resetArticleForm() {
        setEditingArticleId(null)
        setArticleTitle("")
        setArticleDescription("")
        setArticleCategory(ARTICLE_DEFAULTS.CATEGORY)
        setArticleReadTime(ARTICLE_DEFAULTS.READ_TIME)
        setArticleImage("")
    }

    function fillArticleForm(article: AdminArticle) {
        setEditingArticleId(article.id)
        setArticleTitle(article.title)
        setArticleDescription(article.description)
        setArticleCategory(article.category)
        setArticleReadTime(article.readTime)
        setArticleImage(article.image ?? "")
    }

    const canCreateDoctorAccount = Boolean(
        doctorName.trim() && doctorEmail.trim() && doctorPassword && doctorEditClinicId && doctorEditSpecialtyId,
    )
    const canCreateClinic = Boolean(clinicName.trim() && clinicAddress.trim())
    const canUpdateClinic = Boolean(canCreateClinic && isClinicChanged)
    const canUpdateDoctor = Boolean(editingDoctor && doctorName.trim() && doctorEditClinicId && doctorEditSpecialtyId && isDoctorChanged)

    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatCard icon={Users} title={systemText.stats.users} value={String(users.length)} />
                <StatCard icon={Stethoscope} title={systemText.stats.doctors} value={String(users.filter((user) => user.role === "DOCTOR").length)} />
                <StatCard icon={Building2} title={systemText.stats.openClinics} value={String(clinics.filter((clinic) => clinic.isOpen).length)} />
                <StatCard icon={Newspaper} title={systemText.stats.articles} value={String(articles.length)} />
            </div>

            <Tabs defaultValue="users" className="space-y-4">
                <TabsList className="grid h-auto w-full grid-cols-2 gap-1 bg-muted p-1 md:grid-cols-5">
                    <TabsTrigger value="users" className="py-2 data-[state=active]:bg-primary data-[state=active]:text-white">{systemText.tabs.users}</TabsTrigger>
                    <TabsTrigger value="clinics" className="py-2 data-[state=active]:bg-primary data-[state=active]:text-white">{systemText.tabs.clinics}</TabsTrigger>
                    <TabsTrigger value="doctors" className="py-2 data-[state=active]:bg-primary data-[state=active]:text-white">{systemText.tabs.doctors}</TabsTrigger>
                    <TabsTrigger value="packages" className="py-2 data-[state=active]:bg-primary data-[state=active]:text-white">{systemText.tabs.packages}</TabsTrigger>
                    <TabsTrigger value="news" className="py-2 data-[state=active]:bg-primary data-[state=active]:text-white">{systemText.tabs.news}</TabsTrigger>
                </TabsList>

                <TabsContent value="users" className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <CardTitle>{systemText.users.listTitle}</CardTitle>
                            </div>
                            <div className="flex flex-col gap-2 md:flex-row">
                                <Input value={userKeyword} onChange={(event) => setUserKeyword(event.target.value)} placeholder={systemText.users.searchPlaceholder} />
                                <Select value={userRoleFilter} onValueChange={(value) => setUserRoleFilter(value as "ALL" | "PATIENT" | "DOCTOR" | "CLINIC_ADMIN")}>
                                    <SelectTrigger className="md:w-44"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">{systemText.users.roleFilters.all}</SelectItem>
                                        <SelectItem value="PATIENT">{systemText.users.roleFilters.patient}</SelectItem>
                                        <SelectItem value="DOCTOR">{systemText.users.roleFilters.doctor}</SelectItem>
                                        <SelectItem value="CLINIC_ADMIN">{systemText.users.roleFilters.clinicAdmin}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{systemText.users.headers.name}</TableHead>
                                        <TableHead>{systemText.users.headers.email}</TableHead>
                                        <TableHead>{systemText.users.headers.phone}</TableHead>
                                        <TableHead>{systemText.users.headers.role}</TableHead>
                                        <TableHead>{systemText.users.headers.status}</TableHead>
                                        <TableHead>{systemText.users.headers.actions}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.phone || "-"}</TableCell>
                                            <TableCell><Badge variant="outline">{getRoleLabel(user.role)}</Badge></TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={user.isActive ? "border-emerald-200 bg-emerald-100 text-emerald-700" : "border-slate-200 bg-slate-100 text-slate-700"}>
                                                    {user.isActive ? systemText.users.status.active : systemText.users.status.locked}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="space-x-2">
                                                <Button size="sm" variant="outline" onClick={() => updateUserMutation.mutate({ id: user.id, payload: { isActive: !user.isActive } })}>
                                                    {user.isActive ? systemText.users.actions.lock : systemText.users.actions.unlock}
                                                </Button>
                                                <Button size="sm" variant="destructive" onClick={() => deleteUserMutation.mutate(user.id)}>
                                                    {systemText.users.actions.delete}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="clinics" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{systemText.users.title}</CardTitle>
                            <CardDescription>{systemText.users.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-3 md:grid-cols-3">
                            <Input value={clinicAdminName} onChange={(event) => setClinicAdminName(event.target.value)} placeholder={systemText.users.placeholders.name} />
                            <Input value={clinicAdminEmail} onChange={(event) => setClinicAdminEmail(event.target.value)} placeholder={systemText.users.placeholders.email} />
                            <Input value={clinicAdminPhone} onChange={(event) => setClinicAdminPhone(event.target.value)} placeholder={systemText.users.placeholders.phone} />
                            <Input value={clinicAdminPassword} onChange={(event) => setClinicAdminPassword(event.target.value)} placeholder={systemText.users.placeholders.password} type="password" />
                            <Select value={clinicAdminClinicId} onValueChange={setClinicAdminClinicId}>
                                <SelectTrigger>
                                    <SelectValue placeholder={systemText.users.selectClinicPlaceholder} />
                                </SelectTrigger>
                                <SelectContent>
                                    {clinics.map((clinic) => (
                                        <SelectItem key={clinic.id} value={clinic.id}>
                                            {clinic.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button
                                disabled={!clinicAdminName || !clinicAdminEmail || !clinicAdminPassword || !clinicAdminClinicId || createUserMutation.isPending}
                                onClick={() => createUserMutation.mutate({
                                    name: clinicAdminName,
                                    email: clinicAdminEmail,
                                    phone: clinicAdminPhone || undefined,
                                    password: clinicAdminPassword,
                                    role: "CLINIC_ADMIN",
                                    clinicId: clinicAdminClinicId,
                                })}
                            >
                                {systemText.users.createButton}
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <CardTitle>{systemText.clinics.listTitle}</CardTitle>
                                <CardDescription>{systemText.clinics.listDescription}</CardDescription>
                            </div>
                            <Button onClick={openCreateClinicDialog}>{systemText.clinics.addButton}</Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{systemText.clinics.headers.clinic}</TableHead>
                                        <TableHead>{systemText.clinics.headers.specialty}</TableHead>
                                        <TableHead>{systemText.clinics.headers.contact}</TableHead>
                                        <TableHead>{systemText.clinics.headers.status}</TableHead>
                                        <TableHead>{systemText.clinics.headers.actions}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {clinics.map((clinic) => (
                                        <TableRow key={clinic.id}>
                                            <TableCell>
                                                <div className="font-medium">{clinic.name}</div>
                                                <div className="text-xs text-muted-foreground">{clinic.address}</div>
                                            </TableCell>
                                            <TableCell>{clinic.specialties?.map((item) => item.name).join(", ") || systemText.clinics.specialtyFallback}</TableCell>
                                            <TableCell>{clinic.phone || clinic.email || "-"}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={clinic.isOpen ? "border-emerald-200 bg-emerald-100 text-emerald-700" : "border-slate-200 bg-slate-100 text-slate-700"}>
                                                    {clinic.isOpen ? systemText.clinics.status.open : systemText.clinics.status.closed}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="space-x-2">
                                                <Button size="sm" variant="outline" onClick={() => openClinicDialog(clinic)}>{text.common.edit}</Button>
                                                <Button size="sm" variant="destructive" onClick={() => deleteClinicMutation.mutate(clinic.id)}>{text.common.delete}</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="doctors" className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <CardTitle>{systemText.doctors.listTitle}</CardTitle>
                                <CardDescription>{systemText.doctors.listDescription}</CardDescription>
                            </div>
                            <Button onClick={openCreateDoctorDialog}>{systemText.doctors.addButton}</Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{systemText.doctors.headers.avatar}</TableHead>
                                        <TableHead>{systemText.doctors.headers.doctor}</TableHead>
                                        <TableHead>{systemText.doctors.headers.clinic}</TableHead>
                                        <TableHead>{systemText.doctors.headers.specialty}</TableHead>
                                        <TableHead>{systemText.doctors.headers.experience}</TableHead>
                                        <TableHead>{systemText.doctors.headers.status}</TableHead>
                                        <TableHead>{systemText.doctors.headers.actions}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {doctors.map((doctor) => (
                                        <TableRow key={doctor.id}>
                                            <TableCell>
                                                {doctor.avatar ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={doctor.avatar} alt={doctor.name} className="h-12 w-12 rounded-full object-cover" />
                                                ) : (
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-slate-50 text-slate-400">
                                                        <Stethoscope className="h-4 w-4" />
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{doctor.name}</div>
                                                <div className="text-xs text-muted-foreground">{doctor.user?.email || systemText.doctors.accountFallback}</div>
                                            </TableCell>
                                            <TableCell>{doctor.clinic.name}</TableCell>
                                            <TableCell>{doctor.specialty.name}</TableCell>
                                            <TableCell>{doctor.experience} {systemText.doctors.experienceSuffix}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={doctor.isAvailable ? "border-emerald-200 bg-emerald-100 text-emerald-700" : "border-slate-200 bg-slate-100 text-slate-700"}>
                                                    {doctor.isAvailable ? systemText.doctors.status.available : systemText.doctors.status.off}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="space-x-2">
                                                <Button size="sm" variant="outline" onClick={() => openDoctorDialog(doctor)}>{systemText.doctors.actions.edit}</Button>
                                                <Button size="sm" variant="outline" onClick={() => toggleDoctorAvailabilityMutation.mutate({ id: doctor.id, isAvailable: !doctor.isAvailable })}>
                                                    {doctor.isAvailable ? systemText.doctors.actions.disable : systemText.doctors.actions.enable}
                                                </Button>
                                                <Button size="sm" variant="destructive" onClick={() => deleteDoctorMutation.mutate(doctor.id)}>{systemText.doctors.actions.delete}</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="packages" className="space-y-4">
                    <PackageAdminPanel />
                </TabsContent>

                <TabsContent value="news" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{editingArticleId ? systemText.news.titleUpdate : systemText.news.titleCreate}</CardTitle>
                            <CardDescription>{systemText.news.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2 md:grid-cols-2">
                                <Input value={articleTitle} onChange={(event) => setArticleTitle(event.target.value)} placeholder={systemText.news.placeholders.title} />
                                <Input value={articleCategory} onChange={(event) => setArticleCategory(event.target.value)} placeholder={systemText.news.placeholders.category} />
                                <Input value={articleReadTime} onChange={(event) => setArticleReadTime(event.target.value)} placeholder={systemText.news.placeholders.readTime} />
                                <div className="flex gap-2 items-center">
                                    <ImageUpload onUploadSuccess={(url) => setArticleImage(url)} label="Tải ảnh bìa" />
                                    {articleImage && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={articleImage} alt="Article Preview" className="h-9 w-9 object-cover rounded-md border" />
                                    )}
                                </div>
                            </div>
                            <Textarea value={articleDescription} onChange={(event) => setArticleDescription(event.target.value)} placeholder={systemText.news.placeholders.description} />
                            <div className="flex gap-2">
                                <Button
                                    disabled={(!editingArticleId && createArticleMutation.isPending) || Boolean(editingArticleId && updateArticleMutation.isPending) || !articleTitle || !articleDescription}
                                    onClick={() => {
                                        const payload = { title: articleTitle, description: articleDescription, category: articleCategory, readTime: articleReadTime, image: articleImage || undefined }
                                        if (editingArticleId) updateArticleMutation.mutate({ id: editingArticleId, payload })
                                        else createArticleMutation.mutate(payload)
                                    }}
                                >
                                    {editingArticleId ? systemText.news.updateButton : systemText.news.createButton}
                                </Button>
                                {editingArticleId ? <Button variant="outline" onClick={resetArticleForm}>{text.common.cancelEdit}</Button> : null}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>{systemText.news.listTitle}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{systemText.news.headers.title}</TableHead>
                                        <TableHead>{systemText.news.headers.category}</TableHead>
                                        <TableHead>{systemText.news.headers.readTime}</TableHead>
                                        <TableHead>{systemText.news.headers.actions}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {articles.map((article) => (
                                        <TableRow key={article.id}>
                                            <TableCell className="font-medium">{article.title}</TableCell>
                                            <TableCell>{article.category}</TableCell>
                                            <TableCell>{article.readTime}</TableCell>
                                            <TableCell className="space-x-2">
                                                <Button size="sm" variant="outline" onClick={() => fillArticleForm(article)}>{text.common.edit}</Button>
                                                <Button size="sm" variant="destructive" onClick={() => deleteArticleMutation.mutate(article.id)}>{text.common.delete}</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Dialog open={clinicDialogOpen} onOpenChange={(open) => !open && closeClinicDialog()}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>{editingClinic ? systemText.clinicDialog.titleUpdate : systemText.clinicDialog.titleCreate}</DialogTitle>
                        <DialogDescription>{systemText.clinicDialog.description}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>{systemText.clinicDialog.labels.name}</Label>
                                <Input value={clinicName} onChange={(event) => setClinicName(event.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>{systemText.clinicDialog.labels.address}</Label>
                                <Input value={clinicAddress} onChange={(event) => setClinicAddress(event.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>{systemText.clinicDialog.labels.phone}</Label>
                                <Input value={clinicPhone} onChange={(event) => setClinicPhone(event.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>{systemText.clinicDialog.labels.email}</Label>
                                <Input value={clinicEmail} onChange={(event) => setClinicEmail(event.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>{systemText.clinicDialog.labels.website}</Label>
                                <Input value={clinicWebsite} onChange={(event) => setClinicWebsite(event.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>{systemText.clinicDialog.labels.openingHours}</Label>
                                <Input value={clinicOpeningHours} onChange={(event) => setClinicOpeningHours(event.target.value)} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>{systemText.clinicDialog.labels.image}</Label>
                                <div className="flex gap-2 items-center">
                                    <ImageUpload onUploadSuccess={(url) => setClinicImage(url)} label="Tải ảnh phòng khám" />
                                    {clinicImage && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={clinicImage} alt="Clinic Preview" className="h-9 w-9 object-cover rounded-md border" />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>{systemText.clinicDialog.labels.description}</Label>
                            <Textarea value={clinicDescription} onChange={(event) => setClinicDescription(event.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>{systemText.clinicDialog.labels.specialty}</Label>
                            <div className="flex flex-wrap gap-2">
                                {specialties.map((specialty) => (
                                    <label key={specialty.id} className="flex cursor-pointer items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm">
                                        <input type="checkbox" checked={clinicSpecialtyIds.includes(specialty.id)} onChange={() => toggleClinicSpecialty(specialty.id)} />
                                        {specialty.name}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Switch checked={clinicOpen} onCheckedChange={setClinicOpen} />
                            <Label>{systemText.clinicDialog.labels.open}</Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={closeClinicDialog}>{text.common.close}</Button>
                        {editingClinic ? (
                            <Button disabled={updateClinicMutation.isPending || !canUpdateClinic} onClick={() => updateClinicMutation.mutate({ id: editingClinic.id, payload: getClinicPayload() })}>
                                {updateClinicMutation.isPending ? text.common.updating : text.common.update}
                            </Button>
                        ) : (
                            <Button disabled={createClinicMutation.isPending || !canCreateClinic} onClick={() => createClinicMutation.mutate(getClinicPayload())}>
                                {createClinicMutation.isPending ? text.common.adding : systemText.clinicDialog.buttons.create}
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={doctorDialogOpen} onOpenChange={(open) => !open && closeDoctorDialog()}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>{editingDoctor ? systemText.doctorDialog.titleUpdate : systemText.doctorDialog.titleCreate}</DialogTitle>
                        <DialogDescription>{systemText.doctorDialog.description}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-5">
                        <div className="space-y-3">
                            <div className="text-sm font-medium">{systemText.doctorDialog.sections.account}</div>
                            <div className="grid gap-3 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>{systemText.doctorDialog.labels.name}</Label>
                                    <Input value={doctorName} onChange={(event) => setDoctorName(event.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>{systemText.doctorDialog.labels.email}</Label>
                                    <Input value={doctorEmail} onChange={(event) => setDoctorEmail(event.target.value)} disabled={Boolean(editingDoctor)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>{systemText.doctorDialog.labels.phone}</Label>
                                    <Input value={doctorPhone} onChange={(event) => setDoctorPhone(event.target.value)} disabled={Boolean(editingDoctor)} />
                                </div>
                                {!editingDoctor ? (
                                    <div className="space-y-2">
                                        <Label>{systemText.doctorDialog.labels.password}</Label>
                                        <Input value={doctorPassword} onChange={(event) => setDoctorPassword(event.target.value)} type="password" />
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="text-sm font-medium">{systemText.doctorDialog.sections.profile}</div>
                            <div className="grid gap-3 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>{systemText.doctorDialog.labels.clinic}</Label>
                                    <Select value={doctorEditClinicId} onValueChange={(value) => { setDoctorEditClinicId(value); setDoctorEditSpecialtyId("") }}>
                                        <SelectTrigger><SelectValue placeholder={systemText.doctorDialog.placeholders.clinic} /></SelectTrigger>
                                        <SelectContent>{clinics.map((clinic) => <SelectItem key={clinic.id} value={clinic.id}>{clinic.name}</SelectItem>)}</SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>{systemText.doctorDialog.labels.specialty}</Label>
                                    <Select value={doctorEditSpecialtyId} onValueChange={setDoctorEditSpecialtyId} disabled={!doctorEditClinicId}>
                                        <SelectTrigger><SelectValue placeholder={systemText.doctorDialog.placeholders.specialty} /></SelectTrigger>
                                        <SelectContent>{clinicSpecialtyOptions.map((specialty) => <SelectItem key={specialty.id} value={specialty.id}>{specialty.name}</SelectItem>)}</SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>{systemText.doctorDialog.labels.experience}</Label>
                                    <Input type="number" min={0} value={doctorEditExperience} onChange={(event) => setDoctorEditExperience(event.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>{systemText.doctorDialog.labels.avatar}</Label>
                                    <div className="flex gap-2 items-center">
                                        <ImageUpload onUploadSuccess={(url) => setDoctorEditAvatar(url)} label="Tải ảnh bác sĩ" />
                                        {doctorEditAvatar && (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={doctorEditAvatar} alt="Doctor Preview" className="h-9 w-9 object-cover rounded-md border" />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>{systemText.doctorDialog.labels.bio}</Label>
                                <Textarea value={doctorEditBio} onChange={(event) => setDoctorEditBio(event.target.value)} />
                            </div>
                            <div className="flex items-center gap-2">
                                <Switch checked={doctorEditAvailable} onCheckedChange={setDoctorEditAvailable} />
                                <Label>{systemText.doctorDialog.labels.available}</Label>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={closeDoctorDialog}>{text.common.close}</Button>
                        {editingDoctor ? (
                            <Button disabled={updateDoctorMutation.isPending || !canUpdateDoctor} onClick={() => updateDoctorMutation.mutate({ id: editingDoctor.id, payload: doctorPayload })}>
                                {updateDoctorMutation.isPending ? text.common.updating : text.common.update}
                            </Button>
                        ) : (
                            <Button
                                disabled={createDoctorMutation.isPending || !canCreateDoctorAccount}
                                onClick={() => createDoctorMutation.mutate({
                                    ...doctorPayload,
                                    email: doctorEmail.trim(),
                                    phone: doctorPhone.trim() || undefined,
                                    password: doctorPassword,
                                })}
                            >
                                {createDoctorMutation.isPending ? systemText.doctorDialog.createPending : systemText.doctorDialog.buttons.create}
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

function SystemAdminSection() { // NOSONAR
    const queryClient = useQueryClient()
    const legacyText = text.systemAdminLegacy
    const systemText = text.systemAdminV2

    const [userRoleFilter, setUserRoleFilter] = useState<RoleFilter>("ALL")
    const [userKeyword, setUserKeyword] = useState("")

    const usersQuery = useQuery({
        queryKey: ["admin", "users", userRoleFilter],
        queryFn: () => (userRoleFilter === "ALL" ? getAdminUsers() : getAdminUsers(userRoleFilter)),
    })

    const clinicsQuery = useQuery({
        queryKey: ["admin", "clinics"],
        queryFn: getAdminClinics,
    })

    const doctorsQuery = useQuery({
        queryKey: ["admin", "doctors"],
        queryFn: getAdminDoctors,
    })

    const articlesQuery = useQuery({
        queryKey: ARTICLE_QUERY_KEYS.ADMIN,
        queryFn: getAdminArticles,
    })

    const doctorUsersQuery = useQuery({
        queryKey: ["admin", "users", "doctor-only"],
        queryFn: () => getAdminUsers("DOCTOR"),
    })

    const specialtiesQuery = useQuery({
        queryKey: ["specialties"],
        queryFn: getSpecialties,
    })

    const users = usersQuery.data?.items ?? []
    const clinics = clinicsQuery.data?.items ?? []
    const doctors = doctorsQuery.data?.items ?? []
    const articles = articlesQuery.data?.items ?? []
    const doctorUsers = doctorUsersQuery.data?.items ?? []
    const specialties = (specialtiesQuery.data ?? []) as SpecialtyOption[]

    const filteredUsers = useMemo(() => {
        const keyword = userKeyword.trim().toLowerCase()
        if (!keyword) {
            return users
        }
        return users.filter((user) =>
            `${user.name} ${user.email} ${user.phone || ""}`.toLowerCase().includes(keyword),
        )
    }, [users, userKeyword])

    const [doctorAccountName, setDoctorAccountName] = useState("")
    const [doctorAccountEmail, setDoctorAccountEmail] = useState("")
    const [doctorAccountPhone, setDoctorAccountPhone] = useState("")
    const [doctorAccountPassword, setDoctorAccountPassword] = useState("")

    const [editingClinicId, setEditingClinicId] = useState<string | null>(null)
    const [clinicName, setClinicName] = useState("")
    const [clinicAddress, setClinicAddress] = useState("")
    const [clinicPhone, setClinicPhone] = useState("")
    const [clinicEmail, setClinicEmail] = useState("")
    const [clinicWebsite, setClinicWebsite] = useState("")
    const [clinicImage, setClinicImage] = useState("")
    const [clinicOpeningHours, setClinicOpeningHours] = useState("08:00 - 17:00")
    const [clinicDescription, setClinicDescription] = useState("")
    const [clinicIsOpen, setClinicIsOpen] = useState(true)

    const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null)
    const [doctorName, setDoctorName] = useState("")
    const [doctorUserId, setDoctorUserId] = useState("")
    const [doctorClinicId, setDoctorClinicId] = useState("")
    const [doctorSpecialtyId, setDoctorSpecialtyId] = useState("")
    const [doctorExperience, setDoctorExperience] = useState(0)
    const [doctorAvatar, setDoctorAvatar] = useState("")
    const [doctorBio, setDoctorBio] = useState("")
    const [doctorAvailable, setDoctorAvailable] = useState(true)

    const [editingArticleId, setEditingArticleId] = useState<string | null>(null)
    const [articleTitle, setArticleTitle] = useState("")
    const [articleCategory, setArticleCategory] = useState<string>(ARTICLE_DEFAULTS.CATEGORY)
    const [articleReadTime, setArticleReadTime] = useState<string>(ARTICLE_DEFAULTS.READ_TIME)
    const [articleImage, setArticleImage] = useState("")
    const [articleDescription, setArticleDescription] = useState("")

    const createUserMutation = useMutation({
        mutationFn: createAdminUser,
        onSuccess: () => {
            setDoctorAccountName("")
            setDoctorAccountEmail("")
            setDoctorAccountPhone("")
            setDoctorAccountPassword("")
            queryClient.invalidateQueries({ queryKey: ["admin", "users"] })
        },
    })

    const deleteUserMutation = useMutation({
        mutationFn: deleteAdminUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "users"] })
        },
    })

    const toggleUserActiveMutation = useMutation({
        mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
            updateAdminUser(id, { isActive }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "users"] })
        },
    })

    const createClinicMutation = useMutation({
        mutationFn: createAdminClinic,
        onSuccess: () => {
            resetClinicForm()
            queryClient.invalidateQueries({ queryKey: ["admin", "clinics"] })
        },
    })

    const updateClinicMutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof updateAdminClinic>[1] }) =>
            updateAdminClinic(id, payload),
        onSuccess: () => {
            resetClinicForm()
            queryClient.invalidateQueries({ queryKey: ["admin", "clinics"] })
        },
    })

    const deleteClinicMutation = useMutation({
        mutationFn: deleteAdminClinic,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "clinics"] })
        },
    })

    const createDoctorMutation = useMutation({
        mutationFn: createAdminDoctor,
        onSuccess: () => {
            resetDoctorForm()
            queryClient.invalidateQueries({ queryKey: ["admin", "doctors"] })
            queryClient.invalidateQueries({ queryKey: ["admin", "users"] })
        },
    })

    const updateDoctorMutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof updateAdminDoctor>[1] }) =>
            updateAdminDoctor(id, payload),
        onSuccess: () => {
            resetDoctorForm()
            queryClient.invalidateQueries({ queryKey: ["admin", "doctors"] })
        },
    })

    const deleteDoctorMutation = useMutation({
        mutationFn: deleteAdminDoctor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "doctors"] })
        },
    })

    const toggleDoctorAvailabilityMutation = useMutation({
        mutationFn: ({ id, isAvailable }: { id: string; isAvailable: boolean }) =>
            updateAdminDoctor(id, { isAvailable }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "doctors"] })
        },
    })

    const createArticleMutation = useMutation({
        mutationFn: createAdminArticle,
        onSuccess: () => {
            resetArticleForm()
            queryClient.invalidateQueries({ queryKey: ARTICLE_QUERY_KEYS.ADMIN })
        },
    })

    const updateArticleMutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof updateAdminArticle>[1] }) =>
            updateAdminArticle(id, payload),
        onSuccess: () => {
            resetArticleForm()
            queryClient.invalidateQueries({ queryKey: ARTICLE_QUERY_KEYS.ADMIN })
        },
    })

    const deleteArticleMutation = useMutation({
        mutationFn: deleteAdminArticle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ARTICLE_QUERY_KEYS.ADMIN })
        },
    })

    function resetClinicForm() {
        setEditingClinicId(null)
        setClinicName("")
        setClinicAddress("")
        setClinicPhone("")
        setClinicEmail("")
        setClinicWebsite("")
        setClinicImage("")
        setClinicOpeningHours("08:00 - 17:00")
        setClinicDescription("")
        setClinicIsOpen(true)
    }

    function resetDoctorForm() {
        setEditingDoctorId(null)
        setDoctorName("")
        setDoctorUserId("")
        setDoctorClinicId("")
        setDoctorSpecialtyId("")
        setDoctorExperience(0)
        setDoctorAvatar("")
        setDoctorBio("")
        setDoctorAvailable(true)
    }

    function resetArticleForm() {
        setEditingArticleId(null)
        setArticleTitle("")
        setArticleCategory(ARTICLE_DEFAULTS.CATEGORY)
        setArticleReadTime(ARTICLE_DEFAULTS.READ_TIME)
        setArticleImage("")
        setArticleDescription("")
    }

    function fillClinicForm(clinic: AdminClinic) {
        setEditingClinicId(clinic.id)
        setClinicName(clinic.name)
        setClinicAddress(clinic.address)
        setClinicPhone(clinic.phone || "")
        setClinicEmail(clinic.email || "")
        setClinicWebsite(clinic.website || "")
        setClinicImage(clinic.image || "")
        setClinicOpeningHours(clinic.openingHours || "08:00 - 17:00")
        setClinicDescription(clinic.description || "")
        setClinicIsOpen(clinic.isOpen)
    }

    function fillDoctorForm(doctor: AdminDoctor) {
        setEditingDoctorId(doctor.id)
        setDoctorName(doctor.name)
        setDoctorUserId(doctor.user?.id || "")
        setDoctorClinicId(doctor.clinic.id)
        setDoctorSpecialtyId(doctor.specialty.id)
        setDoctorExperience(doctor.experience)
        setDoctorAvatar(doctor.avatar || "")
        setDoctorBio(doctor.bio || "")
        setDoctorAvailable(doctor.isAvailable)
    }

    function fillArticleForm(article: AdminArticle) {
        setEditingArticleId(article.id)
        setArticleTitle(article.title)
        setArticleCategory(article.category)
        setArticleReadTime(article.readTime)
        setArticleImage(article.image || "")
        setArticleDescription(article.description)
    }

    const totalDoctors = users.filter((user) => user.role === "DOCTOR").length
    const openClinics = clinics.filter((clinic) => clinic.isOpen).length

    let clinicSubmitLabel: string = systemText.clinicDialog.buttons.create
    if (editingClinicId) {
        clinicSubmitLabel = updateClinicMutation.isPending ? text.common.updating : legacyText.clinics.titleUpdate
    } else if (createClinicMutation.isPending) {
        clinicSubmitLabel = text.common.adding
    }

    let doctorSubmitLabel: string = legacyText.doctors.submitCreate
    if (editingDoctorId) {
        doctorSubmitLabel = updateDoctorMutation.isPending ? text.common.updating : legacyText.doctors.submitUpdate
    } else if (createDoctorMutation.isPending) {
        doctorSubmitLabel = text.common.adding
    }

    let articleSubmitLabel: string = systemText.news.createButton
    if (editingArticleId) {
        articleSubmitLabel = updateArticleMutation.isPending ? text.common.updating : systemText.news.updateButton
    } else if (createArticleMutation.isPending) {
        articleSubmitLabel = text.common.adding
    }

    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatCard icon={Users} title={legacyText.stats.totalUsers} value={String(users.length)} />
                <StatCard icon={Stethoscope} title={legacyText.stats.doctors} value={String(totalDoctors)} />
                <StatCard icon={Building2} title={legacyText.stats.openClinics} value={String(openClinics)} />
                <StatCard icon={Newspaper} title={legacyText.stats.articles} value={String(articles.length)} />
            </div>

            <Tabs defaultValue="users" className="space-y-4">
                <TabsList className="grid h-auto w-full grid-cols-4 gap-1 bg-muted p-1">
                    <TabsTrigger className="py-2 data-[state=active]:bg-primary data-[state=active]:text-white" value="users">
                        {legacyText.tabs.users}
                    </TabsTrigger>
                    <TabsTrigger className="py-2 data-[state=active]:bg-primary data-[state=active]:text-white" value="clinics">
                        {legacyText.tabs.clinics}
                    </TabsTrigger>
                    <TabsTrigger className="py-2 data-[state=active]:bg-primary data-[state=active]:text-white" value="doctors">
                        {legacyText.tabs.doctors}
                    </TabsTrigger>
                    <TabsTrigger className="py-2 data-[state=active]:bg-primary data-[state=active]:text-white" value="news">
                        {legacyText.tabs.news}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="users" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{legacyText.users.createDoctorTitle}</CardTitle>
                            <CardDescription>
                                {legacyText.users.createDoctorDescription}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2 md:grid-cols-4">
                                <Input
                                    value={doctorAccountName}
                                    onChange={(e) => setDoctorAccountName(e.target.value)}
                                    placeholder={systemText.doctorDialog.labels.name}
                                />
                                <Input
                                    value={doctorAccountEmail}
                                    onChange={(e) => setDoctorAccountEmail(e.target.value)}
                                    placeholder={systemText.doctorDialog.labels.email}
                                />
                                <Input
                                    value={doctorAccountPhone}
                                    onChange={(e) => setDoctorAccountPhone(e.target.value)}
                                    placeholder={systemText.doctorDialog.labels.phone}
                                />
                                <Input
                                    type="password"
                                    value={doctorAccountPassword}
                                    onChange={(e) => setDoctorAccountPassword(e.target.value)}
                                    placeholder={systemText.doctorDialog.labels.password}
                                />
                            </div>

                            <Button
                                disabled={
                                    createUserMutation.isPending ||
                                    !doctorAccountName ||
                                    !doctorAccountEmail ||
                                    !doctorAccountPassword
                                }
                                onClick={() =>
                                    createUserMutation.mutate({
                                        name: doctorAccountName,
                                        email: doctorAccountEmail,
                                        phone: doctorAccountPhone || undefined,
                                        password: doctorAccountPassword,
                                        role: "DOCTOR",
                                    })
                                }
                            >
                                {createUserMutation.isPending ? systemText.doctorDialog.createPending : legacyText.users.createDoctorButton}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <CardTitle>{systemText.users.listTitle}</CardTitle>
                                <CardDescription>{legacyText.users.listDescription}</CardDescription>
                            </div>

                            <div className="grid w-full gap-2 md:w-[420px] md:grid-cols-2">
                                <Input
                                    value={userKeyword}
                                    onChange={(e) => setUserKeyword(e.target.value)}
                                    placeholder={systemText.users.searchPlaceholder}
                                />
                                <Select value={userRoleFilter} onValueChange={(v) => setUserRoleFilter(v as RoleFilter)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={legacyText.users.filterPlaceholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">{legacyText.users.roleFilters.all}</SelectItem>
                                        <SelectItem value="DOCTOR">{legacyText.users.roleFilters.doctor}</SelectItem>
                                        <SelectItem value="PATIENT">{legacyText.users.roleFilters.patient}</SelectItem>
                                        <SelectItem value="ADMIN">{legacyText.users.roleFilters.admin}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{systemText.users.headers.name}</TableHead>
                                        <TableHead>{systemText.users.headers.email}</TableHead>
                                        <TableHead>{systemText.users.headers.phone}</TableHead>
                                        <TableHead>{systemText.users.headers.role}</TableHead>
                                        <TableHead>{systemText.users.headers.status}</TableHead>
                                        <TableHead>{systemText.users.headers.actions}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                                                {legacyText.users.empty}
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredUsers.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell className="font-medium">{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.phone || "-"}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{getRoleLabel(user.role)}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            user.isActive
                                                                ? "border-emerald-200 bg-emerald-100 text-emerald-700"
                                                                : "border-rose-200 bg-rose-100 text-rose-700"
                                                        }
                                                    >
                                                        {user.isActive ? systemText.users.status.active : systemText.users.status.locked}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            toggleUserActiveMutation.mutate({
                                                                id: user.id,
                                                                isActive: !user.isActive,
                                                            })
                                                        }
                                                    >
                                                        {user.isActive ? systemText.users.actions.lock : systemText.users.actions.unlock}
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => deleteUserMutation.mutate(user.id)}
                                                    >
                                                        {systemText.users.actions.delete}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="clinics" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {editingClinicId ? legacyText.clinics.titleUpdate : legacyText.clinics.titleCreate}
                            </CardTitle>
                            <CardDescription>
                                {legacyText.clinics.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2 md:grid-cols-2">
                                <Input
                                    value={clinicName}
                                    onChange={(e) => setClinicName(e.target.value)}
                                    placeholder={legacyText.clinics.placeholders.name}
                                />
                                <Input
                                    value={clinicAddress}
                                    onChange={(e) => setClinicAddress(e.target.value)}
                                    placeholder={legacyText.clinics.placeholders.address}
                                />
                                <Input
                                    value={clinicPhone}
                                    onChange={(e) => setClinicPhone(e.target.value)}
                                    placeholder={legacyText.clinics.placeholders.phone}
                                />
                                <Input
                                    value={clinicEmail}
                                    onChange={(e) => setClinicEmail(e.target.value)}
                                    placeholder={legacyText.clinics.placeholders.email}
                                />
                                <Input
                                    value={clinicWebsite}
                                    onChange={(e) => setClinicWebsite(e.target.value)}
                                    placeholder={legacyText.clinics.placeholders.website}
                                />
                                <Input
                                    value={clinicOpeningHours}
                                    onChange={(e) => setClinicOpeningHours(e.target.value)}
                                    placeholder={legacyText.clinics.placeholders.openingHours}
                                />
                                <Input
                                    value={clinicImage}
                                    onChange={(e) => setClinicImage(e.target.value)}
                                    placeholder={legacyText.clinics.placeholders.image}
                                />
                                <div className="flex items-center gap-2 rounded-md border px-3">
                                    <Switch checked={clinicIsOpen} onCheckedChange={setClinicIsOpen} />
                                    <span className="text-sm">{legacyText.clinics.openLabel}</span>
                                </div>
                            </div>

                            <Textarea
                                value={clinicDescription}
                                onChange={(e) => setClinicDescription(e.target.value)}
                                placeholder={legacyText.clinics.placeholders.description}
                            />

                            <div className="flex flex-wrap gap-2">
                                <Button
                                    disabled={
                                        (!editingClinicId && createClinicMutation.isPending) ||
                                        (editingClinicId !== null && updateClinicMutation.isPending) ||
                                        !clinicName ||
                                        !clinicAddress
                                    }
                                    onClick={() => {
                                        const payload = {
                                            name: clinicName,
                                            address: clinicAddress,
                                            description: clinicDescription || undefined,
                                            phone: clinicPhone || undefined,
                                            email: clinicEmail || undefined,
                                            website: clinicWebsite || undefined,
                                            image: clinicImage || undefined,
                                            openingHours: clinicOpeningHours || undefined,
                                            isOpen: clinicIsOpen,
                                        }

                                        if (editingClinicId) {
                                            updateClinicMutation.mutate({ id: editingClinicId, payload })
                                            return
                                        }

                                        createClinicMutation.mutate(payload)
                                    }}
                                >
                                    {clinicSubmitLabel}
                                </Button>

                                {editingClinicId ? (
                                    <Button variant="outline" onClick={resetClinicForm}>
                                        {text.common.cancelEdit}
                                    </Button>
                                ) : null}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{systemText.clinics.listTitle}</CardTitle>
                            <CardDescription>
                                {legacyText.clinics.listDescription}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{legacyText.clinics.headers.avatar}</TableHead>
                                        <TableHead>{legacyText.clinics.headers.name}</TableHead>
                                        <TableHead>{legacyText.clinics.headers.contact}</TableHead>
                                        <TableHead>{legacyText.clinics.headers.hours}</TableHead>
                                        <TableHead>{legacyText.clinics.headers.status}</TableHead>
                                        <TableHead>{legacyText.clinics.headers.actions}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {clinics.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                                                {legacyText.clinics.empty}
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        clinics.map((clinic) => (
                                            <TableRow key={clinic.id}>
                                                <TableCell>
                                                    {clinic.image ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img
                                                            src={clinic.image}
                                                            alt={clinic.name}
                                                            className="h-12 w-12 rounded-md object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-12 w-12 items-center justify-center rounded-md border bg-slate-50 text-slate-400">
                                                            <ImageIcon className="h-4 w-4" />
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-medium">{clinic.name}</div>
                                                    <div className="text-xs text-muted-foreground">{clinic.address}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">{clinic.phone || "-"}</div>
                                                    <div className="text-xs text-muted-foreground">{clinic.email || "-"}</div>
                                                </TableCell>
                                                <TableCell>{clinic.openingHours || "-"}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            clinic.isOpen
                                                                ? "border-emerald-200 bg-emerald-100 text-emerald-700"
                                                                : "border-slate-200 bg-slate-100 text-slate-700"
                                                        }
                                                    >
                                                        {clinic.isOpen ? systemText.clinics.status.open : legacyText.clinics.toggleClose}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="space-x-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => fillClinicForm(clinic)}
                                                    >
                                                        {text.common.edit}
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() =>
                                                            updateClinicMutation.mutate({
                                                                id: clinic.id,
                                                                payload: { isOpen: !clinic.isOpen },
                                                            })
                                                        }
                                                    >
                                                        {clinic.isOpen ? legacyText.clinics.toggleClose : legacyText.clinics.toggleOpen}
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => deleteClinicMutation.mutate(clinic.id)}
                                                    >
                                                        {text.common.delete}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="doctors" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{editingDoctorId ? legacyText.doctors.titleUpdate : legacyText.doctors.titleCreate}</CardTitle>
                            <CardDescription>
                                {legacyText.doctors.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2 md:grid-cols-2">
                                <Input
                                    value={doctorName}
                                    onChange={(e) => setDoctorName(e.target.value)}
                                    placeholder={legacyText.doctors.placeholders.name}
                                />

                                <Select value={doctorUserId} onValueChange={setDoctorUserId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={legacyText.doctors.placeholders.linkAccount} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {doctorUsers.map((user) => (
                                            <SelectItem key={user.id} value={user.id}>
                                                {user.email}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={doctorClinicId} onValueChange={setDoctorClinicId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={legacyText.doctors.placeholders.clinic} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clinics.map((clinic) => (
                                            <SelectItem key={clinic.id} value={clinic.id}>
                                                {clinic.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={doctorSpecialtyId} onValueChange={setDoctorSpecialtyId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={legacyText.doctors.placeholders.specialty} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {specialties.map((specialty) => (
                                            <SelectItem key={specialty.id} value={specialty.id}>
                                                {specialty.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Input
                                    type="number"
                                    min={0}
                                    value={doctorExperience}
                                    onChange={(e) => setDoctorExperience(Number(e.target.value) || 0)}
                                    placeholder={legacyText.doctors.placeholders.experience}
                                />

                                <Input
                                    value={doctorAvatar}
                                    onChange={(e) => setDoctorAvatar(e.target.value)}
                                    placeholder={legacyText.doctors.placeholders.avatar}
                                />
                            </div>

                            <Textarea
                                value={doctorBio}
                                onChange={(e) => setDoctorBio(e.target.value)}
                                placeholder={legacyText.doctors.placeholders.bio}
                            />

                            <div className="flex items-center gap-2">
                                <Switch checked={doctorAvailable} onCheckedChange={setDoctorAvailable} />
                                <span className="text-sm">{legacyText.doctors.availableLabel}</span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Button
                                    disabled={
                                        (!editingDoctorId && createDoctorMutation.isPending) ||
                                        (editingDoctorId !== null && updateDoctorMutation.isPending) ||
                                        !doctorName ||
                                        !doctorClinicId ||
                                        !doctorSpecialtyId
                                    }
                                    onClick={() => {
                                        const payload = {
                                            name: doctorName,
                                            userId: doctorUserId || undefined,
                                            clinicId: doctorClinicId,
                                            specialtyId: doctorSpecialtyId,
                                            experience: doctorExperience,
                                            avatar: doctorAvatar || undefined,
                                            bio: doctorBio || undefined,
                                            isAvailable: doctorAvailable,
                                        }

                                        if (editingDoctorId) {
                                            updateDoctorMutation.mutate({ id: editingDoctorId, payload })
                                            return
                                        }

                                        createDoctorMutation.mutate(payload)
                                    }}
                                >
                                    {doctorSubmitLabel}
                                </Button>

                                {editingDoctorId ? (
                                    <Button variant="outline" onClick={resetDoctorForm}>
                                        {text.common.cancelEdit}
                                    </Button>
                                ) : null}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{systemText.doctors.listTitle}</CardTitle>
                            <CardDescription>{legacyText.doctors.listDescription}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{systemText.doctors.headers.avatar}</TableHead>
                                        <TableHead>{systemText.doctors.headers.doctor}</TableHead>
                                        <TableHead>{systemText.doctors.headers.clinic}</TableHead>
                                        <TableHead>{systemText.doctors.headers.specialty}</TableHead>
                                        <TableHead>{systemText.doctors.headers.experience}</TableHead>
                                        <TableHead>{systemText.doctors.headers.status}</TableHead>
                                        <TableHead>{systemText.doctors.headers.actions}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {doctors.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                                                {legacyText.doctors.empty}
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        doctors.map((doctor) => (
                                            <TableRow key={doctor.id}>
                                                <TableCell>
                                                    {doctor.avatar ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img
                                                            src={doctor.avatar}
                                                            alt={doctor.name}
                                                            className="h-12 w-12 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-slate-50 text-slate-400">
                                                            <Stethoscope className="h-4 w-4" />
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-medium">{doctor.name}</div>
                                                    <div className="text-xs text-muted-foreground">{doctor.user?.email || systemText.doctors.accountFallback}</div>
                                                </TableCell>
                                                <TableCell>{doctor.clinic.name}</TableCell>
                                                <TableCell>{doctor.specialty.name}</TableCell>
                                                <TableCell>{doctor.experience} {systemText.doctors.experienceSuffix}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            doctor.isAvailable
                                                                ? "border-emerald-200 bg-emerald-100 text-emerald-700"
                                                                : "border-slate-200 bg-slate-100 text-slate-700"
                                                        }
                                                    >
                                                        {doctor.isAvailable ? systemText.doctors.status.available : systemText.doctors.status.off}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="space-x-2">
                                                    <Button size="sm" variant="outline" onClick={() => fillDoctorForm(doctor)}>
                                                        {systemText.doctors.actions.edit}
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() =>
                                                            toggleDoctorAvailabilityMutation.mutate({
                                                                id: doctor.id,
                                                                isAvailable: !doctor.isAvailable,
                                                            })
                                                        }
                                                    >
                                                        {doctor.isAvailable ? systemText.doctors.actions.disable : systemText.doctors.actions.enable}
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => deleteDoctorMutation.mutate(doctor.id)}
                                                    >
                                                        {systemText.doctors.actions.delete}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="news" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{editingArticleId ? systemText.news.titleUpdate : systemText.news.titleCreate}</CardTitle>
                            <CardDescription>
                                {legacyText.news.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2 md:grid-cols-2">
                                <Input
                                    value={articleTitle}
                                    onChange={(e) => setArticleTitle(e.target.value)}
                                    placeholder={systemText.news.placeholders.title}
                                />
                                <Input
                                    value={articleCategory}
                                    onChange={(e) => setArticleCategory(e.target.value)}
                                    placeholder={systemText.news.placeholders.category}
                                />
                                <Input
                                    value={articleReadTime}
                                    onChange={(e) => setArticleReadTime(e.target.value)}
                                    placeholder={legacyText.news.placeholders.readTime}
                                />
                                <Input
                                    value={articleImage}
                                    onChange={(e) => setArticleImage(e.target.value)}
                                    placeholder={legacyText.news.placeholders.image}
                                />
                            </div>

                            <Textarea
                                value={articleDescription}
                                onChange={(e) => setArticleDescription(e.target.value)}
                                placeholder={systemText.news.placeholders.description}
                            />

                            <div className="flex flex-wrap gap-2">
                                <Button
                                    disabled={
                                        (!editingArticleId && createArticleMutation.isPending) ||
                                        (editingArticleId !== null && updateArticleMutation.isPending) ||
                                        !articleTitle ||
                                        !articleDescription
                                    }
                                    onClick={() => {
                                        const payload = {
                                            title: articleTitle,
                                            description: articleDescription,
                                            category: articleCategory || undefined,
                                            readTime: articleReadTime || undefined,
                                            image: articleImage || undefined,
                                        }

                                        if (editingArticleId) {
                                            updateArticleMutation.mutate({ id: editingArticleId, payload })
                                            return
                                        }

                                        createArticleMutation.mutate(payload)
                                    }}
                                >
                                    {articleSubmitLabel}
                                </Button>

                                {editingArticleId ? (
                                    <Button variant="outline" onClick={resetArticleForm}>
                                        {text.common.cancelEdit}
                                    </Button>
                                ) : null}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{systemText.news.listTitle}</CardTitle>
                            <CardDescription>{systemText.news.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{systemText.doctors.headers.avatar}</TableHead>
                                        <TableHead>{systemText.news.headers.title}</TableHead>
                                        <TableHead>{systemText.news.headers.category}</TableHead>
                                        <TableHead>{systemText.news.headers.readTime}</TableHead>
                                        <TableHead>{legacyText.news.headers.publishedAt}</TableHead>
                                        <TableHead>{systemText.news.headers.actions}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {articles.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                                                {legacyText.news.empty}
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        articles.map((article) => (
                                            <TableRow key={article.id}>
                                                <TableCell>
                                                    {article.image ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img
                                                            src={article.image}
                                                            alt={article.title}
                                                            className="h-12 w-16 rounded-md object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-12 w-16 items-center justify-center rounded-md border bg-slate-50 text-slate-400">
                                                            <Newspaper className="h-4 w-4" />
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell className="font-medium">{article.title}</TableCell>
                                                <TableCell>{article.category}</TableCell>
                                                <TableCell>{article.readTime}</TableCell>
                                                <TableCell>{formatDate(article.publishedAt)}</TableCell>
                                                <TableCell className="space-x-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => fillArticleForm(article)}
                                                    >
                                                        {text.common.edit}
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => deleteArticleMutation.mutate(article.id)}
                                                    >
                                                        {text.common.delete}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                    <CardTitle>{legacyText.summary.title}</CardTitle>
                    <CardDescription>
                        {legacyText.summary.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border bg-white p-4">
                        <p className="mb-1 text-sm font-semibold">{legacyText.summary.steps.accountTitle}</p>
                        <p className="text-sm text-muted-foreground">
                            {legacyText.summary.steps.accountDescription}
                        </p>
                    </div>
                    <div className="rounded-lg border bg-white p-4">
                        <p className="mb-1 text-sm font-semibold">{legacyText.summary.steps.profileTitle}</p>
                        <p className="text-sm text-muted-foreground">
                            {legacyText.summary.steps.profileDescription}
                        </p>
                    </div>
                    <div className="rounded-lg border bg-white p-4">
                        <p className="mb-1 text-sm font-semibold">{legacyText.summary.steps.workflowTitle}</p>
                        <p className="text-sm text-muted-foreground">
                            {legacyText.summary.steps.workflowDescription}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function StatCard({
    icon: Icon,
    title,
    value,
}: Readonly<{
    icon: typeof Users
    title: string
    value: string
}>) {
    return (
        <Card className="border-primary/15 bg-white shadow-sm">
            <CardContent className="flex items-center justify-between py-4">
                <div>
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className="text-2xl font-semibold text-slate-800">{value}</p>
                </div>
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Icon className="h-5 w-5" />
                </div>
            </CardContent>
        </Card>
    )
}
