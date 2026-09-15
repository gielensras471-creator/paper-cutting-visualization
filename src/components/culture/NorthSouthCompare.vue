<template>
  <div class="north-south-compare">
    <!-- 北方 -->
    <article class="north-south-side north-south-side--north">
      <div class="north-south-watermark">
        北
      </div>

      <header class="north-south-head">
        <div>
          <span>NORTHERN PAPER CUTTING</span>
          <h3>北方剪纸</h3>
        </div>

        <strong>{{ north.count }}</strong>
      </header>

      <p class="north-south-feature">
        {{ north.feature }}
      </p>

      <div class="north-south-keywords">
        <span
          v-for="item in northKeywords"
          :key="item"
        >
          {{ item }}
        </span>
      </div>

      <dl class="north-south-facts">
        <div>
          <dt>主要风格</dt>
          <dd>{{ north.style }}</dd>
        </div>

        <div>
          <dt>代表地域</dt>
          <dd>{{ north.provinces }}</dd>
        </div>

        <div>
          <dt>常见纹样</dt>
          <dd>{{ north.motifs }}</dd>
        </div>

        <div>
          <dt>典型技法</dt>
          <dd>{{ north.technique }}</dd>
        </div>

        <div>
          <dt>色彩倾向</dt>
          <dd>{{ north.color }}</dd>
        </div>
      </dl>

      <footer class="north-south-projects">
        <span>REPRESENTATIVE PROJECTS</span>

        <div>
          <em
            v-for="item in north.projects"
            :key="item"
          >
            {{ item }}
          </em>
        </div>
      </footer>
    </article>

    <!-- 中轴 -->
    <div class="north-south-axis">
      <div class="north-south-axis__top">
        <span>STYLE</span>
        <strong>南北之间</strong>
        <small>
          不同环境塑造出的视觉差异
        </small>
      </div>

      <div class="north-south-axis__line">
        <i></i>
      </div>

      <div class="north-south-axis__items">
        <div>
          <span>造型语言</span>
          <p>
            <b>粗犷 · 饱满</b>
            <i></i>
            <b>纤细 · 雅致</b>
          </p>
        </div>

        <div>
          <span>生活表达</span>
          <p>
            <b>民俗 · 节庆</b>
            <i></i>
            <b>装饰 · 文人趣味</b>
          </p>
        </div>

        <div>
          <span>剪刻方式</span>
          <p>
            <b>折剪 · 阴阳刻</b>
            <i></i>
            <b>镂空 · 细纹刻</b>
          </p>
        </div>

        <div>
          <span>视觉节奏</span>
          <p>
            <b>块面强烈</b>
            <i></i>
            <b>线条轻盈</b>
          </p>
        </div>
      </div>

      <div class="north-south-axis__note">
        <span>不是绝对边界</span>

        <p>
          “南北”用于概括主要视觉倾向，
          实际剪纸流派之间始终存在交融与过渡。
        </p>
      </div>
    </div>

    <!-- 南方 -->
    <article class="north-south-side north-south-side--south">
      <div class="north-south-watermark">
        南
      </div>

      <header class="north-south-head">
        <div>
          <span>SOUTHERN PAPER CUTTING</span>
          <h3>南方剪纸</h3>
        </div>

        <strong>{{ south.count }}</strong>
      </header>

      <p class="north-south-feature">
        {{ south.feature }}
      </p>

      <div class="north-south-keywords">
        <span
          v-for="item in southKeywords"
          :key="item"
        >
          {{ item }}
        </span>
      </div>

      <dl class="north-south-facts">
        <div>
          <dt>主要风格</dt>
          <dd>{{ south.style }}</dd>
        </div>

        <div>
          <dt>代表地域</dt>
          <dd>{{ south.provinces }}</dd>
        </div>

        <div>
          <dt>常见纹样</dt>
          <dd>{{ south.motifs }}</dd>
        </div>

        <div>
          <dt>典型技法</dt>
          <dd>{{ south.technique }}</dd>
        </div>

        <div>
          <dt>色彩倾向</dt>
          <dd>{{ south.color }}</dd>
        </div>
      </dl>

      <footer class="north-south-projects">
        <span>REPRESENTATIVE PROJECTS</span>

        <div>
          <em
            v-for="item in south.projects"
            :key="item"
          >
            {{ item }}
          </em>
        </div>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { styles } from '@/utils/dataTransform'

function mostFrequent(
  values: string[]
) {
  const counter =
    new Map<string, number>()

  values
    .filter(Boolean)
    .forEach(value => {
      counter.set(
        value,
        (counter.get(value) ?? 0) + 1
      )
    })

  return (
    [...counter.entries()]
      .sort((a, b) => b[1] - a[1])[0]?.[0]
      ?? '暂无'
  )
}

function compactText(
  value: string,
  max = 38
) {
  if (!value) return '暂无'

  return value.length > max
    ? `${value.slice(0, max)}…`
    : value
}

function buildProfile(
  region: '北方' | '南方'
) {
  const rows =
    styles.filter(
      item =>
        item.regionGroup === region
    )

  const provinces = [
    ...new Set(
      rows.map(
        item => item.province
      )
    )
  ]

  const projects = [
    ...new Set(
      rows.map(
        item =>
          item.displayName ||
          item.subProject
      )
    )
  ]

  return {
    count: rows.length,

    style:
      mostFrequent(
        rows.map(
          item => item.styleGroup
        )
      ),

    feature:
      mostFrequent(
        rows.map(
          item => item.visualFeature
        )
      ),

    motifs:
      compactText(
        mostFrequent(
          rows.map(
            item => item.motifTags
          )
        ),
        46
      ),

    technique:
      compactText(
        mostFrequent(
          rows.map(
            item => item.techniqueTags
          )
        ),
        46
      ),

    color:
      compactText(
        mostFrequent(
          rows.map(
            item => item.colorFeature
          )
        ),
        50
      ),

    provinces:
      provinces
        .slice(0, 6)
        .join(' · '),

    projects:
      projects.slice(0, 4)
  }
}

const north =
  computed(() =>
    buildProfile('北方')
  )

const south =
  computed(() =>
    buildProfile('南方')
  )

const northKeywords = [
  '粗犷',
  '饱满',
  '民俗',
  '节庆'
]

const southKeywords = [
  '纤细',
  '雅致',
  '镂空',
  '留白'
]
</script>