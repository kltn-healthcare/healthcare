import { adminClient } from '@/shared/lib/apiClient'

export type DoctorBookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'

export type DoctorBookingItem = {
    id: string
    status: DoctorBookingStatus
    bookingDate: string
    bookingTime: string
    patientName: string
    patientEmail: string
    patientPhone: string
    notes?: string | null
    clinic: { id: string; name: string; address: string }
    createdAt: string
}

export type DoctorWorkingHour = {
    dayOfWeek: number
    startTime: string
    endTime: string
}

export type DoctorSpecialtySchedule = {
    dayOfWeek: number
    isActive: boolean
    startTime: string
    endTime: string
    slotDurationMinutes: number
    capacity: number
}

export type DoctorServicePrice = {
    name: string
    price: number
    currency: string
}

export async function getDoctorBookings(params?: {
    status?: DoctorBookingStatus
    date?: string
}) {
    const res = await adminClient.get<{ items: DoctorBookingItem[] }>('/v1/doctor-admin/bookings', {
        params,
    })
    return res.data
}

export async function patchDoctorBookingStatus(
    id: string,
    input: { status: Exclude<DoctorBookingStatus, 'PENDING'>; cancellationReason?: string },
) {
    const res = await adminClient.patch(`/v1/doctor-admin/bookings/${id}/status`, input)
    return res.data
}

export async function getDoctorSettings() {
    const res = await adminClient.get<{
        doctor: { id: string; name: string; clinicId: string; specialtyId: string }
        settings: {
            slotDurationMinutes: number
            workingHours: DoctorWorkingHour[]
            services: DoctorServicePrice[]
            specialtySchedules: DoctorSpecialtySchedule[]
        }
    }>('/v1/doctor-admin/settings')
    return res.data
}

export async function putDoctorSchedule(input: {
    slotDurationMinutes: number
    workingHours: DoctorWorkingHour[]
}) {
    const res = await adminClient.put('/v1/doctor-admin/settings/schedule', input)
    return res.data
}

export async function putDoctorServices(input: {
    services: Array<{ name: string; price: number; currency?: string }>
}) {
    const res = await adminClient.put('/v1/doctor-admin/settings/services', input)
    return res.data
}

export type DoctorProfileItem = {
    id: string
    name: string
    avatar?: string | null
    bio?: string | null
    experience?: number | null
    userId: string
    clinicId: string
    specialtyId: string
    clinic?: {
        id: string
        name: string
    } | null
    specialty?: {
        id: string
        name: string
    } | null
    user?: {
        email: string
        phone?: string | null
        avatar?: string | null
        name: string
    } | null
}

export type UpdateDoctorProfileInput = {
    name?: string
    phone?: string
    avatar?: string
    experience?: number
    bio?: string
}

export async function getDoctorProfile() {
    const res = await adminClient.get<DoctorProfileItem>('/v1/doctor-admin/profile')
    return res.data
}

export async function patchDoctorProfile(input: UpdateDoctorProfileInput) {
    const res = await adminClient.patch<DoctorProfileItem>('/v1/doctor-admin/profile', input)
    return res.data
}
