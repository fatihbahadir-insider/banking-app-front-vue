<template>
  <BaseModal
    :is-open="isOpen"
    :title="type[0]?.toUpperCase() + type.slice(1)"
    @close="$emit('close')"
  >
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <CustomSelect
        v-if="type === 'transfer'"
        v-model="selectedUserId"
        label="To"
        placeholder="Pick a user"
      >
        <option v-for="user in availableUsers" :key="user.id" :value="user.id">
          {{ user.username }} ({{ user.email }})
        </option>
      </CustomSelect>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Amount (USD)
        </label>
        <div class="relative">
          <span
            class="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-semibold text-[#667eea] z-10"
          >
            $
          </span>
          <CustomInput
            v-model="amount"
            type="number"
            placeholder="0.00"
            class="[&_input]:pl-10 [&_input]:text-2xl [&_input]:font-semibold [&_input]:py-4"
          />
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <CustomButton
          v-for="quickAmount in [50, 100, 250, 500, 1000]"
          :key="quickAmount"
          variant="outline"
          size="sm"
          type="button"
          @click="amount = quickAmount"
        >
          ${{ quickAmount }}
        </CustomButton>
      </div>

      <div
        v-if="error"
        class="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
      >
        <span>⚠️</span> {{ error }}
      </div>

      <div class="flex gap-3 pt-2">
        <CustomButton
          variant="ghost"
          size="lg"
          type="button"
          class="flex-1 border-2 border-gray-200"
          @click="$emit('close')"
        >
          Cancel
        </CustomButton>
        <CustomButton
          variant="primary"
          size="lg"
          type="submit"
          class="flex-1"
          :disabled="isLoading"
        >
          <span
            v-if="isLoading"
            class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
          />
          <span v-else>{{ type[0]?.toUpperCase() + type.slice(1) }}</span>
        </CustomButton>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '../../stores/useAuthStore'
import { useDashboardStore } from '../../stores/useDashboardStore'
import BaseModal from '../common/BaseModal.vue'
import CustomButton from '../common/CustomButton.vue'
import CustomInput from '../common/CustomInput.vue'
import CustomSelect from '../common/CustomSelect.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    required: true,
    validator: (value) => ['deposit', 'withdraw', 'transfer'].includes(value),
  },
  users: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['close', 'success'])

const authStore = useAuthStore()
const dashboardStore = useDashboardStore()
const amount = ref('')
const selectedUserId = ref('')
const isLoading = ref(false)
const error = ref('')

const availableUsers = computed(() => {
  return props.users.filter((user) => user.id !== authStore.user?.id)
})

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      amount.value = ''
      selectedUserId.value = ''
      error.value = ''
    }
  }
)

async function handleSubmit() {
  if (!amount.value || amount.value <= 0) {
    error.value = 'Please enter a valid amount'
    return
  }

  if (props.type === 'transfer' && !selectedUserId.value) {
    error.value = 'Please select a user'
    return
  }

  isLoading.value = true
  error.value = ''

  let success = false

  switch (props.type) {
    case 'deposit':
      success = await dashboardStore.deposit(amount.value)
      break
    case 'withdraw':
      success = await dashboardStore.withdraw(amount.value)
      break
    case 'transfer':
      success = await dashboardStore.transfer(
        amount.value,
        selectedUserId.value
      )
      break
  }

  isLoading.value = false

  if (success) {
    emit('success')
  } else {
    error.value = dashboardStore.error
  }
}
</script>
