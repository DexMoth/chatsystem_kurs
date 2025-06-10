import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './api'
import RegistrationPage from '@/pages/registration/RegistrationPage.vue'
import LoginPage from '@/pages/login/LoginPage.vue'
import ProfilePage from '@/pages/profile/ProfilePage.vue'
import ChatPage from '@/pages/chat/ChatPage.vue'
import EditChatPage from '@/pages/chat/EditChatPage.vue'

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
      {
        path: '/chat/edit',
        name: 'editChat',
        component: EditChatPage
      },
    ]
})

export default router