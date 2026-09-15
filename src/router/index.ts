import { createRouter, createWebHistory } from 'vue-router'
import Overview from '@/views/Overview.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'overview', component: Overview },
    { path: '/region', name: 'region', component: () => import('@/views/RegionExplore.vue') },
    { path: '/heritage', name: 'heritage', component: () => import('@/views/Heritage.vue') },
    { path: '/data-source', name: 'dataSource', component: () => import('@/views/DataSource.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
    {
      path: '/creator',
      name: 'Creator',
      component: () => import('@/views/Creator.vue')
    }
  ],
  scrollBehavior: () => ({ top: 0 })
})
