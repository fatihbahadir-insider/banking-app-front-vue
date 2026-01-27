import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'

export const useDashboardStore = defineStore('dashboard', () => {
  const balance = ref(null)
  const users = ref([])
  const transactions = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchBalance() {
    try {
      const response = await api.get('/balances/current')
      balance.value = response.data
    } catch (err) {
      console.error('Failed to fetch balance:', err)
      error.value = err.message
    }
  }

  async function fetchUsers() {
    try {
      const response = await api.get(`/users?page=1&limit=5`)
      users.value = response.data.data
    } catch (err) {
      console.error('Error fetching users:', error)
      error.value = err.message
    }
  }

  async function fetchTransactions() {
    try {
      const response = await api.get('/transactions/history?page=1&limit=5')
      transactions.value = response.data.data
    } catch (err) {
      console.error('Error fetching transactions:', err)
      error.value = err.message
    }
  }

  async function fetchAll() {
    isLoading.value = true
    error.value = null

    await Promise.all([fetchBalance(), fetchUsers(), fetchTransactions()])

    isLoading.value = false
  }

  return {
    balance,
    users,
    transactions,
    isLoading,
    error,
    fetchBalance,
    fetchUsers,
    fetchTransactions,
    fetchAll,
  }
})
