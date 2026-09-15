<template>
  <BaseEChart :option="option" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import BaseEChart from '@/components/common/BaseEChart.vue'
import { getInheritorBatchTrend, getInheritorProvinceTop } from '@/utils/dataTransform'
import { shortProvinceName } from '@/utils/provinceMap'

const props = defineProps<{ province?: string }>()

const option = computed<EChartsOption>(() => {
  if (props.province) {
    const rows = getInheritorBatchTrend(props.province)
    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(49, 24, 20, .95)',
        borderColor: '#b93a2f',
        textStyle: { color: '#fff8ef' },
        formatter: (params: any) => {
          const item = params?.[0]
          const row = rows[item?.dataIndex ?? 0]
          return row ? `${row.batch} · ${row.year}<br/>代表性传承人：${row.value} 位` : ''
        }
      },
      grid: { left: 44, right: 18, top: 24, bottom: 34 },
      xAxis: {
        type: 'category',
        data: rows.map(item => item.batch.replace('第', '').replace('批', '')),
        axisLine: { lineStyle: { color: '#d8c7ba' } },
        axisTick: { show: false },
        axisLabel: { color: '#735f58' }
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
        splitLine: { lineStyle: { color: '#eee3da', type: 'dashed' } },
        axisLabel: { color: '#927d75' }
      },
      series: [
        {
          type: 'bar',
          data: rows.map(item => item.value),
          barMaxWidth: 30,
          itemStyle: {
            color: '#a92f28',
            borderRadius: [8, 8, 2, 2]
          },
          emphasis: { itemStyle: { color: '#7f1f1b' } }
        }
      ]
    }
  }

  const rows = getInheritorProvinceTop(8).reverse()
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(49, 24, 20, .95)',
      borderColor: '#b93a2f',
      textStyle: { color: '#fff8ef' },
      formatter: (params: any) => {
        const item = params?.[0]
        const row = rows[item?.dataIndex ?? 0]
        return row ? `${row.province}<br/>代表性传承人：${row.value} 位` : ''
      }
    },
    grid: { left: 50, right: 18, top: 18, bottom: 24 },
    xAxis: {
      type: 'value',
      minInterval: 1,
      splitLine: { lineStyle: { color: '#eee3da', type: 'dashed' } },
      axisLabel: { color: '#927d75' }
    },
    yAxis: {
      type: 'category',
      data: rows.map(item => shortProvinceName(item.province)),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#5d4943' }
    },
    series: [
      {
        type: 'bar',
        data: rows.map(item => item.value),
        barWidth: 11,
        itemStyle: { color: '#b84437', borderRadius: [0, 8, 8, 0] },
        emphasis: { itemStyle: { color: '#7f1f1b' } }
      }
    ]
  }
})
</script>
