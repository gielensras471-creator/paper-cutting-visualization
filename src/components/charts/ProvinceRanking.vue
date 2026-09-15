<template>
  <div class="ranking-list">
    <button v-for="(item, idx) in top" :key="item.province" :class="['ranking-item', { active: item.province === selectedProvince }]" @click="$emit('select', item.province)">
      <span class="ranking-no">{{ String(idx + 1).padStart(2, '0') }}</span>
      <span class="ranking-name">{{ shortProvinceName(item.province) }}</span>
      <span class="ranking-track"><i :style="{ width: `${item.value / top[0].value * 100}%` }"></i></span>
      <strong>{{ item.value }}</strong>
    </button>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { provinceRanking } from '@/utils/dataTransform'
import { shortProvinceName } from '@/utils/provinceMap'
const props = defineProps<{ selectedProvince: string; limit?: number }>()
defineEmits<{ select: [province: string] }>()
const top = computed(() => provinceRanking.slice(0, props.limit ?? 10))
</script>
