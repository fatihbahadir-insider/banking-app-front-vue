<template>
  <div
    class="rounded-[16px] bg-gradient-to-tr from-[#667eea] to-[#764ba2] p-6 text-white shadow-[0_10px_40px_rgba(102,126,234,0.3)]"
  >
    <div class="flex items-center mb-4 gap-3">
      <h3 class="margin-0 text-lg font-semibold opacity-80">Current Balance</h3>
    </div>
    <div class="text-4xl font-bold mb-4">
      {{ formatCurrency(balance?.amount) }}
    </div>
    <div class="border-t border-t-[rgba(255,255,255,0.2)] pt-4">
      <span class="opacity-60 text-sm">
        Last updated: {{ formatDate(balance?.last_updated_at) }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { formatCurrency, formatDate } from '@/utils/formatters'
defineProps({
  balance: {
    type: {
      amount: Number,
      last_updated_at: String,
    },
    default: null,
  },
})
</script>
