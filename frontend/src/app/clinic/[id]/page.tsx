"use client"

import { useParams } from "next/navigation"
import { ClinicDetailView } from "@/features/clinics"

export default function ClinicDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id

  return <ClinicDetailView id={String(id || "")} />
}
