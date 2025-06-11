<script setup>
import { ref, onMounted } from 'vue'
import ChatElement from './components/ChatElement.vue'
import ChatWindow from './components/ChatWindow.vue'
import { API_URL, axiosDB } from '@/js/api'

// const user = ref(null)
// const chats = ref([])
// const isLoading = ref(true)
// const error = ref(null)

// const fetchUserAndChats = async () => {
//   try {
//     const userResponse = await axiosDB.get(API_URL + '/user/me')
//     user.value = userResponse.data
    
//     const chatsResponse = await axiosDB.get(`${API_URL}/chat/user/${user.value.id}`)
//     const chatsResponse = axiosDB.get(API_URL + '/chat')
//     chats.value = chatsResponse.data
    
//   } catch (err) {
//     console.error('Ошибка загрузки:', err)
//     error.value = 'Не удалось загрузить данные'
//   } finally {
//     isLoading.value = false
//   }
// }

// onMounted(() => {
//   fetchUserAndChats()
// })

const chats = ref([
  { id: 1, name: 'Рабочий чат', image: 'https://png.klev.club/uploads/posts/2024-04/thumbs/png-klev-club-r31i-p-bukva-f-png-3.png' },
  { id: 2, name: 'Друзья', image: 'https://png.klev.club/uploads/posts/2024-04/thumbs/png-klev-club-r31i-p-bukva-f-png-3.png' },
  { id: 3, name: 'Семья', image: 'https://png.klev.club/uploads/posts/2024-04/thumbs/png-klev-club-r31i-p-bukva-f-png-3.png' },
  { id: 4, name: 'Игровой чат', image: 'https://png.klev.club/uploads/posts/2024-04/thumbs/png-klev-club-r31i-p-bukva-f-png-3.png' }
])

</script>

<template>
  <div class="container">
    <div class="row align-items-start">
      <div class="col-4">
        <router-link to="/chat/edit" type="submit" class="btn btn-secondary p-10">Создать чат</router-link>
        
        <div v-if="chats.length === 0" class="alert alert-info">
          У вас пока нет чатов
        </div>

        <ChatElement 
          v-for="chat in chats" 
          :key="chat.id"
          :name="chat.name"
          :image="chat.image"
        />
      </div>
      <div class="col">
        <ChatWindow/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>