import { Heart, Stethoscope, Syringe, TestTube } from "lucide-react"
import { HOME_I18N_KEYS } from "@/shared/i18n/keys"

export const HOME_SPECIALTY_CARD_STYLES = [
  { icon: Stethoscope, colors: "bg-blue-50 text-blue-600" },
  { icon: Heart, colors: "bg-rose-50 text-rose-600" },
  { icon: TestTube, colors: "bg-teal-50 text-teal-600" },
  { icon: Syringe, colors: "bg-amber-50 text-amber-600" },
] as const

export const HOME_HOW_IT_WORKS_STEPS = HOME_I18N_KEYS.howItWorks.steps

export const HOME_ARTICLE_SKELETON_IDS = ["article-skeleton-1", "article-skeleton-2", "article-skeleton-3"] as const
