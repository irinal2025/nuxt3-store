<template>
  <header>
  <nav class="fixed top-0 left-0 w-full z-50 bg-white shadow-md px-4 py-2 flex items-center justify-between">
    <!-- Logo -->
    <div>
      <NuxtLink to="/" class="text-gray-800 font-semibold text-lg hover:text-gray-600"><span class="text-[#6494B4]">&Ntilde;</span>Shop</NuxtLink>
    </div>

    <!-- Buttons (only for desktop) -->
    <div class="hidden lg:flex gap-6 items-center">
      <NuxtLink to="/products" class="text-gray-500 hover:text-gray-900 uppercase text-[13px]">New In</NuxtLink>
      <NuxtLink to="/products" class="text-gray-500 hover:text-gray-900 uppercase text-[13px]">Products</NuxtLink>
      <NuxtLink to="/products" class="text-gray-500 hover:text-gray-900 uppercase text-[13px]">Categories</NuxtLink>
    </div>

    <!-- Desktop Navigation -->
    <ul class="hidden lg:flex gap-6 items-center uppercase text-[13px]">
      <li class="flex items-center border-0  overflow-hidden">
        <input
          type="text"
          placeholder="SEARCH..."
          class="px-2 py-1 outline-none text-[13px] border-0 border-b border-gray-300 focus:border-blue-500"
        />
          <button aria-label="Search" class="border-0 px-2 py-1 hover:text-gray-900 text-gray-500 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="6.2"></circle>
            <path d="M20.5 20.5L16 16"></path>
          </svg>
        </button>
      </li>

      <!-- User not logged in -->
      <li v-if="!isLoggedIn"><NuxtLink to="/login" class="text-gray-500 hover:text-gray-900">Login</NuxtLink></li>
      <li v-if="!isLoggedIn"><NuxtLink to="/register" class="text-gray-500 hover:text-gray-900">Sign Up</NuxtLink></li>
      
      <!-- User logged in -->
      <li v-if="isLoggedIn" class="relative">
        <NuxtLink to="/profile" class="text-gray-500 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </NuxtLink>
      </li>
      <li v-if="isLoggedIn">
        <button @click="logout" class="flex items-center text-gray-500 hover:text-gray-900">
          <!-- Logout / Exit -icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"/>
          </svg>
        </button>
      </li>

      <!-- Favorites / Wishlist -->
      <li><NuxtLink to="/favorites" class="text-gray-500 hover:text-gray-900">
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        class="fill-current w-6 h-6 text-gray-500 hover:text-gray-900 transition-colors">
        <path 
            fill-rule="evenodd" 
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
            clip-rule="evenodd" />
        </svg></NuxtLink>
      </li>

      <!-- Shopping Cart / Bag -->
      <li><NuxtLink to="/cart" class="flex items-center text-gray-500 hover:text-gray-900 gap-1">
        Shopping bag [{{ cartCount }}]
      <!--svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500 hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.5h12.1a1 1 0 00.9-1.5L17 13M7 13V6h14" />
        </svg-->
      </NuxtLink>
      </li>
    </ul>

    <!-- Mobile toggle -->
    <button class="lg:hidden px-2 py-1" @click="openNav = !openNav">
      <span v-if="!openNav">&#9776;</span>
      <span v-else>&#10005;</span>
    </button>

      <!-- Mobile Navigation -->
    <div v-show="openNav" class="lg:hidden absolute left-0 w-full bg-white shadow-md z-20 top-full flex flex-col gap-2 p-4">

        <NuxtLink to="/products" class="text-gray-500 hover:text-gray-900">Products</NuxtLink>
        <NuxtLink v-if="!isLoggedIn" to="/login" class="text-gray-500 hover:text-gray-900">Login</NuxtLink>
        <NuxtLink v-if="!isLoggedIn" to="/register" class="text-gray-500 hover:text-gray-900">Sign Up</NuxtLink>
        <NuxtLink to="/favorites" class="text-gray-500 hover:text-gray-900">Favorites</NuxtLink>
        <NuxtLink to="/cart" class="text-gray-500 hover:text-gray-900">Shopping bag  [{{ cartCount }}]</NuxtLink>

      <div class="flex flex-col gap-2 mt-2">
        <button v-if="isLoggedIn" @click="logout" class="px-3 py-1 border border-gray-400 rounded hover:bg-gray-100">Logout</button>
      </div>

      <!-- Search Input -->
      <div class="flex items-center border-0  overflow-hidden">
        <input
          type="text"
          placeholder="Search..."
          class="px-2 py-1 outline-none text-sm border-0 border-b border-gray-300 focus:border-blue-500"
        />
        <button class="border-0 px-2 py-1 hover:text-gray-300 text-gray-700 text-sm">
          🔍
        </button>
      </div>

    </div>
  </nav>
</header>

</template>



<script setup>
import { ref, onMounted, watch } from 'vue'
import { useCart } from '~/composables/useCart'
import { useRouter } from 'vue-router'

const { cart } = useCart()
const cartCount = ref(0)

onMounted(() => {
  // Load initial cart count
  cartCount.value = cart.value.reduce((sum, item) => sum + (item.quantity || 1), 0)

  // Watch for changes
  watch(cart, (newCart) => {
    cartCount.value = newCart.reduce((sum, item) => sum + (item.quantity || 1), 0)
  }, { deep: true })
})

const openNav = ref(false)
const router = useRouter()
const token = useCookie('token')
const isLoggedIn = useState('isLoggedIn', () => !!token.value)

const logout = () => {
  token.value = null
  isLoggedIn.value = false
  router.push('/')
}
</script>