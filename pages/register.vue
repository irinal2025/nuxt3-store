
<template>
  <div class="max-w-md mx-auto mt-10 p-6">
    <h1 class="text-2xl font-bold mb-4">Sign Up</h1>
    <form @submit.prevent="register" class="flex flex-col gap-4 mb-4">
      <input v-model="email" type="email" placeholder="Email" class="border p-2 rounded" />
      <input v-model="username" type="text" placeholder="Username" class="border p-2 rounded" />
      <!-- Password -->
      <div class="relative">
        <input
          :type="showPasswords ? 'text' : 'password'"
          v-model="password"
          placeholder="Password"
          class="w-full border p-2 rounded pr-10"
          aria-label="Password"
        />
        <button
          type="button"
          @click="showPasswords = !showPasswords"
          :aria-pressed="showPasswords.toString()"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
          :title="showPasswords ? 'Hide password' : 'Show password'"
        >
          <svg v-if="!showPasswords" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <!-- eye icon (closed = show) -->
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <!-- eye-off icon (open = hide) -->
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.05 10.05 0 012.305-3.578M6.1 6.1A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.98 9.98 0 01-1.841 3.108M3 3l18 18" />
          </svg>
        </button>
      </div>

      <!-- Confirm Password -->
      <div class="relative">
        <input
          :type="showPasswords ? 'text' : 'password'"
          v-model="confirmPassword"
          placeholder="Confirm Password"
          class="w-full border p-2 rounded pr-10"
        />
        <button
          type="button"
          @click="showPasswords = !showPasswords"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
          :title="showPasswords ? 'Hide password' : 'Show password'"
        >
          <svg v-if="!showPasswords" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 
              0 8.268 2.943 9.542 7-1.274 4.057-5.065 
              7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13.875 18.825A10.05 10.05 0 
              0112 19c-4.477 0-8.268-2.943-9.542-7a10.05 
              10.05 0 012.305-3.578M6.1 6.1A9.956 
              9.956 0 0112 5c4.477 0 8.268 2.943 
              9.542 7a9.98 9.98 0 01-1.841 
              3.108M3 3l18 18"/>
          </svg>
        </button>
      </div>
      
      <button type="submit" :disabled="isLoading" class="btn">
        {{ isLoading ? 'Signing up...' : 'Sign Up' }}
      </button>
    </form>
    <NuxtLink to="/login" class="text-sm text-gray-600 hover:underline mt-2">Already have an account? Log in &rsaquo;</NuxtLink>


    <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
    <p v-if="success" class="text-green-600 mt-4">{{ success }}</p>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const username = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)

const showPasswords = ref(false)

const router = useRouter()

async function register() {
  error.value = ''
  success.value = ''

  if (!email.value || !username.value || !password.value || !confirmPassword.value) {
    error.value = 'Please fill in all fields'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  isLoading.value = true
  try {
    const config = useRuntimeConfig()
    const resp = await $fetch(`${config.public.NUXT_API_BASE}/users`, {
      method: 'POST',
      body: {
        email: email.value,
        username: username.value,
        password: password.value,
      }
    })
    console.log('Registered:', resp)
    success.value = 'Registration successful!'
    // redirect to login page after 2 seconds
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (err) {
    console.error(err)
    error.value = 'Registration failed. Try again.'
  } finally {
    isLoading.value = false
  }
}

useHead({
  title: 'Sign Up - ÑShop',
  meta: [
    { name: 'description', content: 'Create a new account to start shopping' }
  ] 
})
</script>
