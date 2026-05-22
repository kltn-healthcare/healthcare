"use client"

import { Header } from "@/components/Header"
import { useTranslation } from "react-i18next"
import { PACKAGE_I18N_KEYS } from "@/shared/i18n/keys"
import { PackagesSection } from "@/features/home/components/PackagesSection"

export default function PackagesPage() {
  const { t } = useTranslation("packages")

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-slate-50 py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-3xl font-bold">{t(PACKAGE_I18N_KEYS.title)}</h1>
            <p className="text-muted-foreground">{t(PACKAGE_I18N_KEYS.desc)}</p>
          </div>

          <PackagesSection />
        </div>
      </main>
    </div>
  )
}
