"use client"

import { useEffect, useMemo, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
    getClinicAdminBookings,
    getClinicAdminProfile,
    patchClinicAdminBookingStatus,
    patchClinicPackage,
    postClinicPackage,
    putClinicWorkingHours,
    putPackageAvailability,
    putSpecialtySchedules,
    patchClinicAdminProfile,
    type ClinicAdminBookingStatus,
    type ClinicWorkingHour,
    type PackageAvailabilityRow,
    type SpecialtyScheduleRow,
} from "../api/clinic-admin.api"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Switch } from "@/shared/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { ADMIN_DAY_OPTIONS, ADMIN_TEXT } from "@/app/admin/admin.constants"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Textarea } from "@/shared/ui/textarea"
import { Building, Phone, Mail, Globe, Clock, FileText, Image as ImageIcon, MapPin, Check, CalendarClock, Activity, CalendarCheck2, UserRoundCheck } from "lucide-react"
import { ImageUpload } from "@/components"


const dayOptions = ADMIN_DAY_OPTIONS

function defaultClinicHours(): ClinicWorkingHour[] {
    return dayOptions.map((day) => ({
        dayOfWeek: day.value,
        isOpen: day.value >= 1 && day.value <= 6,
        startTime: "08:00",
        endTime: "17:00",
    }))
}

function defaultPackageAvailability(): PackageAvailabilityRow[] {
    return dayOptions.map((day) => ({
        dayOfWeek: day.value,
        isActive: day.value >= 1 && day.value <= 6,
        startTime: "08:00",
        endTime: "11:30",
        slotDurationMinutes: 30,
        capacity: 3,
    }))
}

function defaultSpecialtySchedules(slotDurationMinutes = 30): SpecialtyScheduleRow[] {
    return dayOptions.flatMap((day) => [
        {
            dayOfWeek: day.value,
            isActive: day.value >= 1 && day.value <= 6,
            startTime: "08:00",
            endTime: "11:30",
            slotDurationMinutes,
            capacity: 1,
        },
        {
            dayOfWeek: day.value,
            isActive: day.value >= 1 && day.value <= 6,
            startTime: "14:00",
            endTime: "17:00",
            slotDurationMinutes,
            capacity: 1,
        },
    ])
}

function formatDate(value: string) {
    return new Date(value).toLocaleDateString("vi-VN")
}

type BookingFilter = "ALL" | ClinicAdminBookingStatus

function getBookingStatusLabel(status: ClinicAdminBookingStatus) {
    switch (status) {
        case "PENDING":
            return ADMIN_TEXT.bookingStatus.pending
        case "CONFIRMED":
            return ADMIN_TEXT.bookingStatus.confirmed
        case "COMPLETED":
            return ADMIN_TEXT.bookingStatus.completed
        case "CANCELLED":
            return ADMIN_TEXT.bookingStatus.cancelled
        default:
            return status
    }
}

function getBookingStatusClass(status: ClinicAdminBookingStatus) {
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

const timelineStart = 0
const timelineEnd = 24 * 60
const clinicStepMinutes = 30

function buildTimelineSlots(stepMinutes: number) {
    const total = (timelineEnd - timelineStart) / stepMinutes
    return Array.from({ length: total }, (_, index) => timelineStart + index * stepMinutes)
}

function buildTimelineGridTemplate(stepMinutes: number) {
    const slots = buildTimelineSlots(stepMinutes)
    const minCellWidth = stepMinutes >= 60 ? 44 : 22
    return {
        slots,
        gridTemplate: `92px repeat(${slots.length}, minmax(${minCellWidth}px, 1fr))`,
    }
}

function minutesToTime(total: number) {
    return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`
}

function timeToMinutes(value: string) {
    const [hour, minute] = value.split(":").map(Number)
    return hour * 60 + minute
}

function slotKey(dayOfWeek: number, minute: number) {
    return `${dayOfWeek}-${minute}`
}

function buildBlockOffsets(blockSizeMinutes: number, stepMinutes: number) {
    const steps = Math.max(1, Math.round(blockSizeMinutes / stepMinutes))
    return Array.from({ length: steps }, (_, index) => index * stepMinutes)
}

function buildDisabledSpecialtySlots(slotDurationMinutes: number, clinicSlots: Set<string>) {
    const slots = buildTimelineSlots(slotDurationMinutes)
    const offsets = buildBlockOffsets(slotDurationMinutes, clinicStepMinutes)
    const disabled = new Set<string>()

    for (const day of dayOptions) {
        for (const minute of slots) {
            let isWithinClinic = true
            for (const offset of offsets) {
                if (!clinicSlots.has(slotKey(day.value, minute + offset))) {
                    isWithinClinic = false
                    break
                }
            }
            if (!isWithinClinic) {
                disabled.add(slotKey(day.value, minute))
            }
        }
    }

    return disabled
}

function buildClinicWorkingHours(next: Set<string>, prev: ClinicWorkingHour[]) {
    const prevByDay = new Map(prev.map((row) => [row.dayOfWeek, row]))
    const slots = buildTimelineSlots(clinicStepMinutes)
    return dayOptions.map((day) => {
        const selectedMinutes: number[] = []
        for (const minute of slots) {
            if (next.has(slotKey(day.value, minute))) {
                selectedMinutes.push(minute)
            }
        }
        const first = selectedMinutes[0]
        const last = selectedMinutes.at(-1)
        const current = prevByDay.get(day.value)
        if (selectedMinutes.length > 0 && first !== undefined && last !== undefined) {
            return {
                dayOfWeek: day.value,
                isOpen: true,
                startTime: minutesToTime(first),
                endTime: minutesToTime(last + clinicStepMinutes),
            }
        }
        return {
            dayOfWeek: day.value,
            isOpen: false,
            startTime: current?.startTime ?? "08:00",
            endTime: current?.endTime ?? "17:00",
        }
    })
}

function schedulesToSelectedKeys(
    rows: Array<{ dayOfWeek: number; isActive?: boolean; startTime: string; endTime: string }>,
    stepMinutes = clinicStepMinutes,
) {
    const selected = new Set<string>()
    const slots = buildTimelineSlots(stepMinutes)
    rows.filter((row) => row.isActive !== false).forEach((row) => {
        const start = timeToMinutes(row.startTime)
        const end = timeToMinutes(row.endTime)
        slots.forEach((minute) => {
            if (minute >= start && minute + stepMinutes <= end) {
                selected.add(slotKey(row.dayOfWeek, minute))
            }
        })
    })
    return selected
}

function selectedKeysToSchedules(
    selected: Set<string>,
    slotDurationMinutes: number,
    capacity: number,
    stepMinutes = clinicStepMinutes,
): SpecialtyScheduleRow[] {
    const slots = buildTimelineSlots(stepMinutes)
    return dayOptions.flatMap((day) => {
        const selectedMinutes = slots.filter((minute) => selected.has(slotKey(day.value, minute)))
        const ranges: SpecialtyScheduleRow[] = []
        let rangeStart: number | null = null
        let previous: number | null = null

        selectedMinutes.forEach((minute) => {
            if (rangeStart === null) {
                rangeStart = minute
                previous = minute
                return
            }
            if (previous !== null && minute === previous + stepMinutes) {
                previous = minute
                return
            }
            ranges.push({
                dayOfWeek: day.value,
                isActive: true,
                startTime: minutesToTime(rangeStart),
                endTime: minutesToTime((previous ?? rangeStart) + stepMinutes),
                slotDurationMinutes,
                capacity,
            })
            rangeStart = minute
            previous = minute
        })

        if (rangeStart !== null) {
            ranges.push({
                dayOfWeek: day.value,
                isActive: true,
                startTime: minutesToTime(rangeStart),
                endTime: minutesToTime((previous ?? rangeStart) + stepMinutes),
                slotDurationMinutes,
                capacity,
            })
        }

        return ranges
    })
}

function TimelineHeader({
    slots,
    gridTemplate,
}: Readonly<{ slots: number[]; gridTemplate: string }>) {
    return (
        <div className="grid text-[11px] text-muted-foreground" style={{ gridTemplateColumns: gridTemplate }}>
            <div />
            {slots.map((minute) => (
                <div key={minute} className="border-l px-1 py-1">
                    {minute % 60 === 0 ? minutesToTime(minute) : ""}
                </div>
            ))}
        </div>
    )
}

function MultiRangeTimeline({
    selected,
    onChange,
    disabledKeys,
    stepMinutes = clinicStepMinutes,
}: Readonly<{
    selected: Set<string>
    onChange: (next: Set<string>) => void
    disabledKeys?: Set<string>
    stepMinutes?: number
}>) {
    const [dragMode, setDragMode] = useState<"select" | "clear" | null>(null)
    const { slots, gridTemplate } = useMemo(() => buildTimelineGridTemplate(stepMinutes), [stepMinutes])

    useEffect(() => {
        if (!dragMode) return
        const handlePointerUp = () => setDragMode(null)
        globalThis.addEventListener("mouseup", handlePointerUp)
        globalThis.addEventListener("touchend", handlePointerUp)
        return () => {
            globalThis.removeEventListener("mouseup", handlePointerUp)
            globalThis.removeEventListener("touchend", handlePointerUp)
        }
    }, [dragMode])

    function apply(dayOfWeek: number, minute: number, mode: "select" | "clear") {
        const key = slotKey(dayOfWeek, minute)
        if (mode === "select" && disabledKeys?.has(key)) return
        const next = new Set(selected)
        if (mode === "select") next.add(key)
        else next.delete(key)
        onChange(next)
    }

    return (
        <div className="overflow-x-auto rounded-lg border bg-white">
            <TimelineHeader slots={slots} gridTemplate={gridTemplate} />
            {dayOptions.map((day) => (
                <div key={day.value} className="grid border-t" style={{ gridTemplateColumns: gridTemplate }}>
                    <div className="px-3 py-2 text-sm font-medium">{day.label}</div>
                    {slots.map((minute) => {
                        const key = slotKey(day.value, minute)
                        const active = selected.has(key)
                        const disabled = disabledKeys?.has(key)
                        let cellClass = "h-8 border-l border-slate-200 bg-white hover:bg-primary/10"
                        if (active) {
                            cellClass = "h-8 border-l border-slate-200 bg-primary"
                        }
                        if (disabled) {
                            cellClass = "h-8 border-l border-slate-200 bg-slate-100 opacity-50"
                        }
                        return (
                            <button
                                key={key}
                                type="button"
                                disabled={disabled}
                                className={cellClass}
                                onMouseDown={() => {
                                    const mode = active ? "clear" : "select"
                                    setDragMode(mode)
                                    apply(day.value, minute, mode)
                                }}
                                onMouseEnter={() => dragMode && apply(day.value, minute, dragMode)}
                            />
                        )
                    })}
                </div>
            ))}
        </div>
    )
}

export function ClinicAdminPanel() {
    const text = ADMIN_TEXT.clinicAdmin
    const queryClient = useQueryClient()
    const profileQuery = useQuery({ queryKey: ["clinic-admin", "profile"], queryFn: getClinicAdminProfile })
    const bookingsQuery = useQuery({ queryKey: ["clinic-admin", "bookings"], queryFn: () => getClinicAdminBookings() })

    const [bookingFilter, setBookingFilter] = useState<BookingFilter>("ALL")

    const allBookings = bookingsQuery.data?.items ?? []
    const bookingStats = useMemo(() => {
        const total = allBookings.length
        const pending = allBookings.filter((item) => item.status === "PENDING").length
        const confirmed = allBookings.filter((item) => item.status === "CONFIRMED").length
        const completed = allBookings.filter((item) => item.status === "COMPLETED").length
        return { total, pending, confirmed, completed }
    }, [allBookings])

    const filteredBookings = useMemo(() => {
        if (bookingFilter === "ALL") return allBookings
        return allBookings.filter((item) => item.status === bookingFilter)
    }, [allBookings, bookingFilter])

    const clinic = profileQuery.data?.clinic
    const packages = useMemo(() => clinic?.healthPackages ?? [], [clinic?.healthPackages])
    const clinicSpecialties = useMemo(() => clinic?.specialties ?? [], [clinic?.specialties])
    const [workingHours, setWorkingHours] = useState<ClinicWorkingHour[]>(defaultClinicHours())
    const [selectedSpecialtyId, setSelectedSpecialtyId] = useState("")
    const [specialtySchedules, setSpecialtySchedules] = useState<SpecialtyScheduleRow[]>(defaultSpecialtySchedules())
    const [specialtySlotDuration, setSpecialtySlotDuration] = useState(30)
    const [specialtyCapacity, setSpecialtyCapacity] = useState(1)
    const [selectedSpecialtySlots, setSelectedSpecialtySlots] = useState<Set<string>>(new Set())
    const [selectedPackageId, setSelectedPackageId] = useState("")
    const [availability, setAvailability] = useState<PackageAvailabilityRow[]>(defaultPackageAvailability())

    // Form profile state
    const [profileName, setProfileName] = useState("")
    const [profileAddress, setProfileAddress] = useState("")
    const [profileDescription, setProfileDescription] = useState("")
    const [profilePhone, setProfilePhone] = useState("")
    const [profileEmail, setProfileEmail] = useState("")
    const [profileWebsite, setProfileWebsite] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [profileOpeningHours, setProfileOpeningHours] = useState("")

    useEffect(() => {
        if (clinic) {
            setProfileName(clinic.name || "")
            setProfileAddress(clinic.address || "")
            setProfileDescription(clinic.description || "")
            setProfilePhone(clinic.phone || "")
            setProfileEmail(clinic.email || "")
            setProfileWebsite(clinic.website || "")
            setProfileImage(clinic.image || "")
            setProfileOpeningHours(clinic.openingHours || "")
        }
    }, [clinic])

    const isProfileDirty = useMemo(() => {
        if (!clinic) return false
        return (
            profileName.trim() !== (clinic.name || "").trim() ||
            profileAddress.trim() !== (clinic.address || "").trim() ||
            profileDescription.trim() !== (clinic.description || "").trim() ||
            profilePhone.trim() !== (clinic.phone || "").trim() ||
            profileEmail.trim() !== (clinic.email || "").trim() ||
            profileWebsite.trim() !== (clinic.website || "").trim() ||
            profileImage.trim() !== (clinic.image || "").trim() ||
            profileOpeningHours.trim() !== (clinic.openingHours || "").trim()
        )
    }, [
        clinic,
        profileName,
        profileAddress,
        profileDescription,
        profilePhone,
        profileEmail,
        profileWebsite,
        profileImage,
        profileOpeningHours,
    ])

    const saveProfileMutation = useMutation({
        mutationFn: patchClinicAdminProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clinic-admin", "profile"] })
        },
    })

    const handleSaveProfile = () => {
        saveProfileMutation.mutate({
            name: profileName,
            address: profileAddress,
            description: profileDescription,
            phone: profilePhone,
            email: profileEmail,
            website: profileWebsite,
            image: profileImage,
            openingHours: profileOpeningHours,
        })
    }

    // 1. So sánh Dirty State cho giờ làm việc Clinic
    const initialWorkingHours = useMemo(() => {
        if (!clinic?.workingHours?.length) return defaultClinicHours()
        const byDay = new Map(clinic.workingHours.map((row: any) => [row.dayOfWeek, row]))
        return defaultClinicHours().map((row) => {
            const override = byDay.get(row.dayOfWeek)
            return override ? { ...row, ...override } : row
        })
    }, [clinic?.workingHours])

    const isHoursDirty = useMemo(() => {
        return JSON.stringify(workingHours) !== JSON.stringify(initialWorkingHours)
    }, [workingHours, initialWorkingHours])

    // 2. So sánh Dirty State cho Lịch Chuyên khoa
    const initialSpecialtySchedules = useMemo(() => {
        if (!selectedSpecialtyId) return defaultSpecialtySchedules()
        const selected = clinicSpecialties.find((item: any) => item.specialtyId === selectedSpecialtyId)
        return selected?.schedules?.length ? selected.schedules : defaultSpecialtySchedules()
    }, [clinicSpecialties, selectedSpecialtyId])

    const isSpecialtyDirty = useMemo(() => {
        if (!selectedSpecialtyId) return false
        const cleanCurrent = specialtySchedules.map((s: SpecialtyScheduleRow) => ({
            dayOfWeek: s.dayOfWeek,
            isActive: s.isActive,
            startTime: s.startTime,
            endTime: s.endTime,
            slotDurationMinutes: s.slotDurationMinutes,
            capacity: s.capacity
        }))
        const cleanInitial = (initialSpecialtySchedules as SpecialtyScheduleRow[]).map((s: SpecialtyScheduleRow) => ({
            dayOfWeek: s.dayOfWeek,
            isActive: s.isActive,
            startTime: s.startTime,
            endTime: s.endTime,
            slotDurationMinutes: s.slotDurationMinutes,
            capacity: s.capacity
        }))
        return JSON.stringify(cleanCurrent) !== JSON.stringify(cleanInitial)
    }, [specialtySchedules, initialSpecialtySchedules, selectedSpecialtyId])

    // 3. So sánh Dirty State cho Gói khám
    const initialAvailability = useMemo(() => {
        if (!selectedPackageId) return defaultPackageAvailability()
        const pkg = packages.find((item: any) => item.id === selectedPackageId)
        if (pkg?.availabilities?.length) {
            const byDay = new Map(pkg.availabilities.map((row: any) => [row.dayOfWeek, row]))
            return defaultPackageAvailability().map((row) => {
                const override = byDay.get(row.dayOfWeek)
                return override ? { ...row, ...override } : row
            })
        }
        return defaultPackageAvailability()
    }, [packages, selectedPackageId])

    const isAvailabilityDirty = useMemo(() => {
        if (!selectedPackageId) return false
        const cleanCurrent = availability.map(row => ({
            dayOfWeek: row.dayOfWeek,
            isActive: row.isActive,
            startTime: row.startTime,
            endTime: row.endTime,
            slotDurationMinutes: row.slotDurationMinutes,
            capacity: row.capacity
        }))
        const cleanInitial = initialAvailability.map(row => ({
            dayOfWeek: row.dayOfWeek,
            isActive: row.isActive,
            startTime: row.startTime,
            endTime: row.endTime,
            slotDurationMinutes: row.slotDurationMinutes,
            capacity: row.capacity
        }))
        return JSON.stringify(cleanCurrent) !== JSON.stringify(cleanInitial)
    }, [availability, initialAvailability, selectedPackageId])
    const [packageName, setPackageName] = useState("")
    const [packageDescription, setPackageDescription] = useState("")
    const [packagePrice, setPackagePrice] = useState("")

    useEffect(() => {
        if (clinic?.workingHours?.length) {
            const byDay = new Map(clinic.workingHours.map((row: any) => [row.dayOfWeek, row]))
            setWorkingHours(
                defaultClinicHours().map((row) => {
                    const override = byDay.get(row.dayOfWeek)
                    return override ? { ...row, ...override } : row
                }),
            )
        }
    }, [clinic?.workingHours])

    useEffect(() => {
        const pkg = packages.find((item: any) => item.id === selectedPackageId)
        if (pkg?.availabilities?.length) {
            const byDay = new Map(pkg.availabilities.map((row: any) => [row.dayOfWeek, row]))
            setAvailability(
                defaultPackageAvailability().map((row) => {
                    const override = byDay.get(row.dayOfWeek)
                    return override ? { ...row, ...override } : row
                }),
            )
        } else {
            setAvailability(defaultPackageAvailability())
        }
    }, [packages, selectedPackageId])

    useEffect(() => {
        const selected = clinicSpecialties.find((item: any) => item.specialtyId === selectedSpecialtyId)
        const schedules = selected?.schedules?.length ? selected.schedules : defaultSpecialtySchedules()
        if (schedules.length) {
            const slotDuration = schedules[0].slotDurationMinutes ?? clinicStepMinutes
            setSpecialtySchedules(schedules)
            setSpecialtySlotDuration(slotDuration)
            setSpecialtyCapacity(schedules[0].capacity ?? 1)
            setSelectedSpecialtySlots(schedulesToSelectedKeys(schedules, slotDuration))
        } else {
            setSpecialtySchedules(defaultSpecialtySchedules())
            setSpecialtySlotDuration(clinicStepMinutes)
            setSpecialtyCapacity(1)
            setSelectedSpecialtySlots(schedulesToSelectedKeys(defaultSpecialtySchedules(), clinicStepMinutes))
        }
    }, [clinicSpecialties, selectedSpecialtyId])

    const selectedClinicSlots = useMemo(
        () => schedulesToSelectedKeys(workingHours, clinicStepMinutes),
        [workingHours],
    )
    const disabledSpecialtySlots = useMemo(() => {
        return buildDisabledSpecialtySlots(specialtySlotDuration, selectedClinicSlots)
    }, [selectedClinicSlots, specialtySlotDuration])

    useEffect(() => {
        if (!selectedSpecialtySlots.size) return
        const filtered = new Set(
            [...selectedSpecialtySlots].filter((key) => !disabledSpecialtySlots.has(key)),
        )
        if (filtered.size !== selectedSpecialtySlots.size) {
            setSelectedSpecialtySlots(filtered)
            setSpecialtySchedules(
                selectedKeysToSchedules(
                    filtered,
                    specialtySlotDuration,
                    specialtyCapacity,
                    specialtySlotDuration,
                ),
            )
        }
    }, [disabledSpecialtySlots, selectedSpecialtySlots, specialtySlotDuration, specialtyCapacity])

    const saveHoursMutation = useMutation({
        mutationFn: putClinicWorkingHours,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clinic-admin", "profile"] }),
    })

    const saveAvailabilityMutation = useMutation({
        mutationFn: ({ packageId, rows }: { packageId: string; rows: PackageAvailabilityRow[] }) =>
            putPackageAvailability(packageId, rows),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clinic-admin", "profile"] }),
    })

    const saveSpecialtySchedulesMutation = useMutation({
        mutationFn: ({ specialtyId, rows }: { specialtyId: string; rows: SpecialtyScheduleRow[] }) =>
            putSpecialtySchedules(specialtyId, rows),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clinic-admin", "profile"] }),
    })

    const createPackageMutation = useMutation({
        mutationFn: postClinicPackage,
        onSuccess: () => {
            setPackageName("")
            setPackageDescription("")
            setPackagePrice("")
            queryClient.invalidateQueries({ queryKey: ["clinic-admin", "profile"] })
        },
    })

    const togglePackageMutation = useMutation({
        mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => patchClinicPackage(id, { isActive }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clinic-admin", "profile"] }),
    })

    const updateBookingMutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: ClinicAdminBookingStatus }) =>
            patchClinicAdminBookingStatus(id, { status }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clinic-admin", "bookings"] }),
    })

    function updateHour(dayOfWeek: number, patch: Partial<ClinicWorkingHour>) {
        setWorkingHours((prev) => prev.map((row) => (row.dayOfWeek === dayOfWeek ? { ...row, ...patch } : row)))
    }

    function updateAvailability(dayOfWeek: number, patch: Partial<PackageAvailabilityRow>) {
        setAvailability((prev) => prev.map((row) => (row.dayOfWeek === dayOfWeek ? { ...row, ...patch } : row)))
    }


    function setClinicTimeline(next: Set<string>) {
        setWorkingHours((prev) => buildClinicWorkingHours(next, prev))
    }

    function setSpecialtyTimeline(next: Set<string>) {
        setSelectedSpecialtySlots(next)
        setSpecialtySchedules(
            selectedKeysToSchedules(
                next,
                specialtySlotDuration,
                specialtyCapacity,
                specialtySlotDuration,
            ),
        )
    }

    function selectedSpecialtyName() {
        return clinicSpecialties.find((item: any) => item.specialtyId === selectedSpecialtyId)?.specialty?.name || text.specialtyFallback
    }

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>{clinic?.name || text.clinicFallback}</CardTitle>
                    <CardDescription>{text.headerDescription}</CardDescription>
                </CardHeader>
            </Card>

            <Tabs defaultValue="bookings" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3 max-w-[600px]">
                    <TabsTrigger value="bookings">Quản lý đặt lịch</TabsTrigger>
                    <TabsTrigger value="schedule_services">Lịch & Dịch vụ</TabsTrigger>
                    <TabsTrigger value="profile">Hồ sơ phòng khám</TabsTrigger>
                </TabsList>

                {/* Tab 1: Bookings (Default) */}
                <TabsContent value="bookings" className="space-y-6">
                    {/* Booking Stats Grid */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard icon={CalendarClock} title="Tổng lịch đặt gói" value={String(bookingStats.total)} />
                        <StatCard icon={Activity} title="Chờ xác nhận" value={String(bookingStats.pending)} />
                        <StatCard icon={CalendarCheck2} title="Đã xác nhận" value={String(bookingStats.confirmed)} />
                        <StatCard icon={UserRoundCheck} title="Đã hoàn tất" value={String(bookingStats.completed)} />
                    </div>

                    <Card>
                        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <CardTitle>{text.bookings.title}</CardTitle>
                            </div>
                            <div className="w-full md:w-56">
                                <Select value={bookingFilter} onValueChange={(v) => setBookingFilter(v as BookingFilter)}>
                                    <SelectTrigger className="w-full shadow-sm">
                                        <SelectValue placeholder="Lọc trạng thái" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">Tất cả trạng thái</SelectItem>
                                        <SelectItem value="PENDING">Chờ xác nhận</SelectItem>
                                        <SelectItem value="CONFIRMED">Đã xác nhận</SelectItem>
                                        <SelectItem value="COMPLETED">Đã hoàn tất</SelectItem>
                                        <SelectItem value="CANCELLED">Đã hủy</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {filteredBookings.length === 0 ? (
                                <div className="py-8 text-center text-sm text-muted-foreground">
                                    Không có dữ liệu lịch khám phù hợp bộ lọc.
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>{text.bookings.headers.patient}</TableHead>
                                            <TableHead>{text.bookings.headers.package}</TableHead>
                                            <TableHead>{text.bookings.headers.dateTime}</TableHead>
                                            <TableHead>{text.bookings.headers.status}</TableHead>
                                            <TableHead>{text.bookings.headers.actions}</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredBookings.map((booking) => (
                                            <TableRow key={booking.id}>
                                                <TableCell>
                                                    <div className="font-medium text-slate-800">{booking.patientName}</div>
                                                    <div className="text-xs text-muted-foreground">{booking.patientPhone}</div>
                                                </TableCell>
                                                <TableCell className="font-medium text-slate-700">{booking.healthPackage?.name || "-"}</TableCell>
                                                <TableCell className="text-slate-600">{formatDate(booking.bookingDate)} {booking.bookingTime}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={`border font-semibold ${getBookingStatusClass(booking.status)}`}
                                                    >
                                                        {getBookingStatusLabel(booking.status)}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="space-x-2">
                                                    {booking.status === "PENDING" ? (
                                                        <>
                                                            <Button
                                                                size="sm"
                                                                className="shadow-sm transition-all"
                                                                disabled={updateBookingMutation.isPending}
                                                                onClick={() => updateBookingMutation.mutate({ id: booking.id, status: "CONFIRMED" })}
                                                            >
                                                                {text.bookings.confirm}
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="destructive"
                                                                className="shadow-sm transition-all"
                                                                disabled={updateBookingMutation.isPending}
                                                                onClick={() => updateBookingMutation.mutate({ id: booking.id, status: "CANCELLED" })}
                                                            >
                                                                {text.bookings.cancel}
                                                            </Button>
                                                        </>
                                                    ) : null}
                                                    {booking.status === "CONFIRMED" ? (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 shadow-sm transition-all"
                                                            disabled={updateBookingMutation.isPending}
                                                            onClick={() => updateBookingMutation.mutate({ id: booking.id, status: "COMPLETED" })}
                                                        >
                                                            {text.bookings.complete}
                                                        </Button>
                                                    ) : null}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab 2: Lịch & Dịch vụ */}
                <TabsContent value="schedule_services" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{text.workingHours.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <MultiRangeTimeline selected={selectedClinicSlots} onChange={setClinicTimeline} />
                            <Button onClick={() => saveHoursMutation.mutate(workingHours)} disabled={saveHoursMutation.isPending || !isHoursDirty}>
                                {text.workingHours.save}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{text.specialtySchedule.title}</CardTitle>
                            <CardDescription>{text.specialtySchedule.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>{text.specialtySchedule.selectLabel}</Label>
                                <Select value={selectedSpecialtyId} onValueChange={setSelectedSpecialtyId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={text.specialtySchedule.selectPlaceholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clinicSpecialties.map((item: any) => (
                                            <SelectItem key={item.specialtyId} value={item.specialtyId}>
                                                {item.specialty?.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {selectedSpecialtyId ? (
                                <>
                                    <div className="text-sm text-muted-foreground">{text.specialtySchedule.configuringPrefix}: {selectedSpecialtyName()}</div>
                                    <div className="grid gap-3 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label>{text.specialtySchedule.slotDurationLabel}</Label>
                                            <Select
                                                value={String(specialtySlotDuration)}
                                                onValueChange={(value) => {
                                                    const nextDuration = Number(value) || clinicStepMinutes
                                                    const nextSelected = schedulesToSelectedKeys(specialtySchedules, nextDuration)
                                                    setSpecialtySlotDuration(nextDuration)
                                                    setSelectedSpecialtySlots(nextSelected)
                                                    setSpecialtySchedules(
                                                        selectedKeysToSchedules(
                                                            nextSelected,
                                                            nextDuration,
                                                            specialtyCapacity,
                                                            nextDuration,
                                                        ),
                                                    )
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="30">{text.specialtySchedule.slotDurationOptions.thirty}</SelectItem>
                                                    <SelectItem value="60">{text.specialtySchedule.slotDurationOptions.sixty}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>{text.specialtySchedule.capacityLabel}</Label>
                                            <Input
                                                type="number"
                                                value={specialtyCapacity}
                                                onChange={(event) => {
                                                    const value = Number(event.target.value) || 1
                                                    setSpecialtyCapacity(value)
                                                    setSpecialtySchedules(
                                                        selectedKeysToSchedules(
                                                            selectedSpecialtySlots,
                                                            specialtySlotDuration,
                                                            value,
                                                            specialtySlotDuration,
                                                        ),
                                                    )
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <MultiRangeTimeline
                                        selected={selectedSpecialtySlots}
                                        onChange={setSpecialtyTimeline}
                                        disabledKeys={disabledSpecialtySlots}
                                        stepMinutes={specialtySlotDuration}
                                    />
                                    <Button onClick={() => saveSpecialtySchedulesMutation.mutate({ specialtyId: selectedSpecialtyId, rows: specialtySchedules })} disabled={saveSpecialtySchedulesMutation.isPending || !isSpecialtyDirty}>
                                        {text.specialtySchedule.save}
                                    </Button>
                                </>
                            ) : null}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{text.packages.title}</CardTitle>
                            <CardDescription>{text.packages.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-3 rounded-lg border p-3 md:grid-cols-[1fr_1fr_140px_120px] md:items-end">
                                <div className="space-y-2">
                                    <Label>{text.packages.nameLabel}</Label>
                                    <Input value={packageName} onChange={(event) => setPackageName(event.target.value)} placeholder={text.packages.namePlaceholder} />
                                </div>
                                <div className="space-y-2">
                                    <Label>{text.packages.descriptionLabel}</Label>
                                    <Input value={packageDescription} onChange={(event) => setPackageDescription(event.target.value)} placeholder={text.packages.descriptionPlaceholder} />
                                </div>
                                <div className="space-y-2">
                                    <Label>{text.packages.priceLabel}</Label>
                                    <Input value={packagePrice} type="number" onChange={(event) => setPackagePrice(event.target.value)} />
                                </div>
                                <Button
                                    onClick={() => createPackageMutation.mutate({
                                        name: packageName,
                                        description: packageDescription,
                                        specialtyId: selectedSpecialtyId,
                                        price: Number(packagePrice),
                                        features: [],
                                        isActive: true,
                                    })}
                                    disabled={!packageName || !packageDescription || !selectedSpecialtyId || !packagePrice || createPackageMutation.isPending}
                                >
                                    {text.packages.create}
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {packages.map((pkg: any) => (
                                    <div key={pkg.id} className="flex items-center justify-between rounded-lg border p-3">
                                        <div>
                                            <div className="font-medium">{pkg.name}</div>
                                            <div className="text-xs text-muted-foreground">{pkg.specialty?.name || text.packages.specialtyFallback} - {pkg.price}</div>
                                        </div>
                                        <label className="flex items-center gap-2 text-sm">
                                            <Switch checked={pkg.isActive} onCheckedChange={(value) => togglePackageMutation.mutate({ id: pkg.id, isActive: value })} />
                                            {text.packages.activeLabel}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-2">
                                <Label>{text.packages.selectLabel}</Label>
                                <Select value={selectedPackageId} onValueChange={setSelectedPackageId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={text.packages.selectPlaceholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {packages.map((pkg: any) => (
                                            <SelectItem key={pkg.id} value={pkg.id}>
                                                {pkg.name} - {pkg.specialty?.name || text.packages.specialtyFallback}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {selectedPackageId ? (
                                <>
                                    {availability.map((row) => (
                                        <div key={row.dayOfWeek} className="grid gap-3 rounded-lg border p-3 md:grid-cols-[100px_100px_1fr_1fr_1fr_1fr] md:items-center">
                                            <div className="font-medium">{dayOptions.find((day) => day.value === row.dayOfWeek)?.label}</div>
                                            <label className="flex items-center gap-2 text-sm">
                                                <Switch checked={row.isActive} onCheckedChange={(value) => updateAvailability(row.dayOfWeek, { isActive: value })} />
                                                {text.specialtySchedule.activeLabel}
                                            </label>
                                            <Input value={row.startTime} onChange={(event) => updateAvailability(row.dayOfWeek, { startTime: event.target.value })} />
                                            <Input value={row.endTime} onChange={(event) => updateAvailability(row.dayOfWeek, { endTime: event.target.value })} />
                                            <Input value={row.slotDurationMinutes} type="number" onChange={(event) => updateAvailability(row.dayOfWeek, { slotDurationMinutes: Number(event.target.value) || 30 })} />
                                            <Input value={row.capacity} type="number" onChange={(event) => updateAvailability(row.dayOfWeek, { capacity: Number(event.target.value) || 1 })} />
                                        </div>
                                    ))}
                                    <Button onClick={() => saveAvailabilityMutation.mutate({ packageId: selectedPackageId, rows: availability })} disabled={saveAvailabilityMutation.isPending || !isAvailabilityDirty}>
                                        {text.packages.saveAvailability}
                                    </Button>
                                </>
                            ) : null}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab 3: Hồ sơ phòng khám */}
                <TabsContent value="profile" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Cập nhật hồ sơ phòng khám</CardTitle>
                            <CardDescription>
                                Quản lý thông tin chi tiết, logo và các kênh liên hệ của phòng khám.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 md:grid-cols-3">
                                {/* Left column: Logo preview & input */}
                                <div className="flex flex-col items-center space-y-4 rounded-lg border bg-slate-50/50 p-6 dark:bg-slate-900/50">
                                    <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-xl border bg-white shadow-xs dark:bg-slate-950">
                                        {profileImage ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={profileImage}
                                                alt="Logo preview"
                                                className="h-full w-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLElement).style.display = "none"
                                                }}
                                            />
                                        ) : null}
                                        {!profileImage && (
                                            <div className="flex flex-col items-center space-y-2 text-muted-foreground">
                                                <ImageIcon className="h-12 w-12 stroke-1" />
                                                <span className="text-xs">Chưa có logo</span>
                                            </div>
                                        )}
                                    </div>

                                    <ImageUpload onUploadSuccess={(url) => setProfileImage(url)} label="Tải logo lên" />
                                </div>

                                {/* Right column: Details form */}
                                <div className="space-y-4 md:col-span-2">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="clinicName" className="flex items-center gap-2">
                                                <Building className="h-4 w-4 text-primary" />
                                                Tên phòng khám
                                            </Label>
                                            <Input
                                                id="clinicName"
                                                value={profileName}
                                                onChange={(e) => setProfileName(e.target.value)}
                                                placeholder="Phòng khám đa khoa Healthcare"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="clinicPhone" className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-primary" />
                                                Hotline liên hệ
                                            </Label>
                                            <Input
                                                id="clinicPhone"
                                                value={profilePhone}
                                                onChange={(e) => setProfilePhone(e.target.value)}
                                                placeholder="0123456789"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="clinicEmail" className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-primary" />
                                                Email liên hệ
                                            </Label>
                                            <Input
                                                id="clinicEmail"
                                                type="email"
                                                value={profileEmail}
                                                onChange={(e) => setProfileEmail(e.target.value)}
                                                placeholder="contact@healthcare.com"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="clinicWebsite" className="flex items-center gap-2">
                                                <Globe className="h-4 w-4 text-primary" />
                                                Website
                                            </Label>
                                            <Input
                                                id="clinicWebsite"
                                                value={profileWebsite}
                                                onChange={(e) => setProfileWebsite(e.target.value)}
                                                placeholder="https://healthcare.com"
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="clinicAddress" className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-primary" />
                                                Địa chỉ phòng khám
                                            </Label>
                                            <Input
                                                id="clinicAddress"
                                                value={profileAddress}
                                                onChange={(e) => setProfileAddress(e.target.value)}
                                                placeholder="Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội"
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="clinicOpeningHours" className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-primary" />
                                                Giờ hoạt động hiển thị
                                            </Label>
                                            <Input
                                                id="clinicOpeningHours"
                                                value={profileOpeningHours}
                                                onChange={(e) => setProfileOpeningHours(e.target.value)}
                                                placeholder="Thứ 2 - Thứ 7: 8h00 - 17h00"
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="clinicDescription" className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-primary" />
                                                Giới thiệu phòng khám
                                            </Label>
                                            <Textarea
                                                id="clinicDescription"
                                                value={profileDescription}
                                                onChange={(e) => setProfileDescription(e.target.value)}
                                                placeholder="Mô tả chi tiết về phòng khám, các thế mạnh chuyên khoa..."
                                                rows={4}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <Button
                                            onClick={handleSaveProfile}
                                            disabled={saveProfileMutation.isPending || !isProfileDirty}
                                            className="min-w-[150px] shadow-sm transition-all"
                                        >
                                            {saveProfileMutation.isPending ? "Đang lưu..." : (
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
        </div>
    )
}

function StatCard({
    icon: Icon,
    title,
    value,
}: Readonly<{
    icon: any
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
