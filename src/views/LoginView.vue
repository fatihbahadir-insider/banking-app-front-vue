<template>
  <AuthLayout title="Login" subtitle="Welcome back! Please enter your details.">
    <form @submit.prevent="handleLogin" class="space-y-6">
      <Input
        v-model="email"
        type="email"
        label="Email"
        placeholder="ex@test.com"
        :error="errors.email"
        @clearError="clearFieldError('email')"
      />

      <Input
        v-model="password"
        type="password"
        label="Password"
        placeholder="********"
        :error="errors.password"
        @clearError="clearFieldError('password')"
      />

      <Button type="submit" variant="primary" size="lg" class="w-full">
        Login
      </Button>

      <div v-if="errors.general" class="text-red-500 text-sm">
        {{ errors.general }}
      </div>
    </form>

    <template #footer>
      <p class="text-center text-sm text-gray-600">
        Don't have an account?
        <RouterLink
          :to="{ name: 'register' }"
          class="text-[#667eea] hover:text-[#5a6fd6]"
        >
          Register
        </RouterLink>
      </p>
    </template>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import Input from '@/components/common/CustomInput.vue'
import Button from '@/components/common/CustomButton.vue'
import { useAuthStore } from '@/stores/useAuthStore'

const router = useRouter()
const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const errors = ref({})

const clearFieldError = (fieldName) => {
  if (errors.value[fieldName]) {
    errors.value[fieldName] = ''
  }

  if (errors.value?.general) {
    errors.value.general = ''
  }
}

const validateForm = () => {
  errors.value = {}

  if (!email.value) {
    errors.value.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    errors.value.email = 'Invalid email address'
  }

  if (!password.value) {
    errors.value.password = 'Password is required'
  } else if (password.value.length < 8) {
    errors.value.password = 'Password must be at least 8 characters long'
  }

  return Object.keys(errors.value).length === 0
}

async function handleLogin() {
  if (!validateForm()) {
    return
  }

  errors.value = {}

  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    })

    router.push({ name: 'home' })
  } catch (error) {
    if (error.data && typeof error.data === 'object') {
      Object.keys(error.data).forEach((field) => {
        errors.value[field] = error.data[field]
      })
    }

    if (Object.keys(errors.value).length === 0) {
      errors.value.general = error.message
        ? error.message
        : 'Oops! Something went wrong. Please try again.'
    }
  }
}
</script>
