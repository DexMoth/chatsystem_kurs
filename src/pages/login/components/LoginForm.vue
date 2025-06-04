<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const form = ref({
  login: '',
  password: '',
})

const errors = ref({
  login: '',
  password: '',
})

const validate = () => {
  let isValid = true
  errors.value = {
    login: '',
    password: '',
  }

  if (!form.value.login.trim()) {
    errors.value.login = 'Логин незаполнен'
    isValid = false
  }
  
  if (!form.value.password) {
    errors.value.password = 'Пароль незаполнен'
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
    
    successMessage.value = 'Вход успешен! Перенаправляем...'
    setTimeout(() => router.push('/'), 2000)
  } catch (error) {
    errorMessage.value = 'Ошибка входа: ' + error.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-form">
    <h2 class="text-2xl font-bold mb-6">Вход в учетную запись</h2>
    
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

      <div>
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-lock-fill"></i>
          </span>
          <input id="password" class="form-control" type="text" placeholder="Пароль" aria-label="default input example">
        </div>
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
      </div>
      
      <button
        type="submit"
        class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        :disabled="isLoading"
      >
        <span v-if="isLoading" class="inline-block animate-spin mr-2">↻</span>
        Войти
      </button>
    </form>
  </div>
</template>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.border-red-500 {
  border-color: #ef4444;
}
</style>