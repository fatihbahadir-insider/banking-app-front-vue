<template>
  <div v-if="totalPages > 1" class="flex flex-col items-center gap-3">
    <div class="flex items-center gap-2">
      <CustomButton
        variant="outline"
        size="sm"
        :disabled="!hasPrev"
        @click="$emit('change', currentPage - 1)"
      >
        Previous
      </CustomButton>

      <div class="flex items-center gap-1">
        <button
          v-if="visiblePages[0] > 1"
          class="w-8 h-8 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all"
          @click="$emit('change', 1)"
        >
          1
        </button>
        <span v-if="visiblePages[0] > 2" class="px-1 text-gray-400">...</span>

        <button
          v-for="page in visiblePages"
          :key="page"
          :class="[
            'w-8 h-8 rounded-lg text-sm font-medium transition-all',
            page === currentPage
              ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white'
              : 'text-gray-600 hover:bg-gray-100',
          ]"
          @click="$emit('change', page)"
        >
          {{ page }}
        </button>

        <span
          v-if="visiblePages[visiblePages.length - 1] < totalPages - 1"
          class="px-1 text-gray-400"
        >
          ...
        </span>
        <button
          v-if="visiblePages[visiblePages.length - 1] < totalPages"
          class="w-8 h-8 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all"
          @click="$emit('change', totalPages)"
        >
          {{ totalPages }}
        </button>
      </div>

      <CustomButton
        variant="outline"
        size="sm"
        :disabled="!hasNext"
        @click="$emit('change', currentPage + 1)"
      >
        Next
      </CustomButton>
    </div>

    <div v-if="showInfo" class="text-xs text-gray-500">
      Showing {{ startItem }} - {{ endItem }} of {{ total }} items
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import CustomButton from './CustomButton.vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    default: 0,
  },
  limit: {
    type: Number,
    default: 10,
  },
  hasNext: {
    type: Boolean,
    default: false,
  },
  hasPrev: {
    type: Boolean,
    default: false,
  },
  maxVisible: {
    type: Number,
    default: 5,
  },
  showInfo: {
    type: Boolean,
    default: true,
  },
})

defineEmits(['change'])

const visiblePages = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  const max = props.maxVisible
  const pages = []

  let start = Math.max(1, current - Math.floor(max / 2))
  let end = Math.min(total, start + max - 1)

  if (end - start + 1 < max) {
    start = Math.max(1, end - max + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const startItem = computed(() => {
  return (props.currentPage - 1) * props.limit + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.limit, props.total)
})
</script>
