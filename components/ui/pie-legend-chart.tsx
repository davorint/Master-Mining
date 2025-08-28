"use client"

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface PieLegendChartProps {
  className?: string
}

export function PieLegendChart({ className }: PieLegendChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Initialize chart
    chartInstance.current = echarts.init(chartRef.current, 'dark')

    const option = {
      title: {
        text: 'Distribución de Operaciones Mineras',
        subtext: 'Datos de Producción 2024',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: '5%',
        top: '20%',
        width: '25%'
      },
      series: [
        {
          name: 'Tipo de Operación',
          type: 'pie',
          radius: '40%',
          center: ['70%', '50%'],
          data: [
            { value: 10480, name: 'Oro' },
            { value: 7350, name: 'Plata' },
            { value: 5800, name: 'Cobre' },
            { value: 4840, name: 'Zinc' },
            { value: 3000, name: 'Hierro' },
            { value: 2890, name: 'Piedra' },
            { value: 2650, name: 'Sal' },
            { value: 2420, name: 'Carbón' },
            { value: 2180, name: 'Yeso' },
            { value: 1950, name: 'Plomo' },
            { value: 1800, name: 'Arena' },
            { value: 1650, name: 'Níquel' },
            { value: 1500, name: 'Grava' },
            { value: 1380, name: 'Manganeso' },
            { value: 1250, name: 'Arcilla' },
            { value: 1120, name: 'Estaño' },
            { value: 1000, name: 'Fluorita' },
            { value: 890, name: 'Molibdeno' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
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