"use client"

import { useEffect, useState } from "react"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Switch } from "@/shared/ui/switch"
import { Textarea } from "@/shared/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/ui/dialog"
import { ImageUpload } from "@/components"
import type { AdminClinic } from "../api/admin.api"
import { ADMIN_TEXT } from "@/app/admin/admin.constants"

type SpecialtyOption = {
    id: string
    name: string
}

interface ClinicManageDialogProps {
    open: boolean
    onClose: () => void
    clinic: AdminClinic | null
    specialties: SpecialtyOption[]
    onSave: (payload: {
        name: string
        address: string
        description?: string
        phone?: string
        email?: string
        website?: string
        image?: string
        openingHours?: string
        isOpen: boolean
        specialtyIds: string[]
    }) => void
    isPending: boolean
}

export function ClinicManageDialog({
    open,
    onClose,
    clinic,
    specialties,
    onSave,
    isPending,
}: ClinicManageDialogProps) {
    const text = ADMIN_TEXT
    const systemText = text.systemAdminV2

    // Form states
    const [clinicName, setClinicName] = useState("")
    const [clinicAddress, setClinicAddress] = useState("")
    const [clinicDescription, setClinicDescription] = useState("")
    const [clinicPhone, setClinicPhone] = useState("")
    const [clinicEmail, setClinicEmail] = useState("")
    const [clinicWebsite, setClinicWebsite] = useState("")
    const [clinicImage, setClinicImage] = useState("")
    const [clinicOpeningHours, setClinicOpeningHours] = useState("")
    const [clinicOpen, setClinicOpen] = useState(true)
    const [clinicSpecialtyIds, setClinicSpecialtyIds] = useState<string[]>([])

    // Populate states when clinic prop changes
    useEffect(() => {
        if (clinic) {
            setClinicName(clinic.name)
            setClinicAddress(clinic.address)
            setClinicDescription(clinic.description ?? "")
            setClinicPhone(clinic.phone ?? "")
            setClinicEmail(clinic.email ?? "")
            setClinicWebsite(clinic.website ?? "")
            setClinicImage(clinic.image ?? "")
            setClinicOpeningHours(clinic.openingHours ?? "")
            setClinicOpen(clinic.isOpen)
            setClinicSpecialtyIds(clinic.specialties?.map((item) => item.id) ?? [])
        } else {
            // Reset form for creation
            setClinicName("")
            setClinicAddress("")
            setClinicDescription("")
            setClinicPhone("")
            setClinicEmail("")
            setClinicWebsite("")
            setClinicImage("")
            setClinicOpeningHours("")
            setClinicOpen(true)
            setClinicSpecialtyIds([])
        }
    }, [clinic, open])

    function toggleClinicSpecialty(id: string) {
        setClinicSpecialtyIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
        )
    }

    function getClinicPayload() {
        return {
            name: clinicName.trim(),
            address: clinicAddress.trim(),
            description: clinicDescription.trim() || undefined,
            phone: clinicPhone.trim() || undefined,
            email: clinicEmail.trim() || undefined,
            website: clinicWebsite.trim() || undefined,
            image: clinicImage.trim() || undefined,
            openingHours: clinicOpeningHours.trim() || undefined,
            isOpen: clinicOpen,
            specialtyIds: clinicSpecialtyIds,
        }
    }

    const isClinicChanged = Boolean(
        clinic &&
        JSON.stringify(getClinicPayload()) !==
        JSON.stringify({
            name: clinic.name,
            address: clinic.address,
            description: clinic.description || undefined,
            phone: clinic.phone || undefined,
            email: clinic.email || undefined,
            website: clinic.website || undefined,
            image: clinic.image || undefined,
            openingHours: clinic.openingHours || undefined,
            isOpen: clinic.isOpen,
            specialtyIds: clinic.specialties?.map((item) => item.id) ?? [],
        }),
    )

    const canCreateClinic = Boolean(clinicName.trim() && clinicAddress.trim())
    const canUpdateClinic = Boolean(canCreateClinic && isClinicChanged)

    const handleSave = () => {
        onSave(getClinicPayload())
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>{clinic ? systemText.clinicDialog.titleUpdate : systemText.clinicDialog.titleCreate}</DialogTitle>
                    <DialogDescription>{systemText.clinicDialog.description}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>{systemText.clinicDialog.labels.name}</Label>
                            <Input value={clinicName} onChange={(event) => setClinicName(event.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>{systemText.clinicDialog.labels.address}</Label>
                            <Input value={clinicAddress} onChange={(event) => setClinicAddress(event.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>{systemText.clinicDialog.labels.phone}</Label>
                            <Input value={clinicPhone} onChange={(event) => setClinicPhone(event.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>{systemText.clinicDialog.labels.email}</Label>
                            <Input value={clinicEmail} onChange={(event) => setClinicEmail(event.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>{systemText.clinicDialog.labels.website}</Label>
                            <Input value={clinicWebsite} onChange={(event) => setClinicWebsite(event.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>{systemText.clinicDialog.labels.openingHours}</Label>
                            <Input value={clinicOpeningHours} onChange={(event) => setClinicOpeningHours(event.target.value)} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>{systemText.clinicDialog.labels.image}</Label>
                            <div className="flex gap-2 items-center">
                                <ImageUpload onUploadSuccess={(url) => setClinicImage(url)} label="Tải ảnh phòng khám" />
                                {clinicImage && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={clinicImage} alt="Clinic Preview" className="h-9 w-9 object-cover rounded-md border" />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>{systemText.clinicDialog.labels.description}</Label>
                        <Textarea value={clinicDescription} onChange={(event) => setClinicDescription(event.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>{systemText.clinicDialog.labels.specialty}</Label>
                        <div className="flex flex-wrap gap-2">
                            {specialties.map((specialty) => (
                                <label key={specialty.id} className="flex cursor-pointer items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm">
                                    <input type="checkbox" checked={clinicSpecialtyIds.includes(specialty.id)} onChange={() => toggleClinicSpecialty(specialty.id)} />
                                    {specialty.name}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Switch checked={clinicOpen} onCheckedChange={setClinicOpen} />
                        <Label>{systemText.clinicDialog.labels.open}</Label>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>{text.common.close}</Button>
                    {clinic ? (
                        <Button disabled={isPending || !canUpdateClinic} onClick={handleSave}>
                            {isPending ? text.common.updating : text.common.update}
                        </Button>
                    ) : (
                        <Button disabled={isPending || !canCreateClinic} onClick={handleSave}>
                            {isPending ? text.common.adding : systemText.clinicDialog.buttons.create}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
