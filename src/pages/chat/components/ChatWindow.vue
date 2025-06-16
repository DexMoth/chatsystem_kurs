<script setup>
import { ref, onMounted, watch } from 'vue'
import { API_URL, axiosDB } from '@/js/api'

const props = defineProps({
  chatId: {
    type: [String, Number],
    required: true
  }
})

const messages = ref([])
const user = ref(null)
const newMessage = ref('')
const selectedFile = ref(null)
const fileInput = ref(null)
const userId = ref(null)

// Загрузка данных пользователя и сообщений
const loadData = async () => {
  try {
    // Загружаем текущего пользователя
    const userResponse = await axiosDB.get(API_URL + '/user/me')
    user.value = userResponse.data
    userId.value = user.value.id
    
    // Загружаем сообщения чата
    const messagesResponse = await axiosDB.get(`${API_URL}/message/chat/${props.chatId}`)
    
    messages.value = messagesResponse.data.map(msg => ({
      id: msg.id,
      name: user.value.name.substring(0, user.value.name.indexOf(" ") + 2),
      text: msg.text,
      sender: msg.userId === user.value.id ? 'me' : 'other',
      time: formatTime(msg.createdAt),
      attachments: []
    }))
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  }
}

// Форматирование времени
const formatTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Отправка сообщения
const sendMessage = async () => {
  if (!newMessage.value.trim() && !selectedFile.value) return
  
  try {
    const messageData = {
      chatId: props.chatId,
      userId: userId.value,
      text: newMessage.value.trim(),
      isFavorite: false
    }
    
    const response = await axiosDB.post(`${API_URL}/message`, messageData)
    newMessage.value = ''
    selectedFile.value = null
    fileInput.value.value = ''
    
    // Перезагружаем сообщения после отправки
    loadData()
  } catch (error) {
    console.error('Ошибка отправки сообщения:', error)
  }
}

// Обработка выбора файла
const handleFileSelect = (event) => {
  selectedFile.value = event.target.files[0]
}

// Загружаем данные при монтировании и изменении chatId
onMounted(loadData)
watch(() => props.chatId, loadData)
</script>

<template>
  <div class="chat-window">
    <div class="chat-header">
      <h4>Чат #{{ chatId }}</h4>
    </div>

    <div class="messages-container">
      <div 
        v-for="message in messages" 
        :key="message.id"
        :class="['message', message.sender === 'me' ? 'my-message' : 'other-message']"
      >
        <div>{{ message.name }}</div>
        <div class="message-content">
          <div v-if="message.text">{{ message.text }}</div>
          
          <div v-if="message.attachments.length" class="attachments">
            <div v-for="(file, idx) in message.attachments" :key="idx" class="attachment">
              <a :href="file.url" target="_blank" class="file-link">
                <span>Файл: </span>
                <span class="file-name">{{ file.name }}</span>
              </a>
              <div v-if="file.type.startsWith('image/')" class="image-preview">
                <img :src="file.url" :alt="file.name" class="preview-image">
              </div>
            </div>
          </div>
        </div>
        <div class="message-time">
          {{ message.time }}
        </div>
      </div>
    </div>

    <div class="message-input">
      <div class="container">
        <div class="row align-items-start g-3 mb-3">
          <div class="col">
            <input
              v-model="newMessage"
              @keyup.enter="sendMessage"
              placeholder="Введите сообщение..."
              class="form-control"
            >
          </div>
          <div class="col">
            <button @click="sendMessage" class="btn btn-primary">
              Отправить
            </button>
          </div>
        </div>
        <div class="row align-items-start g-0">
          <div class="input-group">
            <input 
              type="file" 
              ref="fileInput"
              @change="handleFileSelect" 
              class="form-control" 
              id="inputGroupFile"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  height: 90vh;
  border-left: 1px solid #ddd;
  background-color: #f9f9f9;
}

.chat-header {
  padding: 15px;
  border-bottom: 1px solid #eee;
  background-color: white;
  text-align: center;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  background-color: #f5f5f5;
}

.message {
  margin-bottom: 15px;
  max-width: 70%;
}

.message-content {
  padding: 10px 15px;
  border-radius: 18px;
  display: inline-block;
}

.my-message {
  margin-left: auto;
}

.my-message .message-content {
  background-color: #007bff;
  color: white;
  border-bottom-right-radius: 0;
}

.other-message .message-content {
  background-color: white;
  border: 1px solid #ddd;
  border-bottom-left-radius: 0;
}

.message-time {
  font-size: 0.8em;
  color: #777;
  margin-top: 5px;
}

.my-message .message-time {
  text-align: right;
}

.my-message .file-link {
  background: rgba(255, 255, 255, 0.8);
}

.message-input {
  display: flex;
  padding: 15px;
  background-color: white;
  border-top: 1px solid #eee;
}

.message-input input {
  flex: 1;
  margin-right: 10px;
}

.image-preview {
  margin-top: 8px;
}

.preview-image {
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  border: 1px solid #ddd;
}
</style>