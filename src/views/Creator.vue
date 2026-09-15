<template>
  <main class="creator-page">
    <!-- =====================================================
         页面标题
         ===================================================== -->
    <section class="creator-header">
      <div>
        <span> DIGITAL PAPER-CUTTING LAB </span>

        <h1>数字剪纸实验室</h1>
      </div>

      <p>
        将传统剪纸折叠结构、地域风格与数字生成技术结合，
        通过参数改变观察一张虚拟红纸如何形成不同的对称结构。
      </p>
    </section>

    <!-- =====================================================
         主工作区
         ===================================================== -->
    <section class="creator-workspace">
      <!-- ===================================================
           左侧参数
           =================================================== -->
      <aside class="creator-panel">
        <header>
          <span> GENERATOR PANEL </span>

          <h2>参数设置</h2>
        </header>

        <!-- 地域风格 -->
        <div class="control-group">
          <div class="control-group__heading">
            <label> 地域风格 </label>

            <small> STYLE </small>
          </div>

          <div class="option-list option-list--style">
            <button
              v-for="item in styleOptions"
              :key="item.value"
              type="button"
              :class="{
                active: selectedStyle === item.value
              }"
              @click="selectedStyle = item.value"
            >
              <strong>
                {{ item.label }}
              </strong>

              <span>
                {{ item.description }}
              </span>
            </button>
          </div>
        </div>

        <!-- 折数 -->
        <div class="control-group">
          <div class="control-group__heading">
            <label> 折叠结构 </label>

            <small> {{ angleStep }}° / 单元 </small>
          </div>

          <div class="option-list option-list--fold">
            <button
              v-for="item in foldOptions"
              :key="item"
              type="button"
              :class="{
                active: folds === item
              }"
              @click="folds = item"
            >
              <strong>
                {{ item }}
              </strong>

              <span>折</span>
            </button>
          </div>
        </div>

        <!-- 基础纹样 -->
        <div class="control-group">
          <div class="control-group__heading">
            <label> 基础纹样 </label>

            <small> PATTERN </small>
          </div>

          <div class="option-list">
            <button
              v-for="item in motifOptions"
              :key="item"
              type="button"
              :class="{
                active: selectedMotif === item
              }"
              @click="selectedMotif = item"
            >
              {{ item }}
            </button>
          </div>
        </div>

        <!-- 复杂度 -->
        <div class="control-group">
          <div class="control-group__heading">
            <label> 纹样复杂度 </label>

            <small> DENSITY </small>
          </div>

          <div class="option-list">
            <button
              v-for="item in densityOptions"
              :key="item"
              type="button"
              :class="{
                active: density === item
              }"
              @click="density = item"
            >
              {{ item }}
            </button>
          </div>
        </div>

        <!-- 色彩 -->
        <div class="control-group">
          <div class="control-group__heading">
            <label> 色彩方案 </label>

            <small> COLOR </small>
          </div>

          <div class="option-list">
            <button
              v-for="item in colorOptions"
              :key="item"
              type="button"
              :class="{
                active: colorScheme === item
              }"
              @click="colorScheme = item"
            >
              <i class="color-dot" :class="`color-dot--${colorClass(item)}`"></i>

              {{ item }}
            </button>
          </div>
        </div>
      </aside>

      <!-- ===================================================
           中间实时预览
           =================================================== -->
      <section class="creator-preview">
        <div class="preview-title">
          <div>
            <span> LIVE PREVIEW </span>

            <strong> 参数化剪纸生成 </strong>
          </div>

          <small>
            SVG ·
            {{ folds }} FOLD ·
            {{ selectedStyle }}
          </small>
        </div>

        <div class="paper-stage">
          <div class="paper-stage__corner paper-stage__corner--lt"></div>

          <div class="paper-stage__corner paper-stage__corner--rb"></div>

          <PaperGenerator
            ref="generatorRef"
            :key="generatorKey"
            :folds="folds"
            :style-preset="selectedStyle"
            :density="density"
            :color-scheme="colorScheme"
            :motif="selectedMotif"
          />
        </div>

        <div class="preview-bottom">
          <p>
            <span> STRUCTURE </span>

            {{ folds }} 个对称单元围绕圆心旋转， 单元角度为 {{ angleStep }}°。
          </p>

          <button type="button" class="generate-btn" @click="regenerate">
            <span> 重新生成 </span>
            <button class="generate-btn download-btn" @click="downloadWork">下载SVG</button>

            <i>↻</i>
          </button>
        </div>
      </section>

      <!-- ===================================================
           右侧作品信息
           =================================================== -->
      <aside class="creator-info">
        <div class="creator-info__watermark">剪</div>

        <header>
          <div>
            <span> CREATION INFO </span>

            <small> 当前生成参数 </small>
          </div>

          <strong>
            {{ folds }}
          </strong>
        </header>

        <div class="creator-info__name">
          <span>
            {{ styleEnglish }}
          </span>

          <h2>
            {{ selectedStyle }}
          </h2>

          <p>
            {{ currentStyle.description }}
          </p>
        </div>

        <div class="creator-info__tags">
          <span> {{ folds }}折 </span>

          <span> {{ density }}密度 </span>

          <span>
            {{ colorScheme }}
          </span>
        </div>

        <dl>
          <div>
            <dt>地域风格</dt>

            <dd>
              {{ selectedStyle }}
            </dd>
          </div>

          <div>
            <dt>对称结构</dt>

            <dd>{{ folds }} 重旋转对称</dd>
          </div>

          <div>
            <dt>单元角度</dt>

            <dd>{{ angleStep }}°</dd>
          </div>

          <div>
            <dt>基础纹样</dt>

            <dd>{{ currentPattern.name }}</dd>
          </div>

          <div>
            <dt>文化寓意</dt>

            <dd>
              {{ currentPattern.meaning }}
            </dd>
          </div>

          <div>
            <dt>复杂程度</dt>

            <dd>
              {{ density }}
            </dd>
          </div>

          <div>
            <dt>色彩方案</dt>

            <dd>
              {{ colorScheme }}
            </dd>
          </div>

          <div>
            <dt>当前编号</dt>

            <dd class="creator-code">
              {{ creationCode }}
            </dd>
          </div>
        </dl>

        <div class="creator-info__principle">
          <span> GENERATION PRINCIPLE </span>

          <strong> 单元纹样 × 旋转复制 </strong>

          <p>
            以圆心为基准，将一个基础镂空单元按
            {{ angleStep }}° 间隔复制 {{ folds }} 次， 形成传统窗花常见的放射式对称结构。
          </p>
        </div>

        <footer>
          <i></i>

          <p>当前作品由地域风格、折叠结构、 文化纹样、复杂度与色彩参数共同生成。</p>
        </footer>
      </aside>
    </section>
    <!-- =========================
       PatternLab
       ========================= -->

    <PatternLab @select-pattern="selectedMotif = $event" />
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { downloadSVG } from '@/utils/svgExport'

import PaperGenerator from '@/components/creator/PaperGenerator.vue'

import PatternLab from '@/components/creator/PatternLab.vue'

import { patterns, patternMap } from '@/data/patterns'

import type { Motif } from '@/data/patterns'

type StylePreset = '北方剪纸' | '南方剪纸' | '彩色蔚县' | '民族图腾'

type Density = '简' | '中' | '繁'

type ColorScheme = '单红' | '红金' | '彩色'

interface StyleOption {
  value: StylePreset
  label: string
  english: string
  description: string
}

const styleOptions: StyleOption[] = [
  {
    value: '北方剪纸',
    label: '北方',
    english: 'NORTHERN',
    description: '块面饱满，强调民俗气息与强烈的视觉节奏。'
  },

  {
    value: '南方剪纸',
    label: '南方',
    english: 'SOUTHERN',
    description: '线条纤细，镂空轻盈，更强调结构与留白。'
  },

  {
    value: '彩色蔚县',
    label: '蔚县',
    english: 'YUXIAN COLOR',
    description: '以彩色点染与套色表现形成鲜明装饰性。'
  },

  {
    value: '民族图腾',
    label: '民族',
    english: 'ETHNIC TOTEM',
    description: '几何符号更突出，强调图腾、仪式与地域文化。'
  }
]

const foldOptions = [4, 6, 8, 12]

const motifOptions = patterns.map((item) => item.key)

const densityOptions: Density[] = ['简', '中', '繁']

const colorOptions: ColorScheme[] = ['单红', '红金', '彩色']

const selectedStyle = ref<StylePreset>('北方剪纸')

const folds = ref(8)

const selectedMotif = ref<Motif>('花')

const density = ref<Density>('中')

const colorScheme = ref<ColorScheme>('单红')

const generation = ref(1)

const generatorRef = ref()

const generatorKey = computed(() =>
  [
    selectedStyle.value,
    selectedMotif.value,
    folds.value,
    density.value,
    colorScheme.value,
    generation.value
  ].join('-')
)

const angleStep = computed(() => Math.round(360 / folds.value))

const currentStyle = computed(
  () => styleOptions.find((item) => item.value === selectedStyle.value) ?? styleOptions[0]
)
const currentPattern = computed(() => patternMap[selectedMotif.value])

const styleEnglish = computed(() => currentStyle.value.english)

const creationCode = computed(() => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')

  return `
PC-${date}-${selectedMotif.value}-${folds.value}-${String(generation.value).padStart(3, '0')}
 `.trim()
})

function regenerate() {
  generation.value += 1
}

function colorClass(value: ColorScheme) {
  switch (value) {
    case '红金':
      return 'gold'

    case '彩色':
      return 'multi'

    default:
      return 'red'
  }
}
function downloadWork() {
  const svg = generatorRef.value?.getSVG()

  if (!svg) return

  downloadSVG(svg, creationCode.value + '.svg')
}
</script>

<style scoped>
.creator-page {
  min-height: 100vh;

  padding: 68px clamp(28px, 5vw, 90px) 90px;

  background:
    radial-gradient(circle at 24% 18%, rgba(161, 58, 47, 0.035), transparent 28%),
    linear-gradient(135deg, #f8f0e8, #fffaf4);
}

/* =========================================================
   Page heading
   ========================================================= */

.creator-header {
  max-width: 1500px;

  display: grid;

  grid-template-columns: 0.9fr 1.1fr;

  align-items: end;

  gap: 60px;

  margin: 0 auto 42px;
}

.creator-header > div > span {
  color: #a57769;

  font:
    700 9px 'Microsoft YaHei',
    sans-serif;

  letter-spacing: 0.18em;
}

.creator-header h1 {
  margin: 12px 0 0;

  color: #35221d;

  font-family: 'STKaiti', 'KaiTi', serif;

  font-size: clamp(42px, 4.4vw, 64px);

  line-height: 1;
}

.creator-header > p {
  max-width: 590px;

  margin: 0 0 4px auto;

  color: #80685f;

  font:
    400 12px/2 'Microsoft YaHei',
    sans-serif;
}

/* =========================================================
   Workspace
   ========================================================= */

.creator-workspace {
  max-width: 1500px;

  display: grid;

  grid-template-columns:
    290px
    minmax(500px, 1fr)
    310px;

  gap: 16px;

  align-items: stretch;

  margin: 0 auto;
}

.creator-panel,
.creator-preview,
.creator-info {
  border: 1px solid rgba(120, 80, 60, 0.12);

  border-radius: 21px;

  background: rgba(255, 252, 247, 0.77);
}

/* =========================================================
   Controls
   ========================================================= */

.creator-panel {
  padding: 27px 24px;
}

.creator-panel header > span,
.preview-title span,
.creator-info header span {
  color: #a47c70;

  font:
    700 8px 'Microsoft YaHei',
    sans-serif;

  letter-spacing: 0.15em;
}

.creator-panel header h2 {
  margin: 8px 0 28px;

  color: #432c25;

  font-size: 23px;
}

.control-group {
  padding: 19px 0;

  border-top: 1px solid rgba(127, 82, 68, 0.09);
}

.control-group__heading {
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 10px;

  margin-bottom: 12px;
}

.control-group__heading label {
  color: #765a51;

  font:
    700 10px 'Microsoft YaHei',
    sans-serif;
}

.control-group__heading small {
  color: #b39990;

  font:
    600 7px 'Microsoft YaHei',
    sans-serif;

  letter-spacing: 0.08em;
}

.option-list {
  display: flex;

  flex-wrap: wrap;

  gap: 7px;
}

.option-list button {
  min-height: 33px;

  padding: 7px 11px;

  border: 1px solid #dfcfc4;

  border-radius: 999px;

  background: #fffaf5;

  color: #76554b;

  font:
    600 9px 'Microsoft YaHei',
    sans-serif;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.option-list button:hover:not(:disabled) {
  transform: translateY(-1px);

  border-color: rgba(149, 57, 48, 0.36);
}

.option-list button.active {
  border-color: #9d332b;

  background: #9d332b;

  color: #fff9f3;
}

/* Style buttons */

.option-list--style {
  display: grid;

  grid-template-columns: 1fr 1fr;
}

.option-list--style button {
  min-height: 58px;

  display: flex;

  align-items: flex-start;

  flex-direction: column;

  gap: 4px;

  border-radius: 11px;

  text-align: left;
}

.option-list--style button strong {
  font-size: 10px;
}

.option-list--style button span {
  color: #aa8f86;

  font-size: 7px;

  line-height: 1.45;
}

.option-list--style button.active span {
  color: rgba(255, 248, 240, 0.75);
}

/* Fold buttons */

.option-list--fold {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 6px;
}

.option-list--fold button {
  min-width: 0;

  display: flex;

  align-items: baseline;

  justify-content: center;

  gap: 2px;

  padding: 8px 4px;
}

.option-list--fold strong {
  font:
    700 13px Georgia,
    serif;
}

.option-list--fold span {
  font-size: 7px;
}

/* Disabled motifs */

.option-list button.is-disabled {
  border-style: dashed;

  opacity: 0.42;

  cursor: not-allowed;
}

.control-group__hint {
  margin: 9px 0 0;

  color: #ad958c;

  font:
    400 7px/1.6 'Microsoft YaHei',
    sans-serif;
}

/* Color dots */

.color-dot {
  width: 7px;
  height: 7px;

  display: inline-block;

  margin-right: 4px;

  border-radius: 50%;
}

.color-dot--red {
  background: #a72e28;
}

.color-dot--gold {
  background: linear-gradient(90deg, #a72e28 50%, #c9a14c 50%);
}

.color-dot--multi {
  background: conic-gradient(#a72e28, #d4a54b, #397570, #cf7160, #a72e28);
}

/* =========================================================
   Preview
   ========================================================= */

.creator-preview {
  min-width: 0;

  min-height: 720px;

  display: flex;

  flex-direction: column;

  padding: 28px 29px 23px;

  overflow: hidden;

  background:
    radial-gradient(circle at 50% 47%, rgba(165, 54, 45, 0.035), transparent 34%),
    rgba(255, 252, 247, 0.8);
}

.preview-title {
  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 20px;
}

.preview-title > div {
  display: flex;

  flex-direction: column;

  gap: 5px;
}

.preview-title strong {
  color: #543a32;

  font:
    700 13px 'Microsoft YaHei',
    sans-serif;
}

.preview-title > small {
  color: #b1988f;

  font:
    600 8px 'Microsoft YaHei',
    sans-serif;
}

.paper-stage {
  position: relative;

  flex: 1;

  min-height: 540px;

  display: grid;

  place-items: center;

  margin: 10px 0;

  overflow: hidden;

  border-radius: 18px;

  background: radial-gradient(circle, rgba(255, 253, 249, 0.94), rgba(246, 237, 229, 0.5));
}

/* 四角纸张定位线 */

.paper-stage__corner {
  position: absolute;

  width: 40px;
  height: 40px;

  pointer-events: none;
}

.paper-stage__corner--lt {
  top: 20px;
  left: 20px;

  border-top: 1px solid rgba(148, 93, 74, 0.16);

  border-left: 1px solid rgba(148, 93, 74, 0.16);
}

.paper-stage__corner--rb {
  right: 20px;
  bottom: 20px;

  border-right: 1px solid rgba(148, 93, 74, 0.16);

  border-bottom: 1px solid rgba(148, 93, 74, 0.16);
}

.preview-bottom {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 24px;

  padding-top: 16px;

  border-top: 1px solid rgba(127, 80, 65, 0.09);
}

.preview-bottom p {
  max-width: 420px;

  margin: 0;

  color: #917970;

  font:
    400 8px/1.7 'Microsoft YaHei',
    sans-serif;
}

.preview-bottom p span {
  display: block;

  margin-bottom: 3px;

  color: #a27b6e;

  font:
    700 7px 'Microsoft YaHei',
    sans-serif;

  letter-spacing: 0.12em;
}

.generate-btn {
  flex: 0 0 auto;

  display: flex;

  align-items: center;

  gap: 10px;

  padding: 10px 16px;

  border: none;

  border-radius: 999px;

  background: #962f28;

  color: #fff9f3;

  cursor: pointer;

  font:
    700 9px 'Microsoft YaHei',
    sans-serif;

  box-shadow: 0 9px 22px rgba(123, 44, 36, 0.12);
}

.generate-btn i {
  font-size: 14px;

  font-style: normal;
}

/* =========================================================
   Creation info
   ========================================================= */

.creator-info {
  position: relative;

  min-width: 0;

  display: flex;

  flex-direction: column;

  padding: 27px 24px 22px;

  overflow: hidden;
}

.creator-info__watermark {
  position: absolute;

  right: -18px;
  bottom: -50px;

  color: #a33a32;

  font-family: 'STKaiti', 'KaiTi', serif;

  font-size: 180px;

  font-weight: 700;

  line-height: 1;

  opacity: 0.025;

  pointer-events: none;
}

.creator-info header {
  position: relative;

  z-index: 1;

  display: flex;

  justify-content: space-between;

  align-items: flex-start;
}

.creator-info header > div {
  display: flex;

  flex-direction: column;

  gap: 4px;
}

.creator-info header small {
  color: #b49b92;

  font:
    500 8px 'Microsoft YaHei',
    sans-serif;
}

.creator-info header > strong {
  color: rgba(148, 46, 39, 0.88);

  font:
    700 38px/1 Georgia,
    serif;
}

.creator-info__name {
  position: relative;

  z-index: 1;

  margin-top: 24px;
}

.creator-info__name > span {
  color: #ad887c;

  font:
    700 7px 'Microsoft YaHei',
    sans-serif;

  letter-spacing: 0.13em;
}

.creator-info__name h2 {
  margin: 7px 0 6px;

  color: #402a24;

  font-size: 27px;
}

.creator-info__name p {
  margin: 0;

  color: #907970;

  font:
    400 9px/1.75 'Microsoft YaHei',
    sans-serif;
}

.creator-info__tags {
  position: relative;

  z-index: 1;

  display: flex;

  flex-wrap: wrap;

  gap: 5px;

  margin-top: 17px;
}

.creator-info__tags span {
  padding: 5px 7px;

  border-radius: 999px;

  background: #f1e3da;

  color: #86554a;

  font:
    600 8px 'Microsoft YaHei',
    sans-serif;
}

.creator-info dl {
  position: relative;

  z-index: 1;

  margin: 19px 0 0;

  border-top: 1px solid rgba(127, 80, 65, 0.1);
}

.creator-info dl > div {
  display: flex;

  justify-content: space-between;

  gap: 14px;

  padding: 10px 0;

  border-bottom: 1px solid rgba(127, 80, 65, 0.08);
}

.creator-info dt {
  color: #a28a80;

  font:
    700 8px 'Microsoft YaHei',
    sans-serif;
}

.creator-info dd {
  margin: 0;

  color: #604940;

  font:
    600 8px 'Microsoft YaHei',
    sans-serif;

  text-align: right;
}

.creator-code {
  font-family: Georgia, serif !important;

  letter-spacing: 0.04em;
}

/* Generation principle */

.creator-info__principle {
  position: relative;

  z-index: 1;

  margin-top: 20px;

  padding: 14px;

  border: 1px solid rgba(146, 77, 60, 0.1);

  border-radius: 12px;

  background: rgba(241, 225, 214, 0.54);
}

.creator-info__principle > span {
  display: block;

  color: #ad887c;

  font:
    700 7px 'Microsoft YaHei',
    sans-serif;

  letter-spacing: 0.12em;
}

.creator-info__principle strong {
  display: block;

  margin-top: 7px;

  color: #7f3e36;

  font:
    700 10px 'Microsoft YaHei',
    sans-serif;
}

.creator-info__principle p {
  margin: 7px 0 0;

  color: #907870;

  font:
    400 8px/1.65 'Microsoft YaHei',
    sans-serif;
}

.creator-info footer {
  position: relative;

  z-index: 1;

  display: flex;

  align-items: flex-start;

  gap: 9px;

  margin-top: auto;

  padding-top: 17px;
}

.creator-info footer i {
  flex: 0 0 auto;

  width: 6px;
  height: 6px;

  margin-top: 4px;

  border-radius: 50%;

  background: #a33a32;

  box-shadow: 0 0 0 4px rgba(163, 58, 50, 0.07);
}

.creator-info footer p {
  margin: 0;

  color: #a08a81;

  font:
    400 7px/1.65 'Microsoft YaHei',
    sans-serif;
}

/* =========================================================
   Responsive
   ========================================================= */

@media (max-width: 1250px) {
  .creator-workspace {
    grid-template-columns:
      260px
      minmax(430px, 1fr);
  }

  .creator-info {
    grid-column: 1 / -1;

    min-height: 0;
  }

  .creator-info footer {
    margin-top: 24px;
  }
}

@media (max-width: 850px) {
  .creator-page {
    padding: 48px 24px 70px;
  }

  .creator-header {
    grid-template-columns: 1fr;

    gap: 22px;
  }

  .creator-header > p {
    margin-left: 0;
  }

  .creator-workspace {
    grid-template-columns: 1fr;
  }

  .creator-info {
    grid-column: auto;
  }

  .creator-preview {
    min-height: 650px;
  }
}

@media (max-width: 520px) {
  .creator-panel,
  .creator-preview,
  .creator-info {
    padding: 22px 18px;
  }

  .option-list--style {
    grid-template-columns: 1fr;
  }

  .paper-stage {
    min-height: 400px;
  }

  .preview-bottom {
    align-items: stretch;

    flex-direction: column;
  }

  .generate-btn {
    justify-content: center;

    width: 100%;
  }
}
</style>
