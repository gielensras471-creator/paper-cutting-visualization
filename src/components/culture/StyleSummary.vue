<template>
  <div v-if="groups.length" class="style-summary">
    <article v-for="(item, index) in groups" :key="item.name">
      <div class="style-summary__meta">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <em>{{ item.count }} 条</em>
      </div>
      <h3>{{ item.name }}</h3>
      <p>{{ item.feature || '暂无视觉特征描述' }}</p>
      <footer>
        <strong>{{ item.representativeProject }}</strong>
        <small>{{ item.representativeProvince }}</small>
      </footer>
    </article>
  </div>
  <div v-else class="style-summary-empty">当前地域暂无风格辅助数据</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getStyleGroupOverview } from '@/utils/dataTransform'

const props = defineProps<{ province?: string }>()
const groups = computed(() => getStyleGroupOverview(props.province ?? ''))
</script>
