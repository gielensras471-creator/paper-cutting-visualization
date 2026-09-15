<template>
  <div class="lineage-graph">
    <!-- 左侧关系图 -->
    <div class="lineage-graph__visual">
      <div class="lineage-graph__corner">
        <span>LINEAGE MAP</span>
        <small>点击风格节点查看档案</small>
      </div>

      <BaseEChart :option="option" @click="handleChartClick" />

      <div class="lineage-graph__legend">
        <span>
          <i class="root"></i>
          剪纸体系
        </span>

        <span>
          <i class="region"></i>
          地域
        </span>

        <span>
          <i class="style"></i>
          风格
        </span>

        <span>
          <i class="project"></i>
          代表项目
        </span>
      </div>
    </div>

    <!-- 右侧档案 -->
    <aside class="lineage-profile">
      <header class="lineage-profile__head">
        <div>
          <span>STYLE PROFILE</span>
          <small>风格档案</small>
        </div>

        <strong>
          {{ activeProfile.count }}
        </strong>
      </header>

      <div class="lineage-profile__path">
        <span>中国剪纸</span>
        <i>→</i>
        <span>{{ activeProfile.region }}</span>
        <i>→</i>
        <strong>{{ activeStyle }}</strong>
      </div>

      <h3>
        {{ activeStyle }}
      </h3>

      <p class="lineage-profile__lead">
        {{ activeProfile.feature }}
      </p>

      <div class="lineage-profile__tags">
        <span v-for="item in activeKeywords" :key="item">
          {{ item }}
        </span>
      </div>

      <dl class="lineage-profile__facts">
        <div>
          <dt>所属地域</dt>
          <dd>
            {{ activeProfile.region }}
          </dd>
        </div>

        <div>
          <dt>代表地区</dt>
          <dd>
            {{ activeProfile.provinces }}
          </dd>
        </div>

        <div>
          <dt>常见纹样</dt>
          <dd>
            {{ activeProfile.motifs }}
          </dd>
        </div>

        <div>
          <dt>典型技法</dt>
          <dd>
            {{ activeProfile.technique }}
          </dd>
        </div>

        <div>
          <dt>色彩特征</dt>
          <dd>
            {{ activeProfile.color }}
          </dd>
        </div>
      </dl>

      <footer class="lineage-profile__projects">
        <span>REPRESENTATIVE PROJECTS</span>

        <div>
          <strong v-for="item in activeProfile.projects" :key="item">
            {{ item }}
          </strong>
        </div>
      </footer>

      <div class="lineage-profile__hint">
        <i></i>

        <p>图谱表达的是地域与风格之间的主要关系， 并不意味着不同流派之间彼此孤立。</p>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { EChartsOption } from 'echarts'

import BaseEChart from '@/components/common/BaseEChart.vue'

import { styles } from '@/utils/dataTransform'

/* =========================================================
   风格列表
   ========================================================= */

const styleNames = ['北方民俗型', '彩色点染型', '南方细腻型', '民族图腾型'] as const

type StyleName = (typeof styleNames)[number]

const activeStyle = ref<StyleName>('北方民俗型')

/* =========================================================
   工具函数
   ========================================================= */

function mostFrequent(values: string[]) {
  const counter = new Map<string, number>()

  values.filter(Boolean).forEach((value) => {
    counter.set(value, (counter.get(value) ?? 0) + 1)
  })

  return [...counter.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? '暂无'
}

function compactText(value: string, max = 48) {
  if (!value) {
    return '暂无'
  }

  return value.length > max ? `${value.slice(0, max)}…` : value
}

function buildStyleProfile(styleName: StyleName) {
  const rows = styles.filter((item) => item.styleGroup === styleName)

  const provinces = [...new Set(rows.map((item) => item.province))]

  const projects = [...new Set(rows.map((item) => item.displayName || item.subProject))]

  return {
    count: rows.length,

    region: rows[0]?.regionGroup ?? '暂无',

    feature: mostFrequent(rows.map((item) => item.visualFeature)),

    provinces: provinces.slice(0, 6).join(' · '),

    motifs: compactText(mostFrequent(rows.map((item) => item.motifTags))),

    technique: compactText(mostFrequent(rows.map((item) => item.techniqueTags))),

    color: compactText(mostFrequent(rows.map((item) => item.colorFeature)), 58),

    relationship: mostFrequent(rows.map((item) => item.relationshipTags)),

    projects: projects.slice(0, 4)
  }
}

/* =========================================================
   当前风格
   ========================================================= */

const activeProfile = computed(() => buildStyleProfile(activeStyle.value))

const keywordMap: Record<StyleName, string[]> = {
  北方民俗型: ['粗犷', '饱满', '节庆', '生活叙事'],

  彩色点染型: ['点染', '套色', '高饱和', '装饰性'],

  南方细腻型: ['纤细', '镂空', '留白', '雅致'],

  民族图腾型: ['图腾', '仪式', '神话', '地域性']
}

const activeKeywords = computed(() => keywordMap[activeStyle.value])

/* =========================================================
   代表项目
   每种风格只取两个进入图谱
   ========================================================= */

function getProjects(styleName: StyleName) {
  return [
    ...new Set(
      styles
        .filter((item) => item.styleGroup === styleName)
        .map((item) => item.displayName || item.subProject)
    )
  ].slice(0, 2)
}

const northProjects = getProjects('北方民俗型')

const colorProjects = getProjects('彩色点染型')

const southProjects = getProjects('南方细腻型')

const ethnicProjects = getProjects('民族图腾型')

/* =========================================================
   图谱
   ========================================================= */

const option = computed<EChartsOption>(() => {
  const active = activeStyle.value

  const styleColor = (name: StyleName) => (name === active ? '#9a302a' : '#ead6ca')

  const styleTextColor = (name: StyleName) => (name === active ? '#fff8f0' : '#75483e')

  const nodes: any[] = [
    /* 根节点 */

    {
      id: 'root',
      name: '中国剪纸',

      x: 60,
      y: 220,

      symbol: 'roundRect',
      symbolSize: [108, 48],

      itemStyle: {
        color: '#8d2924',
        borderColor: '#8d2924',
        borderWidth: 1
      },

      label: {
        color: '#fff8f0',
        fontSize: 13,
        fontWeight: 700
      }
    },

    /* 地域 */

    {
      id: 'north',
      name: '北方',

      x: 250,
      y: 92,

      symbol: 'roundRect',
      symbolSize: [82, 36],

      itemStyle: {
        color: '#f4e8df',
        borderColor: '#c9927b',
        borderWidth: 1.2
      },

      label: {
        color: '#734a40',
        fontWeight: 700
      }
    },

    {
      id: 'south',
      name: '南方',

      x: 250,
      y: 220,

      symbol: 'roundRect',
      symbolSize: [82, 36],

      itemStyle: {
        color: '#f4e8df',
        borderColor: '#c9927b',
        borderWidth: 1.2
      },

      label: {
        color: '#734a40',
        fontWeight: 700
      }
    },

    {
      id: 'ethnic',
      name: '民族地域',

      x: 250,
      y: 348,

      symbol: 'roundRect',
      symbolSize: [92, 36],

      itemStyle: {
        color: '#f4e8df',
        borderColor: '#c9927b',
        borderWidth: 1.2
      },

      label: {
        color: '#734a40',
        fontWeight: 700
      }
    },

    /* 风格 */

    {
      id: 'folk',
      name: '北方民俗型',

      styleName: '北方民俗型',

      x: 470,
      y: 54,

      symbol: 'roundRect',
      symbolSize: [120, 40],

      itemStyle: {
        color: styleColor('北方民俗型'),

        borderColor: '#bc7663',

        borderWidth: 1.2,

        shadowBlur: active === '北方民俗型' ? 18 : 0,

        shadowColor: 'rgba(134, 42, 35, .16)'
      },

      label: {
        color: styleTextColor('北方民俗型'),

        fontWeight: 700
      }
    },

    {
      id: 'color',
      name: '彩色点染型',

      styleName: '彩色点染型',

      x: 470,
      y: 130,

      symbol: 'roundRect',
      symbolSize: [120, 40],

      itemStyle: {
        color: styleColor('彩色点染型'),

        borderColor: '#bc7663',

        borderWidth: 1.2,

        shadowBlur: active === '彩色点染型' ? 18 : 0,

        shadowColor: 'rgba(134, 42, 35, .16)'
      },

      label: {
        color: styleTextColor('彩色点染型'),

        fontWeight: 700
      }
    },

    {
      id: 'fine',
      name: '南方细腻型',

      styleName: '南方细腻型',

      x: 470,
      y: 220,

      symbol: 'roundRect',
      symbolSize: [120, 40],

      itemStyle: {
        color: styleColor('南方细腻型'),

        borderColor: '#bc7663',

        borderWidth: 1.2,

        shadowBlur: active === '南方细腻型' ? 18 : 0,

        shadowColor: 'rgba(134, 42, 35, .16)'
      },

      label: {
        color: styleTextColor('南方细腻型'),

        fontWeight: 700
      }
    },

    {
      id: 'totem',
      name: '民族图腾型',

      styleName: '民族图腾型',

      x: 470,
      y: 348,

      symbol: 'roundRect',
      symbolSize: [120, 40],

      itemStyle: {
        color: styleColor('民族图腾型'),

        borderColor: '#bc7663',

        borderWidth: 1.2,

        shadowBlur: active === '民族图腾型' ? 18 : 0,

        shadowColor: 'rgba(134, 42, 35, .16)'
      },

      label: {
        color: styleTextColor('民族图腾型'),

        fontWeight: 700
      }
    }
  ]

  /* 项目节点 */

  function addProjectNodes(
    prefix: string,
    styleName: StyleName,
    projects: string[],
    baseY: number
  ) {
    projects.forEach((project, index) => {
      nodes.push({
        id: `${prefix}-${index}`,

        name: project,

        styleName,

        x: 705,

        y: baseY + (index === 0 ? -18 : 18),

        symbol: 'roundRect',

        symbolSize: [132, 30],

        itemStyle: {
          color: '#fbf5ef',

          borderColor: '#d8bdb0',

          borderWidth: 1
        },

        label: {
          color: '#7f635a',

          fontSize: 9,

          width: 108,

          overflow: 'truncate'
        }
      })
    })
  }

  addProjectNodes('folk-project', '北方民俗型', northProjects, 54)

  addProjectNodes('color-project', '彩色点染型', colorProjects, 130)

  addProjectNodes('fine-project', '南方细腻型', southProjects, 220)

  addProjectNodes('totem-project', '民族图腾型', ethnicProjects, 348)

  const links: any[] = [
    {
      source: 'root',
      target: 'north'
    },

    {
      source: 'root',
      target: 'south'
    },

    {
      source: 'root',
      target: 'ethnic'
    },

    {
      source: 'north',
      target: 'folk'
    },

    {
      source: 'north',
      target: 'color'
    },

    {
      source: 'south',
      target: 'fine'
    },

    {
      source: 'ethnic',
      target: 'totem'
    }
  ]

  function addProjectLinks(source: string, prefix: string, count: number) {
    for (let index = 0; index < count; index += 1) {
      links.push({
        source,
        target: `${prefix}-${index}`
      })
    }
  }

  addProjectLinks('folk', 'folk-project', northProjects.length)

  addProjectLinks('color', 'color-project', colorProjects.length)

  addProjectLinks('fine', 'fine-project', southProjects.length)

  addProjectLinks('totem', 'totem-project', ethnicProjects.length)

  return {
    animationDuration: 520,

    tooltip: {
      show: false
    },

    series: [
      {
        type: 'graph',

        layout: 'none',

        left: 34,
        right: 34,
        top: 44,
        bottom: 42,

        roam: false,

        data: nodes,

        links,

        lineStyle: {
          color: '#c9aaa0',

          width: 1.2,

          opacity: 0.62,

          curveness: 0.08
        },

        label: {
          show: true,
          position: 'inside',

          color: '#6c5148',

          fontSize: 10,

          fontFamily: 'Microsoft YaHei'
        },

        emphasis: {
          focus: 'adjacency',

          lineStyle: {
            color: '#a54a3f',

            width: 2,

            opacity: 1
          }
        }
      }
    ]
  }
})

/* =========================================================
   点击
   ========================================================= */

function handleChartClick(params: any) {
  if (params?.dataType !== 'node') {
    return
  }

  const styleName = params.data?.styleName as StyleName | undefined

  if (styleName && styleNames.includes(styleName)) {
    activeStyle.value = styleName
  }
}
</script>

<style scoped>
.lineage-graph {
  display: grid;

  grid-template-columns:
    minmax(0, 1.55fr)
    minmax(320px, 0.45fr);

  gap: 16px;

  min-height: 560px;
}

/* =========================================================
   左侧图谱
   ========================================================= */

.lineage-graph__visual {
  position: relative;

  min-width: 0;

  min-height: 560px;

  overflow: hidden;

  border: 1px solid rgba(128, 82, 67, 0.12);

  border-radius: 20px;

  background:
    radial-gradient(circle at 12% 12%, rgba(164, 62, 49, 0.055), transparent 27%),
    linear-gradient(145deg, rgba(255, 252, 247, 0.95), rgba(248, 238, 229, 0.68));
}

/* 宣纸细纹 */

.lineage-graph__visual::after {
  content: '';

  position: absolute;
  inset: 0;

  pointer-events: none;

  opacity: 0.18;

  background-image: repeating-linear-gradient(
    0deg,
    transparent 0,
    transparent 18px,
    rgba(121, 87, 73, 0.025) 19px
  );
}

.lineage-graph__visual :deep(.chart-root) {
  position: relative;

  z-index: 1;

  width: 100%;
  height: 100%;

  min-height: 560px;
}

/* 左上角说明 */

.lineage-graph__corner {
  position: absolute;

  z-index: 5;

  top: 20px;
  left: 22px;

  display: flex;

  align-items: center;

  gap: 10px;

  pointer-events: none;
}

.lineage-graph__corner span {
  color: #9f7467;

  font:
    700 8px 'Microsoft YaHei',
    sans-serif;

  letter-spacing: 0.16em;
}

.lineage-graph__corner small {
  color: #b7a097;

  font:
    500 8px 'Microsoft YaHei',
    sans-serif;
}

/* 图例 */

.lineage-graph__legend {
  position: absolute;

  z-index: 5;

  left: 20px;
  bottom: 17px;

  display: flex;
  flex-wrap: wrap;

  gap: 12px;

  padding: 7px 11px;

  border: 1px solid rgba(126, 82, 68, 0.09);

  border-radius: 999px;

  background: rgba(255, 250, 244, 0.86);

  backdrop-filter: blur(8px);

  pointer-events: none;
}

.lineage-graph__legend span {
  display: flex;

  align-items: center;

  gap: 5px;

  color: #947a70;

  font:
    500 8px 'Microsoft YaHei',
    sans-serif;
}

.lineage-graph__legend i {
  display: block;

  width: 7px;
  height: 7px;

  border-radius: 2px;
}

.lineage-graph__legend .root {
  background: #8d2924;
}

.lineage-graph__legend .region {
  background: #f0dfd4;

  border: 1px solid #c9927b;
}

.lineage-graph__legend .style {
  background: #d9aea0;
}

.lineage-graph__legend .project {
  background: #fbf5ef;

  border: 1px solid #d8bdb0;
}

/* =========================================================
   右侧风格档案
   ========================================================= */

.lineage-profile {
  position: relative;

  min-height: 560px;

  display: flex;
  flex-direction: column;

  padding: 28px 27px 24px;

  overflow: hidden;

  border: 1px solid rgba(128, 82, 67, 0.12);

  border-radius: 20px;

  background: linear-gradient(155deg, rgba(255, 252, 247, 0.96), rgba(246, 233, 223, 0.76));
}

.lineage-profile::before {
  content: '谱';

  position: absolute;

  right: -16px;
  bottom: -56px;

  color: var(--red);

  font-family: 'STKaiti', 'KaiTi', serif;

  font-size: 185px;

  line-height: 1;

  font-weight: 700;

  opacity: 0.028;

  pointer-events: none;
}

/* 标题 */

.lineage-profile__head {
  position: relative;

  z-index: 1;

  display: flex;

  justify-content: space-between;

  align-items: flex-start;

  gap: 12px;
}

.lineage-profile__head > div {
  display: flex;

  flex-direction: column;

  gap: 5px;
}

.lineage-profile__head span {
  color: #a77b6e;

  font:
    700 8px 'Microsoft YaHei',
    sans-serif;

  letter-spacing: 0.16em;
}

.lineage-profile__head small {
  color: #b49b92;

  font:
    500 8px 'Microsoft YaHei',
    sans-serif;
}

.lineage-profile__head > strong {
  color: rgba(144, 45, 39, 0.88);

  font:
    700 38px/1 Georgia,
    serif;
}

/* 面包屑 */

.lineage-profile__path {
  position: relative;

  z-index: 1;

  display: flex;

  align-items: center;

  flex-wrap: wrap;

  gap: 6px;

  margin-top: 21px;

  color: #9e8176;

  font:
    500 8px 'Microsoft YaHei',
    sans-serif;
}

.lineage-profile__path i {
  color: #c5a99d;

  font-style: normal;
}

.lineage-profile__path strong {
  color: var(--red);
}

/* 主标题 */

.lineage-profile h3 {
  position: relative;

  z-index: 1;

  margin: 16px 0 9px;

  color: #492f28;

  font-size: 29px;

  line-height: 1.2;
}

.lineage-profile__lead {
  position: relative;

  z-index: 1;

  min-height: 44px;

  margin: 0;

  color: #796159;

  font:
    500 10px/1.8 'Microsoft YaHei',
    sans-serif;
}

/* 标签 */

.lineage-profile__tags {
  position: relative;

  z-index: 1;

  display: flex;

  flex-wrap: wrap;

  gap: 5px;

  margin-top: 17px;
}

.lineage-profile__tags span {
  padding: 5px 8px;

  border-radius: 999px;

  background: rgba(239, 222, 211, 0.88);

  color: #8d5347;

  font:
    600 8px 'Microsoft YaHei',
    sans-serif;
}

/* 详细字段 */

.lineage-profile__facts {
  position: relative;

  z-index: 1;

  margin: 19px 0 0;

  border-top: 1px solid rgba(125, 79, 65, 0.1);
}

.lineage-profile__facts > div {
  display: grid;

  grid-template-columns: 70px 1fr;

  gap: 10px;

  padding: 10px 0;

  border-bottom: 1px solid rgba(125, 79, 65, 0.085);
}

.lineage-profile__facts dt {
  color: #a1887f;

  font:
    700 8px/1.6 'Microsoft YaHei',
    sans-serif;
}

.lineage-profile__facts dd {
  margin: 0;

  color: #634d45;

  font:
    500 9px/1.6 'Microsoft YaHei',
    sans-serif;
}

/* 代表项目 */

.lineage-profile__projects {
  position: relative;

  z-index: 1;

  margin-top: 19px;
}

.lineage-profile__projects > span {
  display: block;

  margin-bottom: 9px;

  color: #ae8c80;

  font:
    700 7px 'Microsoft YaHei',
    sans-serif;

  letter-spacing: 0.13em;
}

.lineage-profile__projects > div {
  display: flex;

  flex-wrap: wrap;

  gap: 5px;
}

.lineage-profile__projects strong {
  padding: 6px 8px;

  border-radius: 7px;

  background: rgba(239, 224, 213, 0.85);

  color: #76483e;

  font:
    600 8px 'Microsoft YaHei',
    sans-serif;
}

/* 底部说明 */

.lineage-profile__hint {
  position: relative;

  z-index: 1;

  display: flex;

  align-items: flex-start;

  gap: 9px;

  margin-top: auto;

  padding-top: 16px;

  border-top: 1px solid rgba(125, 79, 65, 0.1);
}

.lineage-profile__hint i {
  flex: 0 0 auto;

  width: 6px;
  height: 6px;

  margin-top: 4px;

  border-radius: 50%;

  background: var(--red);

  box-shadow: 0 0 0 4px rgba(166, 45, 40, 0.07);
}

.lineage-profile__hint p {
  margin: 0;

  color: #9b8278;

  font:
    400 8px/1.65 'Microsoft YaHei',
    sans-serif;
}

/* =========================================================
   响应式
   ========================================================= */

@media (max-width: 1000px) {
  .lineage-graph {
    grid-template-columns: 1fr;
  }

  .lineage-profile {
    min-height: 0;
  }

  .lineage-profile__hint {
    margin-top: 24px;
  }
}

@media (max-width: 620px) {
  .lineage-graph__visual,
  .lineage-graph__visual :deep(.chart-root) {
    min-height: 440px;
  }

  .lineage-graph__corner small,
  .lineage-graph__legend {
    display: none;
  }

  .lineage-profile {
    padding: 23px 19px;
  }
}
</style>
