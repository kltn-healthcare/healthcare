"use client"

import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Check, Star, Stethoscope } from "lucide-react"
import Link from "next/link"
import { ROUTES } from "@/shared/constants"
import { useTranslation } from "react-i18next"
import { useQuery } from "@tanstack/react-query"
import { packageService } from "@/features/clinics/services/packageService"
import { HOME_I18N_KEYS, PACKAGE_I18N_KEYS } from "@/shared/i18n/keys"
import { useLanguage } from "@/shared/provider/LanguageProvider"
import { formatHomePrice } from "@/features/home/home.utils"
import { SectionHeader, SectionCarouselArrows } from "./SectionShared"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/shared/ui/carousel"

export function PackagesSection() {
    const { t } = useTranslation("home")
    const { t: tp } = useTranslation("packages")
    const { language } = useLanguage()
    const packagesQuery = useQuery({
        queryKey: ["packages", "featured"],
        queryFn: () => packageService.getAll({ limit: 6 }),
    })

    const packages = (packagesQuery.data?.data ?? []).filter((pkg, index, items) => {
        if (!pkg.specialtyId) return true
        return items.findIndex((item) => item.specialtyId === pkg.specialtyId) === index
    })

    const getBookingHref = (pkg: typeof packages[number]) => {
        const params = new URLSearchParams({ packageId: pkg.id })
        const clinicId = pkg.clinicId || pkg.clinic?.id
        if (clinicId) params.set("clinicId", clinicId)
        if (pkg.specialtyId) params.set("specialtyId", pkg.specialtyId)
        return `${ROUTES.BOOKING}?${params.toString()}`
    }

    return (
        <section id="packages" className="py-12 md:py-16 bg-[#f8fbff]">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title={t(HOME_I18N_KEYS.packages.title)}
                    subtitle={t(HOME_I18N_KEYS.packages.desc)}
                    viewAllHref={ROUTES.PACKAGES}
                    viewAllLabel={t(HOME_I18N_KEYS.packages.viewAll)}
                />

                {/* ── Cards Carousel ── */}
                <Carousel opts={{ align: "start", loop: false }} className="w-full">
                    {packagesQuery.isLoading ? (
                        <div className="flex justify-center p-8">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                        </div>
                    ) : packages.length > 0 ? (
                        <CarouselContent className="-ml-4">
                            {packages.map((pkg) => (
                                <CarouselItem key={pkg.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                    <Link href={getBookingHref(pkg)} className="h-full block">
                                        <Card className="relative flex h-full flex-col p-0 gap-0 rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-slate-200 group cursor-pointer">
                                            <CardHeader className="px-5 pt-5 pb-0">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary transition-transform group-hover:scale-110">
                                                        <Stethoscope className="h-5 w-5" />
                                                    </div>
                                                    {pkg.isPopular && (
                                                        <Badge className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                                            <Star className="mr-1 h-3 w-3 fill-amber-400 text-amber-400" />
                                                            {tp(PACKAGE_I18N_KEYS.popularBadge)}
                                                        </Badge>
                                                    )}
                                                </div>
                                            <CardTitle className="text-base font-semibold text-slate-800 line-clamp-2 min-h-[2.75rem] leading-snug group-hover:text-primary transition-colors">
                                                {pkg.name}
                                            </CardTitle>
                                            <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 min-h-[2rem] leading-relaxed">
                                                {pkg.shortDescription || pkg.description}
                                            </p>
                                        </CardHeader>

                                        {/* Content: clinic + price + features */}
                                        <CardContent className="flex-1 px-5 pt-4 pb-0 space-y-4">
                                            {/* Clinic name */}
                                            {pkg.clinic?.name && (
                                                <div className="text-xs font-medium text-primary/80 flex items-center gap-1.5">
                                                    <span className="inline-block h-1 w-1 rounded-full bg-primary/60" />
                                                    {pkg.clinic.name}
                                                </div>
                                            )}

                                            {/* Divider */}
                                            <div className="border-t border-dashed border-slate-100" />

                                            {/* Price block — compact */}
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-2xl font-bold text-primary leading-none">
                                                    {formatHomePrice(pkg.promotionalPrice || pkg.price, language)}
                                                </span>
                                                <span className="text-xs text-slate-400 font-normal">
                                                    {tp(PACKAGE_I18N_KEYS.perPerson)}
                                                </span>
                                            </div>
                                            {pkg.promotionalPrice ? (
                                                <div className="text-xs text-slate-400 line-through -mt-2">
                                                    {formatHomePrice(pkg.price, language)}
                                                </div>
                                            ) : null}

                                            {/* Divider */}
                                            <div className="border-t border-dashed border-slate-100" />

                                            {/* Features list — compact */}
                                            <ul className="space-y-2">
                                                {pkg.features.slice(0, 4).map((feature, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                                                        </span>
                                                        <span className="text-xs text-slate-600 leading-snug line-clamp-1">{feature}</span>
                                                    </li>
                                                ))}
                                                {pkg.features.length > 4 && (
                                                    <li className="text-xs text-primary/70 font-medium pl-6">
                                                        + {pkg.features.length - 4} {tp(PACKAGE_I18N_KEYS.othersCount)}
                                                    </li>
                                                )}
                                            </ul>
                                        </CardContent>

                                        {/* CTA — close to content */}
                                        <CardFooter className="mt-auto px-5 pt-4 pb-5">
                                            <Button className="h-10 w-full rounded-xl bg-primary hover:bg-primary/90 shadow-sm text-sm font-semibold transition-all active:scale-[0.98]">
                                                {tp(PACKAGE_I18N_KEYS.bookNow)}
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    ) : (
                        <p className="mt-4 text-sm text-center text-muted-foreground w-full">
                            {t(HOME_I18N_KEYS.packages.empty)}
                        </p>
                    )}
                    {packages.length > 3 && <SectionCarouselArrows />}
                </Carousel>
            </div>
        </section>
    )
}
