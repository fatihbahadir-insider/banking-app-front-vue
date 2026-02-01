<template>
  <BaseModal
    :is-open="isOpen"
    title="Transaction History"
    @close="$emit('close')"
  >
    <div class="space-y-4">
      <div v-if="isLoading" class="flex justify-center py-8">
        <div
          class="w-8 h-8 border-4 border-gray-200 border-t-[#667eea] rounded-full animate-spin"
        />
      </div>

      <div
        v-else-if="transactions.length > 0"
        class="space-y-3 max-h-[350px] overflow-y-auto"
      >
        <div
          v-for="transaction in transactions"
          :key="transaction.id"
          class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
        >
          <div class="flex-1 flex flex-col gap-0.5 min-w-0">
            <span class="font-semibold text-[#1a1a2e] text-sm">
              {{
                transaction.type[0]?.toUpperCase() + transaction.type.slice(1)
              }}
            </span>
            <span class="text-xs text-gray-500 truncate">
              {{ formatDate(transaction.created_at) }}
            </span>
          </div>
          <div class="flex flex-col items-end gap-1 shrink-0">
            <span
              :class="[
                'font-bold text-sm',
                getAmountClass(transaction) === 'positive'
                  ? 'text-green-600'
                  : 'text-red-600',
              ]"
            >
              {{ formatAmount(transaction) }}
            </span>
            <span
              :class="[
                'px-2 py-0.5 rounded-full text-[10px] font-medium capitalize',
                transaction.status === 'completed'
                  ? 'bg-green-100 text-green-700'
                  : transaction.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700',
              ]"
            >
              {{ transaction.status }}
            </span>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-8 text-gray-500">
        No transactions found
      </div>

      <BasePagination
        v-if="pagination"
        :current-page="currentPage"
        :total-pages="pagination.total_pages"
        :total="pagination.total"
        :limit="pagination.limit"
        :has-next="pagination.has_next"
        :has-prev="pagination.has_prev"
        :max-visible="3"
        @change="changePage"
      />
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue'
import api from '../../services/api'
import { useAuthStore } from '../../stores/useAuthStore'
import BaseModal from '../common/BaseModal.vue'
import BasePagination from '../common/BasePagination.vue'
import { formatDate, formatAmount } from '@/utils/formatters'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['close'])

const authStore = useAuthStore()
const transactions = ref([])
const pagination = ref(null)
const currentPage = ref(1)
const isLoading = ref(false)

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      currentPage.value = 1
      fetchTransactions()
    }
  }
)

async function fetchTransactions() {
  isLoading.value = true

  try {
    const response = await api.get(
      `/transactions/history?page=${currentPage.value}&limit=4`
    )
    transactions.value = response.data.data
    pagination.value = response.data.pagination
  } catch (err) {
    console.error('Failed to fetch transactions:', err)
  } finally {
    isLoading.value = false
  }
}

function changePage(page) {
  currentPage.value = page
  fetchTransactions()
}

function getAmountClass(transaction) {
  if (transaction.type === 'deposit') return 'positive'
  if (transaction.type === 'withdraw') return 'negative'
  if (transaction.type === 'transfer') {
    return transaction.from_user_id === authStore.user?.id
      ? 'negative'
      : 'positive'
  }
  return ''
}
</script>
