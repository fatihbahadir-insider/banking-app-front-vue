<template>
  <div
    class="bg-white rounded-[16px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
  >
    <div class="mb-5">
      <h3 class="m-0 text-lg font-semibold text-[#1a1a2e]">Users</h3>
    </div>
    <div class="flex flex-col gap-4">
      <div
        v-for="user in users"
        :key="user.id"
        class="flex items-center gap-4 p-4 bg-[#f8f9fa] rounded-[12px] transition-[transform,box-shadow] duration-200 hover:translate-x-1 hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
      >
        <div
          class="w-12 h-12 rounded-[50%] bg-gradient-to-r from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-semibold text-[14px]"
        >
          {{ user.username?.[0].toUpperCase() }}
        </div>
        <div class="flex-1 flex flex-col gap-0.5">
          <span class="font-semibold color-[#1a1a2e] text-[14px]">
            {{ user.name }}
          </span>
          <span class="color-[#6c757d] text-[12px]">
            {{ user.email }}
          </span>
        </div>
        <span
          :class="[
            'px-3 py-1 rounded-[20px] text-[12px] font-[500] capitalize',
            user.role === 'admin'
              ? 'bg-[#fff3cd] text-[#856404]'
              : user.role === 'moderator'
                ? 'bg-[#fff3cd] text-[#856404]'
                : 'bg-[#d4edda] text-[#155724]',
          ]"
        >
          {{ user.role }}
        </span>
      </div>
    </div>
    <div v-if="users.length === 0" class="text-center p-6 text-[#6c757d]">
      No users found.
    </div>
  </div>
</template>

<script setup>
defineProps({
  users: {
    type: Array,
    default: () => [],
  },
})
</script>
