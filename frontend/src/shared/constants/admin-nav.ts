import {
    Building2,
    CalendarClock,
    FileText,
    LayoutDashboard,
    Newspaper,
    Stethoscope,
    Users,
    type LucideIcon,
} from "lucide-react"

export type AdminNavItem = {
    label: string
    path: string
    icon: LucideIcon
    roles?: string[]
}

export type AdminNavSection = {
    label: string
    roles: string[]
    items: AdminNavItem[]
}

export const ADMIN_ROLES = {
    ADMIN: "ADMIN",
    DOCTOR: "DOCTOR",
} as const

export const NAV_SECTIONS: AdminNavSection[] = [
    {
        label: "Quản trị hệ thống",
        roles: [ADMIN_ROLES.ADMIN],
        items: [
            {
                label: "Tổng quan",
                path: "/admin",
                icon: LayoutDashboard,
            },
            {
                label: "Người dùng",
                path: "/admin?tab=users",
                icon: Users,
            },
            {
                label: "Phòng khám",
                path: "/admin?tab=clinics",
                icon: Building2,
            },
            {
                label: "Bác sĩ",
                path: "/admin?tab=doctors",
                icon: Stethoscope,
            },
            {
                label: "Cẩm nang",
                path: "/admin?tab=news",
                icon: Newspaper,
            },
        ],
    },
    {
        label: "Bác sĩ",
        roles: [ADMIN_ROLES.DOCTOR],
        items: [
            {
                label: "Lịch khám",
                path: "/admin?tab=bookings",
                icon: CalendarClock,
            },
            {
                label: "Lịch làm việc",
                path: "/admin?tab=schedule",
                icon: FileText,
            },
            {
                label: "Dịch vụ",
                path: "/admin?tab=services",
                icon: Stethoscope,
            },
        ],
    },
]
