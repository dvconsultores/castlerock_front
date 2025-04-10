import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/default-layout.vue'
import AuthLayout from '@/layouts/auth-layout.vue'
import LoginPage from '@/views/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL), // Usa la variable de entorno  
  routes: [
    {
      path: '/',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'LoginPage',
          component: LoginPage
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home-view',
          component: () => import('@/views/home.vue')
        },
        {
          path: 'students',
          name: 'students',
          component: () => import('@/views/students.vue')
        },
        {
          path: 'student-registration',
          name: 'student-registration',
          component: () => import('@/views/student-registration.vue')
        },
        {
          path: 'programs',
          name: 'programs',
          component: () => import('@/views/programs.vue')
        },
        {
          path: 'additional-program',
          name: 'additional-program',
          component: () => import('@/views/additional-program.vue')
        },
        {
          path: 'classrooms',
          name: 'classrooms',
          component: () => import('@/views/classrooms.vue')
        },
        {
          path: 'new-classroom',
          name: 'new-classroom',
          component: () => import('@/views/new-classroom.vue')
        },
        {
          path: 'new-weekly-schedule',
          name: 'new-weekly-schedule',
          component: () => import('@/views/new-weekly-schedule.vue')
        },
        {
          path: 'daily-schedule',
          name: 'daily-schedule',
          component: () => import('@/views/daily-schedule.vue')
        },
        {
          path: 'student-profile',
          name: 'student-profile',
          component: () => import('@/views/student-profile.vue')
        },
        {
          path: 'centers',
          name: 'centers',
          component: () => import('@/views/centers.vue')
        },
        {
          path: 'new-center',
          name: 'new-center',
          component: () => import('@/views/new-center.vue')
        },
        {
          path: 'teachers',
          name: 'teachers',
          component: () => import('@/views/teachers.vue')
        },
        {
          path: 'new-teacher',
          name: 'new-teacher',
          component: () => import('@/views/new-teacher.vue')
        },
      ]
    }
  ]
})

export default router


