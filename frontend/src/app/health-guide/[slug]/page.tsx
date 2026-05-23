"use client"

import { useParams } from "next/navigation"
import { HealthGuideDetailView } from "@/features/health-guide"

export default function HealthGuideDetailPage() {
  const params = useParams<{ slug: string }>()
  const slug = params.slug

  return <HealthGuideDetailView slug={String(slug || "")} />
}
