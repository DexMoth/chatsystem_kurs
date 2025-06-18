<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { API_URL, axiosDB } from '@/js/api'

const route = useRoute()
const router = useRouter()
const user = ref(null)

onMounted(async () => {
  try {
    const me = await axiosDB.get(API_URL + '/user/me')
    user.value = me.data

    const chatId = route.params.chatId;
    const userId = user.value.id;
    
    if (!userId) {
      throw new Error('Требуется авторизация');
    }

    await axiosDB.post(`${API_URL}/chat/${chatId}/join?userId=${userId}`);
    router.push(`/chat/${chatId}`);
  } catch (error) {
    alert('Ошибка: ' + (error.response?.data?.message || error.message));
    router.push('/login'); // Перенаправляем на страницу входа
  }
})
</script>

<template>
  <div class="loading-message">
    Пожалуйста, подождите, происходит присоединение к чату...
  </div>
</template>

<style scoped>
.loading-message {
  text-align: center;
  margin-top: 2rem;
  font-size: 1.2rem;
}
</style>