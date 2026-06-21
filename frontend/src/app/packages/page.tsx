"use client"

import { Header } from "@/components/Header"
import { PackagesSection } from "@/features/home/components/PackagesSection"

export default function PackagesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-slate-50">
        <PackagesSection hideViewAll={true} />
      </main>
    </div>
  )
}
