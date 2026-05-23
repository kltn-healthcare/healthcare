import { Button } from "@/shared/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import {
    CarouselPrevious,
    CarouselNext,
} from "@/shared/ui/carousel"

/* ── "Xem tất cả" / "View All" button ── */
export function SectionViewAllButton({
    href,
    label,
}: {
    href: string
    label: string
}) {
    return (
        <Link href={href} className="shrink-0">
            <Button
                variant="outline"
                size="sm"
                className="gap-1.5 rounded-full border-slate-200 text-slate-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all text-sm font-medium px-5 h-9"
            >
                {label}
                <ArrowRight className="h-3.5 w-3.5" />
            </Button>
        </Link>
    )
}

/* ── Section Header: title + subtitle + optional view-all button ── */
export function SectionHeader({
    title,
    subtitle,
    viewAllHref,
    viewAllLabel,
    center = false,
}: {
    title: string
    subtitle?: string
    viewAllHref?: string
    viewAllLabel?: string
    center?: boolean
}) {
    if (center) {
        return (
            <div className="mb-8 text-center md:mb-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
                {subtitle && (
                    <p className="mt-2 text-sm text-slate-500 sm:text-base leading-relaxed">{subtitle}</p>
                )}
            </div>
        )
    }

    return (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mb-10">
            <div className="max-w-xl">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
                {subtitle && (
                    <p className="mt-2 text-sm text-slate-500 sm:text-base leading-relaxed">{subtitle}</p>
                )}
            </div>
            {viewAllHref && viewAllLabel && (
                <SectionViewAllButton href={viewAllHref} label={viewAllLabel} />
            )}
        </div>
    )
}

/* ── Carousel navigation arrows (prev/next) ── */
export function SectionCarouselArrows() {
    return (
        <>
            <CarouselPrevious className="hidden md:flex -left-5 lg:-left-6 h-10 w-10 bg-white shadow-lg hover:bg-primary hover:text-white border-slate-200 hover:border-primary disabled:hidden transition-all" />
            <CarouselNext className="hidden md:flex -right-5 lg:-right-6 h-10 w-10 bg-white shadow-lg hover:bg-primary hover:text-white border-slate-200 hover:border-primary disabled:hidden transition-all" />
        </>
    )
}
