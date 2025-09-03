import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useLocation } from "react-router-dom"

const getBreadcrumbs = (pathname: string) => {
    switch (pathname) {
        case '/':
            return [{ label: 'Dashboard', href: '/', isActive: true }];
        case '/developers':
            return [
                { label: 'Dashboard', href: '/', isActive: false },
                { label: 'Desarrolladores', href: '/developers', isActive: true }
            ];
        case '/projects':
            return [
                { label: 'Dashboard', href: '/', isActive: false },
                { label: 'Proyectos', href: '/projects', isActive: true }
            ];
        default:
            return [{ label: 'Dashboard', href: '/', isActive: true }];
    }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const breadcrumbs = getBreadcrumbs(location.pathname);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {/* Header con breadcrumbs */}
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumbs.map((crumb, index) => (
                                <div key={crumb.href} className="flex items-center">
                                    {index > 0 && <BreadcrumbSeparator className="mx-2" />}
                                    <BreadcrumbItem>
                                        {crumb.isActive ? (
                                            <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink href={crumb.href}>
                                                {crumb.label}
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                </div>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                {/* Contenido principal */}
                <main className="flex-1 overflow-auto">
                    <div className="container mx-auto p-4 lg:p-6 max-w-7xl h-full">
                        {children}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}