const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

class ApiService {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL
    this.isRefreshing = false
    this.failedQueue = []
  }

  getToken() {
    return localStorage.getItem('token')
  }

  setToken(token) {
    localStorage.setItem('token', token)
  }

  clearToken() {
    localStorage.removeItem('token')
  }

  processQueue(error, token = null) {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error)
      } else {
        prom.resolve(token)
      }
    })

    this.failedQueue = []
  }

  async refreshAccessToken() {
    const token = this.getToken()

    if (!token) {
      throw new Error('No token available')
    }

    const response = await fetch(`${this.baseURL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to refresh token')
    }

    const data = await response.json()
    const newToken = data.data.token
    this.setToken(newToken)
    return newToken
  }

  async request(endpoint, options = {}, isRetry = false) {
    const url = `${this.baseURL}${endpoint}`
    const token = this.getToken()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (response.status === 401 && !isRetry) {
        return this.handleUnauthorized(endpoint, options)
      }

      const data = await response.json()

      if (!response.ok) {
        const error = new Error()
        error.data = data.data ?? {}
        error.status = data.status ?? response.status
        error.code = data.code
        error.message = data.message ?? 'An error occurred'
        throw error
      }

      return data
    } catch (error) {
      if (error.data) {
        throw error
      }
      console.error('API Error:', error)
      throw error
    }
  }

  async handleUnauthorized(endpoint, options) {
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject })
      }).then(() => {
        return this.request(endpoint, options, true)
      })
    }

    this.isRefreshing = true

    try {
      await this.refreshAccessToken()
      this.processQueue(null)
    } catch (error) {
      this.processQueue(error)
      this.clearToken()
      window.location.href = '/login'
    } finally {
      this.isRefreshing = false
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' })
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' })
  }
}

export default new ApiService()
