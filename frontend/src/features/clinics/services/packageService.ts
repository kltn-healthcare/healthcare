import { apiClient } from "@/shared/lib/client"
import type { HealthPackage, ApiResponse } from "@/shared/types"

type PackagePayload = HealthPackage[] | {
    success?: boolean
    data?: HealthPackage[]
    items?: HealthPackage[]
}

type PackageDetailPayload = HealthPackage | {
    success?: boolean
    data?: HealthPackage
    item?: HealthPackage
}

function normalizePackage(pkg: HealthPackage): HealthPackage {
    return {
        ...pkg,
        price: Number(pkg.price || 0),
    }
}

function toPackageList(payload: PackagePayload): HealthPackage[] {
    const items = Array.isArray(payload)
        ? payload
        : payload.data ?? payload.items ?? []

    return items.map(normalizePackage)
}

function toPackageDetail(payload: PackageDetailPayload): HealthPackage {
    const item = "data" in Object(payload)
        ? (payload as { data?: HealthPackage }).data
        : undefined

    return normalizePackage(item ?? (payload as { item?: HealthPackage }).item ?? payload as HealthPackage)
}

export const packageService = {
    /**
     * Get all health packages
     */
    async getAll(): Promise<ApiResponse<HealthPackage[]>> {
        const response = await apiClient.get<PackagePayload>("/v1/packages")
        return {
            data: toPackageList(response),
            success: true,
        }
    },

    /**
     * Get package by ID
     */
    async getById(id: string): Promise<ApiResponse<HealthPackage>> {
        const response = await apiClient.get<PackageDetailPayload>(`/v1/packages/${id}`)
        return {
            data: toPackageDetail(response),
            success: true,
        }
    },

    /**
     * Get packages by category
     */
    async getByCategory(category: string): Promise<ApiResponse<HealthPackage[]>> {
        const response = await apiClient.get<PackagePayload>(`/v1/packages/category/${category}`)
        return {
            data: toPackageList(response),
            success: true,
        }
    },
}
