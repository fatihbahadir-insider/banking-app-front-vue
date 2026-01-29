<template>
  <AuthLayout title="Register" subtitle="Welcome! Create a new account.">
    <form @submit.prevent="handleRegister" class="space-y-6">
      <Input
        v-model="user.username"
        type="text"
        label="Username"
        placeholder="username"
        :error="errors.username"
        @clearError="clearFieldError('username')"
      />
      <Input
        v-model="user.email"
        type="email"
        label="Email"
        placeholder="ex@test.com"
        :error="errors.email"
        @clearError="clearFieldError('email')"
      />
      <Input
        v-model="user.password"
        type="password"
        label="Password"
        placeholder="••••••••"
        :error="errors.password"
        @clearError="clearFieldError('password')"
      />

      <Button type="submit" variant="primary" size="lg" class="w-full">
        Register
      </Button>

      <div v-if="errors.general" class="text-red-500 text-sm">
        {{ errors.general }}
      </div>
    </form>

    <template #footer>
      <p class="text-sm text-center text-gray-600">
        Already have an account?
        <RouterLink
          :to="{ name: 'login' }"
          class="text-[#667eea] hover:text-[#5a6fd6]"
        >
          Login
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
import api from '@/services/api'

const router = useRouter()
const user = ref({
  username: '',
  email: '',
  password: '',
})
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

  if (!user.value.username) {
    errors.value.username = 'Username is required'
  }

  if (!user.value.email) {
    errors.value.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(user.value.email)) {
    errors.value.email = 'Invalid email address'
  }

  if (!user.value.password) {
    errors.value.password = 'Password is required'
  } else if (user.value.password.length < 8) {
    errors.value.password = 'Password must be at least 8 characters long'
  }

  return Object.keys(errors.value).length === 0
}

async function handleRegister() {
  if (!validateForm()) {
    return
  }

  errors.value = {}

  try {
    await api.post('/auth/register', user.value)
    router.push({ name: 'login' })
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
