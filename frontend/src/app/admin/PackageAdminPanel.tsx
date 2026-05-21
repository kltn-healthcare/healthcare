"use client"

import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
    createAdminPackage,
    deleteAdminPackage,
    getAdminClinics,
    getAdminPackages,
    updateAdminPackage,
    type AdminPackage,
} from "@/api/admin"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Switch } from "@/shared/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Textarea } from "@/shared/ui/textarea"
import { ADMIN_TEXT } from "./admin.constants"

const PACKAGE_QUERY_KEY = ["admin", "packages"] as const

function formatPrice(value: string | number | null | undefined) {
    return `${new Intl.NumberFormat("vi-VN").format(Number(value || 0))}${ADMIN_TEXT.packageAdmin.currencySuffix}`
}

function splitFeatures(value: string) {
    return value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
}

export function PackageAdminPanel() {
    const text = ADMIN_TEXT.packageAdmin
    const queryClient = useQueryClient()
    const packagesQuery = useQuery({ queryKey: PACKAGE_QUERY_KEY, queryFn: getAdminPackages })
    const clinicsQuery = useQuery({ queryKey: ["admin", "clinics"], queryFn: getAdminClinics })

    const [editingPackage, setEditingPackage] = useState<AdminPackage | null>(null)
    const [clinicId, setClinicId] = useState("")
    const [specialtyId, setSpecialtyId] = useState("")
    const [name, setName] = useState("")
    const [shortDescription, setShortDescription] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("general")
    const [price, setPrice] = useState("")
    const [promotionalPrice, setPromotionalPrice] = useState("")
    const [features, setFeatures] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [isPopular, setIsPopular] = useState(false)
    const [isActive, setIsActive] = useState(true)

    const packages = packagesQuery.data?.items ?? []
    const clinics = clinicsQuery.data?.items ?? []
    const specialtyOptions = clinics.find((clinic) => clinic.id === clinicId)?.specialties ?? []

    const createMutation = useMutation({
        mutationFn: createAdminPackage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PACKAGE_QUERY_KEY })
            resetForm()
        },
    })

    const updateMutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof updateAdminPackage>[1] }) =>
            updateAdminPackage(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PACKAGE_QUERY_KEY })
            resetForm()
        },
    })

    const deleteMutation = useMutation({
        mutationFn: deleteAdminPackage,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: PACKAGE_QUERY_KEY }),
    })

    function resetForm() {
        setEditingPackage(null)
        setClinicId("")
        setSpecialtyId("")
        setName("")
        setShortDescription("")
        setDescription("")
        setCategory("general")
        setPrice("")
        setPromotionalPrice("")
        setFeatures("")
        setImageUrl("")
        setIsPopular(false)
        setIsActive(true)
    }

    function fillForm(item: AdminPackage) {
        setEditingPackage(item)
        setClinicId(item.clinicId)
        setSpecialtyId(item.specialtyId ?? "")
        setName(item.name)
        setShortDescription(item.shortDescription ?? "")
        setDescription(item.description)
        setCategory(item.category || "general")
        setPrice(String(item.price ?? ""))
        setPromotionalPrice(item.promotionalPrice ? String(item.promotionalPrice) : "")
        setFeatures((item.features ?? []).join("\n"))
        setImageUrl(item.imageUrl ?? "")
        setIsPopular(item.isPopular)
        setIsActive(item.isActive)
    }

    function getPayload() {
        return {
            clinicId,
            specialtyId,
            name: name.trim(),
            shortDescription: shortDescription.trim() || undefined,
            description: description.trim(),
            category: category.trim() || "general",
            price: Number(price || 0),
            promotionalPrice: promotionalPrice ? Number(promotionalPrice) : editingPackage ? null : undefined,
            currency: "VND",
            features: splitFeatures(features),
            imageUrl: imageUrl.trim() || undefined,
            isPopular,
            isActive,
        }
    }

    const canSubmit = Boolean(clinicId && specialtyId && name.trim() && description.trim() && price.trim() && Number(price) >= 0)
    const isSaving = createMutation.isPending || updateMutation.isPending

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>{editingPackage ? text.titleUpdate : text.titleCreate}</CardTitle>
                    <CardDescription>
                        {text.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>{text.labels.clinic}</Label>
                            <Select value={clinicId} onValueChange={(value) => {
                                setClinicId(value)
                                setSpecialtyId("")
                            }}>
                                <SelectTrigger>
                                    <SelectValue placeholder={text.placeholders.clinic} />
                                </SelectTrigger>
                                <SelectContent>
                                    {clinics.map((clinic) => (
                                        <SelectItem key={clinic.id} value={clinic.id}>
                                            {clinic.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>{text.labels.specialty}</Label>
                            <Select value={specialtyId} onValueChange={setSpecialtyId} disabled={!clinicId}>
                                <SelectTrigger>
                                    <SelectValue placeholder={text.placeholders.specialty} />
                                </SelectTrigger>
                                <SelectContent>
                                    {specialtyOptions.map((specialty) => (
                                        <SelectItem key={specialty.id} value={specialty.id}>
                                            {specialty.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>{text.labels.name}</Label>
                            <Input value={name} onChange={(event) => setName(event.target.value)} placeholder={text.placeholders.name} />
                        </div>
                        <div className="space-y-2">
                            <Label>{text.labels.category}</Label>
                            <Input value={category} onChange={(event) => setCategory(event.target.value)} placeholder={text.placeholders.category} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label>{text.labels.price}</Label>
                                <Input value={price} onChange={(event) => setPrice(event.target.value)} inputMode="numeric" />
                            </div>
                            <div className="space-y-2">
                                <Label>{text.labels.promotionalPrice}</Label>
                                <Input value={promotionalPrice} onChange={(event) => setPromotionalPrice(event.target.value)} inputMode="numeric" />
                            </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>{text.labels.shortDescription}</Label>
                            <Input value={shortDescription} onChange={(event) => setShortDescription(event.target.value)} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>{text.labels.description}</Label>
                            <Textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>{text.labels.features}</Label>
                            <Textarea value={features} onChange={(event) => setFeatures(event.target.value)} rows={4} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>{text.labels.image}</Label>
                            <Input value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        <label className="flex items-center gap-2 text-sm">
                            <Switch checked={isPopular} onCheckedChange={setIsPopular} />
                            {text.switches.popular}
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                            <Switch checked={isActive} onCheckedChange={setIsActive} />
                            {text.switches.active}
                        </label>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            disabled={!canSubmit || isSaving}
                            onClick={() => {
                                const payload = getPayload()
                                if (editingPackage) {
                                    updateMutation.mutate({ id: editingPackage.id, payload })
                                } else {
                                    createMutation.mutate(payload)
                                }
                            }}
                        >
                            {editingPackage ? text.buttons.update : text.buttons.create}
                        </Button>
                        {editingPackage ? <Button variant="outline" onClick={resetForm}>{text.buttons.cancelEdit}</Button> : null}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{text.listTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{text.tableHeaders.package}</TableHead>
                                <TableHead>{text.tableHeaders.clinic}</TableHead>
                                <TableHead>{text.tableHeaders.specialty}</TableHead>
                                <TableHead>{text.tableHeaders.price}</TableHead>
                                <TableHead>{text.tableHeaders.status}</TableHead>
                                <TableHead>{text.tableHeaders.actions}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {packages.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-xs text-muted-foreground">{item.category}</div>
                                    </TableCell>
                                    <TableCell>{item.clinic?.name || "-"}</TableCell>
                                    <TableCell>{item.specialty?.name || "-"}</TableCell>
                                    <TableCell>
                                        <div className="font-medium text-primary">{formatPrice(item.promotionalPrice || item.price)}</div>
                                        {item.promotionalPrice ? (
                                            <div className="text-xs text-muted-foreground line-through">{formatPrice(item.price)}</div>
                                        ) : null}
                                    </TableCell>
                                    <TableCell className="space-x-1">
                                        <Badge variant="outline" className={item.isActive ? "border-emerald-200 bg-emerald-100 text-emerald-700" : "border-slate-200 bg-slate-100 text-slate-700"}>
                                            {item.isActive ? text.status.active : text.status.inactive}
                                        </Badge>
                                        {item.isPopular ? <Badge>{text.status.popular}</Badge> : null}
                                    </TableCell>
                                    <TableCell className="space-x-2">
                                        <Button size="sm" variant="outline" onClick={() => fillForm(item)}>{text.buttons.edit}</Button>
                                        <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate(item.id)}>{text.buttons.delete}</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
