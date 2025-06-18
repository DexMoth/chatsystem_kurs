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
const selectedFiles = ref([])
const fileInput = ref(null)
const MAX_FILES = 10 

//загрузка сообщений
const loadData = async () => {
  try {
    //текущий пользователь
    const me = await axiosDB.get(API_URL + '/user/me')
    user.value = me.data
    
    //сообщения
    const response = await axiosDB.get(`${API_URL}/message/chat/${props.chatId}`)
    
    // Обрабатываем разные форматы ответа
    let messagesData = []
    
    if (response.data === null || response.data === undefined) {
      console.log('Нет сообщений (null/undefined)')
      messages.value = []
      return
    }
    
    if (Array.isArray(response.data)) {
      if (response.data.length === 0) {
        console.log('Получен пустой массив сообщений')
        messages.value = []
      } else if (response.data.length === 1) {
        console.log('Получено 1 сообщение')
        messagesData = response.data
      } else {
        console.log(`Получено ${response.data.length} сообщений`)
        messagesData = response.data
      }
    } else if (typeof response.data === 'object' && response.data.id) { 
      // Если пришло одно сообщение как объект
      console.log('Получено 1 сообщение (в виде объекта)')
      messagesData = [response.data]
    } else {
      console.error('Неизвестный формат сообщений:', response.data)
      messages.value = []
      return
    }
    
    // Обрабатываем сообщения
    messages.value = await Promise.all(
      messagesData.map(async (msg) => {
        try {
          const userResponse = await axiosDB.get(`${API_URL}/user/${msg.userId}`)
          const sender = userResponse.data
          
          return {
            id: msg.id,
            name: sender.name.substring(0, sender.name.indexOf(" ") + 2),
            text: msg.text,
            userId: msg.userId,
            sender: msg.userId === user.value.id ? 'me' : 'other',
            time: formatTime(msg.createdAt),
            isFavorite: msg.favorite,
            attachments: msg.attachments?.map(file => ({
              id: file.id,
              name: file.name,
              type: file.type,
              url: generateFileUrl(file),
              isImage: file.type.startsWith('image/'),
              isAudio: file.type.startsWith('audio/')
            })) || []
          }
        } catch (err) {
          console.error(`Ошибка загрузки данных пользователя ${msg.userId}:`, err)
          return null
        }
      })
    )
    
  } catch (error) {
    console.error('Ошибка загрузки:', error)
    //alert('Не удалось загрузить сообщения')
  }
}

// Генерация URL для файла из base64
const generateFileUrl = (file) => {
  if (file.type.startsWith('image/')) {
    // Если данные уже в формате data:image, возвращаем как есть
    if (file.data.startsWith('data:')) {
      return file.data;
    }
    // Иначе конвертируем base64 в data URL
    return `data:${file.type};base64,${file.data}`;
  }
  return '#'; // Для не-изображений
}

// Форматирование времени
const formatTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Отправка сообщения
const sendMessage = async () => {
  if (!newMessage.value.trim() && selectedFiles.value.length === 0) return
  
  try {
    const messageData = new FormData()
    messageData.append('dto', new Blob([JSON.stringify({
      chatId: props.chatId,
      userId: user.value.id,
      text: newMessage.value.trim(),
      isFavorite: false
    })], { type: 'application/json' }))

    // Добавляем все выбранные файлы
    selectedFiles.value.forEach((file, index) => {
      messageData.append(`files`, file)
      console.log(file)
    })

    await axiosDB.post(`${API_URL}/message`, messageData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    // Сбрасываем форму
    newMessage.value = ''
    selectedFiles.value = []
    fileInput.value.value = ''
    
    // Обновляем список сообщений
    loadData()
  } catch (error) {
    console.error('Ошибка отправки сообщения:', error)
    alert('Не удалось отправить сообщение')
  }
}

// ообработка выбора файлов
const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  
  if (files.length > MAX_FILES) {
    alert(`Максимальное количество файлов: ${MAX_FILES}`)
    event.target.value = ''
    return
  }
  
  selectedFiles.value = files.slice(0, MAX_FILES)
}

// удаление файла из списка
const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
  fileInput.value.value = ''
}

// удаление чата
const deleteChat = async () => {
  if (!confirm('Вы точно хотите удалить этот чат? Это действие нельзя отменить.')) {
    return
  }
  try {
    await axiosDB.delete(`${API_URL}/chat/${props.chatId}`)
    window.location.href = '/chat' 
  } catch (error) {
    console.error('Ошибка удаления чата:', error)
    alert('Не удалось удалить чат')
  }
}

////----------------- работа с сообщениями
const deleteMessage = async (messageId) => {
  if (!confirm('Вы точно хотите удалить сообщение? Это действие нельзя отменить.')) {
    return
  }
  try {
    await axiosDB.delete(`${API_URL}/message/${messageId}`)
    loadData()
  } catch (error) {
    console.error('Ошибка удаления сообщения:', error)
    alert('Не удалось удалить сообщение')
  }
}

// редактирование
const editId = ref(null)
const ediText = ref('')

const startEditing = (message) => {
  editId.value = message.id
  ediText.value = message.text
}

const saveEditedMessage = async () => {
  if (!ediText.value.trim()) return
  
  try {
    await axiosDB.put(`${API_URL}/message/${editId.value}`, {
      text: ediText.value.trim()
    })
    
    editId.value = null
    ediText.value = ''
    loadData()
  } catch (error) {
    console.error('Ошибка редактирования сообщения:', error)
    alert('Не удалось сохранить изменения')
  }
}

const cancelEditing = () => {
  editId.value = null
  ediText.value = ''
}

// Загружаем данные при монтировании и изменении chatId
onMounted(loadData)
watch(() => props.chatId, loadData)
</script>

<template>
  <div class="chat-window">
    <div class="chat-header">
      <div class="container">
        <div class="row">
          <div class="col">
            <h4>Чат #{{ chatId }}</h4>
          </div>
          <div class="col-auto">
            <router-link :key="chatId" :to="`/chat-edit/${chatId}`" class="me-2">
              <button class="btn btn-light">
                <i class="bi bi-pencil-fill"></i>
              </button>
            </router-link>
            <button class="btn btn-light" @click.stop="deleteChat()">
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="messages-container">
      <div 
        v-for="message in messages" 
        :key="message.id"
        :class="['message', message.sender === 'me' ? 'my-message' : 'other-message']"
      >
        <div class="message-header">
          <span class="user-name">{{ message.name }}</span>
          <span v-if="message.isFavorite" class="favorite-badge ms-2">
            <i class="bi bi-star-fill text-warning"></i>
          </span>
        </div>
        
        <div v-if="editId === message.id" class="editing-message">
          <textarea
            v-model="ediText"
            class="form-control mb-2"
            rows="2"
          ></textarea>
          <div class="d-flex gap-2">
            <button @click="saveEditedMessage" class="btn btn-sm btn-success">
              Сохранить
            </button>
            <button @click="cancelEditing" class="btn btn-sm btn-secondary">
              Отмена
            </button>
          </div>
        </div>
        <div v-else class="message-content">
          <div v-if="message.text">{{ message.text }}</div>
          
          <div v-if="message.attachments.length" class="attachments mt-2">
            <div v-for="(file, idx) in message.attachments" :key="file.id" class="attachment mb-2">
              <div class="d-flex align-items-center file-info">
                <i class="bi" 
                  :class="{
                    'bi-file-earmark': !file.isImage && !file.isAudio,
                    'bi-image': file.isImage,
                    'bi-file-music': file.isAudio
                  }">
                </i>
                <a :href="file.url" :download="file.name" class="file-link text-decoration-none ms-2">
                  {{ file.name }}
                </a>
              </div>
              
              <div v-if="file.isImage" class="image-preview mt-2">
                <img 
                  :src="file.url" 
                  :alt="file.name" 
                  class="preview-image img-thumbnail"
                  style="max-width: 400px; max-height: 400px; cursor: pointer"
                >
              </div>
            </div>
          </div>
        </div>
        <div class="message-time">
          {{ message.time }}
          <span v-if="message.sender === 'me'">
            <i class="bi bi-pencil-fill ms-4" @click.stop="startEditing(message)"></i>
            <i class="bi bi-trash-fill ms-2" @click.stop="deleteMessage(message.id)"></i>
          </span>
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
          <div class="col-auto">
            <button @click="sendMessage" class="btn btn-primary">
              Отправить
            </button>
          </div>
        </div>
        <!-- выбор файлов -->
        <div class="row align-items-start g-0 mb-2">
          <div class="input-group">
            <input 
              type="file" 
              ref="fileInput"
              @change="handleFileSelect" 
              class="form-control" 
              multiple
              accept="image/*, audio/*, .pdf, .doc, .docx, .xls, .xlsx"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.selected-files {
  max-height: 300px;
  overflow-y: auto;
}

.file-item {
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
}

.file-info {
  margin-left: 10px;
}

.file-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.file-size {
  color: #6c757d;
}

.chat-window {
  display: flex;
  flex-direction: column;
  height: 90vh;
  width: 90%;
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
  margin-bottom: 5px;
  max-width: 70%;
}
.message-content {
  padding: 10px 15px;
  border-radius: 18px;
  display: inline-block;
}

.my-message {
  margin-left: auto;
  max-width: 80%;
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


.file-link {
  color: #eee;
  text-decoration: underline;
}

.file-link:hover {
  text-decoration: underline;
}

.preview-image {
  max-width: 100%;
  height: auto;
  display: block;
}

.file-info {
  padding: 4px;
}
</style>