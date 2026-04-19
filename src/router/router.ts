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
          path: 'register',
          name: 'RegisterPage',
          component: () => import('@/views/register.vue')
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
      meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'TEACHER', 'OWNER'] },
      children: [
        {
          path: '',
          name: 'home-view',
          component: () => import('@/views/home.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'TEACHER', 'OWNER'] }
        },
        {
          path: 'students',
          name: 'students',
          component: () => import('@/views/students.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'student-registration',
          name: 'student-registration',
          component: () => import('@/views/student-registration.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'new-enrollments',
          name: 'new-enrollments',
          component: () => import('@/views/new-enrollments.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'TEACHER', 'OWNER'] }
        },
        {
          path: 'withdrawal-dates',
          name: 'withdrawal-dates',
          component: () => import('@/views/withdrawal-dates.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'TEACHER', 'OWNER'] }
        },
        {
          path: 'inactive-students',
          name: 'inactive-students',
          component: () => import('@/views/inactive-students.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'TEACHER', 'OWNER'] }
        },
        {
          path: 'programs',
          name: 'programs',
          component: () => import('@/views/programs.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'additional-program',
          name: 'additional-program',
          component: () => import('@/views/additional-program.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'edit-additional-program/:id',
          name: 'edit-additional-program',
          component: () => import('@/views/edit-additional-program.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'classrooms',
          name: 'classrooms',
          component: () => import('@/views/classrooms.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'TEACHER', 'OWNER'] }
        },
        {
          path: 'new-classroom',
          name: 'new-classroom',
          component: () => import('@/views/new-classroom.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'edit-classroom/:id',
          name: 'edit-classroom',
          component: () => import('@/views/edit-classroom.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'new-weekly-schedule',
          name: 'new-weekly-schedule',
          component: () => import('@/views/new-weekly-schedule.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'report',
          name: 'report',
          component: () => import('@/views/report.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'edit-weekly-schedule/:id',
          name: 'edit-weekly-schedule',
          component: () => import('@/views/edit-weekly-schedule.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'daily-schedule/',
          name: 'daily-schedule',
          component: () => import('@/views/daily-schedule.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'edit-daily-schedule/',
          name: 'edit-daily-schedule',
          component: () => import('@/views/edit-daily-schedule.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'view-daily-schedule/:id',
          name: 'view-daily-schedule',
          component: () => import('@/views/view-daily-schedule.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'TEACHER', 'OWNER'] }
        },
        {
          path: 'daily-roster',
          name: 'daily-roster',
          component: () => import('@/views/daily-roster.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'TEACHER', 'OWNER'] }
        },
        {
          path: 'weekly-roster',
          name: 'weekly-roster',
          component: () => import('@/views/weekly-roster.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'TEACHER', 'OWNER'] }
        },
        {
          path: 'weekly-programs-roster',
          name: 'weekly-programs-roster',
          component: () => import('@/views/weekly-programs-roster.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'TEACHER', 'OWNER'] }
        },
        {
          path: 'view-daily-spot/:id',
          name: 'view-daily-spot',
          component: () => import('@/views/view-daily-spot.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'TEACHER', 'OWNER'] }
        },
        {
          path: 'student-profile/:id',
          name: 'student-profile',
          component: () => import('@/views/student-profile.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'edit-student/:id',
          name: 'edit-student',
          component: () => import('@/views/edit-student.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'centers',
          name: 'centers',
          component: () => import('@/views/centers.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
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
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'view-center/:id',
          name: 'view-center',
          component: () => import('@/views/view-center.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'teachers',
          name: 'teachers',
          component: () => import('@/views/teachers.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'new-teacher',
          name: 'new-teacher',
          component: () => import('@/views/new-teacher.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'edit-teacher/:id',
          name: 'edit-teacher',
          component: () => import('@/views/edit-teacher.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('@/views/users.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'new-user',
          name: 'new-user',
          component: () => import('@/views/new-user.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'view-user/:id',
          name: 'view-user',
          component: () => import('@/views/view-user.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'edit-user/:id',
          name: 'edit-user',
          component: () => import('@/views/edit-user.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'view-additional-program/:id',
          name: 'view-additional-program',
          component: () => import('@/views/view-additional-program.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
        },
        {
          path: 'edit-daily-attendance/:id',
          name: 'edit-daily-attendance',
          component: () => import('@/views/edit-daily-attendance.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'TEACHER', 'OWNER'] }
        },
        {
          path: 'payment-renewal',
          name: 'payment-renewal',
          component: () => import('@/views/payment-renewal.vue'),
          meta: { requiresAuth: true, allowedRoles: ['ADMIN', 'OWNER'] }
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

  // Validar expiración del token JWT
  try {
    // JWT formato: header.payload.signature
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('userRole')
      localStorage.removeItem('statusSuscription')
      // Puedes limpiar otros datos si es necesario
      return next({ name: 'LoginPage' })
    }
  } catch (e) {
    // Si el token no es válido, forzar logout
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('statusSuscription')
    return next({ name: 'LoginPage' })
  }

  // Validar estado de suscripción para rutas que requieren auth
  const isAuthLayoutRoute = to.matched.some(record => (record.components && record.components.default === AuthLayout))
  if (!isAuthLayoutRoute) {
    const status = (localStorage.getItem('statusSuscription') || '').toLowerCase()
    if (status !== 'active') {
      // Si ya estamos en payment-renewal, permitir navegación (evita bucle infinito)
      if (to.name === 'payment-renewal') {
        return next()
      }
      // Redirigir únicamente a la vista de renovación de pago
      return next({ name: 'payment-renewal' })
    }
  }

  // Verificar roles si la ruta los requiere
  if (to.meta.allowedRoles && (!userRole || !to.meta.allowedRoles.includes(userRole))) {
    // Redirigir a home si no tiene permiso
    return next({ name: 'home-view' })
  }

  next()
})

export default router


