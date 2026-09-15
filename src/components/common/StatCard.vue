<template>
  <article class="stat-card">
    <span class="stat-card__eyebrow">{{ index }}</span>
    <strong>{{ value }}</strong>
    <p>{{ label }}</p>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  index: string
  value: number | string
  label: string
}>()
</script>
