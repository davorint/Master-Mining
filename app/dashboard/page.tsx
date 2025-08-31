"use client"

import { AppSidebar } from "@/components/app-sidebar"
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AreaStackChart } from "@/components/ui/area-stack-chart"
import { AqiLineChart } from "@/components/ui/aqi-line-chart"
import { SankeyChart } from "@/components/ui/sankey-chart"
import { TreemapChart } from "@/components/ui/treemap-chart"
import { MexicoMapChart } from "@/components/ui/mexico-map-chart"
import { BarStackChart } from "@/components/ui/bar-stack-chart"
import { PieLegendChart } from "@/components/ui/pie-legend-chart"
import { MatrixCovarianceChart } from "@/components/ui/matrix-covariance-chart"
import { motion, useMotionValue, useSpring } from "motion/react"
import { useEffect } from "react"

export default function Page() {
  // Smooth mouse tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 200 })
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 200 })
  
  useEffect(() => {
    let rafId: number
    const handleMouseMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [mouseX, mouseY])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-black dark:via-gray-950 dark:to-black">
      {/* Premium noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02] pointer-events-none mix-blend-overlay z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Premium animated gradient mesh */}
      <div className="absolute inset-0 opacity-30 dark:opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/20 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20" />
        <div className="absolute inset-0 bg-gradient-to-tl from-emerald-100/20 via-transparent to-cyan-100/20 dark:from-emerald-900/10 dark:via-transparent dark:to-cyan-900/10" />
      </div>
      
      {/* Floating premium orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${10 + i * 15}%`,
              width: `${200 + i * 50}px`,
              height: `${200 + i * 50}px`,
              background: i % 3 === 0 
                ? 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 60%)'
                : i % 3 === 1
                ? 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 60%)'
                : 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 60%)',
              filter: 'blur(80px)',
            }}
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -60, 40, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Light mode: Premium pearl/diamond effect */}
      <div className="absolute inset-0 pointer-events-none dark:hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`pearl-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(248,250,252,0.4), transparent)',
              filter: 'blur(40px)',
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -40, 30, 0],
            }}
            transition={{
              duration: 20 + i * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Interactive constellation grid */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-[0.02] dark:opacity-[0.03]">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="1" className="fill-gray-400 dark:fill-white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Premium cursor spotlight */}
      <motion.div
        className="fixed top-0 left-0 w-[800px] h-[800px] pointer-events-none z-20"
        style={{
          background: `radial-gradient(circle, rgba(59,130,246,0.04) 0%, rgba(168,85,247,0.02) 25%, transparent 60%)`,
          filter: 'blur(2px)',
          x: smoothMouseX,
          y: smoothMouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* Animated data particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => {
          const leftPosition = Math.random() * 100;
          const topPosition = Math.random() * 100;
          const size = Math.random() * 3 + 1;
          
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${leftPosition}%`,
                top: `${topPosition}%`,
                width: `${size}px`,
                height: `${size}px`,
                background: 'linear-gradient(135deg, rgba(59,130,246,0.6), rgba(168,85,247,0.4))',
                boxShadow: '0 0 10px rgba(59,130,246,0.3)',
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.2, 0.8],
                y: [-20, 20, -20],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>

      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
        <motion.header 
          className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-300" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 bg-gradient-to-b from-transparent via-gray-300 dark:via-white/20 to-transparent"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-300">
                    Proyectos
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-gray-400 dark:text-gray-500" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-900 dark:text-white font-medium">Cordero</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </motion.header>
        <div className="flex flex-1 flex-col gap-6 p-6 pt-0 relative z-10">
          <motion.div 
            className="grid gap-6 md:grid-cols-2 md:grid-rows-1 md:items-stretch"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="flex flex-col border-blue-200/50 dark:border-blue-400/10 bg-gradient-to-br from-white/80 via-blue-50/30 to-white/80 dark:from-black/60 dark:via-gray-900/60 dark:to-black/60 backdrop-blur-xl shadow-xl shadow-blue-100/50 dark:shadow-black/50 hover:shadow-blue-200/70 dark:hover:shadow-blue-500/20 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/20 dark:via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <CardHeader>
                <CardTitle className="text-xl text-blue-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-200 dark:to-cyan-200 font-semibold">
                  Distribución de Operaciones
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Clasificación detallada de todas las operaciones mineras activas
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10 blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                  <PieLegendChart />
                </div>
              </CardContent>
            </Card>
            <Card className="flex flex-col border-emerald-200/50 dark:border-emerald-400/10 bg-gradient-to-br from-white/80 via-emerald-50/30 to-white/80 dark:from-black/60 dark:via-gray-900/60 dark:to-black/60 backdrop-blur-xl shadow-xl shadow-emerald-100/50 dark:shadow-black/50 hover:shadow-emerald-200/70 dark:hover:shadow-emerald-500/20 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/20 dark:via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <CardHeader>
                <CardTitle className="text-xl text-emerald-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-emerald-200 dark:to-green-200 font-semibold">
                  Distribución Geográfica
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Mapa de México con concentración de operaciones mineras por estado
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5 dark:from-emerald-500/10 dark:to-green-500/10 blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                  <MexicoMapChart />
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            className="grid gap-6 md:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="min-h-[500px] border-purple-200/50 dark:border-purple-400/10 bg-gradient-to-br from-white/80 via-purple-50/30 to-white/80 dark:from-black/60 dark:via-gray-900/60 dark:to-black/60 backdrop-blur-xl shadow-xl shadow-purple-100/50 dark:shadow-black/50 hover:shadow-purple-200/70 dark:hover:shadow-purple-500/20 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/20 dark:via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <CardHeader>
                <CardTitle className="text-xl text-purple-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-purple-200 dark:to-pink-200 font-semibold">
                  Producción por Mina
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Análisis de rendimiento de producción mensual por ubicación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10 blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                  <AreaStackChart />
                </div>
              </CardContent>
            </Card>
            <Card className="min-h-[500px] border-amber-200/50 dark:border-amber-400/10 bg-gradient-to-br from-white/80 via-amber-50/30 to-white/80 dark:from-black/60 dark:via-gray-900/60 dark:to-black/60 backdrop-blur-xl shadow-xl shadow-amber-100/50 dark:shadow-black/50 hover:shadow-amber-200/70 dark:hover:shadow-amber-500/20 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/20 dark:via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <CardHeader>
                <CardTitle className="text-xl text-amber-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-amber-200 dark:to-yellow-200 font-semibold">
                  Monitoreo Ambiental
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Niveles de calidad del aire y ruido en operaciones mineras
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 dark:from-amber-500/10 dark:to-yellow-500/10 blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                  <AqiLineChart />
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            className="grid gap-6 md:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="min-h-[500px] border-cyan-200/50 dark:border-cyan-400/10 bg-gradient-to-br from-white/80 via-cyan-50/30 to-white/80 dark:from-black/60 dark:via-gray-900/60 dark:to-black/60 backdrop-blur-xl shadow-xl shadow-cyan-100/50 dark:shadow-black/50 hover:shadow-cyan-200/70 dark:hover:shadow-cyan-500/20 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/20 dark:via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <CardHeader>
                <CardTitle className="text-xl text-cyan-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-cyan-200 dark:to-blue-200 font-semibold">
                  Flujo de Procesamiento
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Análisis del flujo de materiales desde extracción hasta productos finales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 dark:from-cyan-500/10 dark:to-blue-500/10 blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                  <SankeyChart />
                </div>
              </CardContent>
            </Card>
            <Card className="min-h-[500px] border-rose-200/50 dark:border-rose-400/10 bg-gradient-to-br from-white/80 via-rose-50/30 to-white/80 dark:from-black/60 dark:via-gray-900/60 dark:to-black/60 backdrop-blur-xl shadow-xl shadow-rose-100/50 dark:shadow-black/50 hover:shadow-rose-200/70 dark:hover:shadow-rose-500/20 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/20 dark:via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <CardHeader>
                <CardTitle className="text-xl text-rose-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-rose-200 dark:to-pink-200 font-semibold">
                  Clasificación de Operaciones
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Jerarquía visual de operaciones mineras por tipo de mineral y escala de producción
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-pink-500/5 dark:from-rose-500/10 dark:to-pink-500/10 blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                  <TreemapChart />
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            className="grid gap-6 md:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="min-h-[500px] border-indigo-200/50 dark:border-indigo-400/10 bg-gradient-to-br from-white/80 via-indigo-50/30 to-white/80 dark:from-black/60 dark:via-gray-900/60 dark:to-black/60 backdrop-blur-xl shadow-xl shadow-indigo-100/50 dark:shadow-black/50 hover:shadow-indigo-200/70 dark:hover:shadow-indigo-500/20 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/20 dark:via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <CardHeader>
                <CardTitle className="text-xl text-indigo-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-indigo-200 dark:to-blue-200 font-semibold">
                  Producción Trimestral por Mineral
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Distribución de extracción minera por trimestres durante el año 2024
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-blue-500/5 dark:from-indigo-500/10 dark:to-blue-500/10 blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                  <BarStackChart />
                </div>
              </CardContent>
            </Card>
            <Card className="min-h-[500px] border-violet-200/50 dark:border-violet-400/10 bg-gradient-to-br from-white/80 via-violet-50/30 to-white/80 dark:from-black/60 dark:via-gray-900/60 dark:to-black/60 backdrop-blur-xl shadow-xl shadow-violet-100/50 dark:shadow-black/50 hover:shadow-violet-200/70 dark:hover:shadow-violet-500/20 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/20 dark:via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <CardHeader>
                <CardTitle className="text-xl text-violet-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-violet-200 dark:to-purple-200 font-semibold">
                  Correlaciones entre Minerales
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Matriz de correlación de precios y extracción entre diferentes minerales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-purple-500/5 dark:from-violet-500/10 dark:to-purple-500/10 blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                  <MatrixCovarianceChart />
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