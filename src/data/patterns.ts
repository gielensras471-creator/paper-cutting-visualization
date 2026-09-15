export type Motif =
  | '花'
  | '鸟'
  | '鱼'
  | '蝶'
  | '福'

export interface PatternDefinition {
  key: Motif
  name: string
  english: string
  meaning: string
  structure: string
  regions: string[]
  description: string
}

export const patterns: PatternDefinition[] = [
  {
    key: '花',
    name: '花卉纹',
    english: 'FLORAL MOTIF',
    meaning: '繁盛、生命、吉祥',
    structure: '花瓣沿中心轴展开，适合形成放射式对称结构。',
    regions: [
      '陕西',
      '河北',
      '山西',
      '山东'
    ],
    description:
      '以花瓣和枝叶为基本视觉单位，是传统剪纸中最常见的装饰语言之一。'
  },

  {
    key: '鸟',
    name: '鸟纹',
    english: 'BIRD MOTIF',
    meaning: '祥瑞、自由、生命延续',
    structure: '以鸟身、羽翼和尾羽构成具有方向性的剪刻单元。',
    regions: [
      '陕西',
      '山东',
      '江苏',
      '浙江'
    ],
    description:
      '鸟纹常与花草组合出现，在婚庆、节令与生命主题剪纸中较为常见。'
  },

  {
    key: '鱼',
    name: '鱼纹',
    english: 'FISH MOTIF',
    meaning: '富足、有余、繁衍',
    structure: '椭圆鱼身与三角尾部形成清晰轮廓，适合连续与环形排列。',
    regions: [
      '河北',
      '山东',
      '江苏',
      '福建'
    ],
    description:
      '鱼纹常借“鱼”与“余”的谐音表达丰收、富足和年年有余。'
  },

  {
    key: '蝶',
    name: '蝶纹',
    english: 'BUTTERFLY MOTIF',
    meaning: '美好、爱情、生命变化',
    structure: '双翼镜像展开，本身具有天然的左右对称特征。',
    regions: [
      '江苏',
      '浙江',
      '广东',
      '福建'
    ],
    description:
      '蝴蝶结构轻盈而对称，经常用于花蝶、喜庆和爱情主题的剪纸作品。'
  },

  {
    key: '福',
    name: '福字纹',
    english: 'FORTUNE MOTIF',
    meaning: '福运、吉祥、团圆',
    structure: '以中央文字为视觉核心，外围配合放射式几何纹样形成团花。',
    regions: [
      '全国'
    ],
    description:
      '“福”是春节与吉庆剪纸中的核心文字纹样，常与花卉、祥云等元素组合。'
  }
]

export const patternMap:
Record<Motif, PatternDefinition> = {
  花: patterns[0],
  鸟: patterns[1],
  鱼: patterns[2],
  蝶: patterns[3],
  福: patterns[4]
}