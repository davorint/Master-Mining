"use client"

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface SankeyChartProps {
  className?: string
}

export function SankeyChart({ className }: SankeyChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Initialize chart
    chartInstance.current = echarts.init(chartRef.current, 'dark')

    // Synthetic mining process flow data
    const data = {
      nodes: [
        // Mining Sources
        { name: 'Mina Cordero' },
        { name: 'Mina Rodeo' },
        { name: 'Mina Orisyvo' },
        
        // Primary Processing
        { name: 'Trituración' },
        { name: 'Molienda' },
        
        // Separation Processes
        { name: 'Flotación' },
        { name: 'Concentración' },
        { name: 'Lixiviación' },
        
        // Final Products
        { name: 'Concentrado Oro' },
        { name: 'Concentrado Plata' },
        { name: 'Concentrado Cobre' },
        { name: 'Material Estéril' }
      ],
      links: [
        // From mines to primary processing
        { source: 'Mina Cordero', target: 'Trituración', value: 1200 },
        { source: 'Mina Rodeo', target: 'Trituración', value: 950 },
        { source: 'Mina Orisyvo', target: 'Trituración', value: 750 },
        
        // From crushing to grinding
        { source: 'Trituración', target: 'Molienda', value: 2900 },
        
        // From grinding to separation processes
        { source: 'Molienda', target: 'Flotación', value: 1800 },
        { source: 'Molienda', target: 'Lixiviación', value: 1100 },
        
        // From flotation to concentration
        { source: 'Flotación', target: 'Concentración', value: 1800 },
        
        // From processes to final products
        { source: 'Concentración', target: 'Concentrado Oro', value: 450 },
        { source: 'Concentración', target: 'Concentrado Plata', value: 320 },
        { source: 'Concentración', target: 'Concentrado Cobre', value: 280 },
        { source: 'Concentración', target: 'Material Estéril', value: 750 },
        
        { source: 'Lixiviación', target: 'Concentrado Oro', value: 650 },
        { source: 'Lixiviación', target: 'Material Estéril', value: 450 }
      ]
    }

    const option = {
      title: {
        text: 'Flujo de Procesamiento Minero',
        textStyle: {
          color: 'var(--foreground)',
          fontSize: 16
        }
      },
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: function (params: any) {
          if (params.dataType === 'edge') {
            return `${params.data.source} → ${params.data.target}<br/>${params.data.value} toneladas`
          } else {
            return `${params.data.name}<br/>Total: ${params.data.value || 'N/A'} toneladas`
          }
        }
      },
      series: [
        {
          type: 'sankey',
          data: data.nodes,
          links: data.links,
          emphasis: {
            focus: 'adjacency'
          },
          levels: [
            {
              depth: 0,
              itemStyle: {
                color: '#fac858'
              },
              lineStyle: {
                color: 'source',
                opacity: 0.6
              }
            },
            {
              depth: 1,
              itemStyle: {
                color: '#ee6666'
              },
              lineStyle: {
                color: 'source',
                opacity: 0.6
              }
            },
            {
              depth: 2,
              itemStyle: {
                color: '#73c0de'
              },
              lineStyle: {
                color: 'source',
                opacity: 0.6
              }
            },
            {
              depth: 3,
              itemStyle: {
                color: '#3ba272'
              },
              lineStyle: {
                color: 'source',
                opacity: 0.6
              }
            }
          ],
          lineStyle: {
            color: 'gradient',
            curveness: 0.5
          },
          itemStyle: {
            borderWidth: 1,
            borderColor: 'var(--border)'
          },
          label: {
            color: 'var(--foreground)',
            fontFamily: 'var(--font-sans)'
          },
          nodeAlign: 'left',
          layoutIterations: 32
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