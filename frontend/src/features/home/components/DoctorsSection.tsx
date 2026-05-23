"use client"

import { useEffect, useState } from "react"
import { getDoctors } from "@/features/clinics/api/doctors.api"
import type { Doctor } from "@/shared/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { Star, ArrowRight, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ROUTES } from "@/shared/constants"
import { useTranslation } from "react-i18next"
import { DOCTOR_I18N_KEYS, HOME_I18N_KEYS } from "@/shared/i18n/keys"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shared/ui/carousel"

export function DoctorsSection() {
    const { t } = useTranslation("home")
    const { t: td } = useTranslation("doctors")
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getDoctors({ limit: 10 })
                setDoctors(data.items)
            } catch (error) {
                console.error("Error fetching doctors:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    if (isLoading) {
        return (
            <section className="py-12 md:py-16">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-48 items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    </div>
                </div>
            </section>
        )
    }

    if (doctors.length === 0) return null

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mb-12">
                    <div>
                        <h2 className="mb-2 text-2xl font-bold sm:text-3xl font-heading">{t(HOME_I18N_KEYS.doctors.title)}</h2>
                        <p className="text-sm text-muted-foreground sm:text-base">{t(HOME_I18N_KEYS.doctors.desc)}</p>
                    </div>
                    <Link href={ROUTES.DOCTORS} className="w-full sm:w-auto">
                        <Button variant="outline" className="gap-2 border-primary/20 text-primary hover:bg-primary/5 transition-colors">
                            {t(HOME_I18N_KEYS.doctors.viewAll)}
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <Carousel opts={{ align: "start", loop: false }} className="w-full">
                    <CarouselContent className="-ml-4">
                        {doctors.map((doctor) => (
                            <CarouselItem key={doctor.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                <Card className="overflow-hidden border-none shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group h-full flex flex-col p-0 gap-0">
                                    <Link href={`/doctor/${doctor.id}`} className="block">
                                        <div className="relative aspect-square overflow-hidden bg-slate-100 flex-none">
                                            {doctor.image || doctor.avatar ? (
                                                <Image
                                                    src={doctor.image || doctor.avatar || ""}
                                                    alt={doctor.name}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-slate-300">
                                                    <User className="h-20 w-20" />
                                                </div>
                                            )}
                                            <div className="absolute top-3 right-3">
                                                <Badge className="bg-white/90 text-primary backdrop-blur-sm border-none shadow-sm">
                                                    {doctor.specialty?.name || td(DOCTOR_I18N_KEYS.defaultSpecialty)}
                                                </Badge>
                                            </div>
                                        </div>
                                    </Link>
                                    <CardHeader className="p-4 pt-5 pb-2 flex-1">
                                        <Link href={`/doctor/${doctor.id}`}>
                                            <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">{doctor.name}</CardTitle>
                                        </Link>
                                        {(Number(doctor.reviewCount || 0) > 0 && Number(doctor.rating || 0) > 0) ? (
                                            <div className="flex items-center gap-1 text-sm text-amber-500 font-medium">
                                                <Star className="h-4 w-4 fill-current" />
                                                <span>{doctor.rating}</span>
                                                <span className="text-muted-foreground ml-1">({doctor.reviewCount} {td(DOCTOR_I18N_KEYS.medicalVisitCount)})</span>
                                            </div>
                                        ) : null}
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0 flex-none flex flex-col gap-3">
                                        <p className="text-sm text-muted-foreground line-clamp-1 italic">
                                            {doctor.experience}+ {td(DOCTOR_I18N_KEYS.yearsExp)}
                                        </p>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Link href={`/doctor/${doctor.id}`}>
                                                <Button variant="outline" className="h-11 w-full bg-transparent">
                                                    {td(DOCTOR_I18N_KEYS.viewDetail)}
                                                </Button>
                                            </Link>
                                            <Link href={`${ROUTES.BOOKING}?doctorId=${doctor.id}&clinicId=${doctor.clinic?.id || ""}&specialtyId=${doctor.specialty?.id || ""}`}>
                                                <Button className="h-11 w-full bg-primary hover:bg-primary/90 shadow-md transition-all active:scale-95">
                                                    {td(DOCTOR_I18N_KEYS.bookNow)}
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {doctors.length > 3 && (
                        <>
                            <CarouselPrevious className="hidden md:flex -left-6 lg:-left-12 bg-white shadow-xl hover:bg-primary hover:text-white border-primary/10 disabled:hidden" />
                            <CarouselNext className="hidden md:flex -right-6 lg:-right-12 bg-white shadow-xl hover:bg-primary hover:text-white border-primary/10 disabled:hidden" />
                        </>
                    )}
                </Carousel>
            </div>
        </section>
    )
}
