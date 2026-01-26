import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'
import { useJwt } from '@vueuse/integrations/useJwt'

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

  function initializeAuth() {
    if (token.value && !isTokenValid()) {
      logout()
    }
  }

  async function login(credentials) {
    isLoading.value = true
    try {
      const response = await api.post('/auth/login', credentials)
      const { payload } = useJwt(ref(response.data.token))

      token.value = response.data.token
      user.value = {
        id: payload.value.issuer,
      }

      if (token.value) {
        localStorage.setItem('token', token.value)
      }
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
  }

  async function fetchUser() {
    if (!token.value) return

    isLoading.value = true
    try {
      const response = await api.get('/auth/me')
      user.value = response.user
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
    initializeAuth,
    login,
    logout,
    fetchUser,
  }
})
