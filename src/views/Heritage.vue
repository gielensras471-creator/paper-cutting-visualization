<template>
  <main class="page inner-page heritage-page">
    <!-- ===== 页面标题 ===== -->
    <section class="page-intro heritage-page__intro">
      <div>
        <span class="kicker">HERITAGE & STYLES</span>
        <h1>传承与流派</h1>
      </div>

      <p>
        从代表性传承人的地域分布，到不同地区形成的剪纸风格，
        阅读技艺如何在一代代传承中延续，并逐渐形成各具特色的视觉语言。
      </p>
    </section>

    <!-- ===== 核心数据 ===== -->
    <section class="stats-grid heritage-v4-stats">
      <StatCard index="01 · INHERITORS" :value="inheritors.length" label="代表性传承人" />

      <StatCard index="02 · PROVINCES" :value="provinceCount" label="传承人覆盖省份" />

      <StatCard index="03 · STYLE GROUPS" :value="styleGroupCount" label="主要风格类型" />

      <StatCard index="04 · BATCHES" :value="batchCount" label="代表性传承人批次" />
    </section>

    <!-- ===== 传承结构 ===== -->
    <section class="heritage-v4-overview">
      <article class="panel heritage-v4-chart-panel">
        <SectionHeader eyebrow="INHERITOR DISTRIBUTION" title="代表性传承人地域分布" />

        <p class="heritage-v4-panel-note">
          按省级行政区统计当前数据中的国家级代表性传承人数量， 观察不同地域的传承力量分布。
        </p>

        <div class="heritage-v4-chart-box">
          <InheritorOverview />
        </div>
      </article>

      <!-- 右侧观察 -->
      <article class="panel heritage-v4-note-panel">
        <span class="heritage-v4-note-mark" aria-hidden="true"> 传 </span>

        <div class="heritage-v4-note-heading">
          <span>HERITAGE NOTES</span>
          <small>数据观察</small>
        </div>

        <h2>传承的地域脉络</h2>

        <p class="heritage-v4-note-lead">
          剪纸传承并不是均匀分布的。地域传统、项目延续时间以及当地民俗环境，
          共同影响着代表性传承人的集中程度。
        </p>

        <div class="heritage-v4-observations">
          <div>
            <span>传承人集中地域</span>

            <strong>
              {{ topProvinceText }}
            </strong>

            <p>当前数据中代表性传承人数量较多的地域。</p>
          </div>

          <div>
            <span>女性传承力量</span>

            <strong> {{ femaleCount }} 位 · {{ femaleRatio }}% </strong>

            <p>女性在当前代表性传承人数据中占有较高比例。</p>
          </div>

          <div>
            <span>主要公布批次</span>

            <strong>
              {{ dominantBatch.batch }}
              ·
              {{ dominantBatch.count }} 位
            </strong>

            <p>当前数据中传承人数量最多的公布批次。</p>
          </div>
        </div>

        <RouterLink
          v-if="topProvinceName"
          class="heritage-v4-region-link"
          :to="{
            path: '/region',
            query: {
              province: topProvinceName
            }
          }"
        >
          探索代表地域
          <span>→</span>
        </RouterLink>
      </article>
    </section>
    <!-- ===== 南北风格对照 ===== -->
    <section class="heritage-v4-compare-section">
      <SectionHeader eyebrow="NORTH · SOUTH" title="南北剪纸风格对照" />

      <p class="heritage-v4-section-copy">
        地域环境、生活方式与审美传统， 让中国剪纸形成了不同的视觉倾向。
        北方更强调民俗气息与饱满造型， 南方则更突出线条、镂空与细腻节奏。
      </p>

      <NorthSouthCompare />
    </section>
    <!-- ===== 流派关系图谱 ===== -->
    <section class="heritage-v4-relation-section">
      <SectionHeader eyebrow="STYLE LINEAGE" title="流派关系图谱" />

      <p class="heritage-v4-section-copy">
        从地域到风格，再到代表项目， 中国剪纸并不是单一审美体系，
        而是在不同生活环境、民俗传统与技艺路径中形成多条彼此关联的文化脉络。
      </p>

      <StyleRelationGraph />
    </section>
    <!-- ===== 风格体系 ===== -->
    <section class="style-section heritage-v4-style-section">
      <SectionHeader eyebrow="STYLE ATLAS" title="剪纸风格体系" />

      <p class="heritage-v4-section-copy">
        风格辅助数据将地域、视觉特征与代表项目联系起来。
        北方民俗、南方细腻、彩色点染与民族图腾，共同组成中国剪纸多元的视觉谱系。
      </p>

      <StyleSummary />
    </section>

    <!-- ===== 代表性传承人档案馆 ===== -->
    <section class="heritage-v4-archive-section">
      <SectionHeader eyebrow="INHERITOR ARCHIVE" title="代表性传承人档案馆">
        <span class="heritage-v4-directory-count"> {{ inheritors.length }} 位代表性传承人 </span>
      </SectionHeader>

      <p class="heritage-v4-section-copy">
        从姓名、地域与公布批次进入代表性传承人档案。
        点击人物卡片可以在右侧查看完整记录，并继续进入其所属地域的剪纸文化脉络。
      </p>

      <InheritorArchive />
    </section>
  </main>
</template>

<script setup lang="ts">
import StatCard from '@/components/common/StatCard.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'

import InheritorOverview from '@/components/charts/InheritorOverview.vue'

import StyleSummary from '@/components/culture/StyleSummary.vue'

import NorthSouthCompare from '@/components/culture/NorthSouthCompare.vue'

import StyleRelationGraph from '@/components/charts/StyleRelationGraph.vue'

import InheritorArchive from '@/components/culture/InheritorArchive.vue'

import { inheritors, styleGroupCount } from '@/utils/dataTransform'

/* =========================================================
   页面顶部统计
   ========================================================= */

const provinceCount = new Set(inheritors.map((item) => item.province)).size

const batchCount = new Set(inheritors.map((item) => item.batch)).size

/* =========================================================
   女性传承人
   ========================================================= */

const femaleCount = inheritors.filter((item) => item.gender === '女').length

const femaleRatio = Math.round((femaleCount / inheritors.length) * 100)

/* =========================================================
   省份统计
   ========================================================= */

const provinceCounts = Array.from(
  inheritors.reduce(
    (map, item) => {
      map.set(item.province, (map.get(item.province) ?? 0) + 1)

      return map
    },

    new Map<string, number>()
  )
).sort((a, b) => b[1] - a[1])

const topProvinceRows = provinceCounts.slice(0, 2)

const topProvinceText = topProvinceRows
  .map(
    ([name, count]) =>
      `${name.replace(
        /壮族自治区|回族自治区|维吾尔自治区|自治区|特别行政区|省|市/g,
        ''
      )} ${count} 位`
  )
  .join(' · ')

const topProvinceName = topProvinceRows[0]?.[0] ?? ''

/* =========================================================
   批次统计
   ========================================================= */

const batchCounts = Array.from(
  inheritors.reduce(
    (map, item) => {
      map.set(item.batch, (map.get(item.batch) ?? 0) + 1)

      return map
    },

    new Map<string, number>()
  )
).sort((a, b) => b[1] - a[1])

const dominantBatch = {
  batch: batchCounts[0]?.[0] ?? '暂无',

  count: batchCounts[0]?.[1] ?? 0
}
</script>
