export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const isAuthenticated = ref(false)
  
    const login = (userData) => {
      user.value = userData
      isAuthenticated.value = true
      localStorage.setItem('auth', JSON.stringify(userData))
    }
  
    const logout = () => {
      user.value = null
      isAuthenticated.value = false
      localStorage.removeItem('auth')
    }
  
    const checkAuth = () => {
      const authData = localStorage.getItem('auth')
      if (authData) {
        user.value = JSON.parse(authData)
        isAuthenticated.value = true
      }
      return isAuthenticated.value
    }
  
    return { user, isAuthenticated, login, logout, checkAuth }
  })