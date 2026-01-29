<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) =>
      ['primary', 'secondary', 'danger', 'outline', 'ghost'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const buttonClasses = computed(() => {
  const baseClasses =
    'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:-translate-y-0.5 active:translate-y-0'

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white hover:from-[#5a6fd6] hover:to-[#6a4190] hover:shadow-lg hover:shadow-purple-500/30 focus:ring-purple-500 disabled:from-gray-400 disabled:to-gray-500 disabled:hover:translate-y-0 disabled:hover:shadow-none',
    secondary:
      'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 hover:shadow-lg hover:shadow-gray-500/30 focus:ring-gray-500 disabled:from-gray-400 disabled:to-gray-500 disabled:hover:translate-y-0',
    danger:
      'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 hover:shadow-lg hover:shadow-red-500/30 focus:ring-red-500 disabled:from-gray-400 disabled:to-gray-500 disabled:hover:translate-y-0',
    outline:
      'border-2 border-[#667eea] text-[#667eea] hover:bg-gradient-to-r hover:from-[#667eea] hover:to-[#764ba2] hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-purple-500/30 focus:ring-purple-500 disabled:border-gray-400 disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:translate-y-0',
    ghost:
      'text-[#667eea] hover:bg-purple-50 focus:ring-purple-500 disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:translate-y-0',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return `${baseClasses} ${variantClasses[props.variant]} ${sizeClasses[props.size]}`
})
</script>
