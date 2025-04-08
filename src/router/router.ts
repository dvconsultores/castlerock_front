import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/default-layout.vue'
import AuthLayout from '@/layouts/auth-layout.vue'
import LoginPage from '@/views/login.vue'

const routes = [
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'LoginPage',
        component: LoginPage
      },
    ]
  },
  {
    path: '/home',
    component: () => import('@/layouts/default-layout.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/home.vue')
      },
      {
        path: '/students',
        component: () => import('@/views/students.vue')
      },
      {
        path: '/student-registration',
        component: () => import('@/views/student-registration.vue')
      },
      {
        path: '/programs',
        component: () => import('@/views/programs.vue')
      },
      {
        path: '/additional-program',
        component: () => import('@/views/additional-program.vue')
      },
      {
        path: '/classrooms',
        component: () => import('@/views/classrooms.vue')
      },
      {
        path: '/new-classroom',
        component: () => import('@/views/new-classroom.vue')
      },
      {
        path: '/new-weekly-schedule',
        component: () => import('@/views/new-weekly-schedule.vue')
      },
      {
        path: '/daily-schedule',
        component: () => import('@/views/daily-schedule.vue')
      },
      {
        path: '/student-profile',
        component: () => import('@/views/student-profile.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router



