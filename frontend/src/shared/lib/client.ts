import type { AxiosRequestConfig } from "axios"
import { apiClient as axiosApiClient } from "@/shared/lib/apiClient"

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
        public data?: unknown
    ) {
        super(message)
        this.name = "ApiError"
    }
}

export interface RequestConfig extends Omit<AxiosRequestConfig, "url" | "method" | "data"> {
    params?: Record<string, string | number | boolean | undefined>
}

function normalizeEndpoint(endpoint: string) {
    if (/^https?:\/\//.test(endpoint)) {
        return endpoint
    }

    const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`

    if (path.startsWith("/api/")) {
        return path.slice(4)
    }

    if (path.startsWith("/v1/")) {
        return path
    }

    return `/v1${path}`
}

function normalizeError(error: unknown): never {
    if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object"
    ) {
        const response = error.response as { status?: number; data?: { message?: string } }
        throw new ApiError(
            response.status ?? 500,
            response.data?.message || "API request failed",
            response.data
        )
    }

    if (error instanceof Error) {
        throw new ApiError(500, error.message)
    }

    throw new ApiError(500, "Unknown error occurred")
}

class ApiClient {
    async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        try {
            const response = await axiosApiClient.get<T>(normalizeEndpoint(endpoint), config)
            return response.data
        } catch (error) {
            normalizeError(error)
        }
    }

    async post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
        try {
            const response = await axiosApiClient.post<T>(normalizeEndpoint(endpoint), data, config)
            return response.data
        } catch (error) {
            normalizeError(error)
        }
    }

    async put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
        try {
            const response = await axiosApiClient.put<T>(normalizeEndpoint(endpoint), data, config)
            return response.data
        } catch (error) {
            normalizeError(error)
        }
    }

    async patch<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
        try {
            const response = await axiosApiClient.patch<T>(normalizeEndpoint(endpoint), data, config)
            return response.data
        } catch (error) {
            normalizeError(error)
        }
    }

    async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        try {
            const response = await axiosApiClient.delete<T>(normalizeEndpoint(endpoint), config)
            return response.data
        } catch (error) {
            normalizeError(error)
        }
    }
}

export const apiClient = new ApiClient()
