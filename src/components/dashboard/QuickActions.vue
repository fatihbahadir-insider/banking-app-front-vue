<template>
  <div class="bg-white rounded-[16px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
    <h3 class="m-0 mb-6 text-[18px] font-semibold color-[#1a1a2e]">
      Quick Actions
    </h3>
    <div class="grid grid-cols-2 gap-3">
      <button
        class="flex flex-col items-center gap-2 p-5 b-none rounded-[12px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0px_4px_12px_rgba(0,0,0,0.15)] active:translate-y-0 bg-gradient-to-r from-[#28a745] to-[#20c997] text-white"
        @click="$emit('action', 'deposit')"
      >
        <span class="action-icon">📥</span>
        <span class="action-label">Deposit</span>
      </button>
      <button
        class="flex flex-col items-center gap-2 p-5 b-none rounded-[12px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0px_4px_12px_rgba(0,0,0,0.15)] active:translate-y-0 bg-gradient-to-r from-[#dc3545] to-[#fd7e14] text-white"
        @click="$emit('action', 'withdraw')"
      >
        <span class="action-icon">📤</span>
        <span class="action-label">Withdraw</span>
      </button>
      <button
        class="flex flex-col items-center gap-2 p-5 b-none rounded-[12px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0px_4px_12px_rgba(0,0,0,0.15)] active:translate-y-0 bg-gradient-to-r from-[#007bff] to-[#6610f2] text-white"
        @click="$emit('action', 'transfer')"
      >
        <span class="action-icon">🔄</span>
        <span class="action-label">Transfer</span>
      </button>
      <button
        class="flex flex-col items-center gap-2 p-5 b-none rounded-[12px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0px_4px_12px_rgba(0,0,0,0.15)] active:translate-y-0 bg-gradient-to-r from-[#6c757d] to-[#495057] text-white"
        @click="$emit('action', 'history')"
      >
        <span class="action-icon">📋</span>
        <span class="action-label">History</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['action'])
</script>
