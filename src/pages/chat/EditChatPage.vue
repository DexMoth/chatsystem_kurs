<script setup>
import { ref } from 'vue'
import UserElement from './components/UserElement.vue'

const chats = ref([
  { id: 1, name: 'Рабочий чат', image: 'https://png.klev.club/uploads/posts/2024-04/thumbs/png-klev-club-r31i-p-bukva-f-png-3.png' },
  { id: 2, name: 'Друзья', image: 'https://png.klev.club/uploads/posts/2024-04/thumbs/png-klev-club-r31i-p-bukva-f-png-3.png' },
  { id: 3, name: 'Семья', image: 'https://png.klev.club/uploads/posts/2024-04/thumbs/png-klev-club-r31i-p-bukva-f-png-3.png' },
  { id: 4, name: 'Игровой чат', image: 'https://png.klev.club/uploads/posts/2024-04/thumbs/png-klev-club-r31i-p-bukva-f-png-3.png' }
])

</script>

<template>
    <form>
        <input id="name">
        <UserElement 
          v-for="chat in chats" 
          :key="chat.id"
          :name="chat.name"
          :image="chat.image"
        />
        <button>Создать</button>
    </form>
  </template>