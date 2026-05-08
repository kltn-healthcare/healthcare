import { apiClient } from '@/shared/lib/apiClient'

export async function postBooking(input: {
  clinicId: string
  doctorId?: string
  patientName: string
  patientEmail: string
  patientPhone: string
  patientDob?: string
  patientGender?: 'MALE' | 'FEMALE' | 'OTHER'
  notes?: string
  bookingDate: string
  bookingTime: string
}) {
  const res = await apiClient.post('/v1/bookings', input)
  return res.data
}

export async function getMyBookings() {
  const res = await apiClient.get('/v1/bookings/me')
  return res.data as { items: any[] }
}

export async function cancelBooking(id: string, reason?: string) {
  const res = await apiClient.patch(`/v1/bookings/${id}/cancel`, { reason })
  return res.data
}

export async function rescheduleBooking(id: string, data: { bookingDate: string; bookingTime: string }) {
  const res = await apiClient.patch(`/v1/bookings/${id}/reschedule`, data)
  return res.data
}

