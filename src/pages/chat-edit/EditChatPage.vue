<script setup>
import { ref, onMounted } from 'vue'
<<<<<<< HEAD
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
=======
import { useRoute } from 'vue-router'
import UserElement from './components/UserElement.vue'
import { API_URL, axiosDB } from '@/js/api'

const route = useRoute()
const chatId = route.params.id
const chatData = ref({
  name: '',
  members: []
})
const allUsers = ref([])
const currentMembers = ref([]) // Текущие участники чата
const selectedUsers = ref([]) // Временный выбор для новых участников

// Загрузка данных чата и пользователей
const loadData = async () => {
  try {
    // Загрузка данных чата
    if (chatId) {
      const chatResponse = await axiosDB.get(`${API_URL}/chat/${chatId}`)
      chatData.value = chatResponse.data
      currentMembers.value = chatData.value.memberIds || []
    }
    
    // Загрузка всех пользователей
    const usersResponse = await axiosDB.get(`${API_URL}/user`)
    allUsers.value = usersResponse.data
  } catch (err) {
    console.error('Ошибка загрузки данных:', err)
  }
}

// Отправка формы
const submitForm = async () => {
  try {
    const data = {
      name: chatData.value.name,
      memberIds: [...currentMembers.value, ...selectedUsers.value]
    }
    
    if (chatId) {
      await axiosDB.put(`${API_URL}/chat/${chatId}`, data)
    } else {
      await axiosDB.post(`${API_URL}/chat`, data)
    }
    
    window.history.back()
  } catch (error) {
    console.error('Ошибка сохранения чата:', error)
  }
}

// Управление участниками
const toggleMember = (userId) => {
  if (isCurrentMember(userId)) {
    // Удаляем из текущих участников
    currentMembers.value = currentMembers.value.filter(id => id !== userId)
    alert('Вы удалили участника')
  } else {
    // Добавляем во временный выбор
    const index = selectedUsers.value.indexOf(userId)
    if (index === -1) {
      selectedUsers.value.push(userId)
    } else {
      selectedUsers.value.splice(index, 1)
    }
  }
}

// Проверка является ли пользователь текущим участником
const isCurrentMember = (userId) => {
  return currentMembers.value.includes(userId)
}

onMounted(loadData)
</script>

<template>
  <form class="form" @submit.prevent="submitForm">
    <h2 class="mb-3">{{ chatId ? 'Редактирование чата' : 'Создание чата' }}</h2>
    
    <div class="mb-3">
      <label class="form-label" for="name">Название чата:</label>
      <input 
        v-model="chatData.name" 
        class="form-control" 
        id="name"
        required
      >
    </div>
    
    <div class="mb-3">
      <label class="form-label">Участники:</label>
      <div id="listUsers" class="user-list">
        <div 
          v-for="user in allUsers" 
          :key="user.id"
          class="user-item d-flex align-items-center justify-content-between p-2"
          :class="{ 'bg-light': isCurrentMember(user.id) }"
        >
          <div class="d-flex align-items-center">
            <img 
              :src="user.image || '/default-avatar.png'" 
              class="rounded-circle me-3"
              width="40"
              height="40"
            >
            <span>{{ user.name }}</span>
          </div>
          
          <button 
            type="button" 
            class="btn btn-sm"
            :class="isCurrentMember(user.id) ? 'btn-danger' : 'btn-success'"
            @click.stop="toggleMember(user.id)"
          >
            {{ isCurrentMember(user.id) ? 'Удалить' : 'Пригласить' }}
          </button>
        </div>
      </div>
    </div>
    
    <button type="submit" class="btn btn-primary mt-3">
      {{ chatId ? 'Сохранить изменения' : 'Создать чат' }}
    </button>
  </form>
</template>

<style scoped>
>>>>>>> 5351559 (редактирование чата, удаление сообщений и чата)
.form {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
<<<<<<< HEAD
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  /* прокрутка */
=======
>>>>>>> 5351559 (редактирование чата, удаление сообщений и чата)
  display: flex;
  flex-direction: column;
  height: 90vh;
}

<<<<<<< HEAD
#listUsers {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
}

=======
.user-list {
  flex: 1;
  overflow-y: auto;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}
>>>>>>> 5351559 (редактирование чата, удаление сообщений и чата)
</style>