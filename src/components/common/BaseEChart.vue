<template><div ref="chartEl" class="chart-root"></div></template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { EChartsOption } from 'echarts'

const props = defineProps<{ option: EChartsOption }>()
const emit = defineEmits<{ click: [params: any]; ready: [chart: echarts.ECharts] }>()
const chartEl = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null
let observer: ResizeObserver | null = null

const render = () => chart?.setOption(props.option, true)
watch(() => props.option, render, { deep: true })

onMounted(() => {
  if (!chartEl.value) return
  chart = echarts.init(chartEl.value)
  chart.on('click', params => emit('click', params))
  render()
  emit('ready', chart)
  observer = new ResizeObserver(() => chart?.resize())
  observer.observe(chartEl.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  chart?.dispose()
  chart = null
})
</script>
<style scoped>.chart-root{width:100%;height:100%;min-height:240px}</style>
