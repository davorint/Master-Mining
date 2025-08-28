"use client"

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface SunburstChartProps {
  className?: string
}

export function SunburstChart({ className }: SunburstChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Initialize chart
    chartInstance.current = echarts.init(chartRef.current, 'dark')

    // Data structure based on the original ECharts sunburst drink example proportions
    const data = [
      {
        name: 'Minería',
        children: [
          {
            name: 'Metales Preciosos',
            children: [
              {
                name: 'Oro',
                children: [
                  { name: 'El Dorado', value: 4, itemStyle: { color: '#da70d6' } },
                  { name: 'Golden Valley', value: 4, itemStyle: { color: '#32cd32' } },
                  { name: 'Mina Aurora', value: 15, itemStyle: { color: '#6495ed' } },
                  { name: 'Fortuna Gold', value: 25, itemStyle: { color: '#ff69b4' } },
                  { name: 'Gold Rush', value: 28, itemStyle: { color: '#ba55d3' } }
                ]
              },
              {
                name: 'Plata',
                children: [
                  { name: 'Silver Crown', value: 1, itemStyle: { color: '#cd5c5c' } },
                  { name: 'Luna Plateada', value: 4, itemStyle: { color: '#ffa500' } },
                  { name: 'Plata Real', value: 22, itemStyle: { color: '#40e0d0' } }
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
                  { name: 'Red Mountain', value: 16, itemStyle: { color: '#f0e68c' } },
                  { name: 'Copper Hill', value: 3, itemStyle: { color: '#87ceeb' } },
                  { name: 'Phoenix Copper', value: 18, itemStyle: { color: '#da70d6' } },
                  { name: 'Arizona Copper', value: 9, itemStyle: { color: '#32cd32' } }
                ]
              },
              {
                name: 'Zinc',
                children: [
                  { name: 'Blue Zinc', value: 3, itemStyle: { color: '#6495ed' } },
                  { name: 'Arctic Zinc', value: 1, itemStyle: { color: '#ff69b4' } },
                  { name: 'Zinc Valley', value: 11, itemStyle: { color: '#ba55d3' } },
                  { name: 'Northern Zinc', value: 18, itemStyle: { color: '#f0e68c' } }
                ]
              },
              {
                name: 'Hierro',
                children: [
                  { name: 'Iron Mountain', value: 10, itemStyle: { color: '#cd5c5c' } },
                  { name: 'Steel Valley', value: 9, itemStyle: { color: '#ffa500' } },
                  { name: 'Red Iron', value: 17, itemStyle: { color: '#40e0d0' } },
                  { name: 'Magnetite Peak', value: 7, itemStyle: { color: '#87ceeb' } }
                ]
              }
            ]
          },
          {
            name: 'Energéticos',
            children: [
              {
                name: 'Carbón',
                children: [
                  { name: 'Black Diamond', value: 6, itemStyle: { color: '#da70d6' } },
                  { name: 'Coal Creek', value: 2, itemStyle: { color: '#32cd32' } },
                  { name: 'Dark Valley', value: 11, itemStyle: { color: '#6495ed' } },
                  { name: 'Mountain Coal', value: 18, itemStyle: { color: '#ff69b4' } },
                  { name: 'Deep Coal', value: 2, itemStyle: { color: '#ba55d3' } }
                ]
              },
              {
                name: 'Uranio',
                children: [
                  { name: 'Uranium Peak', value: 7, itemStyle: { color: '#f0e68c' } },
                  { name: 'Yellow Cake', value: 12, itemStyle: { color: '#cd5c5c' } }
                ]
              }
            ]
          },
          {
            name: 'No Metálicos',
            children: [
              {
                name: 'Sal',
                children: [
                  { name: 'Salt Lake', value: 18, itemStyle: { color: '#ffa500' } },
                  { name: 'White Salt', value: 2, itemStyle: { color: '#40e0d0' } },
                  { name: 'Rock Salt', value: 12, itemStyle: { color: '#87ceeb' } }
                ]
              },
              {
                name: 'Yeso',
                children: [
                  { name: 'Gypsum Hill', value: 2, itemStyle: { color: '#da70d6' } },
                  { name: 'White Rock', value: 16, itemStyle: { color: '#32cd32' } },
                  { name: 'Crystal Gypsum', value: 3, itemStyle: { color: '#6495ed' } }
                ]
              }
            ]
          }
        ]
      }
    ]

    const option = {
      title: {
        text: 'Operaciones Mineras por Categoría',
        subtext: 'Clasificación jerárquica de minerales',
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: function (params: any) {
          if (params.data.value) {
            return `<strong>${params.data.name}</strong><br/>Valor: ${params.data.value}`
          } else {
            return `<strong>${params.data.name}</strong><br/>Categoría`
          }
        }
      },
      series: [
        {
          name: 'Minería',
          type: 'sunburst',
          data: data,
          radius: [0, '95%'],
          center: ['50%', '50%'],
          sort: null,
          emphasis: {
            focus: 'ancestor'
          },
          levels: [
            {},
            {
              r0: '15%',
              r: '35%',
              itemStyle: {
                borderWidth: 2,
                borderColor: '#fff'
              },
              label: {
                rotate: 'tangential',
                fontSize: 14,
                color: '#fff'
              }
            },
            {
              r0: '35%',
              r: '70%',
              label: {
                align: 'right'
              }
            },
            {
              r0: '70%',
              r: '72%',
              label: {
                position: 'outside',
                padding: 3,
                silent: false
              },
              itemStyle: {
                borderWidth: 3
              }
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

  return <div ref={chartRef} className={`w-full h-full min-h-[500px] ${className || ''}`} />
}