<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="selectId"
      class="block text-sm font-semibold text-gray-700 mb-2"
    >
      {{ label }}
    </label>
    <select
      :id="selectId"
      :value="modelValue"
      :disabled="disabled"
      :class="selectClasses"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <slot />
    </select>
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
  selectId: {
    type: String,
    default: () => `select-${Math.random().toString(36).substr(2, 9)}`,
  },
})

defineEmits(['update:modelValue'])

const selectClasses = computed(() => {
  const base =
    'w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none bg-white appearance-none cursor-pointer'

  const state = props.error
    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
    : 'border-gray-200 focus:border-[#667eea] focus:ring-2 focus:ring-[#667eea]/20 hover:border-gray-300'

  const disabled = props.disabled
    ? 'bg-gray-100 cursor-not-allowed text-gray-500'
    : ''

  return `${base} ${state} ${disabled}`
})
</script>
