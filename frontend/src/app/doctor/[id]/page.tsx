"use client"

import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { Calendar, User, MapPin, Star, Brain, Stethoscope, ChevronRight } from "lucide-react"
import { getDoctorDetail } from "@/api/doctors"
import { getDoctorReviews } from "@/api/reviews"
import { Header } from "@/components/Header"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"

export default function DoctorDetailPage() {
  const params = useParams<{ id: string }>()
  const doctorId = params.id

  const doctorQuery = useQuery({
    queryKey: ["doctorDetail", doctorId],
    queryFn: () => getDoctorDetail(doctorId),
    enabled: Boolean(doctorId),
  })

  const reviewsQuery = useQuery({
    queryKey: ["doctorReviews", doctorId],
    queryFn: () => getDoctorReviews(doctorId),
    enabled: !!doctorQuery.data,
  })

  if (doctorQuery.isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">Đang tải thông tin bác sĩ...</main>
      </div>
    )
  }

  if (doctorQuery.isError || !doctorQuery.data) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center">
          <p className="mb-4 text-xl font-bold">Không tìm thấy bác sĩ</p>
          <Link href="/doctors">
            <Button>Quay về danh sách</Button>
          </Link>
        </main>
      </div>
    )
  }

  const doctor = doctorQuery.data

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/20 py-8">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-6 flex items-center text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-primary">Trang chủ</Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <Link href={`/clinic/${doctor.clinic?.id}`} className="transition-colors hover:text-primary">{doctor.clinic?.name || "Phòng khám"}</Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <span className="font-medium text-foreground">{doctor.name}</span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-6 md:col-span-2">
              <Card className="overflow-hidden border-0 shadow-md">
                <div className="h-32 bg-primary/10" />
                <CardContent className="relative p-6 pt-0">
                  <div className="flex flex-col items-start gap-6 sm:flex-row">
                    <div className="-mt-16 h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-background bg-background shadow-sm">
                      <img
                        src={doctor.avatar || "/modern-clinic-.jpg"}
                        alt={doctor.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 pt-2 sm:pt-4">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <h1 className="text-2xl font-bold sm:text-3xl">{doctor.name}</h1>
                        <Badge variant={doctor.isAvailable ? "default" : "secondary"} className={doctor.isAvailable ? "bg-success hover:bg-success/90" : ""}>
                          {doctor.isAvailable ? "Đang nhận bệnh" : "Tạm ngưng"}
                        </Badge>
                      </div>

                      <p className="mt-1 flex items-center font-medium text-primary">
                        <Brain className="mr-1.5 h-4 w-4" /> Chuyên khoa {doctor.specialty?.name}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Stethoscope className="mr-1.5 h-4 w-4" /> {doctor.experience} năm kinh nghiệm
                        </span>
                        <span className="flex items-center">
                          <Star className="mr-1 h-4 w-4 fill-yellow-500 text-yellow-500" />
                          <span className="mx-1 font-semibold text-foreground">{doctor.rating > 0 ? doctor.rating : "5.0"}</span>
                          ({doctor.reviewCount} đánh giá)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Giới thiệu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none whitespace-pre-wrap text-muted-foreground">
                    {doctor.bio || "Bác sĩ chưa cập nhật thông tin giới thiệu chi tiết."}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Phản hồi từ bệnh nhân</CardTitle>
                    <div className="flex items-center">
                      <Star className="mr-1 h-5 w-5 fill-yellow-500 text-yellow-500" />
                      <span className="text-lg font-bold">{doctor.rating > 0 ? doctor.rating : "5.0"}</span>
                      <span className="ml-1 text-muted-foreground">/ 5</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {reviewsQuery.isLoading ? (
                    <div className="py-4 text-center text-muted-foreground">Đang tải đánh giá...</div>
                  ) : !reviewsQuery.data || reviewsQuery.data.items?.length === 0 ? (
                    <div className="rounded-lg bg-muted/20 py-8 text-center">
                      <p className="text-muted-foreground">Chưa có đánh giá nào cho bác sĩ này.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {(reviewsQuery.data.items || []).map((review: any) => (
                        <div key={review.id} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="mb-2 flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted">
                                {review.user?.avatar ? (
                                  <img src={review.user.avatar} className="h-full w-full object-cover" alt={review.user?.name || "User"} />
                                ) : (
                                  <User className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-semibold">{review.user?.name}</p>
                                <p className="text-xs text-muted-foreground">{format(new Date(review.createdAt), "dd/MM/yyyy HH:mm")}</p>
                              </div>
                            </div>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3.5 w-3.5 ${star <= review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground/30"}`}
                                />
                              ))}
                            </div>
                          </div>
                          {review.comment && <p className="ml-13 mt-2 text-sm leading-relaxed text-foreground">{review.comment}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="sticky top-24 border-primary/20 shadow-md">
                <CardHeader className="bg-primary/5 pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    Đặt lịch khám
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{doctor.clinic?.name}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{doctor.clinic?.address || "Đang cập nhật địa chỉ"}</p>
                      </div>
                    </div>
                  </div>

                  <Link href={`/booking?doctorId=${doctor.id}&clinicId=${doctor.clinic?.id || ""}&specialtyId=${doctor.specialty?.id || ""}`}>
                    <Button className="h-12 w-full bg-primary text-base">Đặt lịch ngay</Button>
                  </Link>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Miễn phí đặt lịch. Thanh toán tại cơ sở.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
