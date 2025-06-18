import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './auth'
import RegistrationPage from '@/pages/registration/RegistrationPage.vue'
import LoginPage from '@/pages/login/LoginPage.vue'
import ProfilePage from '@/pages/profile/ProfilePage.vue'
import ProfileEditPage from '@/pages/profile-edit/ProfileEditPage.vue'
import ChatPage from '@/pages/chat/ChatPage.vue'
import EditChatPage from '@/pages/chat-edit/EditChatPage.vue'
import ConfirmPage from '@/pages/confirm/ConfirmPage.vue'

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
        path: '/profile-edit',
        name: 'profile-edit',
        component: ProfileEditPage
      },
      {
        path: '/chat',
        name: 'chat-list',
        component: ChatPage
      },
      {
        path: '/chat/:id',
        name: 'chat-detail',
        component: ChatPage,
        props: true
      },
      {
        path: '/chat-edit',
        name: 'editChat',
        component: EditChatPage
      },
      {
        path: '/chat-edit/:id',
        name: 'editChat2',
        component: EditChatPage
      },
      {
        path: '/join-chat/:chatId',
        name: 'join-chat',
        component: ConfirmPage
      }
    ]
})

export default router