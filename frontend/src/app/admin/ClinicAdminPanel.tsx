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
    const [selectedPackageId, setSelectedPackageId] = useState("")
    const [availability, setAvailability] = useState<PackageAvailabilityRow[]>(defaultPackageAvailability())
    const [packageName, setPackageName] = useState("")
    const [packageDescription, setPackageDescription] = useState("")
    const [packagePrice, setPackagePrice] = useState("")

    useEffect(() => {
        if (clinic?.workingHours?.length) {
            const byDay = new Map(clinic.workingHours.map((row: any) => [row.dayOfWeek, row]))
            setWorkingHours(defaultClinicHours().map((row) => ({ ...row, ...(byDay.get(row.dayOfWeek) || {}) })))
        }
    }, [clinic?.workingHours])

    useEffect(() => {
        const pkg = packages.find((item: any) => item.id === selectedPackageId)
        if (pkg?.availabilities?.length) {
            const byDay = new Map(pkg.availabilities.map((row: any) => [row.dayOfWeek, row]))
            setAvailability(defaultPackageAvailability().map((row) => ({ ...row, ...(byDay.get(row.dayOfWeek) || {}) })))
        } else {
            setAvailability(defaultPackageAvailability())
        }
    }, [packages, selectedPackageId])

    useEffect(() => {
        const selected = clinicSpecialties.find((item: any) => item.specialtyId === selectedSpecialtyId)
        if (selected?.schedules?.length) {
            setSpecialtySchedules(selected.schedules)
        } else {
            setSpecialtySchedules(defaultSpecialtySchedules())
        }
    }, [clinicSpecialties, selectedSpecialtyId])

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

    function updateSpecialtySchedule(index: number, patch: Partial<SpecialtyScheduleRow>) {
        setSpecialtySchedules((prev) => prev.map((row, rowIndex) => (rowIndex === index ? { ...row, ...patch } : row)))
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
                    {workingHours.map((row) => (
                        <div key={row.dayOfWeek} className="grid gap-3 rounded-lg border p-3 md:grid-cols-[120px_100px_1fr_1fr] md:items-center">
                            <div className="font-medium">{dayOptions.find((day) => day.value === row.dayOfWeek)?.label}</div>
                            <label className="flex items-center gap-2 text-sm">
                                <Switch checked={row.isOpen} onCheckedChange={(value) => updateHour(row.dayOfWeek, { isOpen: value })} />
                                {text.workingHours.openLabel}
                            </label>
                            <Input value={row.startTime} onChange={(event) => updateHour(row.dayOfWeek, { startTime: event.target.value })} />
                            <Input value={row.endTime} onChange={(event) => updateHour(row.dayOfWeek, { endTime: event.target.value })} />
                        </div>
                    ))}
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
                            {specialtySchedules.map((row, index) => (
                                <div key={`${row.dayOfWeek}-${index}`} className="grid gap-3 rounded-lg border p-3 md:grid-cols-[100px_100px_1fr_1fr_1fr_1fr] md:items-center">
                                    <div className="font-medium">{dayOptions.find((day) => day.value === row.dayOfWeek)?.label}</div>
                                    <label className="flex items-center gap-2 text-sm">
                                        <Switch checked={row.isActive} onCheckedChange={(value) => updateSpecialtySchedule(index, { isActive: value })} />
                                        {text.specialtySchedule.activeLabel}
                                    </label>
                                    <Input value={row.startTime} onChange={(event) => updateSpecialtySchedule(index, { startTime: event.target.value })} />
                                    <Input value={row.endTime} onChange={(event) => updateSpecialtySchedule(index, { endTime: event.target.value })} />
                                    <Input value={row.slotDurationMinutes} type="number" onChange={(event) => updateSpecialtySchedule(index, { slotDurationMinutes: Number(event.target.value) || 30 })} />
                                    <Input value={row.capacity} type="number" onChange={(event) => updateSpecialtySchedule(index, { capacity: Number(event.target.value) || 1 })} />
                                </div>
                            ))}
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
