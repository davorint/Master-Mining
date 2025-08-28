"use client"

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface BarStackChartProps {
  className?: string
}

export function BarStackChart({ className }: BarStackChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Initialize chart
    chartInstance.current = echarts.init(chartRef.current, 'dark')

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Oro', 'Plata', 'Cobre', 'Zinc', 'Hierro', 'Proyección', 'Tendencia Total']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Oro',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: [220, 382, 481, 734]
        },
        {
          name: 'Plata',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: [150, 212, 301, 454]
        },
        {
          name: 'Cobre',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: [320, 402, 571, 734]
        },
        {
          name: 'Zinc',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: [200, 332, 401, 554]
        },
        {
          name: 'Hierro',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: [1020, 1432, 1901, 2834]
        },
        {
          name: 'Proyección',
          type: 'bar',
          barWidth: '7%',
          itemStyle: {
            borderColor: 'rgba(0,0,0,0.3)',
            color: 'rgba(128,128,128,0.3)'
          },
          data: [1950, 2800, 3700, 5400]
        },
        {
          name: 'Tendencia Total',
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#5793f3',
            width: 2
          },
          symbol: 'circle',
          symbolSize: 6,
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' }
            ]
          },
          markLine: {
            data: [{ type: 'average', name: 'Avg' }]
          },
          data: [1910, 2760, 3655, 5310]
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