"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useQuery } from "@tanstack/react-query"
import { Header } from "@/components/Header"
import { useArticleDetail } from "../hooks/useArticles"
import { ROUTES } from "@/shared/constants"
import { ARTICLE_I18N_KEYS } from "@/shared/i18n/keys"
import { useLanguage } from "@/shared/provider/LanguageProvider"
import { formatHomeDate } from "@/features/home/home.utils"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { useClinicsList } from "@/features/clinics/hooks/useClinics"
import { getDoctors } from "@/features/clinics/api/doctors.api"

interface HealthGuideDetailViewProps {
  slug: string
}

export function HealthGuideDetailView({ slug }: Readonly<HealthGuideDetailViewProps>) {
  const { t } = useTranslation("articles")
  const { language } = useLanguage()

  const articleQuery = useArticleDetail(slug)
  const clinicsQuery = useClinicsList({ limit: 3 })
  const doctorsQuery = useQuery({
    queryKey: ["health-guide-featured-doctors"],
    queryFn: () => getDoctors({ limit: 3 }),
  })

  const article = articleQuery.data

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-8 md:py-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href={ROUTES.HEALTH_GUIDE}>
            <Button variant="ghost" className="mb-4 pl-0 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t(ARTICLE_I18N_KEYS.viewAll)}
            </Button>
          </Link>

          {articleQuery.isLoading ? (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.75fr)_320px]">
              <Card className="overflow-hidden">
                <div className="h-56 animate-pulse bg-muted md:h-72" />
                <CardHeader>
                  <div className="mb-2 h-6 w-28 animate-pulse rounded bg-muted" />
                  <div className="h-8 w-full animate-pulse rounded bg-muted" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                </CardContent>
              </Card>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="h-5 w-28 animate-pulse rounded bg-muted" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                  </CardContent>
                </Card>
              </div>
            </div>
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
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.75fr)_320px]">
              <article className="overflow-hidden rounded-2xl border bg-white shadow-sm">
                <div className="relative aspect-[16/9] max-h-[380px] w-full overflow-hidden bg-muted">
                  <Image
                    src={article.image || "/placeholder-clinic.jpg"}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white md:p-7">
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <Badge className="bg-white/90 text-slate-900 hover:bg-white">{article.category}</Badge>
                      <span className="rounded-full bg-black/25 px-3 py-1 backdrop-blur">{article.readTime}</span>
                      <span className="rounded-full bg-black/25 px-3 py-1 backdrop-blur">{formatHomeDate(article.publishedAt, language)}</span>
                    </div>
                    <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight md:text-4xl">{article.title}</h1>
                  </div>
                </div>

                <div className="space-y-8 p-5 md:p-8">
                  <p className="text-base leading-8 text-slate-700 md:text-lg">
                    {article.description}
                  </p>

                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900">Checklist nhanh</h2>
                    <ul className="space-y-3 text-base leading-7 text-slate-700">
                      <li>• Chuẩn bị giấy tờ tùy thân, thẻ bảo hiểm và đơn thuốc đang dùng.</li>
                      <li>• Xác nhận có cần nhịn ăn hay tạm ngưng thuốc trước buổi khám.</li>
                      <li>• Đến sớm 10-15 phút để hoàn tất tiếp nhận.</li>
                      <li>• Ghi sẵn các câu hỏi muốn hỏi bác sĩ để không bỏ sót.</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900">Bạn nên lưu ý gì?</h2>
                    <div className="space-y-4 text-base leading-7 text-slate-700">
                      <p>
                        {article.title} phù hợp với người muốn chuẩn bị nhanh nhưng vẫn đủ thông tin trước khi đến cơ sở y tế.
                      </p>
                      <p>
                        Nếu lịch khám có xét nghiệm máu, hãy gọi lại phòng khám để xác nhận yêu cầu nhịn ăn và thời điểm uống nước.
                      </p>
                      <p>
                        Sau buổi khám, giữ lại toa thuốc và các dặn dò quan trọng để tiện theo dõi trong những ngày tiếp theo.
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Bác sĩ gợi ý</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-slate-600 max-h-[380px] overflow-y-auto pr-1.5 custom-scrollbar">
                    {doctorsQuery.data?.items?.length ? (
                      doctorsQuery.data.items.map((doctor) => (
                        <Link
                          key={doctor.id}
                          href={`/doctor/${doctor.id}`}
                          className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
                        >
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border bg-muted">
                            <Image
                              src={doctor.avatar || doctor.image || "/placeholder-clinic.jpg"}
                              alt={doctor.name}
                              width={48}
                              height={48}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="line-clamp-1 font-medium text-slate-900">{doctor.name}</p>
                            <p className="line-clamp-1 text-xs text-slate-500">{doctor.specialty?.name}</p>
                            <p className="mt-1 text-xs text-slate-500">{doctor.experience} năm kinh nghiệm</p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">Chưa có bác sĩ gợi ý.</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Phòng khám gợi ý</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 max-h-[380px] overflow-y-auto pr-1.5 custom-scrollbar">
                    {clinicsQuery.data?.items?.length ? (
                      clinicsQuery.data.items.map((clinic) => (
                        <Link
                          key={clinic.id}
                          href={`/clinic/${clinic.id}`}
                          className="flex gap-3 rounded-lg border p-2 transition-colors hover:border-primary/30 hover:bg-primary/5"
                        >
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                            <Image
                              src={clinic.image || "/placeholder-clinic.jpg"}
                              alt={clinic.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="line-clamp-2 text-sm font-medium leading-5 text-slate-900">{clinic.name}</p>
                            <p className="mt-1 text-xs text-slate-500 line-clamp-1">{clinic.address}</p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">Chưa có phòng khám gợi ý.</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Cần đặt lịch khám?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-slate-600">
                      Đặt lịch khám ngay để chủ động thời gian và không phải chờ đợi.
                    </p>
                    <Link href={ROUTES.BOOKING} className="mt-4 block">
                      <Button className="w-full bg-primary hover:bg-primary/90">Đặt lịch khám</Button>
                    </Link>
                  </CardContent>
                </Card>
              </aside>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  )
}
