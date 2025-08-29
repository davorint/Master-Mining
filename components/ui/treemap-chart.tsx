"use client"

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface TreemapChartProps {
  className?: string
}

export function TreemapChart({ className }: TreemapChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Initialize chart
    chartInstance.current = echarts.init(chartRef.current, 'dark')

    const option = {
      title: {
        text: 'Clasificación de Operaciones Mineras',
        subtext: 'Distribución por Tipo y Escala de Operación 2024',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: function (info: { value: number; treePathInfo: Array<{ name: string }> }) {
          const value = info.value
          const treePathInfo = info.treePathInfo
          const treePath: string[] = []
          
          for (let i = 1; i < treePathInfo.length; i++) {
            treePath.push(treePathInfo[i].name)
          }
          
          return [
            '<div class="tooltip-title">' + echarts.format.encodeHTML(treePath.join(' / ')) + '</div>',
            'Producción: ' + echarts.format.addCommas(value) + ' toneladas/año',
          ].join('')
        }
      },
      series: [
        {
          name: 'Operaciones Mineras',
          type: 'treemap',
          visibleMin: 300,
          label: {
            show: true,
            formatter: '{b}'
          },
          itemStyle: {
            borderColor: '#fff'
          },
          levels: [
            {
              itemStyle: {
                borderWidth: 0,
                gapWidth: 5
              }
            },
            {
              itemStyle: {
                gapWidth: 1
              }
            },
            {
              colorSaturation: [0.35, 0.5],
              itemStyle: {
                gapWidth: 1,
                borderColorSaturation: 0.6
              }
            }
          ],
          data: [
            {
              name: 'Metales Preciosos',
              children: [
                {
                  name: 'Oro',
                  children: [
                    { name: 'Mina El Peñón', value: 15420 },
                    { name: 'Mina La Herradura', value: 12350 },
                    { name: 'Mina Mulatos', value: 9800 },
                    { name: 'Mina Dolores', value: 8900 },
                    { name: 'Mina Los Filos', value: 7650 }
                  ]
                },
                {
                  name: 'Plata',
                  children: [
                    { name: 'Mina Fresnillo', value: 18500 },
                    { name: 'Mina Saucito', value: 14200 },
                    { name: 'Mina Ciénega', value: 11800 },
                    { name: 'Mina San Julián', value: 9400 },
                    { name: 'Mina Peñasquito', value: 8750 }
                  ]
                },
                {
                  name: 'Platino',
                  children: [
                    { name: 'Proyecto Caborca', value: 2100 },
                    { name: 'Mina El Sauzal', value: 1850 },
                    { name: 'Proyecto Sonora', value: 1200 }
                  ]
                }
              ]
            },
            {
              name: 'Metales Base',
              children: [
                {
                  name: 'Cobre',
                  children: [
                    { name: 'Mina Buenavista', value: 22800 },
                    { name: 'Mina La Caridad', value: 18600 },
                    { name: 'Mina Milpillas', value: 14200 },
                    { name: 'Proyecto El Arco', value: 11500 },
                    { name: 'Mina El Boleo', value: 9800 }
                  ]
                },
                {
                  name: 'Zinc',
                  children: [
                    { name: 'Mina Francisco I. Madero', value: 16400 },
                    { name: 'Mina Charcas', value: 13200 },
                    { name: 'Mina Santa Bárbara', value: 10800 },
                    { name: 'Mina Bismark', value: 8900 },
                    { name: 'Mina Reforma', value: 7600 }
                  ]
                },
                {
                  name: 'Plomo',
                  children: [
                    { name: 'Mina Santa Eulalia', value: 8900 },
                    { name: 'Mina Naica', value: 7400 },
                    { name: 'Mina Velardena', value: 6200 },
                    { name: 'Mina Taxco', value: 4800 }
                  ]
                }
              ]
            },
            {
              name: 'Minerales Industriales',
              children: [
                {
                  name: 'Hierro',
                  children: [
                    { name: 'Mina El Encino', value: 25600 },
                    { name: 'Mina Peña Colorada', value: 19800 },
                    { name: 'Mina Aquila', value: 16200 },
                    { name: 'Mina Cerro de Mercado', value: 13400 }
                  ]
                },
                {
                  name: 'Carbón',
                  children: [
                    { name: 'Mina Pasta de Conchos', value: 18900 },
                    { name: 'Mina Nueva Rosita', value: 15600 },
                    { name: 'Mina Agujita', value: 12800 },
                    { name: 'Mina La Esperanza', value: 10200 }
                  ]
                },
                {
                  name: 'Fluorita',
                  children: [
                    { name: 'Mina Las Cuevas', value: 6800 },
                    { name: 'Mina Cerro Gordo', value: 5400 },
                    { name: 'Mina El Refugio', value: 4200 },
                    { name: 'Mina San Antonio', value: 3600 }
                  ]
                }
              ]
            },
            {
              name: 'Minerales No Metálicos',
              children: [
                {
                  name: 'Yeso',
                  children: [
                    { name: 'Mina San Luis Potosí', value: 14600 },
                    { name: 'Mina Nuevo León', value: 11800 },
                    { name: 'Mina Coahuila', value: 9200 },
                    { name: 'Mina Sonora', value: 7400 }
                  ]
                },
                {
                  name: 'Sal',
                  children: [
                    { name: 'Salinas Guerrero Negro', value: 32400 },
                    { name: 'Salinas Colima', value: 18900 },
                    { name: 'Salinas Real de Catorce', value: 14600 },
                    { name: 'Salinas Carmen', value: 11200 }
                  ]
                },
                {
                  name: 'Arena Sílice',
                  children: [
                    { name: 'Mina Veracruz', value: 12800 },
                    { name: 'Mina Jalisco', value: 10400 },
                    { name: 'Mina Guanajuato', value: 8600 },
                    { name: 'Mina Puebla', value: 6900 }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }

    chartInstance.current.setOption(option)

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

  return <div ref={chartRef} className={`w-full h-full min-h-[600px] ${className || ''}`} />
}