import axios from 'axios'
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const API_URL = "http://localhost:8087/api"
export const axiosDB = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const currentUser = ref(null);
  const token = ref(null);
  const isAuthenticated = ref(false);

  const login = (authData) => {
    currentUser.value = authData.user;
    token.value = authData.token;
    isAuthenticated.value = true;
    
    localStorage.setItem('authToken', authData.token);
    localStorage.setItem('currentUser', JSON.stringify(authData.user));
  };

  const logout = () => {
    currentUser.value = null;
    token.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    router.push('/login');
  };
})