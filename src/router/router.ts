import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/default-layout.vue'
import AuthLayout from '@/layouts/auth-layout.vue'
import LoginPage from '@/views/login.vue'
import ForgotPasswordPage from '@/views/forgot-password.vue'
import PasswordRecoveryPage from '@/views/password-recovery.vue'

// Tipos para meta fields
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    allowedRoles?: string[]
  }
}

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
        },
        {
          path: 'forgot-password',
          name: 'ForgotPasswordPage',
          component: ForgotPasswordPage
        },
        {
          path: 'password-recovery',
          name: 'PasswordRecoveryPage',
          component: PasswordRecoveryPage
        },
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: DefaultLayout,
      meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'TEACHER'] },
      children: [
        {
          path: '',
          name: 'home-view',
          component: () => import('@/views/home.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'TEACHER'] }
        },
        {
          path: 'students',
          name: 'students',
          component: () => import('@/views/students.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN'] }
        },
        {
          path: 'student-registration',
          name: 'student-registration',
          component: () => import('@/views/student-registration.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN'] }
        },
        {
          path: 'programs',
          name: 'programs',
          component: () => import('@/views/programs.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN'] }
        },
        {
          path: 'additional-program',
          name: 'additional-program',
          component: () => import('@/views/additional-program.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN'] }
        },
        {
          path: 'edit-additional-program/:id',
          name: 'edit-additional-program',
          component: () => import('@/views/edit-additional-program.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN'] }
        },
        {
          path: 'classrooms',
          name: 'classrooms',
          component: () => import('@/views/classrooms.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'TEACHER'] }
        },
        {
          path: 'new-classroom',
          name: 'new-classroom',
          component: () => import('@/views/new-classroom.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN'] }
        },
        {
          path: 'edit-classroom/:id',
          name: 'edit-classroom',
          component: () => import('@/views/edit-classroom.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN'] }
        },
        {
          path: 'new-weekly-schedule',
          name: 'new-weekly-schedule',
          component: () => import('@/views/new-weekly-schedule.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'TEACHER'] }
        },
        {
          path: 'edit-weekly-schedule/:id',
          name: 'edit-weekly-schedule',
          component: () => import('@/views/edit-weekly-schedule.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'TEACHER'] }
        },
        {
          path: 'daily-schedule/',
          name: 'daily-schedule',
          component: () => import('@/views/daily-schedule.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'TEACHER'] }
        },
        {
          path: 'edit-daily-schedule/',
          name: 'edit-daily-schedule',
          component: () => import('@/views/edit-daily-schedule.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'TEACHER'] }
        },
        {
          path: 'view-daily-schedule/:id',
          name: 'view-daily-schedule',
          component: () => import('@/views/view-daily-schedule.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'TEACHER'] }
        },
        {
          path: 'view-daily-spot/:id',
          name: 'view-daily-spot',
          component: () => import('@/views/view-daily-spot.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'TEACHER'] }
        },
        {
          path: 'student-profile/:id',
          name: 'student-profile',
          component: () => import('@/views/student-profile.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN'] }
        },
        {
          path: 'edit-student/:id',
          name: 'edit-student',
          component: () => import('@/views/edit-student.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN'] }
        },
        {
          path: 'centers',
          name: 'centers',
          component: () => import('@/views/centers.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN'] }
        },
        {
          path: 'new-center',
          name: 'new-center',
          component: () => import('@/views/new-center.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN'] }
        },
        {
          path: 'edit-center/:id',
          name: 'edit-center',
          component: () => import('@/views/edit-center.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN'] }
        },
        {
          path: 'view-center/:id',
          name: 'view-center',
          component: () => import('@/views/view-center.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN'] }
        },
        {
          path: 'teachers',
          name: 'teachers',
          component: () => import('@/views/teachers.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN'] }
        },
        {
          path: 'new-teacher',
          name: 'new-teacher',
          component: () => import('@/views/new-teacher.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN'] }
        },
        {
          path: 'edit-teacher/:id',
          name: 'edit-teacher',
          component: () => import('@/views/edit-teacher.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN'] }
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('@/views/users.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN'] }
        },
        {
          path: 'new-user',
          name: 'new-user',
          component: () => import('@/views/new-user.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN'] }
        },
        {
          path: 'view-user/:id',
          name: 'view-user',
          component: () => import('@/views/view-user.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN'] }
        },
        {
          path: 'edit-user/:id',
          name: 'edit-user',
          component: () => import('@/views/edit-user.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN'] }
        },
        {
          path: 'view-additional-program/:id',
          name: 'view-additional-program',
          component: () => import('@/views/view-additional-program.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN'] }
        },
        {
          path: 'edit-daily-attendance/:id',
          name: 'edit-daily-attendance',
          component: () => import('@/views/edit-daily-attendance.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'TEACHER'] }
        },
      ]
    }
  ]
})

// Guard de navegación global
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('accessToken')
  const userRole = localStorage.getItem('userRole')

  // Rutas que no requieren autenticación
  if (!to.meta.requiresAuth) {
    return next()
  }

  // Redirigir al login si no hay token
  if (!token) {
    return next({ name: 'LoginPage' })
  }

  // Verificar roles si la ruta los requiere
  if (to.meta.allowedRoles && (!userRole || !to.meta.allowedRoles.includes(userRole))) {
    // Redirigir a home si no tiene permiso
    return next({ name: 'home-view' })
  }

  next()
})

export default router


