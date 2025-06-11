<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { API_URL, axiosDB } from '@/js/api'
import { useAuthStore } from '@/js/api';

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
  return isValid
}

const submitForm = async () => {
  if (!validate()) return

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await axiosDB.post(API_URL + '/auth/login', form.value);
    console.log(response.data);

    try {
      const authCheck = await axiosDB.get(API_URL + '/auth/check');
      console.log(authCheck.data);
      
      if (authCheck.data) {
        successMessage.value = 'Вход выполнен';
        router.push('/chat');
      }
    } catch (err) {
      console.error('Ошибка авторизации:', err);
      errorMessage.value = 'Сессия не создана';
    }
  } catch (err) {
    console.error('Ошибка входа:', err);
    errorMessage.value = err.response?.data?.message || 'Ошибка входа';
  } finally {
    isLoading.value = false;
  }
}

</script>

<template>
  <div class="login-form">
    <h2 class="text-2xl font-bold mb-3">Вход в учетную запись</h2>
    
    <div v-if="successMessage" class="mb-4 p-4 bg-green-100 text-green-700 rounded">
      {{ successMessage }}
    </div>
    
    <div v-if="errorMessage" class="mb-4 p-4 bg-red-100 text-red-700 rounded">
      {{ errorMessage }}
    </div>
    
    <form @submit.prevent="submitForm" class="space-y-4">
      <div class="input-group mb-3">
        <span class="input-group-text">
            <i class="bi bi-person-circle"></i>
        </span>
        <input id="login" type="text" class="form-control" placeholder="Логин" v-model="form.login" required>
      </div>

      <div>
        <div class="input-group mb-3">
          <span class="input-group-text">
            <i class="bi bi-lock-fill"></i>
          </span>
          <input id="password" class="form-control" type="text" placeholder="Пароль" v-model="form.password" aria-label="default input example" required>
        </div>
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
      </div>
      
      <button
        type="submit"
        class="btn btn-secondary"
      >
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