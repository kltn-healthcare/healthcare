"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { ROUTES } from "@/shared/constants"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getSpecialties, type Specialty } from "@/features/clinics/api/specialties.api"
import { useTranslation } from "react-i18next"
import { HOME_I18N_KEYS } from "@/shared/i18n/keys"
import { HOME_SPECIALTY_CARD_STYLES } from "@/features/home/home.constants"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shared/ui/carousel"

export function ServicesSection() {
    const { t } = useTranslation("home")
    const [specialties, setSpecialties] = useState<Specialty[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getSpecialties()
                setSpecialties(data)
            } catch (error) {
                console.error("Error fetching specialties:", error)
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
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-lg" />
                    </div>
                </div>
            </section>
        )
    }

    if (specialties.length === 0) return null

    return (
        <section className="relative py-12 md:py-16 bg-slate-50">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 text-center md:mb-12">
                    <h2 className="mb-3 text-2xl font-bold text-balance sm:text-3xl md:mb-4">{t(HOME_I18N_KEYS.services.title)}</h2>
                    <p className="text-sm text-muted-foreground text-pretty sm:text-base">
                        {t(HOME_I18N_KEYS.services.desc)}
                    </p>
                </div>

                <Carousel opts={{ align: "start", loop: false }} className="w-full">
                    <CarouselContent className="-ml-4">
                        {specialties.map((specialty, index) => {
                            const { icon: Icon, colors } = HOME_SPECIALTY_CARD_STYLES[index % HOME_SPECIALTY_CARD_STYLES.length]
                            const [bgColor, textColor] = colors.split(" ")

                            return (
                                <CarouselItem key={specialty.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                    <Link href={`${ROUTES.CLINICS}?specialtyId=${specialty.id}`} className="h-full block">
                                        <Card className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full border-none shadow-sm">
                                            <CardHeader>
                                                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 ${bgColor} ${textColor}`}>
                                                    <Icon className="h-7 w-7" />
                                                </div>
                                                <CardTitle className="group-hover:text-primary transition-colors">{specialty.name}</CardTitle>
                                                <CardDescription className="line-clamp-2">{specialty.description || t(HOME_I18N_KEYS.services.defaultDesc)}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                    </Link>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                    {specialties.length > 3 && (
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
