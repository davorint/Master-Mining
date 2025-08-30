"use client"

import * as React from "react"
import {
  AudioWaveform,
  Building2,
  Command,
  GalleryVerticalEnd,
  Map,
  PieChart,
  MapPin,
  Package,
  FileText,
  Users,
  Truck,
  UserCheck,
  Calculator,
  CalendarCheck,
  Receipt,
  LifeBuoy,
  Send,
  Pickaxe,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Aaron",
    email: "aaliceaga@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Directorio",
      url: "#",
      icon: MapPin,
      isActive: true,
      items: [
        {
          title: "Minas",
          url: "#",
        },
        {
          title: "Plantas",
          url: "#",
        },
        {
          title: "Oficinas",
          url: "#",
        },
      ],
    },
    {
      title: "Productos",
      url: "#",
      icon: Package,
      items: [
        {
          title: "Bombas",
          url: "#",
        },
        {
          title: "Filtros",
          url: "#",
        },
        {
          title: "Válvulas",
          url: "#",
        },        
        {
          title: "Mangas",
          url: "#",
        },
      ],
    },
    {
      title: "Documentos",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "Reportes Minas",
          url: "#",
        },
        {
          title: "Catálogos",
          url: "#",
        },
        {
          title: "Camimex ",
          url: "#",
        },
        {
          title: "SEC",
          url: "#",
        },
      ],
    },
    {
      title: "Clientes",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Actuales",
          url: "/clientes/actuales",
        },
        {
          title: "Prospectos",
          url: "#",
        },
        {
          title: "Historico",
          url: "#",
        },
        {
          title: "Internacionales",
          url: "#",
        },
      ],
    },
    {
      title: "Provedores",
      url: "#",
      icon: Truck,
      items: [
        {
          title: "Actuales",
          url: "#",
        },
        {
          title: "Prospectos",
          url: "#",
        },
        {
          title: "Historico",
          url: "#",
        },
        {
          title: "Internacionales",
          url: "#",
        },
      ],
    },
    {
      title: "CRM",
      url: "#",
      icon: UserCheck,
      items: [
        {
          title: "Nuevo Prospecto",
          url: "#",
        },
        {
          title: "Seguimientos",
          url: "#",
        },
        {
          title: "Cierres",
          url: "#",
        },    
      ],
    },
    {
      title: "Cotizaciones",
      url: "#",
      icon: Calculator,
      items: [
        {
          title: "Formatos",
          url: "#",
        },
        {
          title: "Cotizador IA",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
     {
      title: "Visitas",
      url: "#",
      icon: CalendarCheck,
      items: [
        {
          title: "Formatos",
          url: "#",
        },
        {
          title: "Cotizador IA",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
     {
      title: "Facturas",
      url: "#",
      icon: Receipt,
      items: [
        {
          title: "Emitidas",
          url: "#",
        },
        {
          title: "Recibidas",
          url: "#",
        },
        {
          title: "Canceladas",
          url: "#",
        },       
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Rodeo",
      url: "#",
      icon: Building2,
    },
    {
      name: "Orisyvo",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Cordero",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Pickaxe className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Sualtec</span>
                  <span className="truncate text-xs">Minería Avanzada</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>        
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
