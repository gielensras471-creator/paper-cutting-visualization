<template>
  <div class="section-header">
    <div>
      <span>{{ eyebrow }}</span>
      <h2>{{ title }}</h2>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
}>()
</script>
