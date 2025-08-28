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
import { SunburstChart } from "@/components/ui/sunburst-chart"
import { MexicoMapChart } from "@/components/ui/mexico-map-chart"
import { BarStackChart } from "@/components/ui/bar-stack-chart"
import { PieLegendChart } from "@/components/ui/pie-legend-chart"
import { MatrixCovarianceChart } from "@/components/ui/matrix-covariance-chart"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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
                  <BreadcrumbLink href="#">
                    Proyectos
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Cordero</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="min-h-[600px]">
              <CardHeader>
                <CardTitle className="text-primary">Distribución de Operaciones</CardTitle>
                <CardDescription className="destructive">
                  Clasificación detallada de todas las operaciones mineras activas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PieLegendChart />
              </CardContent>
            </Card>
            <Card className="min-h-[600px]">
              <CardHeader>
                <CardTitle className="text-primary">Distribución Geográfica</CardTitle>
                <CardDescription className="destructive">
                  Mapa de México con concentración de operaciones mineras por estado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MexicoMapChart />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="min-h-[500px]">
              <CardHeader>
                <CardTitle className="text-primary">Producción por Mina</CardTitle>
                <CardDescription className="destructive">
                  Análisis de rendimiento de producción mensual por ubicación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AreaStackChart />
              </CardContent>
            </Card>
            <Card className="min-h-[500px]">
              <CardHeader>
                <CardTitle className="text-primary">Monitoreo Ambiental</CardTitle>
                <CardDescription className="destructive">
                  Niveles de calidad del aire y ruido en operaciones mineras
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AqiLineChart />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="min-h-[500px]">
              <CardHeader>
                <CardTitle className="text-primary">Flujo de Procesamiento</CardTitle>
                <CardDescription className="destructive">
                  Análisis del flujo de materiales desde extracción hasta productos finales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SankeyChart />
              </CardContent>
            </Card>
            <Card className="min-h-[500px]">
              <CardHeader>
                <CardTitle className="text-primary">Clasificación de Operaciones</CardTitle>
                <CardDescription className="destructive">
                  Categorización por tipo de mineral y operaciones mineras
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SunburstChart />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="min-h-[500px]">
              <CardHeader>
                <CardTitle className="text-primary">Producción Trimestral por Mineral</CardTitle>
                <CardDescription className="destructive">
                  Distribución de extracción minera por trimestres durante el año 2024
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BarStackChart />
              </CardContent>
            </Card>
            <Card className="min-h-[500px]">
              <CardHeader>
                <CardTitle className="text-primary">Correlaciones entre Minerales</CardTitle>
                <CardDescription className="destructive">
                  Matriz de correlación de precios y extracción entre diferentes minerales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MatrixCovarianceChart />
              </CardContent>
            </Card>
          </div>
        </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
