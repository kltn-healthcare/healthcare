"use client"

import { useEffect, useMemo, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
    Activity,
    Building2,
    CalendarCheck2,
    CalendarClock,
    ImageIcon,
    Stethoscope,
    UserRoundCheck,
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
import { TabsContent } from "@/shared/ui/tabs"
import { AdminTabs } from "./AdminTabs"
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
import { ImageUpload } from "@/components"
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
} from "../api/doctor-admin.api"
import { ADMIN_DAY_OPTIONS, ADMIN_TEXT } from "@/app/admin/admin.constants"

type BookingFilter = "ALL" | DoctorBookingStatus

type WeeklyScheduleRow = {
    dayOfWeek: number
    enabled: boolean
    startTime: string
    endTime: string
}

type GeneratedDoctorSlot = {
    key: string
    dayOfWeek: number
    startTime: string
    endTime: string
}

const dayOptions = ADMIN_DAY_OPTIONS
const text = ADMIN_TEXT

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

function doctorSlotKey(dayOfWeek: number, startTime: string, endTime: string) {
    return `${dayOfWeek}-${startTime}-${endTime}`
}

type TimeMinutes = number

function adminTimeToMinutes(value: string): TimeMinutes {
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

export function DoctorAdminSection() {
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
            setProfileSuccessMsg(doctorText.profile.successMessage)
            setProfileErrorMsg(null)
            setTimeout(() => setProfileSuccessMsg(null), 5000)
        },
        onError: (error: any) => {
            setProfileErrorMsg(error?.response?.data?.message || doctorText.profile.errorMessage)
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

    const initialSelectedSlots = useMemo(() => {
        if (!settingsQuery.data?.settings) return new Set<string>()
        const schedules = settingsQuery.data.settings.specialtySchedules ?? []
        return workingHoursToSelectedSlots(
            settingsQuery.data.settings.workingHours,
            generateDoctorSlots(schedules)
        )
    }, [settingsQuery.data?.settings])

    const isScheduleDirty = useMemo(() => {
        if (!settingsQuery.data?.settings) return false
        if (initialSelectedSlots.size !== selectedDoctorSlots.size) return true
        for (const key of selectedDoctorSlots) {
            if (!initialSelectedSlots.has(key)) return true
        }
        return false
    }, [initialSelectedSlots, selectedDoctorSlots, settingsQuery.data?.settings])

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

            <AdminTabs 
                defaultValue="bookings" 
                tabs={[
                    { value: "bookings", label: doctorText.tabs.bookings },
                    { value: "schedule", label: doctorText.tabs.schedule },
                    { value: "profile", label: doctorText.profile.tabTitle }
                ]}
            >
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
                                renderReceipt={(item) => (
                                    (item as any).paymentReceiptUrl ? (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="border-blue-200 text-blue-600 hover:bg-blue-50"
                                            onClick={() => window.open((item as any).paymentReceiptUrl, '_blank')}
                                            title="Xem biên lai"
                                        >
                                            Biên lai
                                        </Button>
                                    ) : null
                                )}
                                renderActions={(item) => (
                                    <div className="space-x-2 flex items-center">
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

                <TabsContent value="profile" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{doctorText.profile.title}</CardTitle>
                            <CardDescription>
                                {doctorText.profile.description}
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
                                                <span className="text-xs">{doctorText.profile.noImage}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="w-full space-y-3">
                                        <div className="flex justify-center w-full">
                                            <ImageUpload onUploadSuccess={(url) => setProfileAvatar(url)} label={doctorText.profile.uploadLabel} />
                                        </div>
                                    </div>

                                    {/* Fixed info section with premium badges */}
                                    <div className="w-full pt-4 border-t border-slate-200/60 dark:border-slate-800/60 space-y-3">
                                        <div className="space-y-1">
                                            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                                                <Mail className="h-3 w-3" />
                                                {doctorText.profile.emailLabel}
                                            </div>
                                            <div className="text-sm font-medium truncate text-slate-800 dark:text-slate-200">
                                                {profileQuery.data?.user?.email || doctorText.profile.noEmail}
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                                                <Building2 className="h-3 w-3" />
                                                {doctorText.profile.clinicLabel}
                                            </div>
                                            <div>
                                                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 max-w-full text-xs truncate block py-0.5">
                                                    {profileQuery.data?.clinic?.name || doctorText.profile.noClinic}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                                                <Stethoscope className="h-3 w-3" />
                                                {doctorText.profile.specialtyLabel}
                                            </div>
                                            <div>
                                                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900 max-w-full text-xs truncate block py-0.5">
                                                    {profileQuery.data?.specialty?.name || doctorText.profile.noSpecialty}
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
                                                {doctorText.profile.nameLabel}
                                            </Label>
                                            <Input
                                                id="doctorName"
                                                value={profileName}
                                                onChange={(e) => setProfileName(e.target.value)}
                                                placeholder={doctorText.profile.namePlaceholder}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="doctorPhone" className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-primary" />
                                                {doctorText.profile.phoneLabel}
                                            </Label>
                                            <Input
                                                id="doctorPhone"
                                                value={profilePhone}
                                                onChange={(e) => setProfilePhone(e.target.value)}
                                                placeholder={doctorText.profile.phonePlaceholder}
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="doctorExperience" className="flex items-center gap-2">
                                                <Award className="h-4 w-4 text-primary" />
                                                {doctorText.profile.experienceLabel}
                                            </Label>
                                            <Input
                                                id="doctorExperience"
                                                type="number"
                                                min={0}
                                                max={100}
                                                value={profileExperience}
                                                onChange={(e) => setProfileExperience(Number(e.target.value) || 0)}
                                                placeholder={doctorText.profile.experiencePlaceholder}
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="doctorBio" className="flex items-center gap-2">
                                                <Sparkles className="h-4 w-4 text-primary" />
                                                {doctorText.profile.bioLabel}
                                            </Label>
                                            <Textarea
                                                id="doctorBio"
                                                value={profileBio}
                                                onChange={(e) => setProfileBio(e.target.value)}
                                                placeholder={doctorText.profile.bioPlaceholder}
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
                                            {updateProfileMutation.isPending ? doctorText.profile.savingButton : (
                                                <span className="flex items-center gap-2">
                                                    <Check className="h-4 w-4" />
                                                    {doctorText.profile.saveButton}
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </AdminTabs>

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
    renderReceipt,
    emptyText,
}: Readonly<{
    items: DoctorBookingItem[]
    renderActions: (item: DoctorBookingItem) => React.ReactNode
    renderReceipt?: (item: DoctorBookingItem) => React.ReactNode
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
                    <TableHead>Biên lai</TableHead>
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
                        <TableCell>{renderReceipt ? renderReceipt(item) : null}</TableCell>
                        <TableCell>{renderActions(item)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

function StatCard({
    icon: Icon,
    title,
    value,
}: Readonly<{
    icon: React.ComponentType<{ className?: string }>
    title: string
    value: string
}>) {
    return (
        <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    )
}
