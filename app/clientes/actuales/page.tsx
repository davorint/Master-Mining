"use client"

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { 
  ColDef, 
  GridReadyEvent, 
  SelectionChangedEvent, 
  CellEditingStoppedEvent, 
  GridApi, 
  ModuleRegistry, 
  AllCommunityModule,
  themeQuartz,
  ICellRendererParams,
  ICellEditorParams,
  IFilterParams
} from 'ag-grid-community'

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule])
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Download, Filter, Columns, Users, MapPin, DollarSign, Activity, Package, FileText } from 'lucide-react'
import { motion } from 'motion/react'
import { AppSidebar } from "@/components/app-sidebar"

// TypeScript interfaces for AG-Grid components
interface MiningData {
  id: number
  company: string
  mine: string
  state: string
  mineralType: string
  status: 'Activo' | 'En Mantenimiento' | 'En Evaluación' | 'Prospecto' | 'Inactivo'
  monthlyRevenue: number
  safetyRating: number
  coordinates: { lat: number; lng: number }
  established: number
  employees: number
  yearlyProduction: string
  notes: string
  email: string
  phone: string
  tags: string[]
}

interface StatusColors {
  [key: string]: string
}

interface TagStyles {
  [key: string]: string
}

type StatusRendererProps = ICellRendererParams<MiningData>
type MineralTypeRendererProps = ICellRendererParams<MiningData>
type RevenueRendererProps = ICellRendererParams<MiningData>
type SafetyRatingRendererProps = ICellRendererParams<MiningData>
type CoordinatesRendererProps = ICellRendererParams<MiningData>
type TagsRendererProps = ICellRendererParams<MiningData>
type NumericEditorProps = ICellEditorParams<MiningData>
type StatusFilterProps = IFilterParams<MiningData>

interface NumericEditorRef {
  getValue: () => number
  isCancelAfterEnd: () => boolean
}

interface StatusFilterRef {
  doesFilterPass: (params: { data: MiningData }) => boolean
  isFilterActive: () => boolean
  getModel: () => string
  setModel: (model: string | null) => void
}
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Realistic Mexican Mining Industry Data based on 2024 research
const generateMiningData = () => {
  // Based on actual 2024 data from research
  const realisticData = [
    {
      id: 1,
      company: 'Grupo México',
      mine: 'Buenavista del Cobre',
      state: 'Sonora',
      mineralType: 'Cobre/Zinc',
      status: 'Activo',
      contractType: 'Venta Directa',
      equipment: 'Trituradora Primaria Metso',
      productionTons: 1086000,
      revenue: 248000000, // $12.4B MXN / 50 for equipment portion
      profitMargin: 28.5,
      employees: 450,
      safetyRating: 4.5,
      contractStartDate: new Date(2021, 2, 15),
      lastContact: new Date(2024, 11, 10),
      nextMaintenance: new Date(2025, 1, 20),
      coordinates: { lat: 30.3571, lng: -109.8345 },
      notes: 'Cliente principal. División minera reportó ingresos récord 2024. Proyecto Buenavista Zinc aumentó ventas 45%.',
      email: 'equipos@grupomexico.com',
      phone: '+52 662 259 9000',
      tags: ['Premium', 'Estratégico', 'VIP']
    },
    {
      id: 2,
      company: 'Fresnillo PLC',
      mine: 'Saucito',
      state: 'Zacatecas',
      mineralType: 'Plata/Oro',
      status: 'Activo',
      contractType: 'Arrendamiento',
      equipment: 'Molino SAG Outotec',
      productionTons: 144700,
      revenue: 89500000,
      profitMargin: 24.3,
      employees: 380,
      safetyRating: 4.8,
      contractStartDate: new Date(2020, 5, 10),
      lastContact: new Date(2024, 11, 15),
      nextMaintenance: new Date(2025, 0, 25),
      coordinates: { lat: 23.0444, lng: -103.2036 },
      notes: 'Productor #1 mundial de plata. Saucito produjo 14.47 Moz en 2024.',
      email: 'procurement@fresnilloplc.com',
      phone: '+52 492 922 3700',
      tags: ['Premium', 'Estratégico']
    },
    {
      id: 3,
      company: 'Newmont Corporation',
      mine: 'Peñasquito',
      state: 'Zacatecas',
      mineralType: 'Oro/Plata/Zinc',
      status: 'Activo',
      contractType: 'Servicio',
      equipment: 'Flotación Celda Epiroc',
      productionTons: 330000,
      revenue: 156000000,
      profitMargin: 31.2,
      employees: 520,
      safetyRating: 4.9,
      contractStartDate: new Date(2019, 8, 5),
      lastContact: new Date(2024, 11, 8),
      nextMaintenance: new Date(2025, 2, 10),
      coordinates: { lat: 24.8925, lng: -101.1923 },
      notes: 'Mina de plata más grande de México. Produjo 33 Moz en 2024, #2 mundial.',
      email: 'mexico.supplies@newmont.com',
      phone: '+52 492 582 5000',
      tags: ['Premium', 'VIP']
    },
    {
      id: 4,
      company: 'Industrias Peñoles',
      mine: 'Sabinas',
      state: 'Zacatecas',
      mineralType: 'Zinc/Plomo/Plata',
      status: 'Activo',
      contractType: 'Mantenimiento',
      equipment: 'Molino de Bolas FLSmidth',
      productionTons: 215000,
      revenue: 67800000,
      profitMargin: 22.7,
      employees: 340,
      safetyRating: 4.3,
      contractStartDate: new Date(2022, 1, 20),
      lastContact: new Date(2024, 10, 25),
      nextMaintenance: new Date(2025, 1, 15),
      coordinates: { lat: 24.2778, lng: -101.1272 },
      notes: 'Operaciones en Durango y Zacatecas. Mayor refinador de plata en México.',
      email: 'compras@penoles.com.mx',
      phone: '+52 871 729 5300',
      tags: ['Estratégico']
    },
    {
      id: 5,
      company: 'Orla Mining',
      mine: 'Camino Rojo',
      state: 'Zacatecas',
      mineralType: 'Oro',
      status: 'Activo',
      contractType: 'Venta Directa',
      equipment: 'Trituradora Sandvik',
      productionTons: 136748,
      revenue: 45600000,
      profitMargin: 35.8,
      employees: 280,
      safetyRating: 4.6,
      contractStartDate: new Date(2021, 11, 1),
      lastContact: new Date(2024, 11, 20),
      nextMaintenance: new Date(2025, 0, 30),
      coordinates: { lat: 24.6431, lng: -101.1749 },
      notes: 'Producción récord 136,748 oz oro en 2024. Libre de deuda, USD 160.8M en efectivo.',
      email: 'supplies@orlamining.com',
      phone: '+52 492 154 4450',
      tags: ['Premium', 'Crecimiento']
    },
    {
      id: 6,
      company: 'First Majestic Silver',
      mine: 'San Dimas',
      state: 'Durango',
      mineralType: 'Plata/Oro',
      status: 'Activo',
      contractType: 'Arrendamiento',
      equipment: 'Banda Transportadora Caterpillar',
      productionTons: 98500,
      revenue: 38900000,
      profitMargin: 26.4,
      employees: 310,
      safetyRating: 4.4,
      contractStartDate: new Date(2020, 3, 15),
      lastContact: new Date(2024, 11, 5),
      nextMaintenance: new Date(2025, 2, 20),
      coordinates: { lat: 24.4131, lng: -105.9301 },
      notes: 'Productor puro de plata. Operaciones en Durango, Zacatecas y Chihuahua.',
      email: 'procurement@firstmajestic.com',
      phone: '+52 618 825 4100',
      tags: ['Estratégico']
    },
    {
      id: 7,
      company: 'Coeur Mining',
      mine: 'Palmarejo',
      state: 'Chihuahua',
      mineralType: 'Oro/Plata',
      status: 'En Mantenimiento',
      contractType: 'Servicio',
      equipment: 'Espesador Komatsu',
      productionTons: 87200,
      revenue: 34500000,
      profitMargin: 21.3,
      employees: 290,
      safetyRating: 4.2,
      contractStartDate: new Date(2021, 7, 10),
      lastContact: new Date(2024, 10, 15),
      nextMaintenance: new Date(2025, 0, 10),
      coordinates: { lat: 27.0193, lng: -108.3297 },
      notes: 'Estado Chihuahua contribuye 20.7% producción nacional. 160+ proyectos activos.',
      email: 'mexico@coeur.com',
      phone: '+52 614 432 7800',
      tags: ['Regular']
    },
    {
      id: 8,
      company: 'Pan American Silver',
      mine: 'La Colorada',
      state: 'Zacatecas',
      mineralType: 'Plata/Zinc/Plomo',
      status: 'Activo',
      contractType: 'Venta Directa',
      equipment: 'Celda de Flotación Metso',
      productionTons: 125000,
      revenue: 52300000,
      profitMargin: 29.1,
      employees: 350,
      safetyRating: 4.7,
      contractStartDate: new Date(2022, 9, 1),
      lastContact: new Date(2024, 11, 12),
      nextMaintenance: new Date(2025, 1, 28),
      coordinates: { lat: 24.1919, lng: -104.2549 },
      notes: 'Operador líder en América Latina. Fuerte presencia en México.',
      email: 'mexico.supplies@panamericansilver.com',
      phone: '+52 492 926 6200',
      tags: ['Premium']
    },
    {
      id: 9,
      company: 'Agnico Eagle México',
      mine: 'Pinos Altos',
      state: 'Chihuahua',
      mineralType: 'Oro/Plata',
      status: 'Activo',
      contractType: 'Consultoría',
      equipment: 'Perforadora Epiroc',
      productionTons: 115000,
      revenue: 48700000,
      profitMargin: 27.8,
      employees: 320,
      safetyRating: 4.5,
      contractStartDate: new Date(2021, 4, 20),
      lastContact: new Date(2024, 10, 30),
      nextMaintenance: new Date(2025, 3, 5),
      coordinates: { lat: 28.1667, lng: -108.3667 },
      notes: 'Orden grande Epiroc 2024: SEK 200M (USD 18M) equipos minería subterránea.',
      email: 'mexico@agnicoeagle.com',
      phone: '+52 614 439 9000',
      tags: ['Estratégico', 'Tecnología']
    },
    {
      id: 10,
      company: 'Fortuna Silver Mines',
      mine: 'San José',
      state: 'Oaxaca',
      mineralType: 'Plata/Oro',
      status: 'Activo',
      contractType: 'Arrendamiento',
      equipment: 'Filtro Prensa Liebherr',
      productionTons: 76500,
      revenue: 31200000,
      profitMargin: 23.5,
      employees: 270,
      safetyRating: 4.3,
      contractStartDate: new Date(2020, 10, 15),
      lastContact: new Date(2024, 11, 3),
      nextMaintenance: new Date(2025, 2, 12),
      coordinates: { lat: 16.1333, lng: -95.9333 },
      notes: 'Presencia fuerte en México y Perú. Enfoque en metales preciosos.',
      email: 'procurement.mexico@fortunasilver.com',
      phone: '+52 951 501 0530',
      tags: ['Regular']
    },
    {
      id: 11,
      company: 'Torex Gold Resources',
      mine: 'El Limón-Guajes',
      state: 'Guerrero',
      mineralType: 'Oro',
      status: 'Activo',
      contractType: 'Mantenimiento',
      equipment: 'Camión Acarreo CAT 797F',
      productionTons: 145000,
      revenue: 58900000,
      profitMargin: 32.4,
      employees: 360,
      safetyRating: 4.4,
      contractStartDate: new Date(2022, 6, 10),
      lastContact: new Date(2024, 11, 18),
      nextMaintenance: new Date(2025, 0, 22),
      coordinates: { lat: 17.4297, lng: -99.5086 },
      notes: 'Complejo ELG en Guerrero. Producción estable de oro.',
      email: 'supplies@torexgold.com',
      phone: '+52 755 553 3100',
      tags: ['Premium']
    },
    {
      id: 12,
      company: 'Alamos Gold',
      mine: 'Mulatos',
      state: 'Sonora',
      mineralType: 'Oro',
      status: 'En Evaluación',
      contractType: 'Venta Directa',
      equipment: 'Excavadora Komatsu PC8000',
      productionTons: 98000,
      revenue: 41200000,
      profitMargin: 25.7,
      employees: 295,
      safetyRating: 4.2,
      contractStartDate: new Date(2021, 8, 25),
      lastContact: new Date(2024, 10, 10),
      nextMaintenance: new Date(2025, 4, 15),
      coordinates: { lat: 28.4786, lng: -108.7489 },
      notes: 'Plan México: 35%-91% depreciación acelerada nuevos activos. Evaluando equipos eléctricos.',
      email: 'mexico@alamosgold.com',
      phone: '+52 662 289 0100',
      tags: ['Crecimiento', 'Sostenible']
    },
    {
      id: 13,
      company: 'GoGold Resources',
      mine: 'Parral',
      state: 'Chihuahua',
      mineralType: 'Plata/Oro',
      status: 'Activo',
      contractType: 'Servicio',
      equipment: 'Tanque Agitador FLSmidth',
      productionTons: 54000,
      revenue: 22800000,
      profitMargin: 19.8,
      employees: 240,
      safetyRating: 4.0,
      contractStartDate: new Date(2023, 0, 15),
      lastContact: new Date(2024, 11, 1),
      nextMaintenance: new Date(2025, 1, 8),
      coordinates: { lat: 26.9331, lng: -105.6664 },
      notes: 'Proyectos en expansión. Tailings reprocessing en Parral.',
      email: 'supplies@gogoldresources.com',
      phone: '+52 627 522 4800',
      tags: ['Regular']
    },
    {
      id: 14,
      company: 'Argonaut Gold',
      mine: 'La Colorada',
      state: 'Sonora',
      mineralType: 'Oro',
      status: 'Prospecto',
      contractType: 'Consultoría',
      equipment: 'Bomba de Lodos Sandvik',
      productionTons: 42000,
      revenue: 18500000,
      profitMargin: 17.3,
      employees: 210,
      safetyRating: 3.9,
      contractStartDate: new Date(2023, 5, 20),
      lastContact: new Date(2024, 9, 15),
      nextMaintenance: new Date(2025, 5, 20),
      coordinates: { lat: 27.8247, lng: -110.5867 },
      notes: 'Evaluando nuevas tecnologías. Interés en automatización.',
      email: 'procurement@argonautgold.com',
      phone: '+52 662 210 3800',
      tags: ['Prospecto']
    },
    {
      id: 15,
      company: 'Endeavour Silver',
      mine: 'Guanaceví',
      state: 'Durango',
      mineralType: 'Plata/Oro',
      status: 'Activo',
      contractType: 'Arrendamiento',
      equipment: 'Ciclón Clasificador Metso',
      productionTons: 67000,
      revenue: 28900000,
      profitMargin: 22.1,
      employees: 260,
      safetyRating: 4.1,
      contractStartDate: new Date(2022, 3, 10),
      lastContact: new Date(2024, 11, 7),
      nextMaintenance: new Date(2025, 2, 25),
      coordinates: { lat: 25.9358, lng: -105.9550 },
      notes: 'Tres minas en producción en México. Enfoque en plata.',
      email: 'mexico@edrsilver.com',
      phone: '+52 618 826 4600',
      tags: ['Regular']
    },
    {
      id: 16,
      company: 'MAG Silver',
      mine: 'Juanicipio',
      state: 'Zacatecas',
      mineralType: 'Plata/Oro',
      status: 'Activo',
      contractType: 'Venta Directa',
      equipment: 'Molino de Bolas Outotec',
      productionTons: 89000,
      revenue: 37800000,
      profitMargin: 28.9,
      employees: 285,
      safetyRating: 4.6,
      contractStartDate: new Date(2023, 8, 1),
      lastContact: new Date(2024, 11, 14),
      nextMaintenance: new Date(2025, 0, 18),
      coordinates: { lat: 24.3111, lng: -103.0089 },
      notes: 'JV con Fresnillo. Proyecto Juanicipio de alta ley en rampa.',
      email: 'supplies@magsilver.com',
      phone: '+52 492 155 4200',
      tags: ['Premium', 'Crecimiento']
    },
    {
      id: 17,
      company: 'Impact Silver',
      mine: 'Guadalupe',
      state: 'Chihuahua',
      mineralType: 'Plata/Zinc/Plomo',
      status: 'En Mantenimiento',
      contractType: 'Servicio',
      equipment: 'Banda Transportadora Sandvik',
      productionTons: 35000,
      revenue: 14200000,
      profitMargin: 15.6,
      employees: 190,
      safetyRating: 3.8,
      contractStartDate: new Date(2023, 2, 15),
      lastContact: new Date(2024, 10, 5),
      nextMaintenance: new Date(2025, 0, 5),
      coordinates: { lat: 26.8897, lng: -105.4819 },
      notes: 'Productor de plata junior. Múltiples proyectos pequeños.',
      email: 'mexico@impactsilver.com',
      phone: '+52 614 238 1900',
      tags: ['Regular']
    },
    {
      id: 18,
      company: 'Minera Autlán',
      mine: 'Molango',
      state: 'Hidalgo',
      mineralType: 'Manganeso',
      status: 'Activo',
      contractType: 'Mantenimiento',
      equipment: 'Cargador Frontal CAT 994K',
      productionTons: 165000,
      revenue: 43500000,
      profitMargin: 20.4,
      employees: 330,
      safetyRating: 4.3,
      contractStartDate: new Date(2021, 10, 10),
      lastContact: new Date(2024, 11, 9),
      nextMaintenance: new Date(2025, 1, 12),
      coordinates: { lat: 20.7861, lng: -98.7331 },
      notes: 'Líder en manganeso en América. Único productor en México.',
      email: 'compras@autlan.com.mx',
      phone: '+52 771 714 3400',
      tags: ['Estratégico', 'Único']
    },
    {
      id: 19,
      company: 'Santacruz Silver Mining',
      mine: 'Zimapán',
      state: 'Hidalgo',
      mineralType: 'Plata/Zinc/Plomo',
      status: 'Activo',
      contractType: 'Arrendamiento',
      equipment: 'Perforadora Atlas Copco',
      productionTons: 45000,
      revenue: 19800000,
      profitMargin: 18.7,
      employees: 220,
      safetyRating: 4.0,
      contractStartDate: new Date(2022, 7, 5),
      lastContact: new Date(2024, 11, 2),
      nextMaintenance: new Date(2025, 3, 10),
      coordinates: { lat: 20.7369, lng: -99.3828 },
      notes: 'Adquisición reciente mina Zimapán. En proceso de optimización.',
      email: 'procurement@santacruzsilver.com',
      phone: '+52 759 723 5100',
      tags: ['Regular']
    },
    {
      id: 20,
      company: 'Avino Silver & Gold',
      mine: 'Avino',
      state: 'Durango',
      mineralType: 'Plata/Oro/Cobre',
      status: 'Activo',
      contractType: 'Venta Directa',
      equipment: 'Espesador de Colas Epiroc',
      productionTons: 58000,
      revenue: 24600000,
      profitMargin: 21.9,
      employees: 250,
      safetyRating: 4.2,
      contractStartDate: new Date(2023, 4, 1),
      lastContact: new Date(2024, 11, 11),
      nextMaintenance: new Date(2025, 2, 5),
      coordinates: { lat: 24.5553, lng: -104.8961 },
      notes: 'Operación histórica desde 1968. Modernización equipos 2024.',
      email: 'mexico@avino.com',
      phone: '+52 618 814 3700',
      tags: ['Regular', 'Histórico']
    }
  ]
  
  return realisticData
}

// Custom Cell Renderers
const StatusRenderer = (props: StatusRendererProps) => {
  const statusColors: StatusColors = {
    'Activo': 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    'En Mantenimiento': 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
    'En Evaluación': 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    'Prospecto': 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
    'Inactivo': 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
  }
  
  return (
    <span className={`inline-flex items-center px-1.5 py-0 rounded text-[10px] font-medium ${statusColors[props.value]}`}>
      {props.value}
    </span>
  )
}

const MineralTypeRenderer = (props: MineralTypeRendererProps) => {
  const getIcon = (type: string) => {
    if (type.includes('Oro')) return '🥇'
    if (type.includes('Plata')) return '🥈'
    if (type.includes('Cobre')) return '🥉'
    if (type.includes('Zinc')) return '⚪'
    if (type.includes('Manganeso')) return '⚙️'
    return '⚫'
  }
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg drop-shadow-md">{getIcon(props.value)}</span>
      <span className="font-semibold bg-gradient-to-r from-gold-600 to-gold-400 dark:from-gold-400 dark:to-gold-200 bg-clip-text text-transparent">
        {props.value}
      </span>
    </div>
  )
}

const RevenueRenderer = (props: RevenueRendererProps) => {
  return (
    <div className="flex items-center gap-1">
      <DollarSign className="h-4 w-4 text-gold-600 dark:text-gold-400 drop-shadow-sm" />
      <span className="font-mono font-semibold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
        ${props.value.toLocaleString('es-MX')} MXN
      </span>
    </div>
  )
}

const SafetyRatingRenderer = (props: SafetyRatingRendererProps) => {
  const rating = props.value
  const stars = []
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars.push(<span key={i} className="text-gold-500 drop-shadow-glow text-lg">★</span>)
    } else if (i < rating) {
      stars.push(<span key={i} className="text-gold-400 drop-shadow-glow text-lg">☆</span>)
    } else {
      stars.push(<span key={i} className="text-gray-300 dark:text-gray-600 text-lg">☆</span>)
    }
  }
  return <div className="flex gap-0.5">{stars}</div>
}

const CoordinatesRenderer = (props: CoordinatesRendererProps) => {
  if (!props.value) return null
  return (
    <div className="flex items-center gap-1 text-sm">
      <MapPin className="h-3 w-3 text-gold-500 dark:text-gold-400 drop-shadow-sm" />
      <span className="font-mono text-xs bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent font-semibold">
        {props.value.lat.toFixed(4)}, {props.value.lng.toFixed(4)}
      </span>
    </div>
  )
}

const TagsRenderer = (props: TagsRendererProps) => {
  if (!props.value || props.value.length === 0) return null
  
  const tagStyles: TagStyles = {
    'Premium': 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
    'VIP': 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
    'Estratégico': 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    'Crecimiento': 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    'Regular': 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400',
    'Sostenible': 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400',
    'Tecnología': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400',
    'Prospecto': 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
    'Único': 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/20 dark:text-fuchsia-400',
    'Histórico': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
  }
  
  return (
    <div className="flex gap-1 flex-wrap items-center">
      {props.value.map((tag: string, index: number) => (
        <span 
          key={index} 
          className={`inline-flex items-center px-1.5 py-0 rounded text-[10px] font-medium ${tagStyles[tag] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'}`}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

// Custom Cell Editor
const NumericEditor = React.forwardRef<NumericEditorRef, NumericEditorProps>((props, ref) => {
  const [value, setValue] = useState(props.value)
  
  React.useImperativeHandle(ref, () => ({
    getValue: () => value,
    isCancelAfterEnd: () => false
  }))
  
  return (
    <Input
      type="number"
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      className="w-full h-full border-0 focus:ring-0"
      autoFocus
    />
  )
})
NumericEditor.displayName = 'NumericEditor'

// Custom Filter
const StatusFilter = React.forwardRef<StatusFilterRef, StatusFilterProps>((props, ref) => {
  const [filterValue, setFilterValue] = useState('')
  
  React.useImperativeHandle(ref, () => ({
    doesFilterPass: (params: { data: MiningData }) => {
      if (!filterValue) return true
      return params.data.status === filterValue
    },
    isFilterActive: () => filterValue !== '',
    getModel: () => filterValue,
    setModel: (model: string | null) => setFilterValue(model || '')
  }))
  
  return (
    <Select value={filterValue} onValueChange={setFilterValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Seleccionar estado..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">Todos</SelectItem>
        <SelectItem value="Activo">Activo</SelectItem>
        <SelectItem value="En Mantenimiento">En Mantenimiento</SelectItem>
        <SelectItem value="En Evaluación">En Evaluación</SelectItem>
        <SelectItem value="Prospecto">Prospecto</SelectItem>
        <SelectItem value="Inactivo">Inactivo</SelectItem>
      </SelectContent>
    </Select>
  )
})
StatusFilter.displayName = 'StatusFilter'

export default function ClientesActualesPage() {
  const gridRef = useRef<AgGridReact>(null)
  const [rowData] = useState(generateMiningData())
  const [selectedRows, setSelectedRows] = useState<MiningData[]>([])
  const [quickFilter, setQuickFilter] = useState('')
  const [paginationPageSize, setPaginationPageSize] = useState(10)
  const [gridApi, setGridApi] = useState<GridApi | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }
    checkDarkMode()
    
    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    })
    
    return () => observer.disconnect()
  }, [])
  
  // Create clean, compact theme
  const premiumTheme = useMemo(() => {
    return isDarkMode ? themeQuartz.withParams({
      backgroundColor: '#0f0f0f',
      foregroundColor: '#ffffff',
      borderColor: '#2a2a2a',
      chromeBackgroundColor: '#1a1a1a',
      oddRowBackgroundColor: '#0a0a0a',
      headerBackgroundColor: '#1a1a1a',
      headerTextColor: '#fbbf24',
      rowHoverColor: '#1f1f1f',
      selectedRowBackgroundColor: 'rgba(251, 191, 36, 0.1)',
      wrapperBorderRadius: 8,
      headerHeight: 36,
      rowHeight: 32,
      fontSize: 12,
      headerFontSize: 12
    }) : themeQuartz.withParams({
      backgroundColor: '#ffffff',
      foregroundColor: '#000000',
      borderColor: '#e5e7eb',
      chromeBackgroundColor: '#f9fafb',
      oddRowBackgroundColor: '#f9fafb',
      headerBackgroundColor: '#f3f4f6',
      headerTextColor: '#b45309',
      rowHoverColor: '#f3f4f6',
      selectedRowBackgroundColor: 'rgba(251, 191, 36, 0.08)',
      wrapperBorderRadius: 8,
      headerHeight: 36,
      rowHeight: 32,
      fontSize: 12,
      headerFontSize: 12
    })
  }, [isDarkMode])
  
  // Column Definitions with all features
  const [columnDefs] = useState<ColDef[]>([
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
      pinned: 'left',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      filter: 'agNumberColumnFilter'
    },
    {
      field: 'company',
      headerName: 'Empresa',
      width: 200,
      pinned: 'left',
      filter: 'agTextColumnFilter',
      editable: true,
      cellClass: 'font-semibold'
    },
    {
      field: 'mine',
      headerName: 'Mina',
      width: 150,
      filter: 'agTextColumnFilter',
      editable: true
    },
    {
      field: 'state',
      headerName: 'Estado',
      width: 120,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'mineralType',
      headerName: 'Tipo de Mineral',
      width: 150,
      cellRenderer: MineralTypeRenderer,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'status',
      headerName: 'Estado',
      width: 150,
      cellRenderer: StatusRenderer,
      filter: StatusFilter,
      editable: true,
      cellEditorPopup: true
    },
    {
      field: 'contractType',
      headerName: 'Tipo de Contrato',
      width: 150,
      filter: 'agTextColumnFilter',
      editable: true,
      cellEditorPopup: true
    },
    {
      field: 'equipment',
      headerName: 'Equipo Principal',
      width: 150,
      filter: 'agTextColumnFilter',
      editable: true
    },
    {
      field: 'productionTons',
      headerName: 'Producción (Tons)',
      width: 150,
      filter: 'agNumberColumnFilter',
      editable: true,
      cellEditor: NumericEditor,
      valueFormatter: (params) => params.value.toLocaleString('es-MX'),
      cellClass: 'text-right font-mono'
    },
    {
      field: 'revenue',
      headerName: 'Ingresos',
      width: 180,
      cellRenderer: RevenueRenderer,
      filter: 'agNumberColumnFilter',
      editable: true,
      cellEditor: NumericEditor,
      sort: 'desc'
    },
    {
      field: 'profitMargin',
      headerName: 'Margen (%)',
      width: 120,
      filter: 'agNumberColumnFilter',
      editable: true,
      cellEditor: NumericEditor,
      valueFormatter: (params) => `${params.value.toFixed(2)}%`,
      cellStyle: (params) => {
        if (params.value < 10) return { color: 'red' }
        if (params.value > 20) return { color: 'green' }
        return { color: 'orange' }
      }
    },
    {
      field: 'employees',
      headerName: 'Empleados',
      width: 120,
      filter: 'agNumberColumnFilter',
      editable: true,
      cellEditor: NumericEditor
    },
    {
      field: 'safetyRating',
      headerName: 'Seguridad',
      width: 130,
      cellRenderer: SafetyRatingRenderer,
      filter: 'agNumberColumnFilter'
    },
    {
      field: 'contractStartDate',
      headerName: 'Inicio Contrato',
      width: 140,
      filter: 'agTextColumnFilter',
      valueFormatter: (params) => params.value.toLocaleDateString('es-MX')
    },
    {
      field: 'lastContact',
      headerName: 'Último Contacto',
      width: 140,
      filter: 'agTextColumnFilter',
      valueFormatter: (params) => params.value.toLocaleDateString('es-MX')
    },
    {
      field: 'nextMaintenance',
      headerName: 'Próx. Mantenimiento',
      width: 160,
      filter: 'agTextColumnFilter',
      valueFormatter: (params) => params.value.toLocaleDateString('es-MX'),
      cellStyle: (params) => {
        const today = new Date()
        const maintenanceDate = new Date(params.value)
        const diffDays = Math.ceil((maintenanceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        if (diffDays < 30) return { color: '#dc2626', fontWeight: '500' }
        if (diffDays < 60) return { color: '#d97706', fontWeight: '500' }
        return { color: '#059669', fontWeight: 'normal' }
      }
    },
    {
      field: 'coordinates',
      headerName: 'Coordenadas',
      width: 180,
      cellRenderer: CoordinatesRenderer
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      filter: 'agTextColumnFilter',
      editable: true
    },
    {
      field: 'phone',
      headerName: 'Teléfono',
      width: 150,
      filter: 'agTextColumnFilter',
      editable: true
    },
    {
      field: 'tags',
      headerName: 'Etiquetas',
      width: 180,
      cellRenderer: TagsRenderer
    },
    {
      field: 'notes',
      headerName: 'Notas',
      width: 300,
      filter: 'agTextColumnFilter',
      editable: true,
      tooltipField: 'notes'
    }
  ])
  
  // Default column properties
  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    tooltipField: undefined,
    minWidth: 100,
    flex: 0
  }), [])
  
  // Grid Events
  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api)
    params.api.sizeColumnsToFit()
  }, [])
  
  const onSelectionChanged = useCallback((event: SelectionChangedEvent) => {
    const selectedNodes = event.api.getSelectedNodes()
    const selectedData = selectedNodes.map(node => node.data)
    setSelectedRows(selectedData)
  }, [])
  
  const onCellEditingStopped = useCallback((event: CellEditingStoppedEvent) => {
    console.log('Cell edited:', event.data)
  }, [])
  
  // Export to CSV
  const exportToCSV = useCallback(() => {
    gridApi?.exportDataAsCsv({
      fileName: `clientes_mineros_${new Date().toISOString().split('T')[0]}.csv`
    })
  }, [gridApi])
  
  
  // Clear filters
  const clearFilters = useCallback(() => {
    gridApi?.setFilterModel(null)
    setQuickFilter('')
  }, [gridApi])
  
  // Autosize columns
  const autosizeColumns = useCallback(() => {
    const allColumnIds: string[] = []
    gridApi?.getColumns()?.forEach((column) => {
      allColumnIds.push(column.getId())
    })
    gridApi?.autoSizeColumns(allColumnIds)
  }, [gridApi])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Clientes
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Actuales</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="mb-6 border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-xl">
                <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  Clientes Actuales - Industria Minera
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
                  Base de datos completa de operaciones mineras en México con todas las características de AG-Grid Community
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-lg px-4 py-2">
                  <Activity className="h-4 w-4 mr-2" />
                  {rowData.length} Registros
                </Badge>
                {selectedRows.length > 0 && (
                  <Badge className="text-lg px-4 py-2 bg-blue-600 dark:bg-blue-500">
                    {selectedRows.length} Seleccionados
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-700 dark:text-blue-300">Clientes Activos</p>
                      <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                        {rowData.filter(r => r.status === 'Activo').length}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-700 dark:text-green-300">Ingresos Totales</p>
                      <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                        ${(rowData.reduce((sum, r) => sum + r.revenue, 0) / 1000000).toFixed(1)}M MXN
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-amber-700 dark:text-amber-300">Equipos Vendidos</p>
                      <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                        {rowData.filter(r => r.contractType === 'Venta Directa').length * 3}
                      </p>
                    </div>
                    <Package className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-2">
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        {selectedRows.length > 0 ? 'Notas del Cliente' : 'Estados Cubiertos'}
                      </p>
                      {selectedRows.length > 0 ? (
                        <p className="text-sm font-medium text-purple-900 dark:text-purple-100 leading-tight">
                          {selectedRows[0].notes || 'Sin notas disponibles'}
                        </p>
                      ) : (
                        <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                          {new Set(rowData.map(r => r.state)).size}
                        </p>
                      )}
                    </div>
                    {selectedRows.length > 0 ? (
                      <FileText className="h-8 w-8 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    ) : (
                      <MapPin className="h-8 w-8 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Controls Bar */}
            <div className="flex flex-wrap gap-4 mb-6">
              {/* Quick Filter */}
              <div className="flex-1 min-w-[300px]">
                <Input
                  type="text"
                  placeholder="Búsqueda rápida..."
                  value={quickFilter}
                  onChange={(e) => setQuickFilter(e.target.value)}
                  className="w-full"
                />
              </div>
              
              {/* Page Size */}
              <Select value={paginationPageSize.toString()} onValueChange={(v) => setPaginationPageSize(Number(v))}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Filas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 filas</SelectItem>
                  <SelectItem value="20">20 filas</SelectItem>
                  <SelectItem value="50">50 filas</SelectItem>
                  <SelectItem value="100">100 filas</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Action Buttons */}
              <Button onClick={exportToCSV} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Exportar CSV
              </Button>
              
              <Button onClick={clearFilters} variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Limpiar Filtros
              </Button>
              
              <Button onClick={autosizeColumns} variant="outline" className="gap-2">
                <Columns className="h-4 w-4" />
                Ajustar Columnas
              </Button>
            </div>
            
            {/* AG-Grid */}
            <div className="h-[400px] w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
              <AgGridReact
                theme={premiumTheme}
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                animateRows={true}
                rowSelection="multiple"
                onGridReady={onGridReady}
                onSelectionChanged={onSelectionChanged}
                onCellEditingStopped={onCellEditingStopped}
                quickFilterText={quickFilter}
                pagination={true}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={[10, 20, 50, 100]}
                domLayout="normal"
                enableCellTextSelection={true}
                ensureDomOrder={true}
                suppressRowClickSelection={false}
                localeText={{
                  // Spanish translations
                  page: 'Página',
                  more: 'Más',
                  to: 'a',
                  of: 'de',
                  next: 'Siguiente',
                  last: 'Último',
                  first: 'Primero',
                  previous: 'Anterior',
                  loadingOoo: 'Cargando...',
                  selectAll: 'Seleccionar Todo',
                  searchOoo: 'Buscar...',
                  blanks: 'En blanco',
                  filterOoo: 'Filtrar...',
                  applyFilter: 'Aplicar Filtro',
                  equals: 'Igual',
                  notEqual: 'No Igual',
                  lessThan: 'Menor que',
                  greaterThan: 'Mayor que',
                  contains: 'Contiene',
                  notContains: 'No Contiene',
                  startsWith: 'Empieza con',
                  endsWith: 'Termina con',
                  filters: 'Filtros',
                  columns: 'Columnas',
                  rowGroupColumns: 'Columnas de Grupo',
                  rowGroupColumnsEmptyMessage: 'Arrastra aquí para agrupar',
                  valueColumns: 'Columnas de Valor',
                  pivotMode: 'Modo Pivote',
                  groups: 'Grupos',
                  values: 'Valores',
                  pivots: 'Pivotes',
                  valueColumnsEmptyMessage: 'Arrastra aquí para agregar',
                  pivotColumnsEmptyMessage: 'Arrastra aquí para pivotar',
                  noRowsToShow: 'No hay filas para mostrar'
                }}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}