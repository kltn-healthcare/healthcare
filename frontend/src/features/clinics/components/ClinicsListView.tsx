"use client"

import { Header } from "@/components/Header"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Star, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useClinicsList } from "../hooks/useClinics"
import { CLINIC_I18N_KEYS } from "@/shared/i18n/keys"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/shared/ui/carousel"
import { SectionCarouselArrows } from "@/features/home/components/SectionShared"

export function ClinicsListView() {
  const { t } = useTranslation("clinics")
  const searchParams = useSearchParams()
  const specialtyId = searchParams.get("specialtyId") || undefined
  const q = searchParams.get("q") || undefined

  const { data, isLoading } = useClinicsList({ specialtyId, q })

  const clinics = useMemo(() => data?.items ?? [], [data])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-6 md:py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="mb-2 text-2xl font-bold sm:text-3xl">{t(CLINIC_I18N_KEYS.pageTitle)}</h1>
            <p className="text-sm text-muted-foreground sm:text-base">{t(CLINIC_I18N_KEYS.pageDesc)}</p>
            {q && (
              <div className="mt-4 text-sm text-slate-500 font-medium bg-slate-100/50 inline-block px-3 py-1.5 rounded-lg border border-slate-200/40">
                Tìm kiếm cơ sở y tế với từ khóa: <span className="text-primary font-semibold">"{q}"</span> ({clinics.length} kết quả)
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, idx) => (
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
              ))}
            </div>
          ) : clinics.length > 0 ? (
            <Carousel opts={{ align: "start", loop: false }} className="w-full">
              <CarouselContent className="-ml-4">
                {clinics.map((clinic) => (
                  <CarouselItem key={clinic.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="flex h-full flex-col p-0 gap-0 overflow-hidden transition-all shadow-sm hover:-translate-y-1 hover:shadow-lg group relative cursor-pointer">
                      <div className="relative aspect-[2/1] w-full flex-none overflow-hidden bg-muted">
                        <Image
                          src={clinic.image || "/placeholder-clinic.jpg"}
                          alt={clinic.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <CardHeader className="flex-none pt-4 pb-2">
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <Link href={`/clinic/${clinic.id}`} className="after:absolute after:inset-0 after:z-0">
                            <CardTitle className="line-clamp-1 text-base sm:text-lg transition-colors group-hover:text-primary relative z-10">{clinic.name}</CardTitle>
                          </Link>
                          <Badge
                            variant="secondary"
                            className={
                              clinic.isOpen ? "shrink-0 bg-success/10 text-success relative z-10" : "shrink-0 bg-muted text-muted-foreground relative z-10"
                            }
                          >
                            <span className="mr-1">●</span>
                            {clinic.isOpen ? t(CLINIC_I18N_KEYS.statusOpen) : t(CLINIC_I18N_KEYS.statusClosed)}
                          </Badge>
                        </div>
                        {(Number((clinic as any).reviewCount || 0) > 0 && Number((clinic as any).rating || 0) > 0) ? (
                          <div className="flex items-center gap-1 text-sm relative z-10">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{(clinic as any).rating}</span>
                            <span className="text-muted-foreground">({(clinic as any).reviewCount} {t(CLINIC_I18N_KEYS.reviews)})</span>
                          </div>
                        ) : null}
                      </CardHeader>
                      <CardContent className="flex-1 space-y-2.5 pt-0 relative z-10">
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
                      <CardFooter className="gap-2 pb-5 pt-4 flex-none mt-auto relative z-10">
                        <Button variant="outline" className="flex-1 bg-transparent cursor-pointer" asChild>
                          <Link href={`/clinic/${clinic.id}`}>
                            {t(CLINIC_I18N_KEYS.viewDetail)}
                          </Link>
                        </Button>
                        <Button className="flex-1 bg-primary cursor-pointer" asChild>
                          <Link href={`/booking?clinicId=${clinic.id}${specialtyId ? `&specialtyId=${specialtyId}` : ""}`}>
                            {t(CLINIC_I18N_KEYS.bookNow)}
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {clinics.length > 3 && <SectionCarouselArrows />}
            </Carousel>
          ) : (
            <Card className="w-full">
              <CardContent className="py-12 text-center text-sm text-muted-foreground">
                {t(CLINIC_I18N_KEYS.empty)}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
