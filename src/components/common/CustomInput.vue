<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="inputClasses"
        @input="handleInput"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
      <div
        class="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-200"
        :class="focusRingClasses"
      />
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-500 flex items-center gap-1">
      <span>⚠️</span> {{ error }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  inputId: {
    type: String,
    default: () => `input-${Math.random().toString(36).substr(2, 9)}`,
  },
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'clearError'])

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)

  if (props.error) {
    emit('clearError')
  }
}

const inputClasses = computed(() => {
  const baseClasses =
    'w-full px-4 py-2.5 border-2 rounded-lg transition-all duration-200 focus:outline-none bg-white'

  const stateClasses = props.error
    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
    : 'border-gray-200 focus:border-[#764ba2] focus:ring-2 focus:ring-[#667eea]/20 hover:border-gray-300'

  const disabledClasses = props.disabled
    ? 'bg-gray-100 cursor-not-allowed text-gray-500'
    : ''

  return `${baseClasses} ${stateClasses} ${disabledClasses}`
})

const focusRingClasses = computed(() => {
  return props.error ? '' : ''
})
</script>
