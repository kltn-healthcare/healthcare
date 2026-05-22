"use client"

import { useEffect, useState } from "react"
import { Header, ImageUpload } from "@/components"
import { NotificationList } from "@/components/NotificationList"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Textarea } from "@/shared/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/dialog"
import { Calendar, Clock, Bell, User, Star, MapPin } from "lucide-react"
import { useAuthStore } from "@/store"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getMe } from "@/api/auth"
import { getMyBookings, cancelBooking } from "@/api/bookings"
import { updateProfile } from "@/api/users"
import { createReview } from "@/api/reviews"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useTranslation } from "react-i18next"
import { ACCOUNT_I18N_KEYS } from "@/shared/i18n/keys"

function isBookingPast(bookingDate: string, bookingTime: string) {
  const datePart = String(bookingDate).slice(0, 10)
  const bookingDateTime = new Date(`${datePart}T${bookingTime}:00`)

  if (Number.isNaN(bookingDateTime.getTime())) {
    return false
  }

  return bookingDateTime.getTime() < Date.now()
}

export default function AccountPage() {
  const { t } = useTranslation("account")
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") || "appointments"
  const [activeTab, setActiveTab] = useState(defaultTab)

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const auth = useAuthStore()
  const queryClient = useQueryClient()

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editName, setEditName] = useState("")
  const [editPhone, setEditPhone] = useState("")
  const [editAvatar, setEditAvatar] = useState("")
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    setImageError(false)
  }, [editAvatar])

  // Cancel Booking State
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [selectedCancelBookingId, setSelectedCancelBookingId] = useState("")
  const [cancelReason, setCancelReason] = useState("")

  // Review Booking State
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [selectedReviewBooking, setSelectedReviewBooking] = useState<any>(null)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState("")

  const meQuery = useQuery({
    queryKey: ["me"],
    enabled: auth.isAuthenticated,
    queryFn: getMe,
  })

  const myBookingsQuery = useQuery({
    queryKey: ["myBookings"],
    enabled: auth.isAuthenticated,
    queryFn: getMyBookings,
  })

  useEffect(() => {
    if (meQuery.data) {
      auth.setUser(meQuery.data)
      setEditName(meQuery.data.name || "")
      setEditPhone(meQuery.data.phone || "")
      setEditAvatar(meQuery.data.avatar || "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meQuery.data])

  const profileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] })
      setIsEditingProfile(false)
    },
  })

  const cancelMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => cancelBooking(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] })
      setCancelModalOpen(false)
    },
  })

  const reviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] })
      setReviewModalOpen(false)
    },
  })

  const handleUpdateProfile = () => {
    profileMutation.mutate({ name: editName, phone: editPhone, avatar: editAvatar })
  }

  const handleCancelBooking = () => {
    if (!selectedCancelBookingId) return
    cancelMutation.mutate({ id: selectedCancelBookingId, reason: cancelReason })
  }

  const handleReviewSubmit = () => {
    if (!selectedReviewBooking) return
    reviewMutation.mutate({
      bookingId: selectedReviewBooking.id,
      rating: reviewRating,
      comment: reviewComment,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30 py-12">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">{t(ACCOUNT_I18N_KEYS.pageTitle)}</h1>
            <p className="text-muted-foreground">{t(ACCOUNT_I18N_KEYS.pageDesc)}</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="appointments">
                <Calendar className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">{t(ACCOUNT_I18N_KEYS.tabs.appointments)}</span>
              </TabsTrigger>
              <TabsTrigger value="profile">
                <User className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">{t(ACCOUNT_I18N_KEYS.tabs.profile)}</span>
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">{t(ACCOUNT_I18N_KEYS.tabs.notifications)}</span>
              </TabsTrigger>
            </TabsList>

            {/* Appointments Tab */}
            <TabsContent value="appointments" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{t(ACCOUNT_I18N_KEYS.appointments.title)}</h2>
                <Link href="/clinics">
                  <Button className="bg-primary hover:bg-primary/90">{t(ACCOUNT_I18N_KEYS.appointments.bookNew)}</Button>
                </Link>
              </div>

              {!auth.isAuthenticated ? (
                <Card>
                  <CardContent className="py-8 text-center border shadow-sm">
                    <div className="mb-2 text-sm text-muted-foreground">{t(ACCOUNT_I18N_KEYS.appointments.loginRequired)}</div>
                    <Link href="/login">
                      <Button className="bg-primary">{t(ACCOUNT_I18N_KEYS.appointments.login)}</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : myBookingsQuery.isLoading ? (
                <Card>
                  <CardContent className="py-8 text-center text-sm text-muted-foreground">
                    {t(ACCOUNT_I18N_KEYS.appointments.loading)}
                  </CardContent>
                </Card>
              ) : myBookingsQuery.data?.items?.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center border shadow-sm">
                    <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                    <h3 className="mb-1 text-lg font-medium">{t(ACCOUNT_I18N_KEYS.appointments.emptyTitle)}</h3>
                    <p className="text-sm text-muted-foreground">{t(ACCOUNT_I18N_KEYS.appointments.emptyDesc)}</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {(myBookingsQuery.data?.items ?? []).map((b: any) => {
                    const isPast = isBookingPast(b.bookingDate, b.bookingTime)
                    const isPackageBooking = Boolean(b.healthPackage)
                    const canCancel =
                      (b.status === "PENDING" || b.status === "CONFIRMED") &&
                      !isPast

                    return (
                    <Card key={b.id} className="overflow-hidden border-l-4" style={{ 
                      borderLeftColor: 
                        b.status === 'COMPLETED' ? '#10b981' : 
                        b.status === 'CONFIRMED' ? '#3b82f6' : 
                        b.status === 'CANCELLED' ? '#ef4444' : '#f59e0b'
                    }}>
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-1 p-5">
                          <div className="mb-3 flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{b.clinic?.name ?? t(ACCOUNT_I18N_KEYS.appointments.fallbackClinic)}</h3>
                              <div className="text-sm text-muted-foreground flex items-center mt-1">
                                <User className="mr-1 h-3.5 w-3.5" />
                                {isPackageBooking ? t(ACCOUNT_I18N_KEYS.appointments.packageLabel) : t(ACCOUNT_I18N_KEYS.appointments.doctorLabel)}
                                <span className="font-medium text-foreground ml-1">
                                  {isPackageBooking ? b.healthPackage?.name ?? t(ACCOUNT_I18N_KEYS.appointments.emptyValue) : b.doctor?.name ?? t(ACCOUNT_I18N_KEYS.appointments.emptyValue)}
                                </span>
                              </div>
                            </div>
                            <Badge 
                              variant={b.status === 'CANCELLED' ? "destructive" : "default"}
                              className={
                                b.status === "COMPLETED" ? "bg-emerald-500 hover:bg-emerald-600" : 
                                b.status === "CONFIRMED" ? "bg-blue-500 hover:bg-blue-600" : 
                                b.status === "PENDING" ? "bg-amber-500 hover:bg-amber-600" : ""
                              }
                            >
                              {b.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 text-sm mt-4 bg-muted/30 p-3 rounded-lg border">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span className="font-medium">{String(b.bookingDate).slice(0, 10)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-primary" />
                              <span className="font-medium">{b.bookingTime}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-muted/10 p-5 flex flex-row sm:flex-col items-center justify-end sm:justify-center gap-2 border-t sm:border-t-0 sm:border-l w-full sm:w-[200px]">
                          {canCancel && (
                            <Button 
                              variant="destructive" 
                              className="w-full"
                              onClick={() => {
                                setSelectedCancelBookingId(b.id)
                                setCancelReason("")
                                setCancelModalOpen(true)
                              }}
                            >
                              {t(ACCOUNT_I18N_KEYS.appointments.cancel)}
                            </Button>
                          )}
                          {(b.status === "PENDING" || b.status === "CONFIRMED") && isPast && (
                            <Button variant="outline" className="w-full" disabled>
                              {t(ACCOUNT_I18N_KEYS.appointments.past)}
                            </Button>
                          )}
                          {b.status === "COMPLETED" && !b.review && (
                            <Button 
                              variant="outline" 
                              className="w-full border-primary text-primary hover:bg-primary/5"
                              onClick={() => {
                                setSelectedReviewBooking(b)
                                setReviewRating(5)
                                setReviewComment("")
                                setReviewModalOpen(true)
                              }}
                            >
                              <Star className="mr-2 h-4 w-4" /> {t(ACCOUNT_I18N_KEYS.appointments.review)}
                            </Button>
                          )}
                          {b.status === "COMPLETED" && b.review && (
                            <span className="text-sm font-medium text-emerald-600 flex items-center">
                              <Star className="mr-1 h-3.5 w-3.5 fill-current" /> {t(ACCOUNT_I18N_KEYS.appointments.reviewed)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Card>
                  )})}
                </div>
              )}
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>{t(ACCOUNT_I18N_KEYS.profile.title)}</CardTitle>
                  <CardDescription>{t(ACCOUNT_I18N_KEYS.profile.desc)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    {/* Left Column: Avatar view/upload */}
                    <div className="flex flex-col items-center space-y-5 rounded-lg border bg-slate-50/50 p-6 dark:bg-slate-900/50">
                      <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border bg-white shadow-xs dark:bg-slate-950">
                        {editAvatar && !imageError ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={editAvatar}
                            alt="Avatar preview"
                            className="h-full w-full object-cover"
                            onError={() => setImageError(true)}
                          />
                        ) : (
                          <div className="flex flex-col items-center space-y-2 text-center p-2 text-muted-foreground">
                            <User className="h-12 w-12 stroke-1 text-muted-foreground/60" />
                            <span className="text-[10px] leading-tight text-amber-600 dark:text-amber-500 font-medium">
                              {imageError ? "Lỗi: AWS S3 Bucket đang chặn quyền truy cập công khai (403 Forbidden)" : "Chưa có ảnh"}
                            </span>
                          </div>
                        )}
                      </div>

                      {isEditingProfile ? (
                        <div className="flex flex-col items-center w-full space-y-3">
                          <ImageUpload onUploadSuccess={(url) => setEditAvatar(url)} label="Tải ảnh lên" />
                          
                          <div className="w-full space-y-1">
                            <Label htmlFor="avatarUrl" className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">URL Ảnh đại diện</Label>
                            <Input
                              id="avatarUrl"
                              value={editAvatar}
                              onChange={(e) => setEditAvatar(e.target.value)}
                              placeholder="https://example.com/avatar.png"
                              className="w-full text-xs"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ảnh đại diện</span>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Profile Form Details */}
                    <div className="md:col-span-2 space-y-4">
                      {isEditingProfile ? (
                        <div className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label>{t(ACCOUNT_I18N_KEYS.profile.fullName)}</Label>
                              <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                              <Label>{t(ACCOUNT_I18N_KEYS.profile.emailLocked)}</Label>
                              <Input value={auth.user?.email || ""} disabled />
                            </div>
                            <div className="space-y-2">
                              <Label>{t(ACCOUNT_I18N_KEYS.profile.phone)}</Label>
                              <Input value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 mt-6">
                            <Button variant="outline" onClick={() => setIsEditingProfile(false)}>{t(ACCOUNT_I18N_KEYS.profile.cancel)}</Button>
                            <Button 
                              className="bg-primary" 
                              onClick={handleUpdateProfile}
                              disabled={profileMutation.isPending}
                            >
                              {profileMutation.isPending ? t(ACCOUNT_I18N_KEYS.profile.saving) : t(ACCOUNT_I18N_KEYS.profile.save)}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-lg border p-4 bg-muted/20">
                              <p className="mb-1 text-sm font-medium text-muted-foreground">{t(ACCOUNT_I18N_KEYS.profile.fullName)}</p>
                              <p className="font-semibold text-lg">{auth.user?.name ?? "—"}</p>
                            </div>
                            <div className="rounded-lg border p-4 bg-muted/20">
                              <p className="mb-1 text-sm font-medium text-muted-foreground">{t(ACCOUNT_I18N_KEYS.profile.email)}</p>
                              <p className="font-semibold text-lg">{auth.user?.email ?? "—"}</p>
                            </div>
                            <div className="rounded-lg border p-4 bg-muted/20">
                              <p className="mb-1 text-sm font-medium text-muted-foreground">{t(ACCOUNT_I18N_KEYS.profile.phone)}</p>
                              <p className="font-semibold text-lg">{auth.user?.phone || t(ACCOUNT_I18N_KEYS.profile.notUpdated)}</p>
                            </div>
                            <div className="rounded-lg border p-4 bg-muted/20">
                              <p className="mb-1 text-sm font-medium text-muted-foreground">{t(ACCOUNT_I18N_KEYS.profile.role)}</p>
                              <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 uppercase font-bold tracking-wider">{auth.user?.role}</Badge>
                            </div>
                          </div>
                          <Button className="bg-primary" onClick={() => setIsEditingProfile(true)}>
                            {t(ACCOUNT_I18N_KEYS.profile.edit)}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <NotificationList enabled={auth.isAuthenticated} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Cancel Booking Dialog */}
      <Dialog open={cancelModalOpen} onOpenChange={setCancelModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t(ACCOUNT_I18N_KEYS.cancelDialog.title)}</DialogTitle>
            <DialogDescription>
              {t(ACCOUNT_I18N_KEYS.cancelDialog.desc)}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="reason">{t(ACCOUNT_I18N_KEYS.cancelDialog.reasonLabel)}</Label>
            <Textarea 
              id="reason"
              placeholder={t(ACCOUNT_I18N_KEYS.cancelDialog.reasonPlaceholder)}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelModalOpen(false)}>{t(ACCOUNT_I18N_KEYS.cancelDialog.back)}</Button>
            <Button variant="destructive" onClick={handleCancelBooking} disabled={cancelMutation.isPending}>
              {cancelMutation.isPending ? t(ACCOUNT_I18N_KEYS.cancelDialog.submitting) : t(ACCOUNT_I18N_KEYS.cancelDialog.submit)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Booking Dialog */}
      <Dialog open={reviewModalOpen} onOpenChange={setReviewModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t(ACCOUNT_I18N_KEYS.reviewDialog.title)}</DialogTitle>
            <DialogDescription>
              {t(ACCOUNT_I18N_KEYS.reviewDialog.desc)}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label>{t(ACCOUNT_I18N_KEYS.reviewDialog.ratingLabel)}</Label>
              <div className="flex gap-2 justify-center py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star} 
                    onClick={() => setReviewRating(star)}
                    className="p-1 focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star className={`h-8 w-8 ${star <= reviewRating ? "fill-yellow-400 text-yellow-500 drop-shadow-sm" : "text-muted-foreground"}`} />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">{t(ACCOUNT_I18N_KEYS.reviewDialog.commentLabel)}</Label>
              <Textarea 
                id="comment"
                placeholder={t(ACCOUNT_I18N_KEYS.reviewDialog.commentPlaceholder)}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewModalOpen(false)}>{t(ACCOUNT_I18N_KEYS.reviewDialog.cancel)}</Button>
            <Button className="bg-primary" onClick={handleReviewSubmit} disabled={reviewMutation.isPending}>
              {reviewMutation.isPending ? t(ACCOUNT_I18N_KEYS.reviewDialog.submitting) : t(ACCOUNT_I18N_KEYS.reviewDialog.submit)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}
