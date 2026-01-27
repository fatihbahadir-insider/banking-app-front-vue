import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/css/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

import { useAuthStore } from './stores/useAuthStore'

const authStore = useAuthStore()
authStore.initializeAuth().finally(() => {
  app.mount('#app')
})
