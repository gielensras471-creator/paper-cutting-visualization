<template>
  <BaseEChart :option="option" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import BaseEChart from '@/components/common/BaseEChart.vue'
import { getBatchTrend } from '@/utils/dataTransform'

const props = defineProps<{ province?: string }>()

const option = computed<EChartsOption>(() => {
  const rows = getBatchTrend(props.province ?? '')
  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(49, 24, 20, .96)',
      borderColor: '#b93a2f',
      textStyle: { color: '#fff8ef' },
      formatter: (params: any) => {
        const item = params?.[0]
        const row = rows[item?.dataIndex ?? 0]
        return row ? `${row.batch} · ${row.year}<br/>入选项目：${row.count} 项` : ''
      }
    },
    grid: { left: 42, right: 20, top: 30, bottom: 34 },
    xAxis: {
      type: 'category',
      boundaryGap: false,
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
        type: 'line',
        data: rows.map(item => item.count),
        symbol: 'circle',
        symbolSize: 8,
        smooth: 0.18,
        lineStyle: { width: 3, color: '#a92f28' },
        itemStyle: { color: '#a92f28', borderColor: '#fff8ef', borderWidth: 3 },
        areaStyle: { color: 'rgba(169,47,40,.08)' }
      }
    ]
  }
})
</script>
