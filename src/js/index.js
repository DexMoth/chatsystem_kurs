import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './auth'
import RegistrationPage from '@/pages/registration/RegistrationPage.vue'
import LoginPage from '@/pages/login/LoginPage.vue'
import ProfilePage from '@/pages/profile/ProfilePage.vue'
import ChatPage from '@/pages/chat/ChatPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: RegistrationPage
      },
      {
        path: '/register',
        name: 'register',
        component: RegistrationPage
      },
      {
        path: '/login',
        name: 'login',
        component: LoginPage
      },
      {
        path: '/profile',
        name: 'profile',
        component: ProfilePage
      },
      {
        path: '/chat',
        name: 'chat',
        component: ChatPage
      },
    ]
  })
  
  /// проверка на вход в учетку
  router.beforeEach((to) => {
    const authStore = useAuthStore()
    const isAuthenticated = authStore.checkAuth()
    
    if (to.meta.requiresAuth && !isAuthenticated) {
      return { name: 'login' }
    }
    
    if (to.meta.guestOnly && isAuthenticated) {
      return { name: 'home' }
    }
  })

  export default router