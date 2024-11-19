import { createRouter, createWebHistory } from 'vue-router'
import ToDoView from '../views/TodoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/todo',
      meta:{
        title:'有待办 | 待办'
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
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/CalendarView.vue'),
      meta:{
        title:'有待办 | 日历'
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
  ],
})

export default router
