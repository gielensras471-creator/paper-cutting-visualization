<template>
  <section class="pattern-lab">
    <!-- 标题 -->
    <header class="pattern-header">
      <div>
        <span> PATTERN LAB </span>

        <h2>剪纸纹样基因库</h2>
      </div>

      <p>探索传统剪纸中的视觉符号， 从纹样结构、文化寓意到地域来源， 解析非遗艺术中的图形基因。</p>
    </header>

    <!-- 纹样列表 -->

    <div class="pattern-grid">
      <article
        v-for="item in patterns"
        :key="item.key"
        class="pattern-card"
        :class="{
          active: selected === item.key
        }"
        @click="selectPattern(item.key)"
      >
        <!-- 图形预览 -->

        <div class="pattern-icon">
          <svg viewBox="0 0 120 120">
            <!-- 花 -->

            <template v-if="item.key === '花'">
              <circle cx="60" cy="35" r="18" />

              <circle cx="35" cy="60" r="18" />

              <circle cx="85" cy="60" r="18" />

              <circle cx="60" cy="85" r="18" />
            </template>

            <!-- 鸟 -->

            <template v-else-if="item.key === '鸟'">
              <path
                d="
                M30 60
                C45 30
                80 35
                90 60
                C75 85
                45 90
                30 60Z
                "
              />

              <path
                d="
                M70 55
                L105 45
                L80 65
                "
              />
            </template>

            <!-- 鱼 -->

            <template v-else-if="item.key === '鱼'">
              <ellipse cx="58" cy="60" rx="35" ry="25" />

              <path
                d="
                M90 60
                L112 42
                L112 78
                Z
                "
              />
            </template>

            <!-- 蝶 -->

            <template v-else-if="item.key === '蝶'">
              <path
                d="
                M60 55
                C20 10 10 70 60 70
                C110 70 100 10 60 55
                "
              />

              <line x1="60" y1="45" x2="60" y2="90" />
            </template>

            <!-- 福 -->

            <template v-else>
              <text x="60" y="82" text-anchor="middle">福</text>
            </template>
          </svg>
        </div>

        <div>
          <h3>
            {{ item.name }}
          </h3>

          <small>
            {{ item.english }}
          </small>
        </div>
      </article>
    </div>

    <!-- 详情 -->

    <transition name="fade" mode="out-in">
      <article class="pattern-detail" :key="current.key">
        <div class="detail-main">
          <span> CULTURAL DNA </span>

          <h3>
            {{ current.name }}
          </h3>

          <p>
            {{ current.description }}
          </p>
        </div>

        <div class="detail-grid">
          <div>
            <label> 文化寓意 </label>

            <strong>
              {{ current.meaning }}
            </strong>
          </div>

          <div>
            <label> 结构特征 </label>

            <strong>
              {{ current.structure }}
            </strong>
          </div>

          <div>
            <label> 常见地域 </label>

            <strong>
              <span v-for="region in current.regions" :key="region">
                {{ region }}
              </span>
            </strong>
          </div>
        </div>
      </article>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { patterns, patternMap } from '@/data/patterns'

import type { Motif } from '@/data/patterns'

const selected = ref<Motif>('花')
const emit = defineEmits<{
  (e: 'select-pattern', value: Motif): void
}>()

const current = computed(() => patternMap[selected.value])
function selectPattern(value: Motif) {
  selected.value = value

  emit('select-pattern', value)
}
</script>

<style scoped>
.pattern-lab {
  margin-top: 50px;

  padding: 42px;

  border: 1px solid rgba(120, 80, 60, 0.12);

  border-radius: 24px;

  background: rgba(255, 252, 247, 0.75);
}

.pattern-header {
  display: flex;

  justify-content: space-between;

  align-items: flex-end;

  margin-bottom: 32px;
}

.pattern-header span {
  color: #a47b70;

  font-size: 9px;

  letter-spacing: 0.18em;
}

.pattern-header h2 {
  margin: 8px 0 0;

  color: #412a24;

  font-family: 'STKaiti';

  font-size: 32px;
}

.pattern-header p {
  width: 360px;

  color: #8c7067;

  font-size: 12px;

  line-height: 2;
}

.pattern-grid {
  display: grid;

  grid-template-columns: repeat(5, 1fr);

  gap: 16px;
}

.pattern-card {
  cursor: pointer;

  padding: 18px 12px;

  border: 1px solid rgba(120, 80, 60, 0.1);

  border-radius: 18px;

  background: #fffaf5;

  text-align: center;

  transition: 0.25s;
}

.pattern-card:hover {
  transform: translateY(-4px);
}

.pattern-card.active {
  border-color: #a3362f;

  background: #f8e9df;
}

.pattern-icon {
  width: 90px;

  height: 90px;

  margin: 0 auto 12px;
}

.pattern-icon svg {
  width: 100%;

  height: 100%;

  fill: #a3362f;

  stroke: #a3362f;

  stroke-width: 4;
}

.pattern-icon text {
  fill: #a3362f;

  stroke: none;

  font-size: 55px;

  font-family: 'STKaiti';
}

.pattern-card h3 {
  margin: 0;

  color: #49312a;

  font-size: 17px;
}

.pattern-card small {
  color: #a58a80;

  font-size: 8px;
}

.pattern-detail {
  margin-top: 32px;

  display: grid;

  grid-template-columns: 0.8fr 1.2fr;

  gap: 35px;

  padding: 28px;

  border-radius: 18px;

  background: linear-gradient(135deg, #fff8f1, #f6e6dc);
}

.detail-main span {
  color: #aa7e70;

  font-size: 9px;

  letter-spacing: 0.15em;
}

.detail-main h3 {
  margin: 12px 0;

  color: #4a3028;

  font-family: 'STKaiti';

  font-size: 34px;
}

.detail-main p {
  color: #80665c;

  line-height: 2;

  font-size: 13px;
}

.detail-grid {
  display: grid;

  gap: 15px;
}

.detail-grid div {
  padding: 18px;

  background: rgba(255, 255, 255, 0.55);

  border-radius: 14px;
}

.detail-grid label {
  display: block;

  color: #aa8b80;

  font-size: 10px;

  margin-bottom: 8px;
}

.detail-grid strong {
  color: #563a32;

  font-size: 13px;

  line-height: 1.8;
}

.detail-grid span {
  display: inline-block;

  margin-right: 8px;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.25s;
}

.fade-enter-from {
  opacity: 0;

  transform: translateY(10px);
}

@media (max-width: 900px) {
  .pattern-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .pattern-header,
  .pattern-detail {
    display: block;
  }

  .pattern-header p {
    width: auto;

    margin-top: 20px;
  }
}
</style>
