<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const form = ref({
  login: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

const errors = ref({
  login: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeTerms: ''
})

const validate = () => {
  let isValid = true
  errors.value = {
    login: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: ''
  }

  if (!form.value.login.trim()) {
    errors.value.login = 'Логин обязателен'
    isValid = false
  }

  if (!form.value.name.trim()) {
    errors.value.name = 'Имя обязателен'
    isValid = false
  }

  if (!form.value.lastname.trim()) {
    errors.value.lastname = 'Фамилия обязателен'
    isValid = false
  }

  if (!form.value.patronymic.trim()) {
    errors.value.patronymic = 'Отчество обязателен'
    isValid = false
  }

  if (!form.value.phone.trim() || !form.value.reportCard.trim()) {
    errors.value.reportCard = 'Заполните телефон или номер студенческого билета'
    isValid = false
  }

  if (!form.value.password) {
    errors.value.password = 'Пароль обязателен'
    isValid = false
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Минимум 6 символов'
    isValid = false
  }

  if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Пароли не совпадают'
    isValid = false
  }

  if (!form.value.agreeTerms) {
    errors.value.agreeTerms = 'Необходимо согласие'
    isValid = false
  }

  return isValid
}

const submitForm = async () => {
  if (!validate()) return

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    // Здесь будет реальный API-запрос
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    successMessage.value = 'Регистрация успешна! Перенаправляем...'
    setTimeout(() => router.push('/'), 2000)
  } catch (error) {
    errorMessage.value = 'Ошибка регистрации: ' + error.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="registration-form">
    <h2 class="text-2xl font-bold mb-6">Регистрация</h2>
    
    <div v-if="successMessage" class="mb-4 p-4 bg-green-100 text-green-700 rounded">
      {{ successMessage }}
    </div>
    
    <div v-if="errorMessage" class="mb-4 p-4 bg-red-100 text-red-700 rounded">
      {{ errorMessage }}
    </div>
    
    <form @submit.prevent="submitForm" class="space-y-4">
      <div class="input-group">
        <span class="input-group-text">
            <i class="bi bi-person-circle"></i>
          </span>
          <input type="text" class="form-control" placeholder="Логин" v-model="form.login" required>
      </div>

      <div class="input-group">
        <input id="lastname" type="text" placeholder="Фамилия" class="form-control" required>
        <input id="name" type="text" placeholder="Имя" class="form-control" required>
        <input id="patronymic" type="text" placeholder="Отчество" class="form-control">
      </div>
     
      <div>
        <label for="phone" class="block mb-1">Для преподавателя:</label>
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-telephone-fill"></i>
          </span>
          <input id="phone" class="form-control" type="text" placeholder="Номер телефона" aria-label="default input example">
        </div>
        <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
      </div>
      
      <div>
        <label for="reportCard" class="block mb-1">Для студента:</label>
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-card-text"></i>
          </span>
          <input id="reportCard" class="form-control" type="text" placeholder="Номер студенческого билета" aria-label="default input example">
        </div>
        <p v-if="errors.reportCard" class="text-red-500 text-sm mt-1">{{ errors.reportCard }}</p>
      </div>

      <div>
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-lock-fill"></i>
          </span>
          <input id="password" class="form-control" type="text" placeholder="Пароль" aria-label="default input example">
        </div>
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
      </div>
      
      <div>
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-lock"></i>
          </span>
          <input id="confirmPassword" class="form-control" type="password">
        </div>
        <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
      </div>
      
      <div class="form-check flex items-center">
        <input
          id="agreeTerms"
          class="form-check-input mr-2"
          v-model="form.agreeTerms"
          type="checkbox"
          :class="{ 'border-red-500': errors.agreeTerms }"
        >
        <label class="form-check-label" for="agreeTerms">Я согласен с условиями использования</label>
        <p v-if="errors.agreeTerms" class="text-red-500 text-sm ml-2">{{ errors.agreeTerms }}</p>
      </div>
      
      <button
        type="submit"
        class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        :disabled="isLoading"
      >
        <span v-if="isLoading" class="inline-block animate-spin mr-2">↻</span>
        Зарегистрироваться
      </button>
    </form>
    
    <div class="mt-4 text-center">
      Уже есть аккаунт? 
      <router-link to="/login" class="text-blue-600 hover:underline">Войти</router-link>
    </div>
  </div>
</template>

<style scoped>
.registration-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

input[type="text"],
input[type="email"],
input[type="password"] {
  border: 1px solid #ddd;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.border-red-500 {
  border-color: #ef4444;
}
</style>