"use client"

import { Header } from "@/components/Header"
import { useTranslation } from "react-i18next"
import { DOCTOR_I18N_KEYS } from "@/shared/i18n/keys"
import { DoctorsSection } from "@/features/home/components/DoctorsSection"

export default function DoctorsPage() {
  const { t } = useTranslation("doctors")

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-slate-50 py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-3xl font-bold">{t(DOCTOR_I18N_KEYS.title)}</h1>
            <p className="text-muted-foreground">{t(DOCTOR_I18N_KEYS.desc)}</p>
          </div>

          <DoctorsSection />
        </div>
      </main>
    </div>
  )
}
