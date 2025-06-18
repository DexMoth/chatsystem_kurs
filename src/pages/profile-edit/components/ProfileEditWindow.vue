<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { API_URL, axiosDB } from '@/js/api'

const router = useRouter()
const user = ref({
  id: '',
  name: '',
  login: '',
  password: '',
  phone: ''
})
const isLoading = ref(false)

// Загружаем данные пользователя
onMounted(async () => {
  try {
    const response = await axiosDB.get(API_URL + '/user/me')
    user.value = {
      id: response.data.id,
      name: response.data.name,
      login: response.data.login,
      password: response.data.password,
      phone: response.data.phone
    }
  } catch (error) {
    alert('Ошибка загрузки данных')
    router.back()
  }
})

// Сохраняем изменения
const saveProfile = async () => {
  try {
    isLoading.value = true
    await axiosDB.put(`${API_URL}/user/${user.value.id}`, {
      name: user.value.name,
      login: user.value.login,
      password: user.value.password,
      phone: user.value.phone
    })
    router.push('/profile')
  } catch (error) {
    alert('Ошибка сохранения')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="edit-profile">
    <h2 class="mb-4">Редактирование профиля</h2>
    
    <div class="mb-3">
      <label class="form-label">Имя:</label>
      <input 
        v-model="user.name" 
        type="text" 
        class="form-control"
        required
      >
    </div>
    
    <div class="mb-4">
      <label class="form-label">Email (логин):</label>
      <input 
        v-model="user.login" 
        type="email" 
        class="form-control"
        required
      >
    </div>
    
    <div class="mb-4">
      <label class="form-label">Пароль:</label>
      <input 
        v-model="user.password" 
        type="password" 
        class="form-control"
        required
      >
    </div>

    <div class="mb-4">
      <label class="form-label">Телефон:</label>
      <input 
        v-model="user.phone" 
        type="text" 
        class="form-control"
        required
      >
    </div>

    <div class="buttons">
      <button 
        @click="saveProfile" 
        class="btn btn-primary"
        :disabled="isLoading"
      >
        <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
        Сохранить
      </button>
      
      <button 
        @click="router.push('/profile')" 
        class="btn btn-outline-secondary"
      >
        Отмена
      </button>
    </div>
  </div>
</template>

<style scoped>
.edit-profile {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.buttons {
  display: flex;
  gap: 10px;
}

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