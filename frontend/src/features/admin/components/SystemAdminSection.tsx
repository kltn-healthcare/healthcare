"use client"

import { useState, useMemo } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
    Building2,
    Newspaper,
    Stethoscope,
    Users,
} from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Textarea } from "@/shared/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Badge } from "@/shared/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select"
import { ImageUpload } from "@/components"
import {
    createAdminArticle,
    createAdminClinic,
    createAdminDoctor,
    createAdminUser,
    deleteAdminArticle,
    deleteAdminClinic,
    deleteAdminDoctor,
    deleteAdminUser,
    getAdminArticles,
    getAdminClinics,
    getAdminDoctors,
    getAdminUsers,
    updateAdminArticle,
    updateAdminClinic,
    updateAdminDoctor,
    updateAdminUser,
    type AdminArticle,
    type AdminClinic,
    type AdminDoctor,
    type AdminRole,
} from "../api/admin.api"
import { getSpecialties } from "@/features/clinics/api/specialties.api"
import { ARTICLE_DEFAULTS, ARTICLE_QUERY_KEYS } from "@/shared/constants"
import { PackageAdminPanel } from "@/app/admin/PackageAdminPanel"
import { ADMIN_TEXT } from "@/app/admin/admin.constants"
import { ClinicManageDialog } from "./ClinicManageDialog"
import { DoctorManageDialog } from "./DoctorManageDialog"

const text = ADMIN_TEXT

function normalizeRole(role?: string) {
    const normalized = String(role || "").toUpperCase()
    if (normalized === "SUPER_ADMIN") {
        return "ADMIN"
    }
    return normalized
}

function getRoleLabel(role: string | undefined) {
    switch (normalizeRole(role)) {
        case "ADMIN":
            return text.roles.admin
        case "DOCTOR":
            return text.roles.doctor
        case "CLINIC_ADMIN":
            return text.roles.clinicAdmin
        case "PATIENT":
            return text.roles.patient
        default:
            return role || text.roles.unknown
    }
}

export function SystemAdminSection() {
    const queryClient = useQueryClient()
    const systemText = text.systemAdminV2

    const [userRoleFilter, setUserRoleFilter] = useState<"ALL" | "PATIENT" | "DOCTOR" | "CLINIC_ADMIN">("ALL")
    const [userKeyword, setUserKeyword] = useState("")

    // Clinic Admin Creation states
    const [clinicAdminName, setClinicAdminName] = useState("")
    const [clinicAdminEmail, setClinicAdminEmail] = useState("")
    const [clinicAdminPhone, setClinicAdminPhone] = useState("")
    const [clinicAdminPassword, setClinicAdminPassword] = useState("")
    const [clinicAdminClinicId, setClinicAdminClinicId] = useState("")

    // Active dialog and entities
    const [editingClinic, setEditingClinic] = useState<AdminClinic | null>(null)
    const [clinicDialogOpen, setClinicDialogOpen] = useState(false)

    const [editingDoctor, setEditingDoctor] = useState<AdminDoctor | null>(null)
    const [doctorDialogOpen, setDoctorDialogOpen] = useState(false)

    // Article Form states
    const [articleTitle, setArticleTitle] = useState("")
    const [articleDescription, setArticleDescription] = useState("")
    const [articleCategory, setArticleCategory] = useState<string>(ARTICLE_DEFAULTS.CATEGORY)
    const [articleReadTime, setArticleReadTime] = useState<string>(ARTICLE_DEFAULTS.READ_TIME)
    const [articleImage, setArticleImage] = useState("")
    const [editingArticleId, setEditingArticleId] = useState<string | null>(null)

    // React Query Queries
    const usersQuery = useQuery({ queryKey: ["admin", "users"], queryFn: () => getAdminUsers() })
    const clinicsQuery = useQuery({ queryKey: ["admin", "clinics"], queryFn: getAdminClinics })
    const doctorsQuery = useQuery({ queryKey: ["admin", "doctors"], queryFn: getAdminDoctors })
    const articlesQuery = useQuery({ queryKey: ARTICLE_QUERY_KEYS.ADMIN, queryFn: getAdminArticles })
    const specialtiesQuery = useQuery({ queryKey: ["specialties"], queryFn: getSpecialties })

    const users = useMemo(() => {
        const keyword = userKeyword.trim().toLowerCase()
        return (usersQuery.data?.items ?? [])
            .filter((user) => normalizeRole(user.role) !== "ADMIN")
            .filter((user) => userRoleFilter === "ALL" || user.role === userRoleFilter)
            .filter((user) => {
                if (!keyword) return true
                return [user.name, user.email, user.phone ?? ""].some((value) =>
                    value.toLowerCase().includes(keyword),
                )
            })
    }, [usersQuery.data?.items, userKeyword, userRoleFilter])

    const clinics = clinicsQuery.data?.items ?? []
    const doctors = doctorsQuery.data?.items ?? []
    const articles = articlesQuery.data?.items ?? []
    const specialties = specialtiesQuery.data ?? []

    // Mutations
    const createUserMutation = useMutation({
        mutationFn: createAdminUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "users"] })
            setClinicAdminName("")
            setClinicAdminEmail("")
            setClinicAdminPhone("")
            setClinicAdminPassword("")
            setClinicAdminClinicId("")
        },
    })

    const updateUserMutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof updateAdminUser>[1] }) =>
            updateAdminUser(id, payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "users"] }),
    })

    const deleteUserMutation = useMutation({
        mutationFn: deleteAdminUser,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "users"] }),
    })

    const createClinicMutation = useMutation({
        mutationFn: createAdminClinic,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "clinics"] })
            setClinicDialogOpen(false)
            setEditingClinic(null)
        },
    })

    const updateClinicMutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof updateAdminClinic>[1] }) =>
            updateAdminClinic(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "clinics"] })
            queryClient.invalidateQueries({ queryKey: ["admin", "doctors"] })
            setClinicDialogOpen(false)
            setEditingClinic(null)
        },
    })

    const deleteClinicMutation = useMutation({
        mutationFn: deleteAdminClinic,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "clinics"] })
            queryClient.invalidateQueries({ queryKey: ["admin", "doctors"] })
        },
    })

    const createDoctorMutation = useMutation({
        mutationFn: createAdminDoctor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "doctors"] })
            queryClient.invalidateQueries({ queryKey: ["admin", "users"] })
            setDoctorDialogOpen(false)
            setEditingDoctor(null)
        },
    })

    const updateDoctorMutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof updateAdminDoctor>[1] }) =>
            updateAdminDoctor(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "doctors"] })
            setDoctorDialogOpen(false)
            setEditingDoctor(null)
        },
    })

    const deleteDoctorMutation = useMutation({
        mutationFn: deleteAdminDoctor,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "doctors"] }),
    })

    const toggleDoctorAvailabilityMutation = useMutation({
        mutationFn: ({ id, isAvailable }: { id: string; isAvailable: boolean }) =>
            updateAdminDoctor(id, { isAvailable }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "doctors"] }),
    })

    const createArticleMutation = useMutation({
        mutationFn: createAdminArticle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ARTICLE_QUERY_KEYS.ADMIN })
            resetArticleForm()
        },
    })

    const updateArticleMutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof updateAdminArticle>[1] }) =>
            updateAdminArticle(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ARTICLE_QUERY_KEYS.ADMIN })
            resetArticleForm()
        },
    })

    const deleteArticleMutation = useMutation({
        mutationFn: deleteAdminArticle,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ARTICLE_QUERY_KEYS.ADMIN }),
    })

    // Article helpers
    function resetArticleForm() {
        setEditingArticleId(null)
        setArticleTitle("")
        setArticleDescription("")
        setArticleCategory(ARTICLE_DEFAULTS.CATEGORY)
        setArticleReadTime(ARTICLE_DEFAULTS.READ_TIME)
        setArticleImage("")
    }

    function fillArticleForm(article: AdminArticle) {
        setEditingArticleId(article.id)
        setArticleTitle(article.title)
        setArticleDescription(article.description)
        setArticleCategory(article.category)
        setArticleReadTime(article.readTime)
        setArticleImage(article.image ?? "")
    }

    // Clinic actions
    function openCreateClinicDialog() {
        setEditingClinic(null)
        setClinicDialogOpen(true)
    }

    function openClinicDialog(clinic: AdminClinic) {
        setEditingClinic(clinic)
        setClinicDialogOpen(true)
    }

    function handleClinicSave(payload: any) {
        if (editingClinic) {
            updateClinicMutation.mutate({ id: editingClinic.id, payload })
        } else {
            createClinicMutation.mutate(payload)
        }
    }

    // Doctor actions
    function openCreateDoctorDialog() {
        setEditingDoctor(null)
        setDoctorDialogOpen(true)
    }

    function openDoctorDialog(doctor: AdminDoctor) {
        setEditingDoctor(doctor)
        setDoctorDialogOpen(true)
    }

    function handleDoctorSave(payload: any) {
        if (editingDoctor) {
            updateDoctorMutation.mutate({ id: editingDoctor.id, payload })
        } else {
            createDoctorMutation.mutate(payload)
        }
    }

    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatCard icon={Users} title={systemText.stats.users} value={String(users.length)} />
                <StatCard icon={Stethoscope} title={systemText.stats.doctors} value={String(users.filter((user) => user.role === "DOCTOR").length)} />
                <StatCard icon={Building2} title={systemText.stats.openClinics} value={String(clinics.filter((clinic) => clinic.isOpen).length)} />
                <StatCard icon={Newspaper} title={systemText.stats.articles} value={String(articles.length)} />
            </div>

            <Tabs defaultValue="users" className="space-y-4">
                <TabsList className="grid h-auto w-full grid-cols-2 gap-1 bg-muted p-1 md:grid-cols-5">
                    <TabsTrigger value="users" className="py-2 data-[state=active]:bg-primary data-[state=active]:text-white">{systemText.tabs.users}</TabsTrigger>
                    <TabsTrigger value="clinics" className="py-2 data-[state=active]:bg-primary data-[state=active]:text-white">{systemText.tabs.clinics}</TabsTrigger>
                    <TabsTrigger value="doctors" className="py-2 data-[state=active]:bg-primary data-[state=active]:text-white">{systemText.tabs.doctors}</TabsTrigger>
                    <TabsTrigger value="packages" className="py-2 data-[state=active]:bg-primary data-[state=active]:text-white">{systemText.tabs.packages}</TabsTrigger>
                    <TabsTrigger value="news" className="py-2 data-[state=active]:bg-primary data-[state=active]:text-white">{systemText.tabs.news}</TabsTrigger>
                </TabsList>

                {/* Users Tab */}
                <TabsContent value="users" className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <CardTitle>{systemText.users.listTitle}</CardTitle>
                            </div>
                            <div className="flex flex-col gap-2 md:flex-row">
                                <Input value={userKeyword} onChange={(event) => setUserKeyword(event.target.value)} placeholder={systemText.users.searchPlaceholder} />
                                <Select value={userRoleFilter} onValueChange={(value) => setUserRoleFilter(value as "ALL" | "PATIENT" | "DOCTOR" | "CLINIC_ADMIN")}>
                                    <SelectTrigger className="md:w-44"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">{systemText.users.roleFilters.all}</SelectItem>
                                        <SelectItem value="PATIENT">{systemText.users.roleFilters.patient}</SelectItem>
                                        <SelectItem value="DOCTOR">{systemText.users.roleFilters.doctor}</SelectItem>
                                        <SelectItem value="CLINIC_ADMIN">{systemText.users.roleFilters.clinicAdmin}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{systemText.users.headers.name}</TableHead>
                                        <TableHead>{systemText.users.headers.email}</TableHead>
                                        <TableHead>{systemText.users.headers.phone}</TableHead>
                                        <TableHead>{systemText.users.headers.role}</TableHead>
                                        <TableHead>{systemText.users.headers.status}</TableHead>
                                        <TableHead>{systemText.users.headers.actions}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.phone || "-"}</TableCell>
                                            <TableCell><Badge variant="outline">{getRoleLabel(user.role)}</Badge></TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={user.isActive ? "border-emerald-200 bg-emerald-100 text-emerald-700" : "border-slate-200 bg-slate-100 text-slate-700"}>
                                                    {user.isActive ? systemText.users.status.active : systemText.users.status.locked}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="space-x-2">
                                                <Button size="sm" variant="outline" onClick={() => updateUserMutation.mutate({ id: user.id, payload: { isActive: !user.isActive } })}>
                                                    {user.isActive ? systemText.users.actions.lock : systemText.users.actions.unlock}
                                                </Button>
                                                <Button size="sm" variant="destructive" onClick={() => deleteUserMutation.mutate(user.id)}>
                                                    {systemText.users.actions.delete}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Clinics Tab */}
                <TabsContent value="clinics" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{systemText.users.title}</CardTitle>
                            <CardDescription>{systemText.users.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-3 md:grid-cols-3">
                            <Input value={clinicAdminName} onChange={(event) => setClinicAdminName(event.target.value)} placeholder={systemText.users.placeholders.name} />
                            <Input value={clinicAdminEmail} onChange={(event) => setClinicAdminEmail(event.target.value)} placeholder={systemText.users.placeholders.email} />
                            <Input value={clinicAdminPhone} onChange={(event) => setClinicAdminPhone(event.target.value)} placeholder={systemText.users.placeholders.phone} />
                            <Input value={clinicAdminPassword} onChange={(event) => setClinicAdminPassword(event.target.value)} placeholder={systemText.users.placeholders.password} type="password" />
                            <Select value={clinicAdminClinicId} onValueChange={setClinicAdminClinicId}>
                                <SelectTrigger>
                                    <SelectValue placeholder={systemText.users.selectClinicPlaceholder} />
                                </SelectTrigger>
                                <SelectContent>
                                    {clinics.map((clinic) => (
                                        <SelectItem key={clinic.id} value={clinic.id}>
                                            {clinic.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button
                                disabled={!clinicAdminName || !clinicAdminEmail || !clinicAdminPassword || !clinicAdminClinicId || createUserMutation.isPending}
                                onClick={() => createUserMutation.mutate({
                                    name: clinicAdminName,
                                    email: clinicAdminEmail,
                                    phone: clinicAdminPhone || undefined,
                                    password: clinicAdminPassword,
                                    role: "CLINIC_ADMIN",
                                    clinicId: clinicAdminClinicId,
                                })}
                            >
                                {systemText.users.createButton}
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <CardTitle>{systemText.clinics.listTitle}</CardTitle>
                                <CardDescription>{systemText.clinics.listDescription}</CardDescription>
                            </div>
                            <Button onClick={openCreateClinicDialog}>{systemText.clinics.addButton}</Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{systemText.clinics.headers.clinic}</TableHead>
                                        <TableHead>{systemText.clinics.headers.specialty}</TableHead>
                                        <TableHead>{systemText.clinics.headers.contact}</TableHead>
                                        <TableHead>{systemText.clinics.headers.status}</TableHead>
                                        <TableHead>{systemText.clinics.headers.actions}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {clinics.map((clinic) => (
                                        <TableRow key={clinic.id}>
                                            <TableCell>
                                                <div className="font-medium">{clinic.name}</div>
                                                <div className="text-xs text-muted-foreground">{clinic.address}</div>
                                            </TableCell>
                                            <TableCell>{clinic.specialties?.map((item) => item.name).join(", ") || systemText.clinics.specialtyFallback}</TableCell>
                                            <TableCell>{clinic.phone || clinic.email || "-"}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={clinic.isOpen ? "border-emerald-200 bg-emerald-100 text-emerald-700" : "border-slate-200 bg-slate-100 text-slate-700"}>
                                                    {clinic.isOpen ? systemText.clinics.status.open : systemText.clinics.status.closed}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="space-x-2">
                                                <Button size="sm" variant="outline" onClick={() => openClinicDialog(clinic)}>{text.common.edit}</Button>
                                                <Button size="sm" variant="destructive" onClick={() => deleteClinicMutation.mutate(clinic.id)}>{text.common.delete}</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Doctors Tab */}
                <TabsContent value="doctors" className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <CardTitle>{systemText.doctors.listTitle}</CardTitle>
                                <CardDescription>{systemText.doctors.listDescription}</CardDescription>
                            </div>
                            <Button onClick={openCreateDoctorDialog}>{systemText.doctors.addButton}</Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{systemText.doctors.headers.avatar}</TableHead>
                                        <TableHead>{systemText.doctors.headers.doctor}</TableHead>
                                        <TableHead>{systemText.doctors.headers.clinic}</TableHead>
                                        <TableHead>{systemText.doctors.headers.specialty}</TableHead>
                                        <TableHead>{systemText.doctors.headers.experience}</TableHead>
                                        <TableHead>{systemText.doctors.headers.status}</TableHead>
                                        <TableHead>{systemText.doctors.headers.actions}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {doctors.map((doctor) => (
                                        <TableRow key={doctor.id}>
                                            <TableCell>
                                                {doctor.avatar ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={doctor.avatar} alt={doctor.name} className="h-12 w-12 rounded-full object-cover" />
                                                ) : (
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-slate-50 text-slate-400">
                                                        <Stethoscope className="h-4 w-4" />
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{doctor.name}</div>
                                                <div className="text-xs text-muted-foreground">{doctor.user?.email || systemText.doctors.accountFallback}</div>
                                            </TableCell>
                                            <TableCell>{doctor.clinic.name}</TableCell>
                                            <TableCell>{doctor.specialty.name}</TableCell>
                                            <TableCell>{doctor.experience} {systemText.doctors.experienceSuffix}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={doctor.isAvailable ? "border-emerald-200 bg-emerald-100 text-emerald-700" : "border-slate-200 bg-slate-100 text-slate-700"}>
                                                    {doctor.isAvailable ? systemText.doctors.status.available : systemText.doctors.status.off}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="space-x-2">
                                                <Button size="sm" variant="outline" onClick={() => openDoctorDialog(doctor)}>{systemText.doctors.actions.edit}</Button>
                                                <Button size="sm" variant="outline" onClick={() => toggleDoctorAvailabilityMutation.mutate({ id: doctor.id, isAvailable: !doctor.isAvailable })}>
                                                    {doctor.isAvailable ? systemText.doctors.actions.disable : systemText.doctors.actions.enable}
                                                </Button>
                                                <Button size="sm" variant="destructive" onClick={() => deleteDoctorMutation.mutate(doctor.id)}>{systemText.doctors.actions.delete}</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Packages Tab */}
                <TabsContent value="packages" className="space-y-4">
                    <PackageAdminPanel />
                </TabsContent>

                {/* News Tab */}
                <TabsContent value="news" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{editingArticleId ? systemText.news.titleUpdate : systemText.news.titleCreate}</CardTitle>
                            <CardDescription>{systemText.news.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2 md:grid-cols-2">
                                <Input value={articleTitle} onChange={(event) => setArticleTitle(event.target.value)} placeholder={systemText.news.placeholders.title} />
                                <Input value={articleCategory} onChange={(event) => setArticleCategory(event.target.value)} placeholder={systemText.news.placeholders.category} />
                                <Input value={articleReadTime} onChange={(event) => setArticleReadTime(event.target.value)} placeholder={systemText.news.placeholders.readTime} />
                                <div className="flex gap-2 items-center">
                                    <ImageUpload onUploadSuccess={(url) => setArticleImage(url)} label="Tải ảnh bìa" />
                                    {articleImage && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={articleImage} alt="Article Preview" className="h-9 w-9 object-cover rounded-md border" />
                                    )}
                                </div>
                            </div>
                            <Textarea value={articleDescription} onChange={(event) => setArticleDescription(event.target.value)} placeholder={systemText.news.placeholders.description} />
                            <div className="flex gap-2">
                                <Button
                                    disabled={(!editingArticleId && createArticleMutation.isPending) || Boolean(editingArticleId && updateArticleMutation.isPending) || !articleTitle || !articleDescription}
                                    onClick={() => {
                                        const payload = { title: articleTitle, description: articleDescription, category: articleCategory, readTime: articleReadTime, image: articleImage || undefined }
                                        if (editingArticleId) updateArticleMutation.mutate({ id: editingArticleId, payload })
                                        else createArticleMutation.mutate(payload)
                                    }}
                                >
                                    {editingArticleId ? systemText.news.updateButton : systemText.news.createButton}
                                </Button>
                                {editingArticleId ? <Button variant="outline" onClick={resetArticleForm}>{text.common.cancelEdit}</Button> : null}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>{systemText.news.listTitle}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{systemText.news.headers.title}</TableHead>
                                        <TableHead>{systemText.news.headers.category}</TableHead>
                                        <TableHead>{systemText.news.headers.readTime}</TableHead>
                                        <TableHead>{systemText.news.headers.actions}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {articles.map((article) => (
                                        <TableRow key={article.id}>
                                            <TableCell className="font-medium">{article.title}</TableCell>
                                            <TableCell>{article.category}</TableCell>
                                            <TableCell>{article.readTime}</TableCell>
                                            <TableCell className="space-x-2">
                                                <Button size="sm" variant="outline" onClick={() => fillArticleForm(article)}>{text.common.edit}</Button>
                                                <Button size="sm" variant="destructive" onClick={() => deleteArticleMutation.mutate(article.id)}>{text.common.delete}</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Standalone dialogs */}
            <ClinicManageDialog
                open={clinicDialogOpen}
                onClose={() => {
                    setClinicDialogOpen(false)
                    setEditingClinic(null)
                }}
                clinic={editingClinic}
                specialties={specialties}
                onSave={handleClinicSave}
                isPending={createClinicMutation.isPending || updateClinicMutation.isPending}
            />

            <DoctorManageDialog
                open={doctorDialogOpen}
                onClose={() => {
                    setDoctorDialogOpen(false)
                    setEditingDoctor(null)
                }}
                doctor={editingDoctor}
                clinics={clinics}
                onSave={handleDoctorSave}
                isPending={createDoctorMutation.isPending || updateDoctorMutation.isPending}
            />
        </div>
    )
}

function StatCard({
    icon: Icon,
    title,
    value,
}: Readonly<{
    icon: React.ComponentType<{ className?: string }>
    title: string
    value: string
}>) {
    return (
        <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    )
}
