<template>
  <CustomCard shadow="md">
    <template #header>
      <h3 class="text-lg font-semibold text-gray-800">Quick Actions</h3>
    </template>

    <div class="grid grid-cols-2 gap-3">
      <CustomButton
        variant="primary"
        size="lg"
        class="flex-col gap-2 py-4"
        @click="$emit('action', 'deposit')"
      >
        <span>Deposit</span>
      </CustomButton>

      <CustomButton
        variant="danger"
        size="lg"
        class="flex-col gap-2 py-4"
        @click="$emit('action', 'withdraw')"
      >
        <span>Withdraw</span>
      </CustomButton>

      <CustomButton
        variant="outline"
        size="lg"
        class="flex-col gap-2 py-4"
        @click="$emit('action', 'transfer')"
      >
        <span>Transfer</span>
      </CustomButton>

      <CustomButton
        variant="secondary"
        size="lg"
        class="flex-col gap-2 py-4"
        @click="$emit('action', 'history')"
      >
        <span>History</span>
      </CustomButton>
    </div>
  </CustomCard>
</template>

<script setup>
import CustomCard from '../common/CustomCard.vue'
import CustomButton from '../common/CustomButton.vue'

defineEmits(['action'])
</script>
