<template>
  <div class="inheritor-archive">
    <!-- =========================
         搜索 / 筛选
         ========================= -->
    <div class="archive-toolbar">
      <label class="archive-search">
        <span>SEARCH</span>

        <div>
          <input v-model.trim="keyword" type="search" placeholder="搜索姓名、项目或地域" />

          <i aria-hidden="true"></i>
        </div>
      </label>

      <div class="archive-filter-group">
        <label>
          <span>地区</span>

          <select v-model="province">
            <option value="">全部地区</option>

            <option v-for="item in provinceOptions" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </label>

        <label>
          <span>批次</span>

          <select v-model="batch">
            <option value="">全部批次</option>

            <option v-for="item in batchOptions" :key="item.label" :value="item.label">
              {{ item.label }}
            </option>
          </select>
        </label>

        <label>
          <span>性别</span>

          <select v-model="gender">
            <option value="">全部</option>

            <option value="女">女</option>

            <option value="男">男</option>
          </select>
        </label>

        <button v-if="hasFilter" type="button" class="archive-reset" @click="resetFilters">
          清除
        </button>
      </div>
    </div>

    <!-- =========================
         主体
         ========================= -->
    <div class="archive-layout">
      <!-- 左侧列表 -->
      <div class="archive-list">
        <div class="archive-result-bar">
          <div>
            <span>ARCHIVE INDEX</span>

            <strong> 匹配 {{ filtered.length }} 位传承人 </strong>
          </div>

          <small>
            当前显示
            {{ visibleInheritors.length }}
            /
            {{ filtered.length }}
          </small>
        </div>

        <!-- 人物卡 -->
        <div v-if="visibleInheritors.length" class="archive-card-grid">
          <button
            v-for="item in visibleInheritors"
            :key="item.id"
            type="button"
            class="archive-card"
            :class="{
              'archive-card--active': selected?.id === item.id
            }"
            :aria-pressed="selected?.id === item.id"
            @click="selectedId = item.id"
          >
            <div class="archive-card__top">
              <span>
                {{ String(item.id).padStart(2, '0') }}
              </span>

              <em>
                {{ shortProvince(item.province) }}
              </em>
            </div>

            <div class="archive-card__seal">
              {{ item.name.slice(0, 1) }}
            </div>

            <h3>
              {{ item.name }}
            </h3>

            <p>
              {{ item.subProject || item.projectName }}
            </p>

            <small>
              {{ item.cityOrCounty || item.declarationRegion }}
            </small>

            <footer>
              <span>
                {{ item.batch }}
              </span>

              <strong>
                {{ item.announcementYear }}
              </strong>
            </footer>
          </button>
        </div>

        <!-- 无结果 -->
        <div v-else class="archive-empty">
          <span>暂无匹配记录</span>

          <p>尝试修改关键词或清除筛选条件。</p>

          <button type="button" @click="resetFilters">清除筛选</button>
        </div>

        <!-- 加载更多 -->
        <div v-if="visibleInheritors.length < filtered.length" class="archive-load-more">
          <button type="button" @click="visibleCount += 12">
            <span>继续查看</span>

            <small>
              还有
              {{ filtered.length - visibleInheritors.length }}
              位
            </small>

            <i>↓</i>
          </button>
        </div>
      </div>

      <!-- =========================
           右侧人物档案
           ========================= -->
      <aside v-if="selected" class="archive-profile">
        <div class="archive-profile__watermark">档</div>

        <header class="archive-profile__head">
          <div>
            <span>INHERITOR PROFILE</span>
            <small>代表性传承人档案</small>
          </div>

          <strong>
            {{ String(selected.id).padStart(2, '0') }}
          </strong>
        </header>

        <div class="archive-profile__identity">
          <div class="archive-profile__seal">
            {{ selected.name.slice(0, 1) }}
          </div>

          <div>
            <span>
              {{ selected.subProject || selected.projectName }}
            </span>

            <h3>
              {{ selected.name }}
            </h3>

            <p>
              {{ selected.declarationRegion }}
            </p>
          </div>
        </div>

        <div class="archive-profile__tags">
          <span>
            {{ selected.gender }}
          </span>

          <span v-if="selected.ethnicity && selected.ethnicity !== '未采集'">
            {{ selected.ethnicity }}
          </span>

          <span>
            {{ selected.batch }}
          </span>
        </div>

        <!-- 人物基础信息 -->
        <dl class="archive-profile__facts">
          <div>
            <dt>代表项目</dt>

            <dd>
              {{ selected.subProject || selected.projectName }}
            </dd>
          </div>

          <div>
            <dt>项目全称</dt>

            <dd>
              {{ selected.projectName }}
            </dd>
          </div>

          <div>
            <dt>所属地域</dt>

            <dd>
              {{ selected.declarationRegion }}
            </dd>
          </div>

          <div>
            <dt>公布批次</dt>

            <dd>
              {{ selected.batch }}
              ·
              {{ selected.announcementYear }}
            </dd>
          </div>
        </dl>

        <!-- 风格数据联动 -->
        <div v-if="selectedStyle" class="archive-profile__style">
          <header>
            <span>STYLE CONNECTION</span>

            <strong>
              {{ selectedStyle.styleGroup }}
            </strong>
          </header>

          <p>
            {{ selectedStyle.visualFeature }}
          </p>

          <div>
            <span>
              {{ selectedStyle.motifTags }}
            </span>

            <span>
              {{ selectedStyle.techniqueTags }}
            </span>
          </div>
        </div>

        <!-- 地域入口 -->
        <RouterLink
          class="archive-profile__link"
          :to="{
            path: '/region',
            query: {
              province: selected.province
            }
          }"
        >
          <div>
            <span>REGION CONNECTION</span>

            <strong> 进入{{ shortProvince(selected.province) }}地域脉络 </strong>
          </div>

          <i>→</i>
        </RouterLink>

        <div class="archive-profile__note">
          <i></i>

          <p>档案信息来自当前代表性传承人数据表； 风格标签仅在存在对应风格辅助记录时展示。</p>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { inheritors, styles } from '@/utils/dataTransform'

/* =========================================================
   筛选状态
   ========================================================= */

const keyword = ref('')
const province = ref('')
const batch = ref('')
const gender = ref('')

const visibleCount = ref(12)

const selectedId = ref<number | null>(inheritors[0]?.id ?? null)

/* =========================================================
   筛选选项
   ========================================================= */

const provinceOptions = [...new Set(inheritors.map((item) => item.province))].sort((a, b) =>
  a.localeCompare(b, 'zh-CN')
)

const batchOptions = Array.from(
  inheritors.reduce(
    (map, item) => {
      if (!map.has(item.batch)) {
        map.set(item.batch, item.batchNo)
      }

      return map
    },

    new Map<string, number>()
  )
)
  .map(([label, no]) => ({
    label,
    no
  }))
  .sort((a, b) => a.no - b.no)

/* =========================================================
   搜索与筛选
   ========================================================= */

const filtered = computed(() => {
  const query = keyword.value.trim().toLowerCase()

  return inheritors.filter((item) => {
    const searchable = [
      item.name,
      item.projectName,
      item.subProject,
      item.province,
      item.cityOrCounty,
      item.declarationRegion,
      item.batch,
      item.ethnicity
    ]
      .join(' ')
      .toLowerCase()

    const keywordMatch = !query || searchable.includes(query)

    const provinceMatch = !province.value || item.province === province.value

    const batchMatch = !batch.value || item.batch === batch.value

    const genderMatch = !gender.value || item.gender === gender.value

    return keywordMatch && provinceMatch && batchMatch && genderMatch
  })
})

const visibleInheritors = computed(() => filtered.value.slice(0, visibleCount.value))

const hasFilter = computed(() =>
  Boolean(keyword.value || province.value || batch.value || gender.value)
)

/* =========================================================
   当前人物
   ========================================================= */

const selected = computed(() => {
  if (!filtered.value.length) {
    return null
  }

  return filtered.value.find((item) => item.id === selectedId.value) ?? filtered.value[0]
})

/* =========================================================
   人物 ↔ 风格辅助表联动

   这里只在能够找到明确对应项目时展示，
   不使用“同省即同风格”的模糊推断。
   ========================================================= */

const selectedStyle = computed(() => {
  if (!selected.value) {
    return null
  }

  const person = selected.value

  return (
    styles.find(
      (item) =>
        item.subProject === person.subProject ||
        item.displayName === person.subProject ||
        item.displayName === person.projectName
    ) ?? null
  )
})

/* =========================================================
   筛选改变
   ========================================================= */

watch(
  [keyword, province, batch, gender],

  () => {
    visibleCount.value = 12

    selectedId.value = filtered.value[0]?.id ?? null
  }
)

/* =========================================================
   操作
   ========================================================= */

function resetFilters() {
  keyword.value = ''
  province.value = ''
  batch.value = ''
  gender.value = ''
}

function shortProvince(value: string) {
  return value.replace(/壮族自治区|回族自治区|维吾尔自治区|自治区|特别行政区|省|市/g, '')
}
</script>

<style scoped>
.inheritor-archive {
  margin-top: 26px;
}

/* =========================================================
   Toolbar
   ========================================================= */

.archive-toolbar {
  min-height: 84px;

  display: grid;

  grid-template-columns:
    minmax(260px, 1fr)
    auto;

  align-items: center;

  gap: 22px;

  padding: 15px 18px;

  border: 1px solid rgba(128, 82, 67, 0.12);

  border-radius: 18px;

  background: rgba(255, 251, 245, 0.66);
}

.archive-search {
  display: grid;

  grid-template-columns:
    auto
    minmax(180px, 360px);

  align-items: center;

  gap: 14px;
}

.archive-search > span,
.archive-filter-group label > span {
  color: #a07d70;

  font:
    700 8px 'Microsoft YaHei',
    sans-serif;

  letter-spacing: 0.12em;
}

.archive-search > div {
  position: relative;
}

.archive-search input {
  width: 100%;
  height: 38px;

  padding: 0 38px 0 14px;

  border: 1px solid #dfd0c5;

  border-radius: 999px;

  outline: none;

  background: rgba(255, 252, 247, 0.95);

  color: #4c3933;

  font:
    500 11px 'Microsoft YaHei',
    sans-serif;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.archive-search input:focus {
  border-color: rgba(156, 54, 45, 0.45);

  box-shadow: 0 0 0 4px rgba(156, 54, 45, 0.055);
}

.archive-search input::placeholder {
  color: #b8a39a;
}

.archive-search i {
  position: absolute;

  top: 50%;
  right: 15px;

  width: 10px;
  height: 10px;

  border: 1.5px solid #b07b6c;

  border-radius: 50%;

  transform: translateY(-58%);

  pointer-events: none;
}

.archive-search i::after {
  content: '';

  position: absolute;

  right: -5px;
  bottom: -3px;

  width: 5px;
  height: 1.5px;

  background: #b07b6c;

  transform: rotate(45deg);

  transform-origin: left center;
}

/* Filters */

.archive-filter-group {
  display: flex;

  align-items: center;

  justify-content: flex-end;

  flex-wrap: wrap;

  gap: 10px;
}

.archive-filter-group label {
  display: flex;

  align-items: center;

  gap: 7px;
}

.archive-filter-group select {
  height: 36px;

  min-width: 112px;

  padding: 0 30px 0 11px;

  border: 1px solid #dfd0c5;

  border-radius: 999px;

  outline: none;

  background-color: rgba(255, 252, 247, 0.94);

  color: #644d45;

  font:
    500 9px 'Microsoft YaHei',
    sans-serif;
}

.archive-reset {
  height: 34px;

  padding: 0 12px;

  border: 1px solid rgba(151, 53, 45, 0.18);

  border-radius: 999px;

  background: transparent;

  color: #9b3a32;

  font:
    700 8px 'Microsoft YaHei',
    sans-serif;

  cursor: pointer;
}

.archive-reset:hover {
  background: #f4e4da;
}

/* =========================================================
   Layout
   ========================================================= */

.archive-layout {
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    340px;

  gap: 16px;

  align-items: start;

  margin-top: 16px;
}

.archive-list {
  min-width: 0;
}

/* =========================================================
   Result bar
   ========================================================= */

.archive-result-bar {
  display: flex;

  align-items: flex-end;

  justify-content: space-between;

  gap: 18px;

  min-height: 58px;

  padding: 4px 4px 15px;
}

.archive-result-bar > div {
  display: flex;

  align-items: baseline;

  gap: 12px;
}

.archive-result-bar span {
  color: #a47e71;

  font:
    700 8px 'Microsoft YaHei',
    sans-serif;

  letter-spacing: 0.14em;
}

.archive-result-bar strong {
  color: #563d35;

  font:
    700 13px 'Microsoft YaHei',
    sans-serif;
}

.archive-result-bar small {
  color: #a99289;

  font:
    500 8px 'Microsoft YaHei',
    sans-serif;
}

/* =========================================================
   Cards
   ========================================================= */

.archive-card-grid {
  display: grid;

  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 11px;
}

.archive-card {
  position: relative;

  min-width: 0;
  min-height: 210px;

  display: flex;

  flex-direction: column;

  overflow: hidden;

  padding: 20px 19px 17px;

  border: 1px solid rgba(128, 82, 67, 0.12);

  border-radius: 16px;

  outline: none;

  background: linear-gradient(150deg, rgba(255, 252, 247, 0.95), rgba(248, 239, 232, 0.7));

  color: inherit;

  text-align: left;

  cursor: pointer;

  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease,
    background 0.22s ease;
}

.archive-card:hover {
  transform: translateY(-3px);

  border-color: rgba(155, 69, 56, 0.24);

  box-shadow: 0 14px 36px rgba(73, 43, 33, 0.07);
}

.archive-card--active {
  border-color: rgba(158, 52, 43, 0.48);

  background: linear-gradient(150deg, rgba(255, 251, 245, 0.98), rgba(243, 225, 213, 0.88));

  box-shadow: 0 12px 34px rgba(111, 48, 39, 0.07);
}

.archive-card--active::before {
  content: '';

  position: absolute;

  top: 0;
  left: 18px;
  right: 18px;

  height: 2px;

  background: #a23d34;
}

.archive-card__top {
  position: relative;

  z-index: 2;

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 8px;
}

.archive-card__top > span {
  color: #b18374;

  font:
    700 8px 'Microsoft YaHei',
    sans-serif;

  letter-spacing: 0.1em;
}

.archive-card__top em {
  padding: 4px 7px;

  border-radius: 999px;

  background: rgba(238, 222, 211, 0.76);

  color: #8b6156;

  font:
    600 8px 'Microsoft YaHei',
    sans-serif;

  font-style: normal;
}

/* 右下角暗纹 */

.archive-card__seal {
  position: absolute;

  right: -2px;
  bottom: -23px;

  color: #9e3e35;

  font-family: 'STKaiti', 'KaiTi', serif;

  font-size: 100px;

  font-weight: 700;

  line-height: 1;

  opacity: 0.025;

  pointer-events: none;
}

.archive-card h3 {
  position: relative;

  z-index: 1;

  margin: 25px 0 7px;

  color: #432d27;

  font-size: 22px;

  line-height: 1.2;
}

.archive-card > p {
  position: relative;

  z-index: 1;

  margin: 0 0 8px;

  overflow: hidden;

  color: #7b4a40;

  font:
    600 10px/1.55 'Microsoft YaHei',
    sans-serif;

  text-overflow: ellipsis;

  white-space: nowrap;
}

.archive-card > small {
  position: relative;

  z-index: 1;

  color: #9f8980;

  font:
    500 9px/1.5 'Microsoft YaHei',
    sans-serif;
}

.archive-card footer {
  position: relative;

  z-index: 1;

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-top: auto;

  padding-top: 14px;

  border-top: 1px dashed #dfd0c6;
}

.archive-card footer span {
  color: #a1877d;

  font:
    600 8px 'Microsoft YaHei',
    sans-serif;
}

.archive-card footer strong {
  color: #9a3f36;

  font:
    700 10px Georgia,
    serif;
}

/* =========================================================
   Load more
   ========================================================= */

.archive-load-more {
  display: flex;

  justify-content: center;

  padding-top: 18px;
}

.archive-load-more button {
  min-width: 180px;

  display: grid;

  grid-template-columns: auto auto auto;

  align-items: center;

  justify-content: center;

  gap: 8px;

  padding: 10px 15px;

  border: 1px solid rgba(147, 69, 55, 0.16);

  border-radius: 999px;

  background: rgba(255, 251, 246, 0.7);

  color: #814f44;

  cursor: pointer;
}

.archive-load-more span {
  font:
    700 9px 'Microsoft YaHei',
    sans-serif;
}

.archive-load-more small {
  color: #aa8d83;

  font:
    500 8px 'Microsoft YaHei',
    sans-serif;
}

.archive-load-more i {
  color: #9c3d34;

  font-style: normal;
}

/* =========================================================
   Empty state
   ========================================================= */

.archive-empty {
  min-height: 280px;

  display: flex;

  align-items: center;

  justify-content: center;

  flex-direction: column;

  border: 1px dashed #d9c8bd;

  border-radius: 18px;

  background: rgba(255, 251, 246, 0.45);
}

.archive-empty > span {
  color: #674b43;

  font-size: 17px;

  font-weight: 700;
}

.archive-empty p {
  margin: 8px 0 17px;

  color: #a18a81;

  font:
    500 10px 'Microsoft YaHei',
    sans-serif;
}

.archive-empty button {
  padding: 8px 13px;

  border: 1px solid rgba(157, 61, 50, 0.18);

  border-radius: 999px;

  background: #fffaf4;

  color: #973b33;

  font:
    700 9px 'Microsoft YaHei',
    sans-serif;

  cursor: pointer;
}

/* =========================================================
   Profile
   ========================================================= */

.archive-profile {
  position: sticky;

  top: 92px;

  min-height: 590px;

  display: flex;

  flex-direction: column;

  overflow: hidden;

  padding: 27px 25px 22px;

  border: 1px solid rgba(128, 82, 67, 0.12);

  border-radius: 20px;

  background: linear-gradient(155deg, rgba(255, 252, 247, 0.97), rgba(246, 233, 223, 0.78));
}

.archive-profile__watermark {
  position: absolute;

  right: -16px;
  bottom: -58px;

  color: #9f392f;

  font-family: 'STKaiti', 'KaiTi', serif;

  font-size: 190px;

  font-weight: 700;

  line-height: 1;

  opacity: 0.027;

  pointer-events: none;
}

/* Header */

.archive-profile__head {
  position: relative;

  z-index: 1;

  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 12px;
}

.archive-profile__head > div {
  display: flex;

  flex-direction: column;

  gap: 4px;
}

.archive-profile__head span {
  color: #9f7568;

  font:
    700 8px 'Microsoft YaHei',
    sans-serif;

  letter-spacing: 0.15em;
}

.archive-profile__head small {
  color: #b19b92;

  font:
    500 8px 'Microsoft YaHei',
    sans-serif;
}

.archive-profile__head > strong {
  color: rgba(145, 47, 40, 0.88);

  font:
    700 35px/1 Georgia,
    serif;
}

/* Identity */

.archive-profile__identity {
  position: relative;

  z-index: 1;

  display: grid;

  grid-template-columns: 58px 1fr;

  align-items: center;

  gap: 15px;

  margin-top: 25px;
}

.archive-profile__seal {
  width: 58px;
  height: 58px;

  display: grid;

  place-items: center;

  border-radius: 50%;

  background: #a03932;

  color: #fff8ef;

  box-shadow: 0 0 0 5px rgba(160, 57, 50, 0.07);

  font-family: 'STKaiti', 'KaiTi', serif;

  font-size: 24px;

  font-weight: 700;
}

.archive-profile__identity span {
  color: #a37d70;

  font:
    600 8px 'Microsoft YaHei',
    sans-serif;
}

.archive-profile__identity h3 {
  margin: 5px 0 3px;

  color: #402a24;

  font-size: 28px;

  line-height: 1.15;
}

.archive-profile__identity p {
  margin: 0;

  color: #a08a81;

  font:
    500 8px/1.5 'Microsoft YaHei',
    sans-serif;
}

/* Tags */

.archive-profile__tags {
  position: relative;

  z-index: 1;

  display: flex;

  flex-wrap: wrap;

  gap: 5px;

  margin-top: 19px;
}

.archive-profile__tags span {
  padding: 5px 8px;

  border-radius: 999px;

  background: rgba(238, 222, 211, 0.82);

  color: #835347;

  font:
    600 8px 'Microsoft YaHei',
    sans-serif;
}

/* Facts */

.archive-profile__facts {
  position: relative;

  z-index: 1;

  margin: 19px 0 0;

  border-top: 1px solid rgba(126, 80, 65, 0.1);
}

.archive-profile__facts > div {
  display: grid;

  grid-template-columns: 65px 1fr;

  gap: 10px;

  padding: 10px 0;

  border-bottom: 1px solid rgba(126, 80, 65, 0.085);
}

.archive-profile__facts dt {
  color: #a0887e;

  font:
    700 8px/1.6 'Microsoft YaHei',
    sans-serif;
}

.archive-profile__facts dd {
  margin: 0;

  color: #604941;

  font:
    500 9px/1.6 'Microsoft YaHei',
    sans-serif;
}

/* Style connection */

.archive-profile__style {
  position: relative;

  z-index: 1;

  margin-top: 18px;

  padding: 14px;

  border: 1px solid rgba(151, 82, 65, 0.1);

  border-radius: 12px;

  background: rgba(242, 226, 215, 0.53);
}

.archive-profile__style header {
  display: flex;

  justify-content: space-between;

  gap: 12px;
}

.archive-profile__style header span {
  color: #ac887c;

  font:
    700 7px 'Microsoft YaHei',
    sans-serif;

  letter-spacing: 0.12em;
}

.archive-profile__style header strong {
  color: #8d4037;

  font:
    700 9px 'Microsoft YaHei',
    sans-serif;
}

.archive-profile__style p {
  margin: 9px 0;

  color: #735a52;

  font:
    500 9px/1.65 'Microsoft YaHei',
    sans-serif;
}

.archive-profile__style > div {
  display: flex;

  flex-wrap: wrap;

  gap: 5px;
}

.archive-profile__style > div span {
  padding: 4px 6px;

  border-radius: 6px;

  background: rgba(255, 251, 246, 0.76);

  color: #967167;

  font:
    500 7px 'Microsoft YaHei',
    sans-serif;
}

/* Region Link */

.archive-profile__link {
  position: relative;

  z-index: 1;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 14px;

  margin-top: 17px;

  padding: 12px 0;

  border-top: 1px solid rgba(125, 79, 65, 0.1);

  border-bottom: 1px solid rgba(125, 79, 65, 0.1);

  color: inherit;
}

.archive-profile__link > div {
  display: flex;

  flex-direction: column;

  gap: 4px;
}

.archive-profile__link span {
  color: #a68a80;

  font:
    700 7px 'Microsoft YaHei',
    sans-serif;

  letter-spacing: 0.12em;
}

.archive-profile__link strong {
  color: #8f3d35;

  font:
    700 9px 'Microsoft YaHei',
    sans-serif;
}

.archive-profile__link i {
  color: #9a3d34;

  font-size: 16px;

  font-style: normal;

  transition: transform 0.2s ease;
}

.archive-profile__link:hover i {
  transform: translateX(4px);
}

/* Note */

.archive-profile__note {
  position: relative;

  z-index: 1;

  display: flex;

  align-items: flex-start;

  gap: 9px;

  margin-top: auto;

  padding-top: 16px;
}

.archive-profile__note i {
  flex: 0 0 auto;

  width: 6px;
  height: 6px;

  margin-top: 4px;

  border-radius: 50%;

  background: #a13c33;

  box-shadow: 0 0 0 4px rgba(161, 60, 51, 0.07);
}

.archive-profile__note p {
  margin: 0;

  color: #a08a81;

  font:
    400 8px/1.65 'Microsoft YaHei',
    sans-serif;
}

/* =========================================================
   Responsive
   ========================================================= */

@media (max-width: 1180px) {
  .archive-layout {
    grid-template-columns:
      minmax(0, 1fr)
      310px;
  }

  .archive-card-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .archive-toolbar {
    grid-template-columns: 1fr;
  }

  .archive-filter-group {
    justify-content: flex-start;
  }
}

@media (max-width: 900px) {
  .archive-layout {
    grid-template-columns: 1fr;
  }

  .archive-profile {
    position: relative;

    top: auto;

    min-height: 0;
  }

  .archive-profile__note {
    margin-top: 24px;
  }
}

@media (max-width: 620px) {
  .archive-search {
    grid-template-columns: 1fr;
  }

  .archive-filter-group {
    align-items: stretch;

    flex-direction: column;
  }

  .archive-filter-group label {
    justify-content: space-between;
  }

  .archive-filter-group select {
    flex: 1;
  }

  .archive-reset {
    width: 100%;
  }

  .archive-result-bar {
    align-items: flex-start;

    flex-direction: column;
  }

  .archive-card-grid {
    grid-template-columns: 1fr;
  }

  .archive-profile {
    padding: 23px 19px;
  }
}
</style>
