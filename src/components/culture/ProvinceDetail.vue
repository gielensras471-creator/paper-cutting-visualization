<template>
  <div class="province-detail">
    <template v-if="summary">
      <div class="province-detail__top">
        <span>当前地域</span>
        <button @click="$emit('clear')">查看全国</button>
      </div>

      <h3>{{ summary.province }}</h3>
      <p v-if="summary.dominantStyle" class="province-detail__lead">
        以 <strong>{{ summary.dominantStyle }}</strong> 为主要辅助风格标签，结合项目与传承人数据阅读地域特征。
      </p>

      <div class="province-detail__numbers">
        <div>
          <strong>{{ summary.projectCount }}</strong>
          <span>国家级项目</span>
        </div>
        <div>
          <strong>{{ summary.inheritorCount }}</strong>
          <span>代表性传承人</span>
        </div>
      </div>

      <div class="province-detail__group" v-if="summary.representativeProjects.length">
        <span class="province-detail__label">代表项目</span>
        <ul>
          <li v-for="item in summary.representativeProjects.slice(0, 3)" :key="item">{{ item }}</li>
        </ul>
      </div>

      <div class="province-detail__group" v-if="summary.representativeInheritors.length">
        <span class="province-detail__label">代表性传承人</span>
        <div class="province-detail__people">
          <span v-for="item in summary.representativeInheritors" :key="item">{{ item }}</span>
        </div>
      </div>

      <div class="province-detail__styles">
        <span v-for="item in summary.styleGroups.slice(0, 4)" :key="item">{{ item }}</span>
        <em v-if="!summary.styleGroups.length">暂无风格辅助数据</em>
      </div>

      <RouterLink
        class="province-detail__action"
        :to="{ path: '/region', query: { province: summary.province } }"
      >
        进入地域探索 →
      </RouterLink>
    </template>

    <template v-else>
      <span class="province-detail__eyebrow">数据探索入口</span>
      <h3>点击地图或排行</h3>
      <p>选择省份后，地图、排行、批次趋势、传承人分析与风格概览会使用同一地域状态同步更新。</p>
      <div class="province-detail__guide">
        <span>01 地图定位</span>
        <span>02 数据联动</span>
        <span>03 地域下钻</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ProvinceSummary } from '@/types'

defineProps<{
  summary: ProvinceSummary | null
}>()

defineEmits<{
  clear: []
}>()
</script>
