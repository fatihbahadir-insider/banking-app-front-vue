<template>
  <CustomCard variant="gradient" shadow="lg">
    <template #header>
      <div class="flex items-center gap-3">
        <h3 class="text-lg font-medium opacity-90">Current Balance</h3>
      </div>
    </template>

    <div class="py-4">
      <div class="text-4xl font-bold mb-2">
        {{ formatCurrency(balance?.amount || 0) }}
      </div>
    </div>

    <template #footer>
      <span class="text-sm opacity-80">
        Last updated: {{ formatDate(balance?.last_updated_at) }}
      </span>
    </template>
  </CustomCard>
</template>

<script setup>
import { formatCurrency, formatDate } from '@/utils/formatters'
import CustomCard from '../common/CustomCard.vue'

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
