/**
 * Shared types barrel file
 * All application-wide type definitions
 */

// Core types for the application

export interface Clinic {
    id: string
    name: string
    description?: string
    address: string
    phone?: string
    email?: string
    rating: number
    reviewCount: number
    numReviews?: number
    image: string
    isOpen: boolean
    openingHours: string
    bankInfo?: string
    depositAmount?: number
    website?: string
    specialties?: Array<{ id: string; name: string }> | string[]
    services?: string[]
    reviews?: Review[]
    healthPackages?: HealthPackage[]
}

export interface HealthPackage {
    id: string
    name: string
    shortDescription?: string | null
    description: string
    promotionalPrice?: number | null
    price: number
    currency: string
    features: string[]
    isPopular?: boolean
    isActive?: boolean
    category: string
    imageUrl?: string | null
    clinicId?: string | null
    clinic?: { id: string; name: string; address?: string | null; image?: string | null; depositAmount?: number | null; bankInfo?: string | null } | null
    specialtyId?: string | null
    specialty?: { id: string; name: string } | null
}

export interface Service {
    id: string
    name: string
    description: string
    icon: string
    category: string
}

export interface Article {
    id: string
    title: string
    description: string
    image: string
    category: string
    readTime: string
    publishedAt: string
    slug: string
}

export interface Booking {
    id: string
    clinicId: string
    specialtyId?: string
    packageId?: string
    bookingType?: "DOCTOR_CONSULTATION" | "HEALTH_PACKAGE"
    serviceId?: string
    date: Date
    time: string
    status: "pending" | "confirmed" | "completed" | "cancelled"
    paymentReceiptUrl?: string
    patientInfo: PatientInfo
    review?: Partial<Review>
}

export interface PatientInfo {
    name: string
    email: string
    phone: string
    dateOfBirth?: string
    gender?: "male" | "female" | "other"
    notes?: string
}

export interface User {
    id: string
    name: string
    email: string
    phone?: string
    avatar?: string
    role: "patient" | "doctor" | "admin" | "PATIENT" | "DOCTOR" | "ADMIN" | "SUPER_ADMIN" | "CLINIC_ADMIN"
}

export interface Review {
    id: string
    rating: number
    comment?: string
    createdAt: string
    user: { id: string; name: string; avatar?: string }
    doctor?: { id: string; name: string }
    clinic?: { id: string; name: string }
    bookingId?: string
}

export interface ApiResponse<T> {
    data: T
    message?: string
    success: boolean
    error?: string
}

export interface PaginatedResponse<T> {
    data: T[]
    pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
    }
}

// Search and Filter types
export interface SearchFilters {
    query?: string
    category?: string
    location?: string
    rating?: number
    isOpen?: boolean
}

export interface SortOptions {
    field: string
    order: "asc" | "desc"
}

export interface Doctor {
    id: string
    name: string
    avatar?: string
    experience: number
    isAvailable: boolean
    specialty: { id: string; name: string }
    rating: number
    reviewCount: number
    image?: string
    reviews?: Review[]
    bio?: string
    services?: any[]
    clinic?: any
    createdAt?: string
}

