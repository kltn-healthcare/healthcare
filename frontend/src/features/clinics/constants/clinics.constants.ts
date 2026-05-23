/**
 * Clinics Query Keys Constants
 */
export const CLINICS_QUERY_KEYS = {
  LIST: (filters?: Record<string, any>) => ["clinics", filters] as const,
  DETAIL: (id: string) => ["clinic", id] as const,
} as const;
