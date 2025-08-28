"use client"

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface AqiLineChartProps {
  className?: string
}

export function AqiLineChart({ className }: AqiLineChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Initialize chart
    chartInstance.current = echarts.init(chartRef.current, 'dark')

    // Synthetic mining safety and environmental data
    const dates = []
    const pm25Data = []
    const pm10Data = []
    const no2Data = []
    const dustLevelsData = []
    const noiseData = []

    // Generate data for the last 30 days
    const now = new Date()
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      dates.push(date.toLocaleDateString('es-MX', { month: 'short', day: 'numeric' }))
      
      // Generate realistic mining environmental data
      pm25Data.push(Math.floor(Math.random() * 40) + 15) // 15-55 µg/m³
      pm10Data.push(Math.floor(Math.random() * 80) + 30) // 30-110 µg/m³
      no2Data.push(Math.floor(Math.random() * 30) + 10) // 10-40 µg/m³
      dustLevelsData.push(Math.floor(Math.random() * 120) + 40) // 40-160 µg/m³
      noiseData.push(Math.floor(Math.random() * 15) + 65) // 65-80 dB
    }

    const option = {
      title: {
        text: 'Monitoreo Ambiental - Planta 2',
        textStyle: {
          color: '#ffffff',
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: function (params: any) {
          let result = `<strong>${params[0].axisValue}</strong><br/>`
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          params.forEach((param: any) => {
            let unit = ''
            if (param.seriesName.includes('Ruido')) {
              unit = ' dB'
            } else {
              unit = ' µg/m³'
            }
            result += `${param.marker} ${param.seriesName}: ${param.value}${unit}<br/>`
          })
          return result
        }
      },
      legend: {
        data: ['PM2.5', 'PM10', 'NO2', 'Polvo Suspendido', 'Nivel de Ruido'],
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
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates,
        axisLabel: {
          color: '#ffffff'
        },
        axisLine: {
          lineStyle: {
            color: '#ffffff'
          }
        }
      },
      yAxis: [
        {
          type: 'value',
          name: 'Cons. (µg/m³)',
          position: 'left',
          nameTextStyle: {
            color: '#ffffff'
          },
          axisLabel: {
            color: '#ffffff',
            formatter: '{value}'
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
        },
        {
          type: 'value',
          name: 'Ruido (dB)',
          position: 'right',
          nameTextStyle: {
            color: '#ffffff'
          },
          axisLabel: {
            color: '#ffffff',
            formatter: '{value} dB'
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          },
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name: 'PM2.5',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          sampling: 'lttb',
          itemStyle: {
            color: '#ff7f50'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(255, 127, 80, 0.3)'
              },
              {
                offset: 1,
                color: 'rgba(255, 127, 80, 0)'
              }
            ])
          },
          data: pm25Data
        },
        {
          name: 'PM10',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          sampling: 'lttb',
          itemStyle: {
            color: '#87ceeb'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(135, 206, 235, 0.3)'
              },
              {
                offset: 1,
                color: 'rgba(135, 206, 235, 0)'
              }
            ])
          },
          data: pm10Data
        },
        {
          name: 'NO2',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          sampling: 'lttb',
          itemStyle: {
            color: '#da70d6'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(218, 112, 214, 0.3)'
              },
              {
                offset: 1,
                color: 'rgba(218, 112, 214, 0)'
              }
            ])
          },
          data: no2Data
        },
        {
          name: 'Polvo Suspendido',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          sampling: 'lttb',
          itemStyle: {
            color: '#32cd32'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(50, 205, 50, 0.3)'
              },
              {
                offset: 1,
                color: 'rgba(50, 205, 50, 0)'
              }
            ])
          },
          data: dustLevelsData
        },
        {
          name: 'Nivel de Ruido',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          sampling: 'lttb',
          yAxisIndex: 1,
          itemStyle: {
            color: '#ffd700'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(255, 215, 0, 0.3)'
              },
              {
                offset: 1,
                color: 'rgba(255, 215, 0, 0)'
              }
            ])
          },
          data: noiseData
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