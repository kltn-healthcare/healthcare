"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Search, Check, Hospital, Stethoscope, User, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ROUTES } from "@/shared/constants"
import { useTranslation } from "react-i18next"
import { HOME_I18N_KEYS } from "@/shared/i18n/keys"
import { useRouter } from "next/navigation"
import { getDoctors } from "@/features/clinics/api/doctors.api"
import { getClinics } from "@/features/clinics/api/clinics.api"
import { getSpecialties } from "@/features/clinics/api/specialties.api"

export function HeroSection() {
    const { t } = useTranslation("home")
    const router = useRouter()

    const [isMounted, setIsMounted] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [activeFilter, setActiveFilter] = useState<"all" | "doctor" | "clinic" | "specialty">("all")
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isSearching, setIsSearching] = useState(false)

    const [searchResults, setSearchResults] = useState<{
        doctors: any[]
        clinics: any[]
        specialties: any[]
    }>({ doctors: [], clinics: [], specialties: [] })

    const searchContainerRef = useRef<HTMLDivElement>(null)
    const inputRowRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Portal dropdown position — fixed to viewport
    const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({})

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const text = (key: string, fallback: string) => (isMounted ? t(key) : fallback)

    // Calculate dropdown position + maxHeight relative to viewport
    const updateDropdownPosition = useCallback(() => {
        if (!inputRowRef.current) return
        const rect = inputRowRef.current.getBoundingClientRect()
        const spaceBelow = window.innerHeight - rect.bottom - 16 // 16px buffer from bottom
        setDropdownStyle({
            position: "fixed",
            top: rect.bottom + 6,
            left: rect.left,
            width: rect.width,
            maxHeight: Math.min(320, Math.max(spaceBelow, 120)), // at least 120px, max 320px
            overflowY: "auto",
            overflowX: "hidden",
            zIndex: 9999,
        })
    }, [])

    // Recalculate on scroll / resize while open
    useEffect(() => {
        if (!isDropdownOpen) return
        updateDropdownPosition()
        const onUpdate = () => updateDropdownPosition()
        window.addEventListener("scroll", onUpdate, true)
        window.addEventListener("resize", onUpdate)
        return () => {
            window.removeEventListener("scroll", onUpdate, true)
            window.removeEventListener("resize", onUpdate)
        }
    }, [isDropdownOpen, updateDropdownPosition])

    // Click outside → close
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node
            const inSearch = searchContainerRef.current?.contains(target)
            const inDropdown = dropdownRef.current?.contains(target)
            if (!inSearch && !inDropdown) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchValue.trim().length >= 1) {
                performLiveSearch(searchValue.trim())
            } else {
                setSearchResults({ doctors: [], clinics: [], specialties: [] })
            }
        }, 300)
        return () => clearTimeout(timer)
    }, [searchValue])

    const performLiveSearch = async (term: string) => {
        setIsSearching(true)
        try {
            const [doctorsData, clinicsData, specialtiesData] = await Promise.all([
                getDoctors({ q: term, limit: 5 }),
                getClinics({ q: term, limit: 5 }),
                getSpecialties()
            ])
            const filteredSpecialties = (specialtiesData || [])
                .filter(spec => spec.name.toLowerCase().includes(term.toLowerCase()))
                .slice(0, 5)
            setSearchResults({
                doctors: doctorsData?.items || [],
                clinics: clinicsData?.items || [],
                specialties: filteredSpecialties
            })
        } catch (error) {
            console.error("Live search failed:", error)
        } finally {
            setIsSearching(false)
        }
    }

    const handleSearch = () => {
        if (!searchValue.trim()) {
            if (activeFilter === "clinic") {
                router.push(ROUTES.CLINICS)
            } else {
                router.push(ROUTES.DOCTORS)
            }
            return
        }
        const term = encodeURIComponent(searchValue.trim())
        if (activeFilter === "clinic") {
            router.push(`${ROUTES.CLINICS}?q=${term}`)
        } else {
            router.push(`${ROUTES.DOCTORS}?q=${term}`)
        }
        setIsDropdownOpen(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSearch()
    }

    const filteredResults = {
        specialties: activeFilter === "all" || activeFilter === "specialty" ? searchResults.specialties : [],
        clinics: activeFilter === "all" || activeFilter === "clinic" ? searchResults.clinics : [],
        doctors: activeFilter === "all" || activeFilter === "doctor" ? searchResults.doctors : []
    }

    const hasResults =
        filteredResults.specialties.length > 0 ||
        filteredResults.clinics.length > 0 ||
        filteredResults.doctors.length > 0

    const showDropdown = isDropdownOpen && searchValue.trim().length >= 1 && isMounted

    /* ── Portal Dropdown ────────────────────────────────────── */
    const dropdownPortal = showDropdown
        ? createPortal(
              <div
                  ref={dropdownRef}
                  className="bg-white border border-slate-200 shadow-2xl rounded-2xl"
                  style={dropdownStyle}
              >
                  {isSearching ? (
                      <div className="flex items-center justify-center py-8 gap-2 text-slate-400">
                          <Loader2 className="h-5 w-5 animate-spin text-primary" />
                          <span className="text-sm font-medium">Đang tìm kiếm...</span>
                      </div>
                  ) : hasResults ? (
                      <div className="p-2 space-y-1">
                          {/* Specialties */}
                          {filteredResults.specialties.length > 0 && (
                              <div className="space-y-0.5">
                                  <div className="px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                      <Stethoscope className="h-3.5 w-3.5 text-primary" />
                                      <span>{text(HOME_I18N_KEYS.hero.groupSpecialties, "Chuyên khoa")}</span>
                                  </div>
                                  {filteredResults.specialties.map((spec) => (
                                      <Link key={spec.id} href={`${ROUTES.DOCTORS}?specialtyId=${spec.id}`}
                                          onClick={() => setIsDropdownOpen(false)}
                                          className="flex items-center px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-primary/5 hover:text-primary transition-all">
                                          {spec.name}
                                      </Link>
                                  ))}
                              </div>
                          )}
                          {/* Clinics */}
                          {filteredResults.clinics.length > 0 && (
                              <div className="space-y-0.5">
                                  {filteredResults.specialties.length > 0 && <div className="mx-3 border-t border-slate-100 my-1" />}
                                  <div className="px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                      <Hospital className="h-3.5 w-3.5 text-primary" />
                                      <span>{text(HOME_I18N_KEYS.hero.groupClinics, "Phòng khám")}</span>
                                  </div>
                                  {filteredResults.clinics.map((clinic) => (
                                      <Link key={clinic.id} href={`/clinic/${clinic.id}`}
                                          onClick={() => setIsDropdownOpen(false)}
                                          className="flex flex-col px-3 py-2 rounded-xl hover:bg-primary/5 transition-all group">
                                          <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">{clinic.name}</span>
                                          <span className="text-xs text-slate-400 line-clamp-1">{clinic.address}</span>
                                      </Link>
                                  ))}
                              </div>
                          )}
                          {/* Doctors */}
                          {filteredResults.doctors.length > 0 && (
                              <div className="space-y-0.5">
                                  {(filteredResults.specialties.length > 0 || filteredResults.clinics.length > 0) && <div className="mx-3 border-t border-slate-100 my-1" />}
                                  <div className="px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                      <User className="h-3.5 w-3.5 text-primary" />
                                      <span>{text(HOME_I18N_KEYS.hero.groupDoctors, "Bác sĩ")}</span>
                                  </div>
                                  {filteredResults.doctors.map((doctor) => (
                                      <Link key={doctor.id} href={`/doctor/${doctor.id}`}
                                          onClick={() => setIsDropdownOpen(false)}
                                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-primary/5 transition-all group">
                                          <div className="relative h-8 w-8 rounded-full overflow-hidden bg-slate-100 shrink-0">
                                              {doctor.image || doctor.avatar ? (
                                                  <Image src={doctor.image || doctor.avatar || ""} alt={doctor.name} fill className="object-cover" />
                                              ) : (
                                                  <div className="flex h-full w-full items-center justify-center text-slate-300">
                                                      <User className="h-4 w-4" />
                                                  </div>
                                              )}
                                          </div>
                                          <div className="flex flex-col min-w-0">
                                              <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors truncate">{doctor.name}</span>
                                              <span className="text-xs text-slate-400 truncate">
                                                  {doctor.specialty?.name || "Bác sĩ"} • {doctor.experience}+ năm kinh nghiệm
                                              </span>
                                          </div>
                                      </Link>
                                  ))}
                              </div>
                          )}
                      </div>
                  ) : (
                      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                          <Search className="h-7 w-7 text-slate-300 mb-2" />
                          <p className="text-sm font-medium text-slate-500">
                              {text(HOME_I18N_KEYS.hero.searchNoResults, "Không tìm thấy kết quả")}
                          </p>
                      </div>
                  )}
              </div>,
              document.body
          )
        : null

    /* ── Render ──────────────────────────────────────────────── */
    return (
        <section className="relative z-10 bg-gradient-to-br from-blue-50 via-white to-teal-50 py-10 md:py-16">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-4xl xl:text-5xl">
                                {text(HOME_I18N_KEYS.hero.title, "Book appointments with trusted doctors")}
                            </h1>
                            <p className="text-base text-slate-500 text-pretty sm:text-lg leading-relaxed">
                                {text(HOME_I18N_KEYS.hero.desc, "Find the right doctors, clinics, and checkup packages in just a few minutes.")}
                            </p>
                        </div>

                        {/* Search Container */}
                        <div ref={searchContainerRef} className="space-y-3">
                            <div ref={inputRowRef}>
                                <div className="flex flex-col gap-2 rounded-2xl border bg-white p-3 shadow-xl sm:flex-row sm:items-center sm:gap-3 sm:p-2.5">
                                    <div className="flex flex-1 items-center gap-2">
                                        <Search className="ml-2 h-5 w-5 shrink-0 text-muted-foreground" />
                                        <Input
                                            value={searchValue}
                                            onChange={(e) => { setSearchValue(e.target.value); setIsDropdownOpen(true) }}
                                            onFocus={() => { setIsDropdownOpen(true); updateDropdownPosition() }}
                                            onKeyDown={handleKeyDown}
                                            placeholder={text(HOME_I18N_KEYS.hero.searchPlaceholder, "Search doctors, specialties, symptoms...")}
                                            className="border-0 focus-visible:ring-0 text-base"
                                        />
                                    </div>
                                    <Button
                                        onClick={handleSearch}
                                        disabled={!searchValue.trim()}
                                        className={`w-full shrink-0 bg-primary hover:bg-primary/95 text-base font-semibold px-6 h-12 rounded-xl sm:w-auto transition-all ${
                                            !searchValue.trim() ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer"
                                        }`}
                                    >
                                        {text(HOME_I18N_KEYS.hero.searchButton, "Search")}
                                    </Button>
                                </div>
                            </div>

                            {/* Filter Chips */}
                            <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                                {(["all", "doctor", "clinic", "specialty"] as const).map((filter) => {
                                    const labels: Record<string, { key: string; fallback: string }> = {
                                        all: { key: HOME_I18N_KEYS.hero.filterAll, fallback: "Tất cả" },
                                        doctor: { key: HOME_I18N_KEYS.hero.filterDoctor, fallback: "Bác sĩ" },
                                        clinic: { key: HOME_I18N_KEYS.hero.filterClinic, fallback: "Phòng khám" },
                                        specialty: { key: HOME_I18N_KEYS.hero.filterSpecialty, fallback: "Chuyên khoa" },
                                    }
                                    return (
                                        <button key={filter} type="button" onClick={() => setActiveFilter(filter)}
                                            className={`rounded-full px-3.5 py-1.5 font-semibold transition-all duration-200 shadow-sm border cursor-pointer ${
                                                activeFilter === filter
                                                    ? "bg-primary text-white border-primary"
                                                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                                            }`}>
                                            {text(labels[filter].key, labels[filter].fallback)}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 border-t border-slate-100/80 mt-2">
                            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-3 w-3 stroke-[3]" /></span>
                                <span>{text(HOME_I18N_KEYS.hero.trustDoctors, "500+ Trusted Doctors")}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-3 w-3 stroke-[3]" /></span>
                                <span>{text(HOME_I18N_KEYS.hero.trustBookings, "20,000+ Bookings")}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-3 w-3 stroke-[3]" /></span>
                                <span>{text(HOME_I18N_KEYS.hero.trustSupport, "24/7 Support")}</span>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative mt-6 lg:mt-0 h-[300px] sm:h-[380px] lg:h-[460px] w-full">
                        <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-[0_24px_60px_-15px_rgba(15,23,42,0.15)] border-4 border-white transition-all duration-500 hover:shadow-[0_30px_70px_-10px_rgba(15,23,42,0.2)]">
                            <Image
                                src="/friendly-doctor-consulting-with-patient-in-modern-.jpg"
                                alt={text(HOME_I18N_KEYS.hero.imageAlt, "Doctor consulting with a patient in a modern clinic")}
                                fill className="object-cover" priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Dropdown rendered via Portal to document.body */}
            {dropdownPortal}
        </section>
    )
}
