<template>
  <main class="page overview-page">
    <section class="hero-block">
      <div>
        <span class="kicker">INTANGIBLE CULTURAL HERITAGE · DATA EXPERIENCE</span>
        <h1>以数据重新阅读<br />中国剪纸</h1>
      </div>
      <p>从国家级项目、代表性传承人、地域分布与风格脉络出发，把传统剪纸转化为可探索、可联动的文化数据体验。</p>
    </section>

    <section class="stats-grid">
      <StatCard index="01" :value="projects.length" label="国家级剪纸项目" />
      <StatCard index="02" :value="inheritors.length" label="代表性传承人" />
      <StatCard index="03" :value="coveredProvinceCount" label="已有数据省份" />
      <StatCard index="04" :value="styleGroupCount" label="风格分类" />
    </section>

    <section class="explore-strip">
      <div>
        <span class="explore-strip__dot"></span>
        <strong>{{ selectedProvince ? `正在探索 · ${selectedProvince}` : '点击地图或排行开始地域探索' }}</strong>
        <p>{{ selectedProvince ? '批次、传承人、地域摘要与风格概览已同步切换。' : '同一个 selectedProvince 状态驱动多个数据模块联动。' }}</p>
      </div>
      <button v-if="selectedProvince" @click="clearProvince">返回全国</button>
    </section>

    <section class="overview-grid">
      <article class="panel ranking-panel">
        <SectionHeader eyebrow="PROVINCE RANKING" title="地域分布 Top 10" />
        <ProvinceRanking :selected-province="selectedProvince" @select="selectProvince" />
      </article>

      <article class="panel map-panel">
        <div class="map-title">
          <span>全国地域分布</span>
          <strong>{{ selectedProvince || '中国' }}</strong>
          <small>{{ selectedProvince ? '已联动当前地域数据' : '项目数量颜色编码 · 点击省份查看' }}</small>
        </div>
        <ChinaMap :selected-province="selectedProvince" @select="selectProvince" />
        <div class="map-legend">
          <span>项目数量</span>
          <i></i><i></i><i></i><i></i>
          <em>少</em><em>多</em>
        </div>
      </article>

      <article class="panel detail-panel">
        <SectionHeader eyebrow="REGION FOCUS" title="地域摘要" />
        <ProvinceDetail :summary="summary" @clear="clearProvince" />
      </article>
    </section>

    <section class="insight-grid">
      <article class="panel chart-panel">
        <SectionHeader
          eyebrow="BATCH TREND"
          :title="selectedProvince ? `${selectedProvince} · 入选批次` : '国家级项目入选批次'"
        />
        <div class="chart-note">观察不同批次中国家级剪纸项目的入选变化</div>
        <div class="chart-box"><BatchTrend :province="selectedProvince" /></div>
      </article>

      <article class="panel chart-panel">
        <SectionHeader
          eyebrow="INHERITORS"
          :title="selectedProvince ? `${selectedProvince} · 传承人批次` : '代表性传承人地域分布'"
        />
        <div class="chart-note">
          {{ selectedProvince ? '当前省份代表性传承人的公布批次分布' : '代表性传承人数量较多的地域 Top 8' }}
        </div>
        <div class="chart-box"><InheritorOverview :province="selectedProvince" /></div>
      </article>
    </section>

    <section class="style-section">
      <SectionHeader
        eyebrow="STYLE ATLAS"
        :title="selectedProvince ? `${selectedProvince} · 风格概览` : '剪纸风格概览'"
      >
        <RouterLink class="text-link" to="/heritage">进入传承与流派 →</RouterLink>
      </SectionHeader>
      <StyleSummary :province="selectedProvince" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import StatCard from '@/components/common/StatCard.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import ChinaMap from '@/components/charts/ChinaMap.vue'
import ProvinceRanking from '@/components/charts/ProvinceRanking.vue'
import BatchTrend from '@/components/charts/BatchTrend.vue'
import InheritorOverview from '@/components/charts/InheritorOverview.vue'
import ProvinceDetail from '@/components/culture/ProvinceDetail.vue'
import StyleSummary from '@/components/culture/StyleSummary.vue'
import {
  coveredProvinceCount,
  inheritors,
  projects,
  styleGroupCount,
  getProvinceSummary
} from '@/utils/dataTransform'
import { useProvinceSelection } from '@/composables/useProvinceSelection'

const { selectedProvince, selectProvince, clearProvince } = useProvinceSelection()
const summary = computed(() => getProvinceSummary(selectedProvince.value))
</script>
