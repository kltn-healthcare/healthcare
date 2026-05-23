import { useQuery } from "@tanstack/react-query"
import { getClinics, getClinicById } from "../api/clinics.api"
import { CLINICS_QUERY_KEYS } from "../constants/clinics.constants"

/**
 * Hook to retrieve the list of clinics with optional filters
 */
export function useClinicsList(filters?: { q?: string; specialtyId?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: CLINICS_QUERY_KEYS.LIST(filters),
    queryFn: () => getClinics(filters),
  })
}

/**
 * Hook to retrieve a single clinic's detailed information by ID
 */
export function useClinicDetail(id: string) {
  return useQuery({
    queryKey: CLINICS_QUERY_KEYS.DETAIL(id),
    enabled: Boolean(id),
    queryFn: () => getClinicById(id),
  })
}
