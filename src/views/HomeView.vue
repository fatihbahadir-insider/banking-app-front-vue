<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Banking App</h1>

    <div v-if="authStore.user" class="mt-8">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">User Information</h2>
      <pre class="bg-gray-100 p-4 rounded-lg overflow-auto">{{ JSON.stringify(authStore.user, null, 2) }}</pre>
    </div>

    <div v-else class="mt-8 text-gray-500">
      No user logged in
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore'

const authStore = useAuthStore()
console.log(authStore.user);
</script>