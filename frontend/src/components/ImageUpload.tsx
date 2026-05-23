"use client"

import * as React from "react"
import { useState, useRef } from "react"
import { UploadCloud, Loader2 } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { uploadImage } from "@/shared/api/upload.api"
import { toast } from "sonner"

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void
  onUploadError?: (error: any) => void
  label?: string
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
}

export function ImageUpload({
  onUploadSuccess,
  onUploadError,
  label = "Tải ảnh lên",
  className = "",
  variant = "outline",
  size = "sm",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]

    // Basic validation
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn tệp hình ảnh hợp lệ (PNG, JPG, JPEG, WEBP,...)")
      return
    }

    // Size check (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Kích thước ảnh tối đa là 5MB")
      return
    }

    setIsUploading(true)
    const toastId = toast.loading("Đang tải hình ảnh lên cloud...")

    try {
      const result = await uploadImage(file)
      toast.success("Tải ảnh lên thành công!", { id: toastId })
      onUploadSuccess(result.url)
    } catch (err: any) {
      console.error("Upload error:", err)
      const errorMsg = err.response?.data?.message || err.message || "Tải ảnh thất bại"
      toast.error(`Lỗi: ${errorMsg}`, { id: toastId })
      if (onUploadError) onUploadError(err)
    } finally {
      setIsUploading(false)
      // Reset input value to allow selecting same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <div className={`inline-block ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={isUploading}
      />
      <Button
        type="button"
        variant={variant}
        size={size}
        onClick={handleButtonClick}
        disabled={isUploading}
        className="gap-2 transition-all duration-200 active:scale-95 text-xs font-medium"
      >
        {isUploading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span>Đang tải...</span>
          </>
        ) : (
          <>
            <UploadCloud className="h-4 w-4" />
            <span>{label}</span>
          </>
        )}
      </Button>
    </div>
  )
}
