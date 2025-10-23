<template>
  <div class="max-w-md mx-auto mt-10 p-6">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <form @submit.prevent="login" class="flex flex-col gap-4 mb-4">
      <input v-model="username" type="text" placeholder="Username" class="border p-2 rounded" />
      <!-- Password -->
      <div class="relative">
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          placeholder="Password"
          class="w-full border p-2 rounded pr-10"
          aria-label="Password"
        />
        <button
          type="button"
          @click="showPassword = !showPassword"
          :aria-pressed="showPassword.toString()"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
          :title="showPassword ? 'Hide password' : 'Show password'"
        >
          <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <!-- eye icon -->
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <!-- eye-off icon -->
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.05 10.05 0 012.305-3.578M6.1 6.1A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.98 9.98 0 01-1.841 3.108M3 3l18 18" />
          </svg>
        </button>
      </div>
      
      <button type="submit" :disabled="isLoading" class="btn">
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
    <NuxtLink to="/register" class="text-sm text-gray-600 hover:underline mt-2">Don't have an account? Sign up &rsaquo;</NuxtLink>   


    <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
    <p v-if="success" class="text-green-600 mt-4">{{ success }}</p>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const showPassword = ref(false)
const isLoading = ref(false)

const router = useRouter()
// Save token in localStorage
const token = useCookie('token')
const isLoggedIn = useState('isLoggedIn', () => !!token.value)

async function login() {
  error.value = ''
  success.value = ''

  if (!username.value || !password.value) {
    error.value = 'Please fill in all fields'
    return
  }

  isLoading.value = true
  try {
    const config = useRuntimeConfig()
    const resp = await $fetch(`${config.public.NUXT_API_BASE}/auth/login`, {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    })

    if (resp && resp.token) {


if (resp && resp.token) {
  token.value = resp.token   // token is saved in cookies
  isLoggedIn.value = true
  router.push('/')
}
      isLoggedIn.value = true
      success.value = 'Login successful!'
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } else {
      error.value = 'Invalid credentials'
    }
  } catch (err) {
    console.error(err)
    error.value = 'Login failed. Try again.'
  } finally {
    isLoading.value = false
  }
}

useHead({
  title: 'Login - ÑShop',
  meta: [
    { name: 'description', content: 'Login to your account to access your shopping cart and orders' }
  ] 
})
</script>
