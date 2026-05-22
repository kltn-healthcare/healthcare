"use client"

import { Header } from "@/components/Header"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Star, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { getClinics } from "@/api/clinics"
import { CLINIC_I18N_KEYS } from "@/shared/i18n/keys"

export default function ClinicsPage() {
  const { t } = useTranslation("clinics")
  const searchParams = useSearchParams()
  const specialtyId = searchParams.get("specialtyId") || undefined

  const { data, isLoading } = useQuery({
    queryKey: ["clinics", { specialtyId }],
    queryFn: () => getClinics({ specialtyId }),
  })

  const clinics = useMemo(() => data?.items ?? [], [data])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-6 md:py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="mb-2 text-2xl font-bold sm:text-3xl">{t(CLINIC_I18N_KEYS.pageTitle)}</h1>
            <p className="text-sm text-muted-foreground sm:text-base">{t(CLINIC_I18N_KEYS.pageDesc)}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <Card key={idx} className="flex flex-col">
                  <div className="relative aspect-[2/1] w-full overflow-hidden rounded-t-lg bg-muted" />
                  <CardHeader className="flex-none pb-3">
                    <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
                    <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-muted" />
                  </CardHeader>
                  <CardContent className="flex-1 space-y-2.5">
                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                    <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
                  </CardContent>
                </Card>
              ))
            ) : clinics.length > 0 ? (
              clinics.map((clinic) => (
                <Card key={clinic.id} className="flex flex-col p-0 gap-0 overflow-hidden transition-all shadow-sm hover:-translate-y-1 hover:shadow-lg group">
                  <Link href={`/clinic/${clinic.id}`} className="block">
                    <div className="relative aspect-[2/1] w-full flex-none overflow-hidden bg-muted">
                      <Image
                        src={clinic.image || "/placeholder-clinic.jpg"}
                        alt={clinic.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <CardHeader className="flex-none pt-4 pb-2">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <Link href={`/clinic/${clinic.id}`}>
                        <CardTitle className="line-clamp-1 text-base sm:text-lg transition-colors group-hover:text-primary">{clinic.name}</CardTitle>
                      </Link>
                      <Badge
                        variant="secondary"
                        className={
                          clinic.isOpen ? "shrink-0 bg-success/10 text-success" : "shrink-0 bg-muted text-muted-foreground"
                        }
                      >
                        <span className="mr-1">●</span>
                        {clinic.isOpen ? t(CLINIC_I18N_KEYS.statusOpen) : t(CLINIC_I18N_KEYS.statusClosed)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{clinic.rating}</span>
                      <span className="text-muted-foreground">({clinic.reviewCount} {t(CLINIC_I18N_KEYS.reviews)})</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-2.5 pt-0">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="line-clamp-2 text-muted-foreground">{clinic.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="text-muted-foreground">{clinic.openingHours || t(CLINIC_I18N_KEYS.noOpeningHours)}</span>
                    </div>
                    {Array.isArray(clinic.specialties) && clinic.specialties.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {clinic.specialties.slice(0, 3).map((specialty: any) => (
                          <Badge key={specialty.id || specialty} variant="outline" className="text-xs">
                            {specialty.name || specialty}
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                  </CardContent>
                  <CardFooter className="gap-2 pb-5 pt-4 flex-none mt-auto">
                    <Link href={`/clinic/${clinic.id}`} className="flex-1">
                      <Button variant="outline" className="w-full bg-transparent">
                        {t(CLINIC_I18N_KEYS.viewDetail)}
                      </Button>
                    </Link>
                    <Link href={`/booking?clinicId=${clinic.id}${specialtyId ? `&specialtyId=${specialtyId}` : ""}`} className="flex-1">
                      <Button className="w-full bg-primary">{t(CLINIC_I18N_KEYS.bookNow)}</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card className="md:col-span-2 lg:col-span-3">
                <CardContent className="py-12 text-center text-sm text-muted-foreground">
                  {t(CLINIC_I18N_KEYS.empty)}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
