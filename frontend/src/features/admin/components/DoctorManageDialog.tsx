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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select"
import { ImageUpload } from "@/components"
import type { AdminClinic, AdminDoctor } from "../api/admin.api"
import { ADMIN_TEXT } from "@/app/admin/admin.constants"

interface DoctorManageDialogProps {
    open: boolean
    onClose: () => void
    doctor: AdminDoctor | null
    clinics: AdminClinic[]
    onSave: (payload: {
        name: string
        clinicId: string
        specialtyId: string
        experience: number
        avatar?: string
        bio?: string
        isAvailable: boolean
        email?: string
        phone?: string
        password?: string
    }) => void
    isPending: boolean
}

export function DoctorManageDialog({
    open,
    onClose,
    doctor,
    clinics,
    onSave,
    isPending,
}: DoctorManageDialogProps) {
    const text = ADMIN_TEXT
    const systemText = text.systemAdminV2

    // Form states
    const [doctorName, setDoctorName] = useState("")
    const [doctorEmail, setDoctorEmail] = useState("")
    const [doctorPhone, setDoctorPhone] = useState("")
    const [doctorPassword, setDoctorPassword] = useState("")
    const [doctorEditClinicId, setDoctorEditClinicId] = useState("")
    const [doctorEditSpecialtyId, setDoctorEditSpecialtyId] = useState("")
    const [doctorEditExperience, setDoctorEditExperience] = useState("0")
    const [doctorEditAvatar, setDoctorEditAvatar] = useState("")
    const [doctorEditBio, setDoctorEditBio] = useState("")
    const [doctorEditAvailable, setDoctorEditAvailable] = useState(true)

    // Populate or reset form states
    useEffect(() => {
        if (doctor) {
            setDoctorName(doctor.name)
            setDoctorEmail(doctor.user?.email ?? "")
            setDoctorPhone(doctor.user?.phone ?? "")
            setDoctorPassword("")
            setDoctorEditClinicId(doctor.clinic.id)
            setDoctorEditSpecialtyId(doctor.specialty.id)
            setDoctorEditExperience(String(doctor.experience ?? 0))
            setDoctorEditAvatar(doctor.avatar ?? "")
            setDoctorEditBio(doctor.bio ?? "")
            setDoctorEditAvailable(doctor.isAvailable)
        } else {
            setDoctorName("")
            setDoctorEmail("")
            setDoctorPhone("")
            setDoctorPassword("")
            setDoctorEditClinicId("")
            setDoctorEditSpecialtyId("")
            setDoctorEditExperience("0")
            setDoctorEditAvatar("")
            setDoctorEditBio("")
            setDoctorEditAvailable(true)
        }
    }, [doctor, open])

    const clinicSpecialtyOptions = clinics.find((c) => c.id === doctorEditClinicId)?.specialties ?? []

    const doctorPayload = {
        name: doctorName.trim(),
        clinicId: doctorEditClinicId,
        specialtyId: doctorEditSpecialtyId,
        experience: Number(doctorEditExperience) || 0,
        avatar: doctorEditAvatar.trim() || undefined,
        bio: doctorEditBio.trim() || undefined,
        isAvailable: doctorEditAvailable,
    }

    const isDoctorChanged = Boolean(
        doctor &&
        JSON.stringify(doctorPayload) !==
        JSON.stringify({
            clinicId: doctor.clinic.id,
            specialtyId: doctor.specialty.id,
            name: doctor.name,
            experience: doctor.experience ?? 0,
            avatar: doctor.avatar || undefined,
            bio: doctor.bio || undefined,
            isAvailable: doctor.isAvailable,
        }),
    )

    const canCreateDoctorAccount = Boolean(
        doctorName.trim() && doctorEmail.trim() && doctorPassword && doctorEditClinicId && doctorEditSpecialtyId,
    )
    const canUpdateDoctor = Boolean(
        doctor &&
        doctorName.trim() &&
        doctorEditClinicId &&
        doctorEditSpecialtyId &&
        isDoctorChanged,
    )

    const handleSave = () => {
        if (doctor) {
            onSave(doctorPayload)
        } else {
            onSave({
                ...doctorPayload,
                email: doctorEmail.trim(),
                phone: doctorPhone.trim() || undefined,
                password: doctorPassword,
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>{doctor ? systemText.doctorDialog.titleUpdate : systemText.doctorDialog.titleCreate}</DialogTitle>
                    <DialogDescription>{systemText.doctorDialog.description}</DialogDescription>
                </DialogHeader>
                <div className="space-y-5">
                    <div className="space-y-3">
                        <div className="text-sm font-medium">{systemText.doctorDialog.sections.account}</div>
                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>{systemText.doctorDialog.labels.name}</Label>
                                <Input value={doctorName} onChange={(event) => setDoctorName(event.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>{systemText.doctorDialog.labels.email}</Label>
                                <Input value={doctorEmail} onChange={(event) => setDoctorEmail(event.target.value)} disabled={Boolean(doctor)} />
                            </div>
                            <div className="space-y-2">
                                <Label>{systemText.doctorDialog.labels.phone}</Label>
                                <Input value={doctorPhone} onChange={(event) => setDoctorPhone(event.target.value)} disabled={Boolean(doctor)} />
                            </div>
                            {!doctor ? (
                                <div className="space-y-2">
                                    <Label>{systemText.doctorDialog.labels.password}</Label>
                                    <Input value={doctorPassword} onChange={(event) => setDoctorPassword(event.target.value)} type="password" />
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="text-sm font-medium">{systemText.doctorDialog.sections.profile}</div>
                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>{systemText.doctorDialog.labels.clinic}</Label>
                                <Select value={doctorEditClinicId} onValueChange={(value) => { setDoctorEditClinicId(value); setDoctorEditSpecialtyId("") }}>
                                    <SelectTrigger><SelectValue placeholder={systemText.doctorDialog.placeholders.clinic} /></SelectTrigger>
                                    <SelectContent>{clinics.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>{systemText.doctorDialog.labels.specialty}</Label>
                                <Select value={doctorEditSpecialtyId} onValueChange={setDoctorEditSpecialtyId} disabled={!doctorEditClinicId}>
                                    <SelectTrigger><SelectValue placeholder={systemText.doctorDialog.placeholders.specialty} /></SelectTrigger>
                                    <SelectContent>{clinicSpecialtyOptions.map((specialty) => <SelectItem key={specialty.id} value={specialty.id}>{specialty.name}</SelectItem>)}</SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>{systemText.doctorDialog.labels.experience}</Label>
                                <Input type="number" min={0} value={doctorEditExperience} onChange={(event) => setDoctorEditExperience(event.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>{systemText.doctorDialog.labels.avatar}</Label>
                                <div className="flex gap-2 items-center">
                                    <ImageUpload onUploadSuccess={(url) => setDoctorEditAvatar(url)} label="Tải ảnh bác sĩ" />
                                    {doctorEditAvatar && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={doctorEditAvatar} alt="Doctor Preview" className="h-9 w-9 object-cover rounded-md border" />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>{systemText.doctorDialog.labels.bio}</Label>
                            <Textarea value={doctorEditBio} onChange={(event) => setDoctorEditBio(event.target.value)} />
                        </div>
                        <div className="flex items-center gap-2">
                            <Switch checked={doctorEditAvailable} onCheckedChange={setDoctorEditAvailable} />
                            <Label>{systemText.doctorDialog.labels.available}</Label>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>{text.common.close}</Button>
                    {doctor ? (
                        <Button disabled={isPending || !canUpdateDoctor} onClick={handleSave}>
                            {isPending ? text.common.updating : text.common.update}
                        </Button>
                    ) : (
                        <Button disabled={isPending || !canCreateDoctorAccount} onClick={handleSave}>
                            {isPending ? systemText.doctorDialog.createPending : systemText.doctorDialog.buttons.create}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
