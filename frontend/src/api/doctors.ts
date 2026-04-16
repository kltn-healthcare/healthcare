import { apiClient } from '@/shared/lib/apiClient'
import type { Doctor } from '@/shared/types'

export async function getDoctors(params?: { clinicId?: string; specialtyId?: string; q?: string }) {
  const res = await apiClient.get<{ items: Doctor[] }>('/v1/doctors', { params })
  const items = Array.isArray(res.data) ? res.data : (res.data?.items || [])
  return { items }
}

export async function getDoctorAvailability(doctorId: string, date: string) {
  const res = await apiClient.get<any>(`/v1/doctors/${doctorId}/availability`, { params: { date } })
  return res.data
}

export async function getDoctorDetail(id: string) {
  const res = await apiClient.get<any>(`/v1/doctors/${id}`)
  return res.data
}
