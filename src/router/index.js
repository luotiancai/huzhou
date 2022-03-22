import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/kqgl',
    name: 'KQGL',
    component: () => import('@/views/KQGL.vue')
  },
  {
    path: '/zjtdt',
    name: 'ZJTDT',
    component: () => import('@/views/ZJTDT.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
