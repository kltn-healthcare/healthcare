"use client"

import { useTranslation } from "react-i18next"
import { HOME_HOW_IT_WORKS_STEPS } from "@/features/home/home.constants"
import { HOME_I18N_KEYS } from "@/shared/i18n/keys"

export function HowItWorksSection() {
    const { t } = useTranslation("home")

    return (
        <section className="bg-muted/30 py-12 md:py-16">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 text-center md:mb-12">
                    <h2 className="mb-3 text-2xl font-bold sm:text-3xl md:mb-4">{t(HOME_I18N_KEYS.howItWorks.title)}</h2>
                    <p className="text-sm text-muted-foreground sm:text-base">{t(HOME_I18N_KEYS.howItWorks.desc)}</p>
                </div>

                <div className="grid gap-8 sm:grid-cols-3">
                    {HOME_HOW_IT_WORKS_STEPS.map((step, index) => (
                        <div key={step.title} className="text-center">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-white sm:h-16 sm:w-16 sm:text-2xl">
                                {index + 1}
                            </div>
                            <h3 className="mb-2 text-lg font-semibold sm:text-xl">{t(step.title)}</h3>
                            <p className="text-sm text-muted-foreground">{t(step.desc)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
