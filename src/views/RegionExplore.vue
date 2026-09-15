<template>
  <main class="page inner-page region-page">
    <section class="page-intro region-page__intro">
      <div>
        <span class="kicker">REGION EXPLORE</span>
        <h1>地域探索</h1>
      </div>
      <p>
        从省份进入国家级剪纸项目，继续下钻项目批次、代表性传承人、保护单位与风格类型，观察同一地域内部的文化脉络。
      </p>
    </section>

    <section class="region-toolbar panel region-toolbar--v3">
      <label class="region-select">
        <span>选择省份</span>
        <select v-model="selectedProvince">
          <option value="">全国</option>
          <option v-for="item in provinceRanking" :key="item.province" :value="item.province">
            {{ item.province }} · {{ item.value }} 项
          </option>
        </select>
      </label>

      <div class="region-quick-links" aria-label="重点地域快捷入口">
        <span>重点地域</span>
        <button
          v-for="item in provinceRanking.slice(0, 5)"
          :key="item.province"
          :class="{ active: selectedProvince === item.province }"
          @click="selectRegion(item.province)"
        >
          {{ shortProvince(item.province) }}
        </button>
      </div>

      <button v-if="selectedProvince" class="region-reset" @click="clearProvince">返回全国</button>
    </section>

    <section class="region-hero-grid">
      <article class="panel region-map-panel">
        <div class="region-map-heading">
          <div>
            <span>{{ selectedProvince ? 'CURRENT REGION' : 'NATIONAL INDEX' }}</span>
            <strong>{{ selectedProvince || '选择一个省份开始探索' }}</strong>
          </div>
          <small>{{ selectedProvince ? '点击其他省份即可切换地域' : '地图颜色表示国家级剪纸项目数量' }}</small>
        </div>
        <ChinaMap :selected-province="selectedProvince" @select="selectRegion" />
      </article>

      <article class="panel region-profile-panel">
        <template v-if="summary">
          <div class="region-profile-heading">
            <span>PROVINCE PROFILE</span>
            <button @click="clearProvince">查看全国</button>
          </div>
          <h2>{{ summary.province }}</h2>
          <p class="region-profile-lead">
            <strong>{{ summary.dominantStyle || '多元风格' }}</strong>
            {{ summary.dominantStyle ? '是当前数据中出现频率较高的风格类型。' : '当前地域存在多种剪纸表达。' }}
          </p>

          <div class="region-metric-grid">
            <div><strong>{{ summary.projectCount }}</strong><span>国家级项目</span></div>
            <div><strong>{{ summary.inheritorCount }}</strong><span>代表性传承人</span></div>
            <div><strong>{{ batchCount }}</strong><span>收录批次</span></div>
            <div><strong>{{ styleOverview.length }}</strong><span>风格类型</span></div>
          </div>

          <div class="region-profile-block" v-if="regionNodes.length">
            <span>地域节点</span>
            <div class="region-node-list">
              <em v-for="item in regionNodes.slice(0, 5)" :key="item">{{ compactRegion(item) }}</em>
            </div>
          </div>

          <div class="region-profile-block">
            <span>数据补充</span>
            <div class="region-profile-facts">
              <p><b>{{ protectionUnitCount }}</b> 个保护单位</p>
              <p><b>{{ selectedStyles.length }}</b> 条风格辅助记录</p>
            </div>
          </div>
        </template>

        <template v-else>
          <span class="region-profile-kicker">DATA EXPLORATION</span>
          <h2>从地域进入剪纸文化</h2>
          <p class="region-profile-empty-copy">
            选择省份后，这里会集中展示项目数量、传承人、批次结构、风格类型与代表地域节点。
          </p>
          <div class="region-guide-steps">
            <div><span>01</span><strong>定位省份</strong><p>从地图、下拉框或重点地域进入。</p></div>
            <div><span>02</span><strong>阅读结构</strong><p>查看批次、传承与风格构成。</p></div>
            <div><span>03</span><strong>进入项目</strong><p>继续阅读代表项目与保护单位。</p></div>
          </div>
        </template>
      </article>
    </section>

    <template v-if="selectedProvince">
      <section class="region-insight-grid">
        <article class="panel region-chart-panel">
          <SectionHeader eyebrow="BATCH STRUCTURE" :title="`${selectedProvince} · 入选批次`" />
          <p class="region-panel-note">国家级剪纸项目在不同公布批次中的数量变化</p>
          <div class="region-chart-box"><BatchTrend :province="selectedProvince" /></div>
        </article>

        <article class="panel region-style-panel">
          <SectionHeader eyebrow="STYLE PROFILE" :title="`${selectedProvince} · 风格构成`" />
          <p class="region-panel-note">基于风格辅助表归纳当前地域的主要视觉类型</p>
          <div v-if="styleOverview.length" class="region-style-bars">
            <div v-for="item in styleOverview" :key="item.name" class="region-style-row">
              <div class="region-style-row__head">
                <strong>{{ item.name }}</strong>
                <span>{{ item.count }} 条</span>
              </div>
              <div class="region-style-track">
                <i :style="{ width: `${Math.max(12, (item.count / maxStyleCount) * 100)}%` }"></i>
              </div>
              <p>{{ item.feature || '暂无视觉特征描述' }}</p>
            </div>
          </div>
          <div v-else class="region-empty-state">当前地域暂无风格辅助数据</div>
        </article>
      </section>

      <section class="region-people-section">
        <SectionHeader eyebrow="INHERITORS" :title="`${selectedProvince} · 代表性传承人`">
          <RouterLink class="text-link" to="/heritage">查看全部传承人 →</RouterLink>
        </SectionHeader>
        <div v-if="selectedInheritors.length" class="region-people-grid">
          <article v-for="item in selectedInheritors.slice(0, 8)" :key="item.id" class="region-person-card">
            <div class="region-person-card__index">{{ String(item.id).padStart(2, '0') }}</div>
            <div>
              <span>{{ item.batch }} · {{ item.announcementYear }}</span>
              <h3>{{ item.name }}</h3>
              <p>{{ item.subProject || item.projectName }}</p>
              <small>{{ item.declarationRegion }}</small>
            </div>
          </article>
        </div>
        <div v-else class="region-empty-state">当前地域暂无代表性传承人数据</div>
      </section>

      <section class="project-section region-project-section">
        <SectionHeader eyebrow="PROJECTS" :title="`${selectedProvince} · 国家级剪纸项目`">
          <span class="region-section-count">共 {{ selectedProjects.length }} 项</span>
        </SectionHeader>
        <div class="project-grid region-project-grid">
          <article v-for="item in selectedProjects" :key="item.id" class="project-card region-project-card">
            <div class="region-project-card__meta">
              <span>{{ item.batch }} · {{ item.year }}</span>
              <em>{{ item.styleType }}</em>
            </div>
            <h3>{{ item.name }}</h3>
            <p>{{ item.region }}</p>
            <div class="region-project-card__footer">
              <span>保护单位</span>
              <small>{{ item.protectionUnit || '暂无保护单位信息' }}</small>
            </div>
          </article>
        </div>
      </section>
    </template>

    <section v-else class="region-index-section">
      <SectionHeader eyebrow="REGION INDEX" title="重点地域索引" />
      <p class="region-index-intro">按国家级剪纸项目数量排列，选择任一地域进入更细的项目、传承人与风格数据。</p>
      <div class="region-index-grid">
        <button v-for="(item, index) in featuredRegions" :key="item.province" @click="selectRegion(item.province)">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <div>
            <strong>{{ item.province }}</strong>
            <p>{{ item.summary?.dominantStyle || '多元风格' }}</p>
          </div>
          <em>{{ item.value }} 项</em>
          <i>→</i>
        </button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SectionHeader from '@/components/common/SectionHeader.vue'
import ChinaMap from '@/components/charts/ChinaMap.vue'
import BatchTrend from '@/components/charts/BatchTrend.vue'
import {
  getInheritorsByProvince,
  getProjectsByProvince,
  getProvinceSummary,
  getStyleGroupOverview,
  getStylesByProvince,
  provinceRanking
} from '@/utils/dataTransform'
import { useProvinceSelection } from '@/composables/useProvinceSelection'

const route = useRoute()
const router = useRouter()
const { selectedProvince, selectProvince, clearProvince } = useProvinceSelection()

const validProvinces = new Set(provinceRanking.map(item => item.province))

watch(
  () => route.query.province,
  value => {
    const province = typeof value === 'string' && validProvinces.has(value) ? value : ''
    if (province && province !== selectedProvince.value) selectedProvince.value = province
  },
  { immediate: true }
)

watch(selectedProvince, province => {
  const current = typeof route.query.province === 'string' ? route.query.province : ''
  if (current === province) return
  router.replace({
    query: province ? { ...route.query, province } : {}
  })
})

const summary = computed(() => getProvinceSummary(selectedProvince.value))
const selectedProjects = computed(() =>
  selectedProvince.value ? getProjectsByProvince(selectedProvince.value) : []
)
const selectedInheritors = computed(() =>
  selectedProvince.value ? getInheritorsByProvince(selectedProvince.value) : []
)
const selectedStyles = computed(() =>
  selectedProvince.value ? getStylesByProvince(selectedProvince.value) : []
)
const styleOverview = computed(() =>
  selectedProvince.value ? getStyleGroupOverview(selectedProvince.value) : []
)
const maxStyleCount = computed(() => Math.max(1, ...styleOverview.value.map(item => item.count)))
const batchCount = computed(
  () => new Set(selectedProjects.value.map(item => `${item.year}-${item.batch}`)).size
)
const protectionUnitCount = computed(
  () => new Set(selectedProjects.value.map(item => item.protectionUnit).filter(Boolean)).size
)
const regionNodes = computed(() => [
  ...new Set(selectedProjects.value.map(item => item.region).filter(Boolean))
])

const featuredRegions = computed(() =>
  provinceRanking.slice(0, 10).map(item => ({
    ...item,
    summary: getProvinceSummary(item.province)
  }))
)

function selectRegion(province: string) {
  selectProvince(province)
}

function shortProvince(province: string) {
  return province
    .replace('壮族自治区', '')
    .replace('回族自治区', '')
    .replace('维吾尔自治区', '')
    .replace('自治区', '')
    .replace('特别行政区', '')
    .replace('省', '')
    .replace('市', '')
}

function compactRegion(region: string) {
  const province = selectedProvince.value
  if (!province) return region
  return region.replace(province, '') || province
}
</script>
