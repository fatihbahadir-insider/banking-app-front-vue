<template>
  <div class="min-h-screen bg-[#f0f2f5] p-6">
    <header class="flex justify-between items-center mb-6">
      <div>
        <h1 class="m-0 text-3xl font-bold text-[#1a1a2e]">
          Welcome, {{ authStore.user?.username }} 👋
        </h1>
        <p class="mt-1 m-0 text-[#6c757d] text-[14px]">
          Here is your account summary
        </p>
      </div>
      <button
        class="px-6 py-3 bg-white border border-[#e0e0e0] rounded-[12px] text-[14px] font-[500] cursor-pointer transition-all duration-200 hover:bg-[#f8f9fa] hover:border-[#764ba2] hover:text-[#764ba2]"
        @click="handleLogout"
      >
        Logout
      </button>
    </header>

    <div
      v-if="dashboardStore.isLoading"
      class="flex flex-col items-center justify-center min-h-[400px] gap-4"
    >
      <div
        class="w-12 h-12 border border-[#e0e0e0] rounded-full animate-spin"
      ></div>
      <p>Loading...</p>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="flex flex-col gap-6">
        <BalanceCard :balance="dashboardStore.balance" />
        <TransactionsList :transactions="dashboardStore.transactions" />
      </div>

      <div class="flex flex-col gap-6">
        <QuickActions @action="handleAction" />
        <UsersList :users="dashboardStore.users" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/useAuthStore'
import { useDashboardStore } from '../stores/useDashboardStore'
import BalanceCard from '../components/dashboard/BalanceCard.vue'
import UsersList from '../components/dashboard/UsersList.vue'
import TransactionsList from '../components/dashboard/TransactionsList.vue'
import QuickActions from '../components/dashboard/QuickActions.vue'

const router = useRouter()
const authStore = useAuthStore()
const dashboardStore = useDashboardStore()

onMounted(() => {
  dashboardStore.fetchAll()
})

async function handleLogout() {
  await authStore.logout()
  router.push({ name: 'login' })
}

function handleAction(action) {
  console.log('Action:', action)
}
</script>
