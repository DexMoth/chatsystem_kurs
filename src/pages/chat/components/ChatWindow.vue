<template>
    <div class="chat-window">
    <div class="chat-header">
      <h4>Название чата</h4>
    </div>

    <div class="messages-container">
      <div 
        v-for="message in messages" 
        :key="message.id"
        :class="['message', message.sender === 'me' ? 'my-message' : 'other-message']"
      >
        <div class="message-content">
          {{ message.text }}
        </div>
        <div class="message-time">
          {{ message.time }}
        </div>
      </div>
    </div>

    <!--сообщение-->
    <div class="message-input">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Введите сообщение..."
        class="form-control"
      >
      <button @click="sendMessage" class="btn btn-primary">
        Отправить
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const messages = ref([
  { id: 1, text: 'Привет! Как дела?', sender: 'other', time: '10:30' },
  { id: 2, text: 'Привет! Все отлично, спасибо!', sender: 'me', time: '10:32' },
  { id: 3, text: 'Что нового?', sender: 'other', time: '10:33' }
])

const newMessage = ref('')

const sendMessage = () => {
  if (newMessage.value.trim()) {
    messages.value.push({
      id: Date.now(),
      text: newMessage.value,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
    newMessage.value = ''
    // Здесь можно добавить прокрутку вниз
  }
}
</script>

<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  height: 100vh;
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
</style>