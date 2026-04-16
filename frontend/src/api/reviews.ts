import { apiClient } from '@/shared/lib/apiClient'
import type { Review } from '@/shared/types'

export async function createReview(data: { bookingId: string; rating: number; comment?: string }) {
  const res = await apiClient.post<{ data: Review }>('/v1/reviews', data)
  return res.data
}

export async function getDoctorReviews(doctorId: string, params?: { page?: number; limit?: number }) {
  const res = await apiClient.get<any>(`/v1/reviews/doctor/${doctorId}`, { params })
  return res.data
}

export async function getMyReviews() {
  const res = await apiClient.get<any>('/v1/reviews/me')
  return res.data
}
