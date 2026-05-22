"use client"

import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ROUTES } from "@/shared/constants"
import { useTranslation } from "react-i18next"
import { HOME_I18N_KEYS } from "@/shared/i18n/keys"

export function HeroSection() {
    const { t } = useTranslation("home")

    return (
        <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 py-8 md:py-12">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-8">
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold leading-tight text-balance text-foreground sm:text-3xl lg:text-4xl">
                            {t(HOME_I18N_KEYS.hero.title)}
                        </h1>
                        <p className="text-base text-muted-foreground text-pretty sm:text-lg">
                            {t(HOME_I18N_KEYS.hero.desc)}
                        </p>

                        <div className="flex flex-col gap-2 rounded-xl border bg-white p-3 shadow-lg sm:flex-row sm:items-center sm:gap-3 sm:p-2">
                            <div className="flex flex-1 items-center gap-2">
                                <Search className="ml-2 h-5 w-5 shrink-0 text-muted-foreground" />
                                <Input
                                    placeholder={t(HOME_I18N_KEYS.hero.searchPlaceholder)}
                                    className="border-0 focus-visible:ring-0"
                                />
                            </div>
                            <Button className="w-full shrink-0 bg-primary sm:w-auto">{t(HOME_I18N_KEYS.hero.searchButton)}</Button>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <Link href={ROUTES.CLINICS} className="w-full sm:w-auto">
                                <Button size="lg" className="w-full bg-primary text-white hover:bg-primary/90 sm:w-auto">
                                    {t(HOME_I18N_KEYS.hero.findDoctorClinic)}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="relative mt-6 lg:mt-0">
                        <div className="rounded-2xl bg-white shadow-xl overflow-hidden border border-primary/5 transition-transform hover:scale-[1.02] duration-300">
                            <div className="p-5 sm:p-6">
                                <h3 className="text-base font-bold sm:text-lg line-clamp-1 text-primary mb-1">
                                    {t(HOME_I18N_KEYS.hero.sideTitle)}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {t(HOME_I18N_KEYS.hero.sideDesc)}
                                </p>
                            </div>
                            <div className="relative aspect-[4/3] w-full">
                                <Image
                                    src="/friendly-doctor-consulting-with-patient-in-modern-.jpg"
                                    alt={t(HOME_I18N_KEYS.hero.imageAlt)}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
