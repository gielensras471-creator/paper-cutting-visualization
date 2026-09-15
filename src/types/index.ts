export interface PaperCutProject {
  id: string
  name: string
  province: string
  region: string
  protectionUnit: string
  styleType: string
  projectType: string
  batch: string
  batchNo: number | null
  year: number
}

export interface Inheritor {
  id: number
  name: string
  gender: string
  ethnicity: string
  projectName: string
  subProject: string
  province: string
  cityOrCounty: string
  declarationRegion: string
  announcementYear: number
  batch: string
  batchNo: number
  sourceUrl?: string
}

export interface StyleRecord {
  id: number
  displayName: string
  subProject: string
  province: string
  declarationRegion: string
  regionGroup: string
  styleGroup: string
  visualFeature: string
  motifTags: string
  techniqueTags: string
  colorFeature: string
  relationshipTags: string
}

export interface ProvinceSummary {
  province: string
  projectCount: number
  inheritorCount: number
  styleGroups: string[]
  representativeProjects: string[]
  representativeInheritors: string[]
  dominantStyle: string
}

export interface StyleGroupOverview {
  name: string
  count: number
  feature: string
  representativeProject: string
  representativeProvince: string
}
