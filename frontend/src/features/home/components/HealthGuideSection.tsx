"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { getFeaturedArticles } from "@/features/health-guide/api/articles.api"
import { ARTICLE_DEFAULTS, ARTICLE_QUERY_KEYS, ROUTES } from "@/shared/constants"
import { useTranslation } from "react-i18next"
import { HOME_I18N_KEYS } from "@/shared/i18n/keys"
import { useLanguage } from "@/shared/provider/LanguageProvider"
import { HOME_ARTICLE_SKELETON_IDS } from "@/features/home/home.constants"
import { formatHomeDate } from "@/features/home/home.utils"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/shared/ui/carousel"
import { SectionHeader, SectionCarouselArrows } from "./SectionShared"

export function HealthGuideSection() {
    const { t } = useTranslation("home")
    const { language } = useLanguage()
    const featuredArticlesQuery = useQuery({
        queryKey: ARTICLE_QUERY_KEYS.FEATURED(ARTICLE_DEFAULTS.HOME_LIMIT),
        queryFn: () => getFeaturedArticles(ARTICLE_DEFAULTS.HOME_LIMIT),
    })

    const articles = featuredArticlesQuery.data?.items ?? []

    return (
        <section id="guidebook" className="py-12 md:py-16">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title={t(HOME_I18N_KEYS.articles.title)}
                    subtitle={t(HOME_I18N_KEYS.articles.desc)}
                    viewAllHref={ROUTES.HEALTH_GUIDE}
                    viewAllLabel={t(HOME_I18N_KEYS.articles.viewAll)}
                />

                <Carousel opts={{ align: "start", loop: false }} className="w-full">
                    <CarouselContent className="-ml-4">
                        {featuredArticlesQuery.isLoading
                            ? HOME_ARTICLE_SKELETON_IDS.map((skeletonId) => (
                                <CarouselItem key={skeletonId} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                    <Card className="h-full overflow-hidden">
                                        <div className="h-48 animate-pulse bg-muted" />
                                        <CardHeader>
                                            <div className="mb-2 h-5 w-20 animate-pulse rounded bg-muted" />
                                            <div className="h-6 w-full animate-pulse rounded bg-muted" />
                                            <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))
                            : articles.map((article) => (
                                <CarouselItem key={article.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                    <Link href={`${ROUTES.HEALTH_GUIDE}/${article.slug}`} className="h-full block">
                                        <Card className="h-full flex flex-col p-0 gap-0 overflow-hidden transition-shadow shadow-sm hover:shadow-lg group cursor-pointer hover:-translate-y-1">
                                            <div className="relative h-48 w-full bg-muted overflow-hidden flex-none">
                                                <Image
                                                    src={article.image || "/placeholder-clinic.jpg"}
                                                    alt={article.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                            <CardHeader className="pt-5 pb-3 flex-1">
                                                <Badge variant="secondary" className="mb-2 w-fit">
                                                    {article.category}
                                                </Badge>
                                                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">{article.title}</CardTitle>
                                                <CardDescription className="line-clamp-2 mt-2">{article.description}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="pb-5 pt-0 flex-none">
                                                <p className="text-sm text-muted-foreground">
                                                    {article.readTime} {t(HOME_I18N_KEYS.articles.dateSeparator)} {formatHomeDate(article.publishedAt, language)}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </CarouselItem>
                            ))}
                    </CarouselContent>
                    {(articles.length > 3 || featuredArticlesQuery.isLoading) && <SectionCarouselArrows />}
                </Carousel>

                {!featuredArticlesQuery.isLoading && articles.length === 0 ? (
                    <p className="mt-4 text-sm text-muted-foreground">
                        {t(HOME_I18N_KEYS.articles.empty)}
                    </p>
                ) : null}
            </div>
        </section>
    )
}
