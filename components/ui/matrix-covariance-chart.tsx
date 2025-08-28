"use client"

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface MatrixCovarianceChartProps {
  className?: string
}

export function MatrixCovarianceChart({ className }: MatrixCovarianceChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Initialize chart
    chartInstance.current = echarts.init(chartRef.current, 'dark')

    // Generate mining correlation data
    const minerals = ['Oro', 'Plata', 'Cobre', 'Zinc', 'Hierro', 'Níquel', 'Plomo', 'Manganeso', 'Carbón', 'Sal'];
    const data: any[] = []

    // Generate synthetic correlation matrix data
    for (let i = 0; i < minerals.length; i++) {
      for (let j = 0; j < minerals.length; j++) {
        let value
        if (i === j) {
          value = 1 // Perfect correlation with itself
        } else {
          // Create realistic correlations based on mineral relationships
          if ((i === 0 && j === 1) || (i === 1 && j === 0)) value = 0.82 // Gold-Silver high correlation
          else if ((i === 2 && j === 3) || (i === 3 && j === 2)) value = 0.71 // Copper-Zinc correlation
          else if ((i === 4 && j === 6) || (i === 6 && j === 4)) value = 0.65 // Iron-Lead correlation
          else if ((i === 5 && j === 2) || (i === 2 && j === 5)) value = 0.58 // Nickel-Copper correlation
          else if (Math.abs(i - j) === 1) value = 0.3 + Math.random() * 0.4
          else value = -0.2 + Math.random() * 0.4
        }
        data.push([i, j, Math.round(value * 100) / 100])
      }
    }

    const option = {
      title: {
        text: 'Matriz de Correlación Minera',
        left: 'center'
      },
      tooltip: {
        position: 'top'
      },
      grid: {
        height: '60%',
        top: '15%',
        bottom: '35%'
      },
      xAxis: {
        type: 'category',
        data: minerals,
        splitArea: {
          show: true
        }
      },
      yAxis: {
        type: 'category',
        data: minerals,
        splitArea: {
          show: true
        }
      },
      visualMap: {
        min: -1,
        max: 1,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '8%',
        inRange: {
          color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffcc', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        }
      },
      series: [
        {
          name: 'Correlación',
          type: 'heatmap',
          data: data,
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
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

  return <div ref={chartRef} className={`w-full h-full min-h-[500px] ${className || ''}`} />
}