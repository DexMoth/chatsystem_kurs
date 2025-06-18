<script setup>
import { ref, onMounted } from 'vue'
import { API_URL, axiosDB } from '@/js/api'

const user = ref({
  name: '',
  login: '',
  phone: '',
  reportCardNumber: '',
  avatar: 'https://i.pinimg.com/736x/a9/57/98/a957983394246f57439920cb836e2d45.jpg',
})

const isLoading = ref(true)
const error = ref(null)

const fetchUserData = async () => {
  try {
    const response = await axiosDB.get(API_URL + '/user/me')
    user.value = response.data

    // Если аватар не установлен, генерируем и сохраняем его
    if (!user.value.avatar) {
      await generateAndSaveAvatar()
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Ошибка загрузки данных'
    console.error('Ошибка:', err)
  } finally {
    isLoading.value = false
  }
}

// Функция генерации и сохранения аватара
const generateAndSaveAvatar = async () => {
  try {
    // Генерируем SVG аватар
    const initials = user.value.name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
    
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3']
    const hash = user.value.name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0)
    const color = colors[hash % colors.length]
    
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
      <rect width="120" height="120" fill="${color}" rx="60"/>
      <text x="50%" y="50%" font-size="48" fill="white" font-family="Arial" text-anchor="middle" dy=".4em">${initials}</text>
    </svg>`

    const encodedSvg = encodeURIComponent(svgContent)
    const svgAvatar = `data:image/svg+xml;utf8,${encodedSvg}`
    
    // Сохраняем аватар в БД
    await axiosDB.put(`${API_URL}/user/${user.value.id}`, {
      id: user.value.id,
      name: user.value.name,
      login: user.value.login,
      password: user.value.password,
      avatar: svgAvatar
    })
    
    // Обновляем локальные данные
    user.value.avatar = svgAvatar
  } catch (err) {
    console.error('Ошибка генерации аватара:', err)
  }
}

onMounted(() => {
  fetchUserData()
})
</script>

<template>
  <div class="profile-card">
    <div class="profile-header">
      <img :src="user.avatar" alt="Аватар" class="profile-avatar">
      <h2 class="profile-name">{{ user.name }}</h2>
      <p class="profile-login">{{ user.login }}</p>
    </div>
    <div class="profile-details">
      <div class="detail-item">
        <i class="bi bi-telephone"></i>
        <span>Телефон: {{ user.phone }}</span>
      </div>
      <div class="detail-item">
        <i class="bi bi-person-badge"></i>
        <span>Студенческий билет: {{ user.reportCardNumber }}</span>
      </div>
    </div>
    <router-link to="/profile-edit">
      <button class="btn btn-edit">
        <i class="bi bi-pencil"></i>Редактировать профиль
      </button>
    </router-link>
</div>
</template>

<style scoped>
.profile-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
}

.profile-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f0f2f5;
  margin-bottom: 1rem;
}

.profile-name {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.profile-email {
  color: #666;
  margin-bottom: 0;
}

.profile-details {
  margin: 1.5rem 0;
}

.detail-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
}

.detail-item i {
  margin-right: 10px;
  color: #6c757d;
  width: 24px;
  text-align: center;
}

.btn-edit {
  width: 100%;
  background-color: #4e73df;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.btn-edit:hover {
  background-color: #3a5bc7;
}
</style>