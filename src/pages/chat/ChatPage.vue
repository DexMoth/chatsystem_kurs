<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import ChatElement from './components/ChatElement.vue'
import ChatWindow from './components/ChatWindow.vue'
import { API_URL, axiosDB } from '@/js/api'

const route = useRoute() // Получаем текущий маршрут
const chats = ref([])
const user = ref()

const fetchChats = async () => {
  try {
    const responseU = await axiosDB.get(API_URL + '/user/me')
    user.value = responseU.data
    console.log("fff"+user.value.phone)

    const response = await axiosDB.get(`${API_URL}/chat/user/${user.value.id}`)
    chats.value = response.data
  } catch (err) {
    console.error('Ошибка загрузки данныъ:', err)
    error.value = 'Не удалось загрузить данные'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchChats()
})
</script>

<template>
  <div class="container">
    <div class="row align-items-start">
      <div class="col-3">
        <div v-if="user?.phone">
        <router-link to="/chat-edit" type="submit" class="btn btn-secondary p-10 mb-4">Создать чат</router-link>
        </div>

        <div v-if="chats.length === 0" class="alert alert-info mt-3">
          У вас пока нет чатов
        </div>
        <router-link 
          v-for="chat in chats" 
          :key="chat.id"
          :to="`/chat/${chat.id}`"
          class="text-decoration-none"
          :class="{ 'active-chat': route.params.id === chat.id.toString() }"
        >
          <ChatElement 
            :id="chat.id"
            :name="chat.name"
            :is-active="route.params.id === chat.id.toString()"
          />
        </router-link>
      </div>
      <div class="col">
        <div v-if="chats.length > 0">
          <ChatWindow v-if="route.params.id" :chatId="route.params.id" />
          <div v-else class="alert alert-info">
            Выберите чат для просмотра сообщений
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active-chat .chat-button {
  background-color: #828892;
  color: rgb(24, 19, 19);
}
</style>