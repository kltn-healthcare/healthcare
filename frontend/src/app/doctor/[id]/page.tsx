"use client"

import { useQuery } from "@tanstack/react-query"
import { getDoctorDetail } from "@/api/doctors"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Calendar, User, MapPin, Star, Clock, Brain, Stethoscope, ChevronRight } from "lucide-react"
import Link from "next/link"
import { getDoctorReviews } from "@/api/reviews"
import { format } from "date-fns"

export default function DoctorDetailPage({ params }: { params: { id: string } }) {
  const doctorQuery = useQuery({
    queryKey: ["doctorDetail", params.id],
    queryFn: () => getDoctorDetail(params.id),
  })

  const reviewsQuery = useQuery({
    queryKey: ["doctorReviews", params.id],
    queryFn: () => getDoctorReviews(params.id),
    enabled: !!doctorQuery.data,
  })

  if (doctorQuery.isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">Đang tải thông tin bác sĩ...</main>
        <Footer />
      </div>
    )
  }

  if (doctorQuery.isError || !doctorQuery.data) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <p className="text-xl font-bold mb-4">Không tìm thấy bác sĩ</p>
          <Link href="/clinics">
            <Button>Quay về danh sách</Button>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const doctor = doctorQuery.data

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/20 py-8">
        <div className="container mx-auto max-w-5xl px-4">
          
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href={`/clinic/${doctor.clinic?.id}`} className="hover:text-primary transition-colors">{doctor.clinic?.name || "Phòng khám"}</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-foreground font-medium">{doctor.name}</span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Left Column: Doctor Profile Overview */}
            <div className="md:col-span-2 space-y-6">
              <Card className="overflow-hidden border-0 shadow-md">
                <div className="h-32 bg-primary/10"></div>
                <CardContent className="p-6 pt-0 relative">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="h-32 w-32 shrink-0 rounded-full border-4 border-background overflow-hidden -mt-16 bg-background shadow-sm">
                      <img 
                        src={doctor.avatar || "/modern-clinic-.jpg"} 
                        alt={doctor.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="pt-2 sm:pt-4 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h1 className="text-2xl sm:text-3xl font-bold">{doctor.name}</h1>
                        <Badge variant={doctor.isAvailable ? "default" : "secondary"} className={doctor.isAvailable ? "bg-success hover:bg-success/90" : ""}>
                          {doctor.isAvailable ? "Đang nhận bệnh" : "Tạm ngưng"}
                        </Badge>
                      </div>
                      
                      <p className="text-primary font-medium mt-1 flex items-center">
                        <Brain className="mr-1.5 h-4 w-4" /> Chuyên khoa {doctor.specialty?.name}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Stethoscope className="mr-1.5 h-4 w-4" /> {doctor.experience} năm kinh nghiệm
                        </span>
                        <span className="flex items-center">
                          <Star className="mr-1 h-4 w-4 text-yellow-500 fill-yellow-500" /> 
                          <span className="font-semibold text-foreground mx-1">{doctor.rating > 0 ? doctor.rating : "5.0"}</span> 
                          ({doctor.reviewCount} đánh giá)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bio & Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Giới Thiệu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
                    {doctor.bio || "Bác sĩ chưa cập nhật thông tin giới thiệu chi tiết."}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Phản Hồi Từ Bệnh Nhân</CardTitle>
                    <div className="flex items-center">
                      <Star className="mr-1 h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <span className="text-lg font-bold">{doctor.rating > 0 ? doctor.rating : "5.0"}</span>
                      <span className="ml-1 text-muted-foreground">/ 5</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {reviewsQuery.isLoading ? (
                    <div className="text-center py-4 text-muted-foreground">Đang tải đánh giá...</div>
                  ) : !reviewsQuery.data || reviewsQuery.data.items?.length === 0 ? (
                    <div className="text-center py-8 bg-muted/20 rounded-lg">
                      <p className="text-muted-foreground">Chưa có đánh giá nào cho bác sĩ này.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {(reviewsQuery.data.items || []).map((review: any) => (
                        <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 overflow-hidden rounded-full bg-muted flex items-center justify-center">
                                {review.user?.avatar ? (
                                  <img src={review.user.avatar} className="h-full w-full object-cover" />
                                ) : (
                                  <User className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <p className="font-semibold text-sm">{review.user?.name}</p>
                                <p className="text-xs text-muted-foreground">{format(new Date(review.createdAt), "dd/MM/yyyy HH:mm")}</p>
                              </div>
                            </div>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`h-3.5 w-3.5 ${star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/30"}`} 
                                />
                              ))}
                            </div>
                          </div>
                          {review.comment && (
                            <p className="text-sm mt-2 ml-13 text-foreground leading-relaxed">{review.comment}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

            </div>

            {/* Right Column: Booking & Clinic Info */}
            <div className="space-y-6">
              <Card className="sticky top-24 border-primary/20 shadow-md">
                <CardHeader className="bg-primary/5 pb-4">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    Đặt Lịch Khám
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">{doctor.clinic?.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">{doctor.clinic?.address || "Đang cập nhật địa chỉ"}</p>
                      </div>
                    </div>
                  </div>

                  <Link href={`/booking?doctorId=${doctor.id}&clinicId=${doctor.clinic?.id || ""}`}>
                    <Button className="w-full bg-primary text-base h-12">
                      Đặt Lịch Ngay
                    </Button>
                  </Link>
                  <p className="text-xs text-center text-muted-foreground mt-3">
                    Miễn phí đặt lịch. Thanh toán tại cơ sở.
                  </p>
                </CardContent>
              </Card>

              {/* Services List */}
              {doctor.services && doctor.services.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Bảng Giá Dịch Vụ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {doctor.services.map((service: any) => (
                        <div key={service.id} className="flex items-start justify-between text-sm py-2 border-b last:border-0">
                          <div>
                            <p className="font-medium">{service.name}</p>
                            <p className="text-xs text-muted-foreground">{service.durationMinutes} phút</p>
                          </div>
                          <span className="font-semibold text-primary shrink-0 ml-2 whitespace-nowrap">
                            {service.price.toLocaleString()} {service.currency}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
