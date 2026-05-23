"use client"

import { useEffect, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShieldCheck } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { useAuthStore } from "@/store"
import { ADMIN_TEXT } from "./admin.constants"

// Import modular features components
import { DoctorAdminSection } from "@/features/admin/components/DoctorAdminSection"
import { ClinicAdminPanel } from "@/features/clinic-admin/components/ClinicAdminPanel"
import { SystemAdminSection } from "@/features/admin/components/SystemAdminSection"

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

export default function AdminPage() {
    const router = useRouter()
    const auth = useAuthStore()
    const role = useMemo(() => normalizeRole(auth.user?.role), [auth.user?.role])

    useEffect(() => {
        if (!auth.isLoading && !auth.isAuthenticated) {
            router.replace("/login?next=/admin")
        }
    }, [auth.isAuthenticated, auth.isLoading, router])

    if (auth.isLoading) {
        return <div className="p-8 text-center">{text.common.loading}</div>
    }

    if (!auth.isAuthenticated) {
        return null
    }

    if (role === "PATIENT") {
        return (
            <main className="flex min-h-screen items-center justify-center bg-muted/40 p-6">
                <Card className="w-full max-w-xl border-rose-200">
                    <CardHeader>
                        <CardTitle>{text.accessDenied.title}</CardTitle>
                        <CardDescription>
                            {text.accessDenied.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-3">
                        <Link href="/">
                            <Button>{text.common.backHome}</Button>
                        </Link>
                        <Link href="/account">
                            <Button variant="outline">{text.common.goAccount}</Button>
                        </Link>
                    </CardContent>
                </Card>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-muted/40 py-8">
            <div className="container mx-auto max-w-7xl px-4">
                <AdminTopBar
                    role={role}
                    email={auth.user?.email || ""}
                    onLogout={() => auth.logout()}
                />

                {role === "DOCTOR" ? (
                    <DoctorAdminSection />
                ) : role === "CLINIC_ADMIN" ? (
                    <ClinicAdminPanel />
                ) : (
                    <SystemAdminSection />
                )}
            </div>
        </main>
    )
}

function AdminTopBar({
    role,
    email,
    onLogout,
}: Readonly<{
    role: string
    email: string
    onLogout: () => void
}>) {
    return (
        <div className="mb-6 rounded-2xl border border-primary/20 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                        <h1 className="text-xl font-semibold">{text.topBar.title}</h1>
                    </div>
                    <p className="text-sm text-muted-foreground">{email}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{text.common.rolePrefix}: {getRoleLabel(role)}</p>
                </div>

                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
                        {getRoleLabel(role)}
                    </Badge>
                    <Button variant="outline" onClick={onLogout}>
                        {text.common.logout}
                    </Button>
                </div>
            </div>
        </div>
    )
}
