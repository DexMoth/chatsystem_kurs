<script setup>
import { ref, onMounted } from 'vue'
import UserElement from './components/UserElement.vue'
import { API_URL, axiosDB } from '@/js/api'

const chats = ref([])

const fetchChats = async () => {
  try {
    const response = await axiosDB.get(`${API_URL}/user`)
    console.log(response.data)
    chats.value = response.data
  } catch (err) {
    console.error('Ошибка загрузки чатов:', err)
    error.value = 'Не удалось загрузить чаты'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchChats()
})


const submitForm = async () => {
}

</script>

<template>
    <form class="form" @submit.prevent="submitForm">
      <h2 class="mb-3">Окно редактирования чата</h2>
      <div class="mb-3">
        <label class="form-label" for="name">Введите название чата:</label>
        <input class="form-control" id="name">
      </div>
      <label class="form-label" for="name">Выберите участников:</label>
        <div id="listUsers">
          <UserElement 
            v-for="chat in chats" 
            :key="chat.id"
            :id="chat.id"
            :name="chat.name"
            :image="chat.image"
          />
        </div>
        <button type="submit" class="btn btn-secondary">Создать</button>
    </form>
  </template>

<style>
.form {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  /* прокрутка */
  display: flex;
  flex-direction: column;
  height: 90vh;
}

#listUsers {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
}

</style>