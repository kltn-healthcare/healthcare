import axios from 'axios'
import { apiClient } from '@/shared/lib/apiClient'
import type { User } from '@/shared/types'

export type AuthResponse = {
  accessToken: string
  user: User
}

export type RegisterResponse = {
  message: string
  expiresInSeconds: number
}

export async function postRegister(input: {
  name: string
  email: string
  phone?: string
  password: string
}): Promise<RegisterResponse> {
  const res = await axios.post<RegisterResponse>('/api/auth/register', input)
  return res.data
}

export async function postVerifyRegisterOtp(input: {
  email: string
  otp: string
}): Promise<AuthResponse> {
  const res = await axios.post<AuthResponse>('/api/auth/verify-register-otp', input)
  return res.data
}

export async function postLogin(input: { email: string; password: string }): Promise<AuthResponse> {
  const res = await axios.post<AuthResponse>('/api/auth/login', input)
  return res.data
}


export async function getMe(): Promise<User> {
  const res = await apiClient.get<User>('/v1/users/me')
  return res.data
}

export async function postForgotPassword(input: { email: string }): Promise<{ message: string; expiresInSeconds: number }> {
  const res = await axios.post<{ message: string; expiresInSeconds: number }>('/api/auth/forgot-password', input)
  return res.data
}

export async function postResetPassword(input: {
  token: string
  newPassword: string
  confirmPassword: string
}): Promise<{ message: string }> {
  const res = await axios.post<{ message: string }>('/api/auth/reset-password', input)
  return res.data
}

