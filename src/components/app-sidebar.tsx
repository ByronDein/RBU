import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Users, FolderOpen, Home, X } from "lucide-react"
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom"

const items = [
    {
        label: "Dashboard",
        icon: Home,
        href: "/"
    },
    {
        label: "Desarrolladores",
        icon: Users,
        href: "/developers"
    },
    {
        label: "Proyectos",
        icon: FolderOpen,
        href: "/projects"
    },
]

export function AppSidebar() {
    const location = useLocation();
    const { toggleSidebar, setOpen } = useSidebar()
    // const closeSidebarOnMobileOnChangePath = () => {
    //     if (window.innerWidth < 1024) {
    //         setOpen(false)
    //     }
    // }
    // useEffect(() => {

    //     closeSidebarOnMobileOnChangePath();
    // }, [location.pathname, setOpen])


    return (
        <div className="hidden lg:block">
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <div className="flex items-center gap-2 px-4 py-2">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            <Home className="size-4" />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">RBU Dashboard</span>
                            <span className="truncate text-xs">Gestión de Proyectos</span>
                        </div>
                        <X onClick={toggleSidebar} className="lg:hidden" />
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Navegación</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu >
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.label} >
                                        <SidebarMenuButton
                                            asChild
                                            isActive={location.pathname === item.href}
                                            tooltip={item.label}
                                        >
                                            <Link to={item.href}>
                                                <item.icon />
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <div className="p-4 text-xs text-muted-foreground">
                        © 2024 RBU Dashboard
                    </div>
                </SidebarFooter>
            </Sidebar>
        </div>
    )
}