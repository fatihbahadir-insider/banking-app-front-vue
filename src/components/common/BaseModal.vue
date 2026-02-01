<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="$emit('close')"
      >
        <div
          class="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
        >
          <div
            class="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white"
          >
            <h2 class="m-0 text-xl font-semibold flex items-center gap-3">
              {{ title }}
            </h2>
            <button
              class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
              @click="$emit('close')"
            >
              ✕
            </button>
          </div>

          <div class="p-6">
            <slot />
          </div>

          <div v-if="$slots.footer" class="px-6 pb-6">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
})

defineEmits(['close'])
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s ease;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9) translateY(20px);
}
</style>
