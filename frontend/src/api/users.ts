import { apiClient } from '@/shared/lib/apiClient'
import { User } from '@/shared/types'

export async function updateProfile(data: { name?: string; phone?: string; avatar?: string }) {
  const res = await apiClient.patch<{ data: User }>('/v1/users/me', data)
  return res.data
}
