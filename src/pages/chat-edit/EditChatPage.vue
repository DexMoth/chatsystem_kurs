<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import UserElement from './components/UserElement.vue'
import { API_URL, axiosDB } from '@/js/api'

const route = useRoute()
const user = ref(null)
const chatId = route.params.id
const chatData = ref({
  name: '',
  members: []
})
const allUsers = ref([])
const currentMembers = ref([]) // Текущие участники чата
const selectedUsers = ref([]) // Временный выбор для новых участников
const invitedUsers = ref([]) // для приглашенных
const searchQuery = ref('') // Поисковый запрос

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

// Фильтрация пользователей по поисковому запросу
const filteredUsers = computed(() => {
  if (!searchQuery.value) return allUsers.value
  const query = searchQuery.value.toLowerCase()
  return allUsers.value.filter(user => 
    user.name.toLowerCase().includes(query)
  )
})

// Отправка формы
const submitForm = async () => {
  try {
    // загрузка себя
    const me = await axiosDB.get(API_URL + '/user/me')
    user.value = me.data

    const data = {
      name: chatData.value.name,
      memberIds: [...currentMembers.value, user.value.id]
    }

    let response;
    if (chatId) {
      response = await axiosDB.put(`${API_URL}/chat/${chatId}`, data)
    } else {
      response = await axiosDB.post(`${API_URL}/chat`, data)
    }

    console.log("ergere")
    // Отправка писем новым участникам
    await sendInvitationEmails(
      selectedUsers.value, 
      chatData.value.name, 
      response.data.id
    )
    
    window.history.back()
  } catch (error) {
    console.error('Ошибка сохранения чата:', error)
  }
}

// ------------------- работа с участниками
// отправить емейл приглашение
const sendInvitationEmails = async (userIds, chatName, chatId) => {
  try {
    // Получаем email текущего пользователя (кто создает чат)
    const me = await axiosDB.get(API_URL + '/user/me')
    const inviterName = me.data.name
    
    // Собираем emails всех приглашенных пользователей
    const emails = []
    
    // Для каждого пользователя делаем отдельный запрос
    for (const userId of userIds) {
      try {
        const userResponse = await axiosDB.get(`${API_URL}/user/${userId}`)
        if (userResponse.data?.login) {
          emails.push(userResponse.data.login)
        }
      } catch (err) {
        console.error(`Ошибка получения данных пользователя ${userId}:`, err)
      }
    }
    
    // Отправляем один запрос на сервер для рассылки писем
    if (emails.length > 0) {
      await axiosDB.post(`${API_URL}/notification/chat-invite`, {
        chatId,
        chatName,
        recipientEmails: emails,
        inviterName
      })

      alert(`Приглашения отправлены ${emails.length} участникам`)
    } else {
      console.log('Нет email-адресов для отправки приглашений')
    }
    
  } catch (error) {
    console.error('Ошибка отправки уведомлений:', error)
    alert('Не удалось отправить приглашения')
  }
}

// участники чата
const toggleMember = async (userId) => {
  if (isCurrentMember(userId)) {
    // Удаляем из текущих участников
    currentMembers.value = currentMembers.value.filter(id => id !== userId)
    alert('Вы удалили участника')
  } else {
    // Добавляем во временный выбор
    const index = selectedUsers.value.indexOf(userId)

    if (index === -1) {
      selectedUsers.value.push(userId)
      invitedUsers.value.push(userId)
    } else {
      selectedUsers.value.splice(index, 1)
      invitedUsers.value = invitedUsers.value.filter(id => id !== userId)
    }
  }
}

const isInvited = (userId) => {
  return invitedUsers.value.includes(userId)
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
      <input 
        v-model="searchQuery" 
        class="form-control mb-3" 
        id="find"
        placeholder="Поиск по имени..."
      >
      <div id="listUsers" class="user-list">
        <div 
          v-for="user in filteredUsers" 
          :key="user.id"
          class="user-item d-flex align-items-center justify-content-between p-2"
          :class="{ 'bg-light': isCurrentMember(user.id) }"
        >
          <div class="d-flex align-items-center">
            <img 
              :src="user.avatar || '/default-avatar.png'" 
              class="rounded-circle me-3"
              width="40"
              height="40"
            >
            <span>{{ user.name }}</span>
          </div>
          
          <button 
            type="button" 
            class="btn btn-sm"
            :class="{
              'btn-danger': isCurrentMember(user.id),
              'btn-success': !isCurrentMember(user.id) && !isInvited(user.id),
              'btn-secondary': isInvited(user.id)
            }"
            @click.stop="toggleMember(user.id)"
            :disabled="isInvited(user.id)"
          >
            {{
              isCurrentMember(user.id) ? 'Удалить' : 
              isInvited(user.id) ? 'Приглашено' : 'Пригласить'
            }}
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
.form {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 90vh;
}

.user-list {
  flex: 1;
  overflow-y: auto;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}
</style>