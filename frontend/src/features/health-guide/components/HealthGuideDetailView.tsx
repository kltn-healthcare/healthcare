"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Header } from "@/components/Header"
import { useArticleDetail } from "../hooks/useArticles"
import { ROUTES } from "@/shared/constants"
import { ARTICLE_I18N_KEYS } from "@/shared/i18n/keys"
import { useLanguage } from "@/shared/provider/LanguageProvider"
import { formatHomeDate } from "@/features/home/home.utils"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"

interface HealthGuideDetailViewProps {
  slug: string
}

export function HealthGuideDetailView({ slug }: HealthGuideDetailViewProps) {
  const { t } = useTranslation("articles")
  const { language } = useLanguage()

  const articleQuery = useArticleDetail(slug)

  const article = articleQuery.data

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-4xl px-4">
          <Link href={ROUTES.HEALTH_GUIDE}>
            <Button variant="ghost" className="mb-4 pl-0 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t(ARTICLE_I18N_KEYS.viewAll)}
            </Button>
          </Link>

          {articleQuery.isLoading ? (
            <Card>
              <div className="h-72 animate-pulse rounded-t-lg bg-muted" />
              <CardHeader>
                <div className="mb-2 h-6 w-28 animate-pulse rounded bg-muted" />
                <div className="h-8 w-full animate-pulse rounded bg-muted" />
              </CardHeader>
              <CardContent>
                <div className="h-4 w-48 animate-pulse rounded bg-muted" />
              </CardContent>
            </Card>
          ) : null}

          {!articleQuery.isLoading && !article ? (
            <Card>
              <CardHeader>
                <CardTitle>{t(ARTICLE_I18N_KEYS.empty)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t(ARTICLE_I18N_KEYS.emptyCategory)}</p>
              </CardContent>
            </Card>
          ) : null}

          {article ? (
            <article className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <div className="relative h-72 w-full bg-muted md:h-96">
                <Image
                  src={article.image || "/placeholder-clinic.jpg"}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-5 p-6 md:p-8">
                <Badge variant="secondary">{article.category}</Badge>

                <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">{article.title}</h1>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime}</span>
                  </div>
                  <span>{formatHomeDate(article.publishedAt, language)}</span>
                </div>

                <p className="leading-7 text-slate-700">{article.description}</p>
              </div>
            </article>
          ) : null}
        </div>
      </main>
    </div>
  )
}
