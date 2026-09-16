<template>
  <div class="map-shell">
    <div v-if="loading" class="chart-state">正在载入中国行政区地图…</div>
    <div v-else-if="error" class="chart-state chart-state--error">{{ error }}</div>
    <BaseEChart v-else :option="option" @click="handleClick" />
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import { computed, onMounted, ref } from 'vue'
import BaseEChart from '@/components/common/BaseEChart.vue'
import { getProvinceSummary, provinceProjectMap } from '@/utils/dataTransform'

const props = defineProps<{ selectedProvince: string }>()
const emit = defineEmits<{ select: [province: string] }>()
const loading = ref(true)
const error = ref('')
const ready = ref(false)

onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}geojson/china-provinces.json`)
    if (!response.ok) throw new Error(`地图资源加载失败：${response.status}`)
    const geojson = await response.json()
    echarts.registerMap('china-paper-cut', geojson)
    ready.value = true
  } catch (err) {
    error.value = err instanceof Error ? err.message : '地图资源加载失败'
  } finally {
    loading.value = false
  }
})

const maxValue = computed(() => Math.max(1, ...Object.values(provinceProjectMap)))
const mapData = computed(() =>
  Object.entries(provinceProjectMap).map(([name, value]) => ({
    name,
    value,
    selected: name === props.selectedProvince
  }))
)

const option = computed<EChartsOption>(() =>
  ready.value
    ? {
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(49, 24, 20, .96)',
          borderColor: '#b93a2f',
          borderWidth: 1,
          padding: [11, 13],
          textStyle: { color: '#fff8ef', fontSize: 12, lineHeight: 20 },
          formatter: (params: any) => {
            const summary = getProvinceSummary(params.name)
            if (!summary) return `<strong>${params.name}</strong><br/>暂无收录数据`
            return [
              `<strong>${params.name}</strong>`,
              `国家级项目：${summary.projectCount} 项`,
              `代表性传承人：${summary.inheritorCount} 位`,
              summary.dominantStyle ? `主要风格：${summary.dominantStyle}` : ''
            ]
              .filter(Boolean)
              .join('<br/>')
          }
        },
        visualMap: {
          show: false,
          min: 0,
          max: maxValue.value,
          inRange: { color: ['#f7e9dd', '#e9b39d', '#c55b4a', '#8f241f'] }
        },
        series: [
          {
            type: 'map',
            map: 'china-paper-cut',
            roam: false,
            selectedMode: 'single',
            layoutCenter: ['52%', '66%'],
            layoutSize: '108%',
            data: mapData.value,
            label: { show: false },
            itemStyle: {
              areaColor: '#f4eee6',
              borderColor: '#fffaf3',
              borderWidth: 1.35
            },
            emphasis: {
              label: { show: false },
              itemStyle: {
                areaColor: '#d96a55',
                borderColor: '#fff7ec',
                borderWidth: 1.8
              }
            },
            select: {
              label: {
                show: true,
                color: '#fffaf3',
                fontSize: 12,
                fontWeight: 'bold',
                textBorderColor: '#5a1713',
                textBorderWidth: 4
              },
              itemStyle: {
                areaColor: '#7f1f1b',
                borderColor: '#f3c98c',
                borderWidth: 2.4,
                shadowBlur: 16,
                shadowColor: 'rgba(110, 35, 26, .22)'
              }
            }
          }
        ]
      }
    : {}
)

function handleClick(params: any) {
  if (params?.name) emit('select', params.name)
}
</script>

<style scoped lang="scss">
.map-shell {
  height: 100%;
  min-height: 600px;
  position: relative;
}
.map-shell :deep(.chart-root) {
  min-height: 600px;
}
.chart-state {
  height: 100%;
  min-height: 600px;
  display: grid;
  place-items: center;
  color: #8d766f;
}
.chart-state--error {
  color: #a52d27;
}
@media (max-width: 900px) {
  .map-shell,
  .chart-state {
    min-height: 450px;
  }
}
</style>
