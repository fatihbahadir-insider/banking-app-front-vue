import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'
import { useJwt } from '@vueuse/integrations/useJwt'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  function isTokenValid() {
    if (!token.value) return false

    try {
      const { payload } = useJwt(ref(token.value))
      const exp = payload.value?.exp

      if (!exp) return false
      return Date.now() < exp * 1000
    } catch {
      return false
    }
  }

  async function initializeAuth() {
    if (!token.value) return false

    isLoading.value = true
    try {
      if (!isTokenValid()) {
        const refreshed = await refreshAccessToken()
        if (!refreshed) {
          await logout()
          return false
        }
      }

      await fetchUser()
      return true
    } catch (error) {
      console.error('Auth initialization failed:', error)
      await logout()
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function refreshAccessToken() {
    if (!token.value) {
      return false
    }

    try {
      const newToken = await api.refreshAccessToken()
      token.value = newToken
      return true
    } catch (error) {
      console.error('Token refresh failed:', error)
      return false
    }
  }

  async function login(credentials) {
    isLoading.value = true
    try {
      const response = await api.post('/auth/login', credentials)

      token.value = response.data.token
      localStorage.setItem('token', token.value)

      await fetchUser()
      return response
    } catch (error) {
      console.error('Login error: ', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    router.push({ name: 'login' })
  }

  async function fetchUser() {
    if (!token.value) return

    isLoading.value = true
    try {
      const response = await api.get('/users/me', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      user.value = response.data
      return response
    } catch (error) {
      await logout()
      throw error
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    isTokenValid,
    refreshAccessToken,
    initializeAuth,
    login,
    logout,
    fetchUser,
  }
})
