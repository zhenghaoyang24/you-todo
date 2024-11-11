import { createRouter, createWebHistory } from 'vue-router'
import ToDoView from '../views/ToDoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/todo'
    },
    {
      path: '/todo',
      name: 'todo',
      component: ToDoView,
    },
    {
      path: '/timer',
      name: 'timer',
      component: () => import('../views/TimerView.vue'),
    },
    {
      path: '/data',
      name: 'data',
      component: () => import('../views/DataView.vue'),
    },
  ],
})

export default router
