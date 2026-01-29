<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" :class="headerClasses">
      <slot name="header" />
    </div>
    <div class="px-6 py-4">
      <slot />
    </div>
    <div v-if="$slots.footer" :class="footerClasses">
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
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'gradient', 'bordered'].includes(value),
  },
  hover: {
    type: Boolean,
    default: false,
  },
})

const cardClasses = computed(() => {
  const baseClasses = 'rounded-xl transition-all duration-300'

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg shadow-purple-500/10',
    none: '',
  }

  const variantClasses = {
    default: 'bg-white border border-gray-100',
    gradient: 'bg-gradient-to-tr from-[#667eea] to-[#764ba2] text-white',
    bordered: 'bg-white border-2 border-[#667eea]/20',
  }

  const hoverClasses = props.hover
    ? 'hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20 cursor-pointer'
    : ''

  return `${baseClasses} ${shadowClasses[props.shadow]} ${variantClasses[props.variant]} ${hoverClasses}`
})

const headerClasses = computed(() => {
  const baseClasses = 'px-6 py-4 border-b'
  return props.variant === 'gradient'
    ? `${baseClasses} border-white/20`
    : `${baseClasses} border-gray-100`
})

const footerClasses = computed(() => {
  const baseClasses = 'px-6 py-4 border-t'
  return props.variant === 'gradient'
    ? `${baseClasses} border-white/20 bg-white/10`
    : `${baseClasses} border-gray-100 bg-gray-50/50`
})
</script>
