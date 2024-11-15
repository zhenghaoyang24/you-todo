import { createRouter, createWebHistory } from 'vue-router'
import ToDoView from '../views/ToDoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/todo',
      meta:{
        title:'待办'
      }
    },
    {
      path: '/todo',
      name: 'todo',
      component: ToDoView,
      meta:{
        title:'有待办 | 待办'
      }
    },
    {
      path: '/timer',
      name: 'timer',
      component: () => import('../views/TimerView.vue'),
      meta:{
        title:'有待办 | 专注'
      }
    },
    {
      path: '/data',
      name: 'data',
      component: () => import('../views/DataView.vue'),
      meta:{
        title:'有待办 | 数据'
      }
    },
  ],
})

export default router
