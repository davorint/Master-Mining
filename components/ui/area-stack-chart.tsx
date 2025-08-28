"use client"

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface AreaStackChartProps {
  className?: string
}

export function AreaStackChart({ className }: AreaStackChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Initialize chart
    chartInstance.current = echarts.init(chartRef.current, 'dark')

    const option = {
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
      title: {
        text: 'Producción Mensual por Mina',
        textStyle: {
          color: 'var(--primary)',
          fontSize: 16
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        },
        formatter: function (params: any) {
          let result = `<strong>${params[0].axisValue}</strong><br/>`
          params.forEach((param: any) => {
            result += `${param.marker} ${param.seriesName}: ${param.value} toneladas<br/>`
          })
          return result
        }
      },
      legend: {
        data: ['Mina Cordero', 'Mina Rodeo', 'Mina Orisyvo', 'Planta Norte', 'Planta Sur'],
        textStyle: {
          color: '#ffffff'
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          axisLabel: {
            color: '#ffffff'
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Producción (Toneladas)',
          nameTextStyle: {
            color: '#ffffff'
          },
          axisLabel: {
            color: '#ffffff',
            formatter: '{value} t'
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        }
      ],
      series: [
        {
          name: 'Mina Cordero',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(128, 255, 165, 1)'
              },
              {
                offset: 1,
                color: 'rgba(1, 191, 236, 1)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [850, 920, 780, 1100, 950, 1200, 1350, 1450, 1320, 1180, 900, 750]
        },
        {
          name: 'Mina Rodeo',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(0, 221, 255, 1)'
              },
              {
                offset: 1,
                color: 'rgba(77, 119, 255, 1)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [650, 720, 680, 890, 820, 950, 1100, 1200, 1050, 980, 750, 600]
        },
        {
          name: 'Mina Orisyvo',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(55, 162, 255, 1)'
              },
              {
                offset: 1,
                color: 'rgba(116, 21, 219, 1)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [420, 480, 520, 680, 590, 750, 850, 920, 800, 720, 550, 450]
        },
        {
          name: 'Planta Norte',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(255, 0, 135, 1)'
              },
              {
                offset: 1,
                color: 'rgba(135, 0, 157, 1)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [380, 420, 450, 580, 520, 650, 720, 780, 680, 620, 480, 380]
        },
        {
          name: 'Planta Sur',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          label: {
            show: true,
            position: 'top',
            formatter: '{c} t',
            color: '#ffffff'
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(255, 191, 0, 1)'
              },
              {
                offset: 1,
                color: 'rgba(224, 62, 76, 1)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 360, 400, 510, 460, 580, 630, 690, 600, 540, 420, 340]
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

  return <div ref={chartRef} className={`w-full h-full min-h-[400px] ${className || ''}`} />
}