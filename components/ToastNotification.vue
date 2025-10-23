<template>
  <transition name="toast-fade">
    <div
      v-if="visible"
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xs shadow-xl p-4 max-w-sm/ md:max-w-md z-50 flex items-start gap-3 border transition-transform duration-300 ease-out border-gray-300"
      role="alert"
    >
      <!-- Icon -->
      <svg
        v-if="icon === 'check'"
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7" />
      </svg>

        <svg v-else-if="icon === 'heartPlus'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-plus-icon lucide-heart-plus text-green-700"><path d="m14.479 19.374-.971.939a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.219 1.49"/><path d="M15 15h6"/><path d="M18 12v6"/></svg>
        <svg v-else-if="icon === 'heartMinus'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-minus-icon lucide-heart-minus text-red-600"><path d="m14.876 18.99-1.368 1.323a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.244 1.572"/><path d="M15 15h6"/></svg>

      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>

      <!-- Text -->
      <div class="flex-1">
        <p
          class="font-semibold"
          :class="type === 'success' ? 'text-green-700' : 'text-red-700'"
        >
          {{ title }}
        </p>
        <p class="text-sm text-gray-600">{{ message }}</p>

        <!-- Buttons: only show if type is 'success' -->
<div v-if="type === 'success' && icon === 'check'" class="mt-3 flex justify-end gap-2">
  <button
    @click="$emit('close')"
    class="flex-1 px-2 py-1 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 text-xs uppercase font-bold whitespace-nowrap hover:cursor-pointer"
  >
    Shop More
  </button>
<NuxtLink
  to="/cart"
  class="flex-1 px-2 py-1 rounded-md bg-[#003F5A] text-white hover:bg-[#6494B4] text-xs uppercase whitespace-nowrap font-bold text-center"
>
  Go to Cart
</NuxtLink>

</div>

      </div>

      <!-- Button -->
      <button
        @click="close"
        :class="'text-gray-500 hover:text-gray-900 hover:cursor-pointer'"
        aria-label="Close notification"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      

      <!-- Progress bar -->
      <div
        class="absolute bottom-0 left-0 h-1 animate-progress"
        :class="type === 'success' ? 'bg-green-500' : 'bg-red-500'"
      ></div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'success', // or 'error'
  },
  title: {
    type: String,
    default: 'Success!',
  },
  message: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 5000, // ms
  },
    icon: {
        type: String,
        default: 'check', // 'check' or 'heartPlus' or 'heartMinus'
    },
})

const emit = defineEmits(['close'])
const visible = ref(true)

function close() {
  visible.value = false
  emit('close')
}

onMounted(() => {
  setTimeout(close, props.duration)
})
</script>

<style scoped>
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.3s ease;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
}

.animate-progress {
  animation: progress linear forwards;
  animation-duration: 3s;
}

@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>
