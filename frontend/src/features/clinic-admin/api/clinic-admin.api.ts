import { adminClient } from '@/shared/lib/apiClient'

export type ClinicAdminBookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'

export type ClinicWorkingHour = {
    dayOfWeek: number
    isOpen: boolean
    startTime: string
    endTime: string
}

export type PackageAvailabilityRow = {
    dayOfWeek: number
    isActive: boolean
    startTime: string
    endTime: string
    slotDurationMinutes: number
    capacity: number
}

export type SpecialtyScheduleRow = {
    dayOfWeek: number
    isActive: boolean
    startTime: string
    endTime: string
    slotDurationMinutes: number
    capacity: number
}

export type ClinicPackageInput = {
    name?: string
    specialtyId?: string
    description?: string
    shortDescription?: string
    price?: number
    promotionalPrice?: number | null
    isActive?: boolean
    features?: string[]
}

export type ClinicAdminBookingItem = {
    id: string
    status: ClinicAdminBookingStatus
    bookingDate: string
    bookingTime: string
    patientName: string
    patientEmail: string
    patientPhone: string
    paymentReceiptUrl?: string
    bookingType: 'HEALTH_PACKAGE' | 'DOCTOR_CONSULTATION'
    doctor?: { id: string; name: string } | null
    healthPackage?: { id: string; name: string; price: string } | null
    specialty?: { id: string; name: string } | null
}

export async function getClinicAdminProfile() {
    const res = await adminClient.get('/v1/clinic-admin/profile')
    return res.data
}

export async function putClinicWorkingHours(workingHours: ClinicWorkingHour[]) {
    const res = await adminClient.put('/v1/clinic-admin/working-hours', { workingHours })
    return res.data
}

export async function putSpecialtySchedules(specialtyId: string, schedules: SpecialtyScheduleRow[]) {
    const res = await adminClient.put(`/v1/clinic-admin/specialties/${specialtyId}/schedules`, { schedules })
    return res.data
}

export async function postClinicPackage(input: Required<Pick<ClinicPackageInput, 'name' | 'specialtyId' | 'description' | 'price'>> & ClinicPackageInput) {
    const res = await adminClient.post('/v1/clinic-admin/packages', input)
    return res.data
}

export async function patchClinicPackage(id: string, input: ClinicPackageInput) {
    const res = await adminClient.patch(`/v1/clinic-admin/packages/${id}`, input)
    return res.data
}

export async function putPackageAvailability(packageId: string, availability: PackageAvailabilityRow[]) {
    const res = await adminClient.put(`/v1/clinic-admin/packages/${packageId}/availability`, { availability })
    return res.data
}

export async function getClinicAdminBookings(params?: { status?: ClinicAdminBookingStatus; date?: string }) {
    const res = await adminClient.get<{ items: ClinicAdminBookingItem[] }>('/v1/clinic-admin/bookings', { params })
    return res.data
}

export async function patchClinicAdminBookingStatus(
    id: string,
    input: { status: ClinicAdminBookingStatus; cancellationReason?: string },
) {
    const res = await adminClient.patch(`/v1/clinic-admin/bookings/${id}/status`, input)
    return res.data
}

export type UpdateClinicProfileInput = {
    name?: string
    description?: string
    address?: string
    phone?: string
    email?: string
    website?: string
    image?: string
    isOpen?: boolean
    openingHours?: string
    bankInfo?: string
    depositAmount?: number
}

export async function patchClinicAdminProfile(input: UpdateClinicProfileInput) {
    const res = await adminClient.patch('/v1/clinic-admin/profile', input)
    return res.data
}
