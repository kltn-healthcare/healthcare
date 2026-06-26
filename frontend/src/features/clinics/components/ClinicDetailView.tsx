"use client"

import { Header } from "@/components/Header"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Star, MapPin, Clock, Phone, Globe, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useClinicDetail } from "../hooks/useClinics"

interface ClinicDetailViewProps {
  id: string
}

export function ClinicDetailView({ id }: Readonly<ClinicDetailViewProps>) {
  const { data: clinic, isLoading } = useClinicDetail(id)

  const formatPrice = (price: number) => new Intl.NumberFormat("vi-VN").format(price) + "đ"

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="relative h-80 w-full">
          <Image
            src={clinic?.image || "/modern-healthcare-clinic-interior-reception.jpg"}
            alt={clinic?.name || "Clinic"}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-20 mb-8">
            <Card className="shadow-xl">
              <CardHeader>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <CardTitle className="text-2xl">{clinic?.name ?? (isLoading ? "Đang tải..." : "Không tìm thấy")}</CardTitle>
                      <Badge className="bg-success text-white">
                        <span className="mr-1">●</span> Đang mở cửa
                      </Badge>
                    </div>
                    {(Number(clinic?.reviewCount || 0) > 0 && Number(clinic?.rating || 0) > 0) ? (
                      <div className="mb-4 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="text-xl font-semibold">{clinic?.rating}</span>
                        </div>
                        <span className="text-muted-foreground">({clinic?.reviewCount} đánh giá)</span>
                      </div>
                    ) : null}
                    <p className="text-muted-foreground">
                      {clinic?.description ||
                        "Phòng khám cung cấp các dịch vụ chăm sóc sức khỏe chất lượng, đội ngũ bác sĩ giàu kinh nghiệm."}
                    </p>
                  </div>
                  <Link href={`/booking?clinicId=${clinic?.id}`}>
                    <Button size="lg" className="bg-primary">
                      <Clock className="mr-2 h-5 w-5" />
                      Đặt lịch khám
                    </Button>
                  </Link>
                </div>
              </CardHeader>
            </Card>
          </div>

          <div className="grid gap-6">
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Thông tin liên hệ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Địa chỉ</p>
                      <p className="text-muted-foreground">{clinic?.address || "—"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Điện thoại</p>
                      <p className="text-muted-foreground">{clinic?.phone || "—"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Website</p>
                      <p className="text-muted-foreground">{clinic?.website || "—"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Giờ làm việc</p>
                      <p className="text-muted-foreground">{clinic?.openingHours || "—"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Gói khám tại phòng khám</CardTitle>
                </CardHeader>
                <CardContent>
                  {clinic?.healthPackages?.length ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {clinic.healthPackages.map((pkg) => (
                        <div key={pkg.id} className="flex min-h-[300px] flex-col overflow-hidden rounded-lg border bg-background transition-all hover:border-primary/40 hover:shadow-md">
                          <div className="flex min-h-[110px] flex-col gap-3 bg-muted/30 p-4">
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="line-clamp-2 text-lg font-semibold leading-snug">{pkg.name}</h3>
                              {pkg.isPopular ? <Badge className="shrink-0 bg-primary text-white">Phổ biến</Badge> : null}
                            </div>
                            <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{pkg.shortDescription || pkg.description}</p>
                            {pkg.specialty?.name ? (
                              <div className="mt-auto text-xs font-medium text-primary">{pkg.specialty.name}</div>
                            ) : null}
                          </div>
                          <div className="flex flex-1 flex-col p-4">
                            <div className="mb-4">
                              <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
                                <span className="text-2xl font-bold text-primary">{formatPrice(pkg.promotionalPrice || pkg.price)}</span>
                                <span className="pb-1 text-sm text-muted-foreground">/ người</span>
                              </div>
                              {pkg.promotionalPrice ? (
                                <div className="mt-1 text-sm text-muted-foreground line-through">{formatPrice(pkg.price)}</div>
                              ) : null}
                            </div>
                            <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                              {pkg.features.slice(0, 3).map((feature) => (
                                <li key={feature} className="flex gap-2">
                                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                  <span className="leading-5">{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <Button className="h-10 w-full bg-primary hover:bg-primary/90 cursor-pointer mt-auto" asChild>
                              <Link href={`/booking?clinicId=${clinic.id}&specialtyId=${pkg.specialtyId || ""}&packageId=${pkg.id}`}>
                                Đặt lịch
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed bg-muted/20 p-4 text-center text-sm text-muted-foreground">
                      Phòng khám chưa có gói khám đang mở bán.
                    </div>
                  )}
                </CardContent>
              </Card>
 
              <Card>
                <CardHeader>
                  <CardTitle>Đội ngũ bác sĩ</CardTitle>
                </CardHeader>
                <CardContent>
                  {clinic?.doctors?.length ? (
                    <div className="grid gap-6 sm:grid-cols-2">
                      {clinic.doctors.map((d) => (
                        <Card key={d.id} className="overflow-hidden border group transition-all hover:shadow-md hover:border-primary/50 relative cursor-pointer">
                          <div className="p-3 flex gap-3 relative z-10 pointer-events-none">
                            <div className="h-14 w-14 shrink-0 rounded-full border overflow-hidden bg-muted">
                              <img src={d.avatar || "/modern-clinic-.jpg"} className="h-full w-full object-cover" alt={d.name} />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-lg hover:text-primary transition-colors pointer-events-auto relative z-10">
                                <Link href={`/doctor/${d.id}`} className="after:absolute after:inset-0 after:z-0">{d.name}</Link>
                              </div>
                              <div className="text-sm font-medium text-primary bg-primary/10 inline-block px-2 py-0.5 rounded-sm mt-1 mb-2">
                                {d.specialty.name}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center mb-1">
                                <span className="mr-1">●</span> {d.experience} năm kinh nghiệm
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center">
                                <span className="mr-1">●</span> {d.isAvailable ? "Đang nhận bệnh" : "Tạm ngưng"}
                              </div>
                            </div>
                          </div>
                          <div className="bg-muted/30 p-3 flex justify-end gap-2 border-t relative z-10">
                            <Button variant="outline" size="sm" className="bg-background cursor-pointer" asChild>
                              <Link href={`/doctor/${d.id}`}>
                                Xem thông tin
                              </Link>
                            </Button>
                            {d.isAvailable ? (
                              <Button size="sm" className="bg-primary cursor-pointer" asChild>
                                <Link href={`/booking?doctorId=${d.id}&clinicId=${clinic.id}&specialtyId=${d.specialty.id}`}>
                                  Đặt lịch
                                </Link>
                              </Button>
                            ) : (
                              <Button size="sm" className="bg-primary" disabled>
                                Đặt lịch
                              </Button>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground p-4 bg-muted/20 rounded-lg text-center border border-dashed">
                      Chưa có dữ liệu bác sĩ tại phòng khám này.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
