"use client"

import { Header } from "@/components/Header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useArticleCategories, useArticlesList } from "../hooks/useArticles"
import { ARTICLE_DEFAULTS, ROUTES } from "@/shared/constants"
import { ARTICLE_I18N_KEYS } from "@/shared/i18n/keys"
import { useLanguage } from "@/shared/provider/LanguageProvider"
import { formatHomeDate } from "@/features/home/home.utils"

const healthGuideSkeletonIds = [
  "health-guide-skeleton-1",
  "health-guide-skeleton-2",
  "health-guide-skeleton-3",
  "health-guide-skeleton-4",
  "health-guide-skeleton-5",
  "health-guide-skeleton-6",
]

export function HealthGuideListView() {
  const { t } = useTranslation("articles")
  const { language } = useLanguage()
  const allCategoryLabel = t(ARTICLE_I18N_KEYS.allCategory)

  const [activeCategory, setActiveCategory] = useState<string>("ALL")
  const categoryFilter = activeCategory === "ALL" ? undefined : activeCategory

  const categoriesQuery = useArticleCategories()

  const articlesQuery = useArticlesList({
    category: categoryFilter,
    page: 1,
    limit: ARTICLE_DEFAULTS.PAGE_LIMIT,
  })

  const categories = useMemo(
    () => [{ id: "ALL", name: allCategoryLabel }, ...(categoriesQuery.data?.items || []).map((c) => ({ id: c, name: c }))],
    [categoriesQuery.data?.items, allCategoryLabel],
  )

  const articles = articlesQuery.data?.items ?? []

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">{t(ARTICLE_I18N_KEYS.title)}</h1>
            <p className="text-muted-foreground">{t(ARTICLE_I18N_KEYS.desc)}</p>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className="cursor-pointer transition-colors hover:bg-primary/10 hover:text-primary"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Badge>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articlesQuery.isLoading
              ? healthGuideSkeletonIds.map((skeletonId) => (
                <Card key={skeletonId} className="h-full overflow-hidden">
                  <div className="h-48 animate-pulse bg-muted" />
                  <CardHeader>
                    <div className="mb-2 h-5 w-24 animate-pulse rounded bg-muted" />
                    <div className="h-6 w-full animate-pulse rounded bg-muted" />
                    <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                  </CardContent>
                </Card>
              ))
              : articles.map((article) => (
                <Link key={article.id} href={`${ROUTES.HEALTH_GUIDE}/${article.slug}`} className="block h-full">
                  <Card className="h-full flex flex-col p-0 gap-0 overflow-hidden transition-all shadow-sm hover:-translate-y-1 hover:shadow-lg group">
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
                      <CardTitle className="line-clamp-2 leading-tight group-hover:text-primary transition-colors">{article.title}</CardTitle>
                      <CardDescription className="line-clamp-2 mt-1">{article.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-5 pt-0 flex-none">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{article.readTime}</span>
                        </div>
                        <span>{formatHomeDate(article.publishedAt, language)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>

          {!articlesQuery.isLoading && articles.length === 0 ? (
            <p className="mt-8 text-sm text-muted-foreground">
              {t(activeCategory === "ALL" ? ARTICLE_I18N_KEYS.empty : ARTICLE_I18N_KEYS.emptyCategory)}
            </p>
          ) : null}
        </div>
      </main>
    </div>
  )
}
