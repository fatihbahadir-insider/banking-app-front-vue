<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">{{ title }}</h2>
        <p class="mt-2 text-sm text-gray-600">{{ subtitle }}</p>
      </div>
      <div class="mt-8">
        <Card shadow="lg">
          <slot />

          <template #footer>
            <slot name="footer" />
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import Card from '../components/common/CustomCard.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
})
</script>
