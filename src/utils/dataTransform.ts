import projectsRaw from '@/data/projects.json'
import inheritorsRaw from '@/data/inheritors.json'
import stylesRaw from '@/data/styles.json'
import type {
  Inheritor,
  PaperCutProject,
  ProvinceSummary,
  StyleGroupOverview,
  StyleRecord
} from '@/types'

export const projects = projectsRaw as PaperCutProject[]
export const inheritors = inheritorsRaw as Inheritor[]
export const styles = stylesRaw as StyleRecord[]

export const provinceRanking = Array.from(
  projects.reduce(
    (map, item) => map.set(item.province, (map.get(item.province) ?? 0) + 1),
    new Map<string, number>()
  )
)
  .map(([province, value]) => ({ province, value }))
  .sort((a, b) => b.value - a.value)

export const provinceProjectMap = Object.fromEntries(
  provinceRanking.map(item => [item.province, item.value])
)

export const coveredProvinceCount = provinceRanking.length
export const styleGroupCount = new Set(styles.map(item => item.styleGroup).filter(Boolean)).size

function getMostFrequent(values: string[]) {
  const counts = values.reduce(
    (map, value) => map.set(value, (map.get(value) ?? 0) + 1),
    new Map<string, number>()
  )
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? ''
}

export function getProvinceSummary(province: string): ProvinceSummary | null {
  if (!province) return null

  const provinceProjects = projects.filter(item => item.province === province)
  const provinceInheritors = inheritors.filter(item => item.province === province)
  const provinceStyles = styles.filter(item => item.province === province)

  if (!provinceProjects.length && !provinceInheritors.length && !provinceStyles.length) return null

  const styleGroups = [...new Set(provinceStyles.map(item => item.styleGroup).filter(Boolean))]

  return {
    province,
    projectCount: provinceProjects.length,
    inheritorCount: provinceInheritors.length,
    styleGroups,
    representativeProjects: provinceProjects.slice(0, 4).map(item => item.name),
    representativeInheritors: provinceInheritors.slice(0, 4).map(item => item.name),
    dominantStyle: getMostFrequent(provinceStyles.map(item => item.styleGroup).filter(Boolean))
  }
}

export function getProjectsByProvince(province: string) {
  return province ? projects.filter(item => item.province === province) : projects
}

export function getInheritorsByProvince(province: string) {
  return province ? inheritors.filter(item => item.province === province) : inheritors
}

export function getStylesByProvince(province: string) {
  return province ? styles.filter(item => item.province === province) : styles
}

export function getBatchTrend(province = '') {
  const rows = getProjectsByProvince(province)
  const map = new Map<string, { batch: string; year: number; count: number }>()

  rows.forEach(item => {
    const key = `${item.year}-${item.batch}`
    const current = map.get(key) ?? { batch: item.batch, year: item.year, count: 0 }
    current.count += 1
    map.set(key, current)
  })

  return [...map.values()].sort((a, b) => a.year - b.year)
}

export function getInheritorProvinceTop(limit = 8) {
  return Array.from(
    inheritors.reduce(
      (map, item) => map.set(item.province, (map.get(item.province) ?? 0) + 1),
      new Map<string, number>()
    )
  )
    .map(([province, value]) => ({ province, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit)
}

export function getInheritorBatchTrend(province: string) {
  return Array.from(
    getInheritorsByProvince(province).reduce(
      (map, item) => {
        const current = map.get(item.batch) ?? {
          batch: item.batch,
          batchNo: item.batchNo,
          year: item.announcementYear,
          value: 0
        }
        current.value += 1
        map.set(item.batch, current)
        return map
      },
      new Map<string, { batch: string; batchNo: number; year: number; value: number }>()
    ).values()
  ).sort((a, b) => a.batchNo - b.batchNo)
}

export function getStyleGroupOverview(province = ''): StyleGroupOverview[] {
  const rows = getStylesByProvince(province)
  const groups = new Map<string, StyleRecord[]>()

  rows.forEach(item => {
    if (!item.styleGroup) return
    const current = groups.get(item.styleGroup) ?? []
    current.push(item)
    groups.set(item.styleGroup, current)
  })

  return [...groups.entries()]
    .map(([name, items]) => ({
      name,
      count: items.length,
      feature: getMostFrequent(items.map(item => item.visualFeature).filter(Boolean)),
      representativeProject: items[0]?.displayName || items[0]?.subProject || '暂无代表项目',
      representativeProvince: items[0]?.province || ''
    }))
    .sort((a, b) => b.count - a.count)
}
