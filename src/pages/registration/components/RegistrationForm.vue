<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { API_URL, axiosDB, useAuthStore } from '@/js/api'

const router = useRouter()
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const form = ref({
  login: '',
  lastName: '',
  name: '',
  patronymic: '',
  phone: '',
  reportCard: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

const errors = ref({
  login: '',
  lastName: '',
  name: '',
  patronymic: '',
  phone: '',
  reportCard: '',
  password: '',
  confirmPassword: '',
  agreeTerms: ''
})

const validate = () => {
  let isValid = true
  errors.value = {
    login: '',
    lastName: '',
    name: '',
    patronymic: '',
    phone: '',
    reportCard: '',
    password: '',
    confirmPassword: '',
    agreeTerms: ''
  }

  console.log('старт')
  if (!form.value.login) {
    errors.value.login = 'Логин обязателен'
    isValid = false
  } else if (form.value.login.length < 4) {
    errors.value.login = 'Минимум 4 символа'
    isValid = false
  }

  if (!form.value.name) {
    errors.value.name = 'Имя обязателен'
    isValid = false
  }

  if (!form.value.lastName) {
    errors.value.lastName = 'Фамилия обязателен'
    isValid = false
  }

  if (!form.value.patronymic) {
    errors.value.patronymic = 'Отчество обязателен'
    isValid = false
  }

  if (!form.value.phone && !form.value.reportCard) {
    errors.value.reportCard = 'Заполните телефон или номер студенческого билета'
    isValid = false
  } else if (form.value.reportCard.length > 8) {
    errors.value.login = 'Максимум 8 символов'
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
    console.log('Заполнение полей')
    const userData = {
      login: form.value.login,
      name: form.value.lastName + ' ' + form.value.name + ' ' + form.value.patronymic,
      password: form.value.password,
      phone: form.value.phone,
      reportCardNumber: form.value.reportCard,
    }
    console.log(userData)

    console.log('отправка на сервер')
    const response = await axiosDB.post(API_URL + '/user', userData)
    useAuthStore.currentUser.value = response.data.user;
    useAuthStore.isAuthenticated.value = true;

    successMessage.value = 'Регистрация успешна! Перенаправляем...'
    setTimeout(() => router.push('/chat'), 200)
  } catch (error) {
    // Обработка ошибок
    if (error.response) {
      // Ошибки от сервера
      if (error.response.data.errors) {
        // Валидационные ошибки
        for (const [field, message] of Object.entries(error.response.data.errors)) {
          if (errors.value.hasOwnProperty(field)) {
            errors.value[field] = message[0]
          }
        }
      } else {
        errorMessage.value = error.response.data.message || 'Ошибка регистрации'
      }
    } else {
      console.error('Full error:', error); // <-- добавьте это
      console.log('Response data:', error.response.data);
      console.log('Response status:', error.response.status);
      errorMessage.value = 'Ошибка сети или сервера'
    }
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
    
    <form id="registration" @submit.prevent="submitForm" class="space-y-4">
      <div>
        <div class="input-group">
          <span class="input-group-text">
              <i class="bi bi-person-circle"></i>
            </span>
            <input id="login" v-model="form.login" type="text" class="form-control" placeholder="Логин" required>
        </div>
        <p v-if="errors.login" class="text-red-500 text-sm mt-1">{{ errors.login }}</p>
      </div>
      
      <div class="input-group">
        <input id="lastName" v-model="form.lastName" type="text" placeholder="Фамилия" class="form-control" required>
        <input id="name" v-model="form.name" type="text" placeholder="Имя" class="form-control" required>
        <input id="patronymic" v-model="form.patronymic" type="text" placeholder="Отчество" class="form-control">
      </div>
     
      <div>
        <label for="phone" class="block mb-1">Для преподавателя:</label>
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-telephone-fill"></i>
          </span>
          <input id="phone" v-model="form.phone" class="form-control" type="text" placeholder="Номер телефона" aria-label="default input example">
        </div>
        <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
      </div>
      
      <div>
        <label for="reportCard" class="block mb-1">Для студента:</label>
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-card-text"></i>
          </span>
          <input id="reportCard" v-model="form.reportCard" class="form-control" type="text" placeholder="Номер студенческого билета" aria-label="default input example">
        </div>
        <p v-if="errors.reportCard" class="text-red-500 text-sm mt-1">{{ errors.reportCard }}</p>
      </div>

      <div>
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-lock-fill"></i>
          </span>
          <input id="password" v-model="form.password" class="form-control" type="password" placeholder="Пароль" aria-label="default input example" required>
        </div>
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
      </div>
      
      <div>
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-lock"></i>
          </span>
          <input id="confirmPassword" v-model="form.confirmPassword" class="form-control" type="password">
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
        class="btn btn-secondary"
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
  color: #ef4444;
}
</style>