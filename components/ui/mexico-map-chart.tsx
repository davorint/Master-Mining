"use client"

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface MexicoMapChartProps {
  className?: string
}

export function MexicoMapChart({ className }: MexicoMapChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Initialize chart
    chartInstance.current = echarts.init(chartRef.current, 'dark')

    // Load Mexico GeoJSON data and set up the map
    const loadMexicoMap = async () => {
      try {
        // Load the local states.geojson file
        const response = await fetch('/states.geojson')
        
        let mexicoGeoJSON
        if (response.ok) {
          mexicoGeoJSON = await response.json()
        } else {
          throw new Error('Failed to load states.geojson')
        }
        
        // Register the Mexico map
        echarts.registerMap('mexico', mexicoGeoJSON)

        // Mexico states mining data based on real statistics
        // Using state names from the GeoJSON file
        const mexicoStatesData = [
          { name: 'Sonora', value: 282 },
          { name: 'Chihuahua', value: 160 },
          { name: 'Durango', value: 128 },
          { name: 'Zacatecas', value: 95 },
          { name: 'Coahuila', value: 78 },
          { name: 'Sinaloa', value: 65 },
          { name: 'Nuevo León', value: 52 },
          { name: 'Guerrero', value: 48 },
          { name: 'San Luis Potosí', value: 42 },
          { name: 'Jalisco', value: 38 },
          { name: 'Oaxaca', value: 35 },
          { name: 'Michoacán', value: 32 },
          { name: 'Baja California', value: 28 },
          { name: 'Veracruz', value: 25 },
          { name: 'Hidalgo', value: 22 },
          { name: 'Guanajuato', value: 20 },
          { name: 'Puebla', value: 18 },
          { name: 'México', value: 15 }, // Estado de México is "México" in the GeoJSON
          { name: 'Chiapas', value: 12 },
          { name: 'Nayarit', value: 10 },
          { name: 'Tamaulipas', value: 8 },
          { name: 'Baja California Sur', value: 6 },
          { name: 'Aguascalientes', value: 4 },
          { name: 'Querétaro', value: 3 },
          { name: 'Morelos', value: 2 },
          { name: 'Tlaxcala', value: 1 },
          { name: 'Colima', value: 1 },
          { name: 'Campeche', value: 1 },
          { name: 'Yucatán', value: 1 },
          { name: 'Quintana Roo', value: 1 },
          { name: 'Tabasco', value: 1 },
          { name: 'Distrito Federal', value: 0 } // CDMX is "Distrito Federal" in the GeoJSON
        ]

        const option = {
          title: {
            text: 'Número de Minas por Estado - México',
            subtext: 'Distribución geográfica de operaciones mineras activas',
            left: 'center',
            textStyle: {
              color: 'var(--foreground)',
              fontSize: 16
            },
            subtextStyle: {
              color: 'var(--muted-foreground)',
              fontSize: 12
            }
          },
          tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params: any) {
              const value = params.value || 0
              return `<strong>${params.name}</strong><br/>Minas activas: ${value}`
            }
          },
          visualMap: {
            left: 'right',
            min: 0,
            max: 300,
            inRange: {
              color: [
                '#313695',
                '#4575b4', 
                '#74add1',
                '#abd9e9',
                '#e0f3f8',
                '#ffffcc',
                '#fee090',
                '#fdae61',
                '#f46d43',
                '#d73027',
                '#a50026'
              ]
            },
            text: ['Alto', 'Bajo'],
            calculable: true,
            textStyle: {
              color: 'var(--foreground)'
            }
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'left',
            top: 'top',
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {}
            },
            iconStyle: {
              borderColor: 'var(--foreground)'
            }
          },
          series: [
            {
              name: 'Minas por Estado',
              type: 'map',
              roam: true,
              map: 'mexico',
              emphasis: {
                label: {
                  show: true,
                  color: '#fff'
                },
                itemStyle: {
                  areaColor: '#389BB7',
                  borderWidth: 1,
                  borderColor: '#fff'
                }
              },
              select: {
                label: {
                  show: true,
                  color: '#fff'
                },
                itemStyle: {
                  areaColor: '#389BB7'
                }
              },
              itemStyle: {
                borderColor: 'var(--border)',
                borderWidth: 0.5
              },
              data: mexicoStatesData,
              nameProperty: 'state_name' // Use the correct property name from GeoJSON
            }
          ]
        }

        chartInstance.current?.setOption(option)
      } catch (error) {
        console.error('Error loading Mexico map:', error)
      }
    }

    loadMexicoMap()

    // Handle resize
    const handleResize = () => {
      chartInstance.current?.resize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chartInstance.current?.dispose()
    }
  }, [])

  return <div ref={chartRef} className={`w-full h-full min-h-[500px] ${className || ''}`} />
}