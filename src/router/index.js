import {createRouter, createWebHistory} from 'vue-router'
import CalendarView from '../views/CalendarView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), routes: [{
        path: '/', redirect: '/calendar', meta: {
            title: '有待办 | 日历'
        }
    }, {
        path: '/calendar', name: 'calendar', component: CalendarView, meta: {
            title: '有待办 | 日历'
        }
    }, {
        path: '/todo', name: 'todo', component: () => import('../views/TodoView.vue'), meta: {
            title: '有待办 | 待办'
        }
    }, {
        path: '/timer', name: 'timer', component: () => import('../views/TimerView.vue'), meta: {
            title: '有待办 | 专注'
        }
    },],
})

export default router
