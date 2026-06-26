"use client"

import { Header } from "@/components/Header"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Input } from "@/shared/ui/input"
import { Star, User, Search, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import { useMemo, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useQuery } from "@tanstack/react-query"
import { getDoctors } from "../api/doctors.api"
import { getSpecialties } from "../api/specialties.api"
import { DOCTOR_I18N_KEYS } from "@/shared/i18n/keys"
import { ROUTES } from "@/shared/constants"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/shared/ui/carousel"
import { SectionCarouselArrows } from "@/features/home/components/SectionShared"


export function DoctorsListView() {
  const { t } = useTranslation("doctors")
  const { t: tc } = useTranslation("clinics") // for viewing detail/booking
  const searchParams = useSearchParams()
  const router = useRouter()

  const q = searchParams.get("q") || ""
  const specialtyId = searchParams.get("specialtyId") || ""

  const [searchInput, setSearchInput] = useState(q)

  // Sync state with URL parameter (e.g. if navigated from home page suggestion)
  useEffect(() => {
    setSearchInput(q)
  }, [q])

  // Fetch doctors list using React Query
  const { data: doctorsData, isLoading: isDoctorsLoading } = useQuery({
    queryKey: ["doctors", { q, specialtyId }],
    queryFn: () => getDoctors({ q: q || undefined, specialtyId: specialtyId || undefined, limit: 50 }),
  })

  // Fetch specialties for filter
  const { data: specialties = [] } = useQuery({
    queryKey: ["specialties"],
    queryFn: getSpecialties,
  })

  const doctors = useMemo(() => doctorsData?.items ?? [], [doctorsData])

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateUrlParams(searchInput, specialtyId)
  }

  // Handle specialty filter selection
  const handleSpecialtySelect = (id: string) => {
    updateUrlParams(searchInput, id)
  }

  // Update query parameters in URL
  const updateUrlParams = (search: string, specId: string) => {
    const params = new URLSearchParams()
    if (search.trim()) {
      params.set("q", search.trim())
    }
    if (specId) {
      params.set("specialtyId", specId)
    }
    const queryString = params.toString()
    router.push(`${ROUTES.DOCTORS}${queryString ? `?${queryString}` : ""}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-slate-50 py-4 sm:py-6">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Heading */}
          <div className="mb-6 text-center sm:text-left">
            <h1 className="mb-2 text-2xl font-bold sm:text-3xl text-slate-900 tracking-tight">
              {t(DOCTOR_I18N_KEYS.title)}
            </h1>
            <p className="text-sm text-slate-500 sm:text-base leading-relaxed">
              {t(DOCTOR_I18N_KEYS.desc)}
            </p>
          </div>

          {/* Search & Filter Top Bar */}
          <div className="mb-8 space-y-4">
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={
                    t("search_placeholder") || "Tìm kiếm bác sĩ theo tên, chuyên khoa..."
                  }
                  className="pl-11 h-12 rounded-xl bg-white border border-slate-200 shadow-sm focus-visible:ring-1 focus-visible:ring-primary/20 text-base"
                />
              </div>
              <Button
                type="submit"
                disabled={!searchInput.trim()}
                className={`h-12 px-6 rounded-xl bg-primary text-base font-semibold text-white hover:bg-primary/95 shadow-md transition-all ${
                  !searchInput.trim() ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer"
                }`}
              >
                {t("search_button") || "Tìm kiếm"}
              </Button>
            </form>

            {/* Specialty Filter Scrollable Chips */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                <Filter className="h-3.5 w-3.5" />
                <span>{t("filter_specialty") || "Chuyên khoa:"}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1 overflow-x-auto pb-1 no-scrollbar">
                <button
                  type="button"
                  onClick={() => handleSpecialtySelect("")}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 border cursor-pointer ${!specialtyId
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                >
                  {t("all_specialties") || "Tất cả"}
                </button>
                {specialties.map((spec) => (
                  <button
                    key={spec.id}
                    type="button"
                    onClick={() => handleSpecialtySelect(spec.id)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 border whitespace-nowrap cursor-pointer ${specialtyId === spec.id
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                  >
                    {spec.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Result Heading */}
          {q && (
            <div className="mb-6 text-sm text-slate-500 font-medium">
              {t("search_results_for") || "Kết quả tìm kiếm cho:"} <span className="text-primary font-semibold">"{q}"</span> ({doctors.length} {t("results") || "kết quả"})
            </div>
          )}

          {isDoctorsLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <Card key={idx} className="flex flex-col overflow-hidden border-none shadow-sm animate-pulse h-[380px]">
                  <div className="relative aspect-square w-full bg-slate-200" />
                  <CardHeader className="p-4 pb-2 space-y-2">
                    <div className="h-5 bg-slate-200 rounded w-2/3" />
                    <div className="h-4 bg-slate-200 rounded w-1/3" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-4">
                    <div className="h-4 bg-slate-200 rounded w-full" />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-10 bg-slate-200 rounded" />
                      <div className="h-10 bg-slate-200 rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : doctors.length > 0 ? (
            <Carousel opts={{ align: "start", loop: false }} className="w-full">
              <CarouselContent className="-ml-4">
                {doctors.map((doctor) => (
                  <CarouselItem key={doctor.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="overflow-hidden border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group h-full flex flex-col p-0 gap-0 relative cursor-pointer">
                      <div className="relative aspect-square overflow-hidden bg-slate-100 flex-none">
                        {doctor.image || doctor.avatar ? (
                          <Image
                            src={doctor.image || doctor.avatar || ""}
                            alt={doctor.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-slate-300">
                            <User className="h-20 w-20" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3 z-10">
                          <Badge className="bg-white/95 text-primary backdrop-blur-sm border-none shadow-sm font-semibold">
                            {doctor.specialty?.name || t(DOCTOR_I18N_KEYS.defaultSpecialty)}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="p-4 pt-5 pb-2 flex-1">
                        <Link href={`/doctor/${doctor.id}`} className="after:absolute after:inset-0 after:z-0">
                          <CardTitle className="text-base sm:text-lg font-bold group-hover:text-primary transition-colors line-clamp-1 relative z-10">{doctor.name}</CardTitle>
                        </Link>
                        {doctor.clinic?.name && (
                          <p className="text-xs text-slate-400 font-medium line-clamp-1 mt-0.5 relative z-10">{doctor.clinic.name}</p>
                        )}
                        {(Number(doctor.reviewCount || 0) > 0 && Number(doctor.rating || 0) > 0) ? (
                          <div className="flex items-center gap-1 text-sm text-amber-500 font-medium mt-1 relative z-10">
                            <Star className="h-4 w-4 fill-current" />
                            <span>{doctor.rating}</span>
                            <span className="text-muted-foreground text-xs ml-1">({doctor.reviewCount} {t(DOCTOR_I18N_KEYS.medicalVisitCount)})</span>
                          </div>
                        ) : null}
                      </CardHeader>
                      <CardContent className="p-4 pt-0 flex-none flex flex-col gap-3 relative z-10">
                        <p className="text-xs text-slate-400 font-medium italic">
                          {doctor.experience}+ {t(DOCTOR_I18N_KEYS.yearsExp)}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" className="h-10 w-full text-xs font-semibold bg-transparent cursor-pointer" asChild>
                            <Link href={`/doctor/${doctor.id}`}>
                              {t(DOCTOR_I18N_KEYS.viewDetail)}
                            </Link>
                          </Button>
                          <Button className="h-10 w-full text-xs font-semibold bg-primary hover:bg-primary/90 text-white shadow-sm transition-all active:scale-95 cursor-pointer" asChild>
                            <Link href={`${ROUTES.BOOKING}?doctorId=${doctor.id}&clinicId=${doctor.clinic?.id || ""}&specialtyId=${doctor.specialty?.id || ""}`}>
                              {t(DOCTOR_I18N_KEYS.bookNow)}
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {doctors.length > 3 && <SectionCarouselArrows />}
            </Carousel>
          ) : (
            <Card className="w-full py-16 flex flex-col items-center justify-center text-center bg-white border border-slate-100 rounded-2xl">
              <Search className="h-10 w-10 text-slate-300 mb-4" />
              <p className="text-slate-500 text-base font-semibold mb-1">
                {t("no_doctors_found") || "Không tìm thấy bác sĩ nào"}
              </p>
              <p className="text-slate-400 text-sm max-w-md">
                {t("no_doctors_hint") || "Hãy thử tìm kiếm với từ khóa khác hoặc lọc theo chuyên khoa khác."}
              </p>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
