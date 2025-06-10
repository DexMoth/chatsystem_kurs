import axios from 'axios'
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const API_URL = "http://localhost:8087/api"
export const axiosDB = axios.create({
    baseURL: API_URL,
    withCredentials: true, // для куков
    headers: {
        'Content-Type': 'application/json',
    },
})

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const currentUser = ref(null);
  const isAuthenticated = ref(false);
})