<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
    </label>
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
    <p v-if="error" class="mt-1 text-sm text-red-600">
      {{ error }}
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
    'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200'

  const errorClasses = props.error
    ? 'border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'

  const disabledClasses = props.disabled
    ? 'bg-gray-100 cursor-not-allowed'
    : 'bg-white'
  return `${baseClasses} ${errorClasses} ${disabledClasses}`
})
</script>
