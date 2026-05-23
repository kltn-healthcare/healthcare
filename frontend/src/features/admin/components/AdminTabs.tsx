import { ReactNode } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs"

export interface AdminTabItem {
    value: string
    label: string
}

interface AdminTabsProps {
    defaultValue: string
    tabs: AdminTabItem[]
    children: ReactNode
}

export function AdminTabs({ defaultValue, tabs, children }: AdminTabsProps) {
    return (
        <Tabs defaultValue={defaultValue} className="space-y-4">
            <TabsList className="grid h-auto w-full grid-cols-3 gap-1 bg-muted p-1">
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            {children}
        </Tabs>
    )
}
