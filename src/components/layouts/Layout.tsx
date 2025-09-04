import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/sonner"


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1 lg:hidden" variant={"default"} />
                </header>

                <main className="flex-1 overflow-auto">
                    <div className="container mx-auto p-3 sm:p-4 lg:p-6 max-w-7xl h-full">
                        {children}
                    </div>
                </main>
            </SidebarInset>
            <Toaster position="top-right" />
        </SidebarProvider>
    )
}