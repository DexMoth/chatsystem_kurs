<script setup>
import ChatElement from './components/ChatElement.vue'
import ChatWindow from './components/ChatWindow.vue'
import { ref } from 'vue'

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
      <div class="col">
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
body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}
</style>