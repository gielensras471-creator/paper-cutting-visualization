<template>
  <div class="paper-generator">
    <svg
      ref="svgRef"
      class="paper-generator__svg"
      viewBox="0 0 600 600"
      role="img"
      :aria-label="`${stylePreset} · ${motif}纹 · ${folds}折数字剪纸`"
    >
      <defs>
        <!--
          MASK：
          白色 = 保留红纸
          黑色 = 镂空区域
        -->
        <mask :id="maskId" maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="600">
          <rect width="600" height="600" fill="black" />

          <!-- 整张圆形纸 -->
          <circle cx="300" cy="300" r="246" fill="white" />

          <!-- 中央镂空 -->
          <circle
            v-if="centerHoleRadius > 0"
            cx="300"
            cy="300"
            :r="centerHoleRadius"
            fill="black"
          />

          <!--
            每一个折叠单元：
            风格结构 + 文化纹样
          -->
          <g v-for="index in folds" :key="`sector-${index}`" :transform="rotation(index - 1)">
            <!-- 地域风格骨架 -->
            <path :d="structuralCutPath" fill="black" />

            <!-- 当前文化纹样 -->
            <path
              v-for="(path, pathIndex) in motifCutPaths"
              :key="`motif-${index}-${pathIndex}`"
              :d="path"
              fill="black"
            />

            <!-- 中等复杂度 -->
            <template v-if="density !== '简'">
              <path :d="secondaryCutPath" fill="black" />

              <circle cx="300" cy="202" :r="secondaryHoleRadius" fill="black" />
            </template>

            <!-- 繁复 -->
            <template v-if="density === '繁'">
              <path :d="detailCutPath" fill="black" />

              <circle cx="300" cy="120" r="5" fill="black" />

              <circle cx="276" cy="153" r="4" fill="black" />

              <circle cx="324" cy="153" r="4" fill="black" />
            </template>
          </g>

          <!-- 福字中央文字镂空 -->
          <text
            v-if="motif === '福'"
            x="300"
            y="337"
            text-anchor="middle"
            fill="black"
            font-family="STKaiti, KaiTi, serif"
            font-size="118"
            font-weight="700"
          >
            福
          </text>

          <!-- 环形镂空 -->
          <circle
            v-if="density !== '简' && motif !== '福'"
            cx="300"
            cy="300"
            r="207"
            fill="none"
            stroke="black"
            stroke-width="6"
            stroke-dasharray="5 20"
          />

          <circle
            v-if="density === '繁'"
            cx="300"
            cy="300"
            :r="motif === '福' ? 112 : 159"
            fill="none"
            stroke="black"
            stroke-width="4"
            stroke-dasharray="3 14"
          />
        </mask>

        <!-- 红纸渐变 -->
        <radialGradient :id="paperGradientId" cx="42%" cy="35%" r="72%">
          <stop offset="0%" :stop-color="paperHighlight" />

          <stop offset="72%" :stop-color="paperColor" />

          <stop offset="100%" :stop-color="paperShadow" />
        </radialGradient>

        <!-- 阴影 -->
        <filter :id="shadowId" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="0"
            dy="16"
            stdDeviation="16"
            flood-color="#6e3029"
            flood-opacity=".16"
          />
        </filter>
      </defs>

      <!-- 宣纸上的投影 -->
      <circle cx="300" cy="310" r="247" fill="#eadfd4" opacity=".55" />

      <!-- 剪纸主体 -->
      <g class="paper-figure" :filter="`url(#${shadowId})`">
        <circle
          cx="300"
          cy="300"
          r="246"
          :fill="`url(#${paperGradientId})`"
          :mask="`url(#${maskId})`"
        />

        <!-- 红金 -->
        <g v-if="colorScheme === '红金'" :mask="`url(#${maskId})`" opacity=".9">
          <circle cx="300" cy="300" r="227" fill="none" :stroke="accentColor" stroke-width="3" />

          <circle
            cx="300"
            cy="300"
            :r="motif === '福' ? 92 : 82"
            fill="none"
            :stroke="accentColor"
            stroke-width="3"
          />

          <g v-for="index in folds" :key="`gold-${index}`" :transform="rotation(index - 1)">
            <circle cx="300" cy="84" r="5" :fill="accentColor" />
          </g>
        </g>

        <!-- 彩色点染 -->
        <g v-if="colorScheme === '彩色'" :mask="`url(#${maskId})`">
          <g v-for="index in folds" :key="`color-${index}`" :transform="rotation(index - 1)">
            <ellipse
              cx="300"
              cy="103"
              rx="10"
              ry="19"
              :fill="index % 3 === 0 ? '#d0a64b' : index % 3 === 1 ? '#326d69' : '#d57a61'"
              opacity=".88"
            />

            <circle cx="300" cy="192" r="7" :fill="index % 2 === 0 ? '#e0ad4a' : '#3f7771'" />
          </g>
        </g>

        <!-- 中央装饰环 -->
        <circle
          cx="300"
          cy="300"
          :r="centerDecorationRadius"
          fill="none"
          :stroke="colorScheme === '单红' ? '#f3d3c7' : accentColor"
          stroke-width="3"
          opacity=".84"
        />
      </g>
    </svg>

    <!-- 结构信息 -->
    <div class="paper-generator__axis">
      <span> {{ motif }} MOTIF </span>

      <strong>
        {{ folds }}
      </strong>

      <small> FOLD </small>

      <i></i>

      <b> {{ angleStep }}° </b>

      <em> 单元旋转角 </em>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import type { Motif } from '@/data/patterns'

type StylePreset = '北方剪纸' | '南方剪纸' | '彩色蔚县' | '民族图腾'

type Density = '简' | '中' | '繁'

type ColorScheme = '单红' | '红金' | '彩色'

const props = defineProps<{
  folds: number
  stylePreset: StylePreset
  density: Density
  colorScheme: ColorScheme
  motif: Motif
}>()

const maskId = 'paper-cut-mask-v053'

const paperGradientId = 'paper-gradient-v053'

const shadowId = 'paper-shadow-v053'

const angleStep = computed(() => Math.round(360 / props.folds))

function rotation(index: number) {
  return `
    rotate(
      ${index * (360 / props.folds)}
      300
      300
    )
  `
}

/* =========================================================
   地域风格结构
   ========================================================= */

const structuralCutPath = computed(() => {
  switch (props.stylePreset) {
    case '南方剪纸':
      return `
          M 300 184
          C 287 206
            284 232
            294 253
          C 303 236
            309 213
            300 184
          Z
        `

    case '彩色蔚县':
      return `
          M 300 180
          C 278 200
            277 232
            300 255
          C 323 232
            322 200
            300 180
          Z
        `

    case '民族图腾':
      return `
          M 300 180
          L 322 204
          L 310 226
          L 331 250
          L 300 241
          L 269 250
          L 290 226
          L 278 204
          Z
        `

    case '北方剪纸':
    default:
      return `
          M 300 176
          C 272 200
            274 235
            300 258
          C 326 235
            328 200
            300 176
          Z
        `
  }
})

/* =========================================================
   五类文化纹样
   ========================================================= */

const motifCutPaths = computed<string[]>(() => {
  switch (props.motif) {
    /* -------------------------
         花
         ------------------------- */
    case '花':
      return [
        `
            M 300 68
            C 279 88
              274 113
              300 141
            C 326 113
              321 88
              300 68
            Z
          `,

        `
            M 298 136
            C 275 119
              251 124
              245 147
            C 266 153
              283 150
              298 136
            Z
          `,

        `
            M 302 136
            C 325 119
              349 124
              355 147
            C 334 153
              317 150
              302 136
            Z
          `
      ]

    /* -------------------------
         鸟
         ------------------------- */
    case '鸟':
      return [
        /*
            鸟身与胸部
          */
        `
            M 291 82
            C 277 94
              273 112
              281 127
            C 288 140
              303 145
              318 139
            C 307 128
              302 115
              304 99
            C 301 91
              297 86
              291 82
            Z
          `,

        /*
            羽翼
          */
        `
            M 286 126
            C 263 124
              247 137
              244 158
            C 263 151
              282 152
              302 164
            C 297 148
              292 136
              286 126
            Z
          `,

        /*
            尾羽
          */
        `
            M 302 158
            L 330 180
            L 315 174
            L 323 193
            L 299 171
            Z
          `,

        /*
            鸟喙
          */
        `
            M 304 97
            L 328 103
            L 305 110
            Z
          `
      ]

    /* -------------------------
         鱼
         ------------------------- */
    case '鱼':
      return [
        /*
            鱼身
          */
        `
            M 300 82
            C 270 82
              251 102
              251 126
            C 251 151
              273 170
              300 170
            C 327 170
              349 151
              349 126
            C 349 102
              330 82
              300 82
            Z
          `,

        /*
            鱼尾
          */
        `
            M 300 166
            L 271 199
            L 300 190
            L 329 199
            Z
          `,

        /*
            鱼鳍
          */
        `
            M 274 126
            L 252 146
            L 282 142
            Z
          `,

        `
            M 326 126
            L 348 146
            L 318 142
            Z
          `
      ]

    /* -------------------------
         蝶
         ------------------------- */
    case '蝶':
      return [
        /*
            左上翼
          */
        `
            M 294 120
            C 277 91
              247 88
              239 111
            C 233 130
              250 148
              291 148
            Z
          `,

        /*
            右上翼
          */
        `
            M 306 120
            C 323 91
              353 88
              361 111
            C 367 130
              350 148
              309 148
            Z
          `,

        /*
            左下翼
          */
        `
            M 293 146
            C 265 147
              251 161
              257 181
            C 270 183
              286 171
              298 151
            Z
          `,

        /*
            右下翼
          */
        `
            M 307 146
            C 335 147
              349 161
              343 181
            C 330 183
              314 171
              302 151
            Z
          `,

        /*
            身体
          */
        `
            M 295 113
            C 297 104
              303 104
              305 113
            L 306 171
            C 304 179
              296 179
              294 171
            Z
          `
      ]

    /* -------------------------
         福
         中央文字另行渲染，
         这里生成外围祥云 / 如意结构
         ------------------------- */
    case '福':
      return [
        `
            M 300 79
            C 280 79
              268 91
              270 104
            C 272 116
              285 119
              297 112
            C 308 104
              319 106
              325 117
            C 333 104
              327 87
              312 82
            C 308 80
              304 79
              300 79
            Z
          `,

        `
            M 276 133
            C 257 126
              243 136
              245 151
            C 248 166
              267 170
              285 159
            C 279 151
              276 142
              276 133
            Z
          `,

        `
            M 324 133
            C 343 126
              357 136
              355 151
            C 352 166
              333 170
              315 159
            C 321 151
              324 142
              324 133
            Z
          `
      ]

    default:
      return []
  }
})

/* =========================================================
   复杂度附加刀法
   ========================================================= */

const secondaryCutPath = computed(() => {
  switch (props.stylePreset) {
    case '南方剪纸':
      return `
          M 276 206
          C 252 218
            248 244
            267 259
          C 279 243
            290 221
            300 204
          C 291 203
            283 204
            276 206
          Z
        `

    case '民族图腾':
      return `
          M 260 207
          L 283 214
          L 300 198
          L 317 214
          L 340 207
          L 324 239
          L 300 252
          L 276 239
          Z
        `

    case '彩色蔚县':
      return `
          M 267 204
          C 245 218
            248 248
            274 263
          C 286 241
            294 220
            300 203
          C 287 201
            277 201
            267 204
          Z
        `

    case '北方剪纸':
    default:
      return `
          M 260 202
          C 242 221
            250 251
            278 267
          C 287 241
            294 218
            300 201
          C 286 198
            273 199
            260 202
          Z
        `
  }
})

const detailCutPath = computed(() => {
  if (props.motif === '鱼') {
    return `
        M 300 106
        C 286 112
          286 137
          300 146
        C 314 137
          314 112
          300 106
        Z
      `
  }

  if (props.motif === '蝶') {
    return `
        M 278 123
        C 267 116
          257 122
          259 134
        C 266 139
          274 138
          282 132
        Z
      `
  }

  if (props.motif === '鸟') {
    return `
        M 284 108
        C 275 113
          273 124
          280 131
        C 289 126
          294 119
          296 111
        Z
      `
  }

  return `
      M 274 134
      C 257 149
        260 173
        280 185
      C 288 164
        294 147
        300 134
      C 291 131
        282 131
        274 134
      Z
    `
})

/* =========================================================
   中央结构
   ========================================================= */

const centerHoleRadius = computed(() => {
  if (props.motif === '福') {
    return 0
  }

  switch (props.density) {
    case '简':
      return 30

    case '繁':
      return 45

    default:
      return 38
  }
})

const secondaryHoleRadius = computed(() => {
  if (props.stylePreset === '南方剪纸') {
    return 4
  }

  return 7
})

const centerDecorationRadius = computed(() => {
  if (props.motif === '福') {
    return 92
  }

  return props.density === '繁' ? 62 : 54
})

/* =========================================================
   色彩
   ========================================================= */

const paperColor = computed(() => {
  switch (props.colorScheme) {
    case '彩色':
      return '#a8332d'

    case '红金':
      return '#9f2824'

    default:
      return '#a62f29'
  }
})

const paperHighlight = computed(() => {
  switch (props.colorScheme) {
    case '彩色':
      return '#c84a3f'

    case '红金':
      return '#bd3c31'

    default:
      return '#c44237'
  }
})

const paperShadow = computed(() => {
  switch (props.stylePreset) {
    case '南方剪纸':
      return '#922822'

    case '彩色蔚县':
      return '#8e2823'

    case '民族图腾':
      return '#84241f'

    default:
      return '#86231f'
  }
})

const accentColor = computed(() => (props.colorScheme === '彩色' ? '#d6aa4f' : '#c89c48'))
const svgRef = ref<SVGElement | null>(null)

defineExpose({
  getSVG() {
    return svgRef.value
  }
})
</script>

<style scoped>
.paper-generator {
  position: relative;

  width: min(100%, 590px);

  aspect-ratio: 1;

  display: grid;

  place-items: center;
}

.paper-generator__svg {
  width: 100%;
  height: 100%;

  overflow: visible;
}

.paper-figure {
  transform-origin: 300px 300px;

  animation: paper-enter 0.62s cubic-bezier(0.22, 0.8, 0.32, 1);
}

/* =========================================================
   右下结构信息
   ========================================================= */

.paper-generator__axis {
  position: absolute;

  right: 5%;
  bottom: 5%;

  min-width: 118px;

  padding: 10px 12px;

  border: 1px solid rgba(126, 78, 63, 0.12);

  border-radius: 12px;

  background: rgba(255, 250, 244, 0.87);

  backdrop-filter: blur(8px);

  box-shadow: 0 10px 24px rgba(84, 53, 42, 0.05);
}

.paper-generator__axis > span {
  display: block;

  margin-bottom: 4px;

  color: #a2796d;

  font:
    700 7px 'Microsoft YaHei',
    sans-serif;

  letter-spacing: 0.11em;
}

.paper-generator__axis strong {
  color: #87342e;

  font:
    700 20px/1 Georgia,
    serif;
}

.paper-generator__axis small {
  margin-left: 3px;

  color: #9d837a;

  font:
    600 7px 'Microsoft YaHei',
    sans-serif;
}

.paper-generator__axis i {
  display: block;

  width: 100%;
  height: 1px;

  margin: 8px 0 6px;

  background: linear-gradient(to right, #a64037, transparent);
}

.paper-generator__axis b {
  color: #7c4b42;

  font:
    700 12px Georgia,
    serif;
}

.paper-generator__axis em {
  margin-left: 5px;

  color: #a48c83;

  font:
    500 7px 'Microsoft YaHei',
    sans-serif;

  font-style: normal;
}

/* =========================================================
   Animation
   ========================================================= */

@keyframes paper-enter {
  from {
    opacity: 0.12;

    transform: scale(0.925) rotate(-3deg);
  }

  to {
    opacity: 1;

    transform: scale(1) rotate(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .paper-figure {
    animation: none;
  }
}
</style>
