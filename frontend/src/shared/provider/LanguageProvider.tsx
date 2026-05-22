"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import "@/shared/i18n" // Initialize i18n
import i18n from "@/shared/i18n/config"

type Language = "vi" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (vi: string, en: string) => string // Compatibility layer for old t(vi, en)
  translate: (key: string, options?: any) => string // New modular translation
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { t: i18nTranslate } = useTranslation()
  const [language, setLanguageState] = useState<Language>("vi")

  const setLanguage = (lang: Language) => {
    i18n.changeLanguage(lang)
    window.localStorage.setItem("i18nextLng", lang)
    setLanguageState(lang)
  }

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem("i18nextLng")
    if (storedLanguage === "vi" || storedLanguage === "en") {
      i18n.changeLanguage(storedLanguage)
      setLanguageState(storedLanguage)
    } else {
      setLanguageState(i18n.language as Language)
    }

    const handleLanguageChanged = (lng: string) => {
      setLanguageState(lng as Language)
    }

    i18n.on("languageChanged", handleLanguageChanged)
    return () => {
      i18n.off("languageChanged", handleLanguageChanged)
    }
  }, [])

  // Backward compatibility t(vi, en)
  const tCompatibility = (vi: string, en: string) => {
    return language === "vi" ? vi : en
  }

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t: tCompatibility, 
      translate: i18nTranslate 
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
