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
    type ClinicAdminBookingStatus,
    type ClinicWorkingHour,
    type PackageAvailabilityRow,
    type SpecialtyScheduleRow,
} from "@/api/clinic-admin"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Switch } from "@/shared/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { ADMIN_DAY_OPTIONS, ADMIN_TEXT } from "./admin.constants"

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
            startTime: "13:30",
            endTime: "17:00",
            slotDurationMinutes,
            capacity: 1,
        },
    ])
}

function formatDate(value: string) {
    return new Date(value).toLocaleDateString("vi-VN")
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
    return {
        slots,
        gridTemplate: `92px repeat(${slots.length}, minmax(22px, 1fr))`,
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

            <Card>
                <CardHeader>
                    <CardTitle>{text.workingHours.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <MultiRangeTimeline selected={selectedClinicSlots} onChange={setClinicTimeline} />
                    <Button onClick={() => saveHoursMutation.mutate(workingHours)} disabled={saveHoursMutation.isPending}>
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
                            <Button onClick={() => saveSpecialtySchedulesMutation.mutate({ specialtyId: selectedSpecialtyId, rows: specialtySchedules })} disabled={saveSpecialtySchedulesMutation.isPending}>
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
                            <Button onClick={() => saveAvailabilityMutation.mutate({ packageId: selectedPackageId, rows: availability })} disabled={saveAvailabilityMutation.isPending}>
                                {text.packages.saveAvailability}
                            </Button>
                        </>
                    ) : null}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{text.bookings.title}</CardTitle>
                </CardHeader>
                <CardContent>
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
                            {(bookingsQuery.data?.items ?? []).map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell>
                                        <div className="font-medium">{booking.patientName}</div>
                                        <div className="text-xs text-muted-foreground">{booking.patientPhone}</div>
                                    </TableCell>
                                    <TableCell>{booking.healthPackage?.name || "-"}</TableCell>
                                    <TableCell>{formatDate(booking.bookingDate)} {booking.bookingTime}</TableCell>
                                    <TableCell><Badge variant="outline">{booking.status}</Badge></TableCell>
                                    <TableCell className="space-x-2">
                                        {booking.status === "PENDING" ? (
                                            <>
                                                <Button size="sm" onClick={() => updateBookingMutation.mutate({ id: booking.id, status: "CONFIRMED" })}>{text.bookings.confirm}</Button>
                                                <Button size="sm" variant="outline" onClick={() => updateBookingMutation.mutate({ id: booking.id, status: "CANCELLED" })}>{text.bookings.cancel}</Button>
                                            </>
                                        ) : null}
                                        {booking.status === "CONFIRMED" ? (
                                            <Button size="sm" variant="outline" onClick={() => updateBookingMutation.mutate({ id: booking.id, status: "COMPLETED" })}>{text.bookings.complete}</Button>
                                        ) : null}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
