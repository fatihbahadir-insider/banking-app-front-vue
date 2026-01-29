<template>
  <div class="bg-white rounded-[16px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
    <div class="mb-5">
      <h3 class="m-0 text-[18px] font-semibold color-[#1a1a2e]">
        Last Transactions
      </h3>
    </div>
    <div class="flex flex-col gap-4">
      <div
        v-for="transaction in transactions"
        :key="transaction.id"
        class="flex items-center gap-3 p-3 bg-[#f8f9fa] rounded-[12px] hover:translate-x-1 hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-transform duration-200"
      >
        <div class="flex-1 flex flex-col gap-0.5">
          <span class="font-semibold color-[#1a1a2e] text-[14px]">
            {{
              transaction.type.slice(0, 1).toUpperCase() +
              transaction.type.slice(1)
            }}
          </span>
          <span class="text-[12px] text-[#6c757d]">
            {{ formatDate(transaction.created_at) }}
          </span>
        </div>
        <div class="flex flex-col items-end gap-1">
          <span
            :class="[
              'font-bold text-[14px]',
              transaction.type === 'deposit'
                ? 'text-[#28a745]'
                : transaction.type === 'withdraw'
                  ? 'text-[#dc3545]'
                  : transaction.type === 'transfer'
                    ? transaction.from_user_id === authStore.user?.id
                      ? 'text-[#dc3545]'
                      : 'text-[#28a745]'
                    : '',
            ]"
          >
            {{ formatAmount(transaction, authStore.user?.id) }}
          </span>
          <span
            :class="[
              'px-2 py-0.5 rounded-[12px] text-[10px] font-[500] capitalize',
              transaction.status === 'completed'
                ? 'bg-[#d4edda] text-[#155724]'
                : transaction.status === 'pending'
                  ? 'bg-[#fff3cd] text-[#856404]'
                  : 'bg-[#f8d7da] text-[#721c24]',
            ]"
          >
            {{ transaction.status }}
          </span>
        </div>
      </div>
      <div
        v-if="transactions.length === 0"
        class="text-center p-6 text-[#6c757d]"
      >
        No transactions found
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/useAuthStore'
import { formatDate, formatAmount } from '@/utils/formatters'

defineProps({
  transactions: {
    type: Array,
    default: () => [],
  },
})

const authStore = useAuthStore()
</script>
