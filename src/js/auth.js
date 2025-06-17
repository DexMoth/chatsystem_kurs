import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const currentUser = ref(null)
    const isAuthenticated = ref(false)
  
    const checkAuth = async () => {
      try {
        const response = await axiosDB.get(API_URL + '/user/me')
        currentUser.value = response.data
        return true
      } catch {
        currentUser.value = null
        return false
      }
    }

    const setUser = (userData) => {
      currentUser.value = userData
      isAuthenticated.value = true
    }
  
    const logout = () => {
      currentUser.value = null
      isAuthenticated.value = false
    }
  
    return { 
      currentUser, 
      isAuthenticated,
      checkAuth,
      setUser,
      logout
    }
})