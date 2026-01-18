<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="px-6 py-4 border-b border-gray-200">
      <slot name="header" />
    </div>
    <div class="px-6 py-4">
      <slot />
    </div>
    <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-200 bg-gray-50">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  shadow: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'none'].includes(value),
  },
})

const cardClasses = computed(() => {
  const baseClasses = 'bg-white rounded-lg border border-gray-200'
  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    none: '',
  }
  return `${baseClasses} ${shadowClasses[props.shadow]}`
})
</script>

