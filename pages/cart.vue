<template>
  <div class="max-w-6xl mx-auto px-4 py-10 mt-10">
    <h1 class="mb-6 text-4xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>

    <p v-if="cart.length === 0" class="text-gray-600">Your cart is empty.</p>
    
    <div v-else class="md:flex md:gap-6">
      <!-- Product List -->
      <ul class="flex-1">
        <li v-for="(item, index) in cart" :key="index" class="flex items-center gap-4 p-4 border-b">
          <!--img :src="item.image" alt="" class="w-24 h-24 object-cover rounded"/-->
          <NuxtLink :to="`/products/${item.id}`">
            <NuxtImg :src="item.image" alt="" class="w-24 h-24 object-cover rounded" lazy />
          </NuxtLink>
          <div class="flex-1">
            <NuxtLink :to="`/products/${item.id}`">
              <h2 class="text-lg font-semibold">{{ item.title }}</h2>
            </NuxtLink>
            <p class="text-gray-500">{{ formattedPrice(item.price) }}</p>
            <div class="flex items-center gap-2 mt-2">
              <button 
                @click="decreaseQuantity(index)" 
                :class="['py-1 w-8 border rounded bg-gray-100', { 'opacity-50 cursor-not-allowed hover:bg-gray-100 text-gray-400': item.quantity <= 1 }, { 'hover:cursor-pointer hover:bg-gray-200': item.quantity > 1 }]"
                :disabled="item.quantity <= 1"
              >&minus;</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(index)" class="py-1 w-8 border rounded bg-gray-100 hover:bg-gray-200 hover:cursor-pointer">&plus;</button>
            </div>
          </div>
          <button @click="removeFromCart(index)" class="text-gray-600 hover:text-red-800 hover:cursor-pointer" :aria-label="'Remove ' + item.title + ' from cart'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7H5M10 11v6m4-6v6M6 7l1 14h10L18 7" />
            </svg>
          </button>
        </li>
      </ul>

      <!-- Summary on the right side -->
      <div class="mt-6 md:mt-0 md:w-1/3">
      <div class="p-4 border rounded-md bg-gray-50">
        <h3 class="text-lg font-semibold mb-4">Summary</h3>
        <div class="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>{{ formattedPrice(subtotal) }}</span>
        </div>
        <div class="flex justify-between mb-2">
          <span>Delivery</span>
          <span>{{ formattedPrice(deliveryCost) }}</span>
        </div>
        <div class="flex justify-between font-bold mt-2 border-t pt-2">
          <span>Total</span>
          <span>{{ formattedPrice(total) }}</span>
        </div>

        <NuxtLink v-if="cart.length > 0" to="/checkout" class="btn w-full mt-4 text-center">
          Go to Checkout
        </NuxtLink>

        <div v-if="!isLoggedIn" class="mt-4 text-center">
          <p class="mb-2">Please log in to proceed to checkout.</p>
          <div class="flex flex-row justify-center gap-4">
          <NuxtLink to="/login" class="btn">Log In</NuxtLink>
          <NuxtLink to="/register" class="btn !bg-[#6494B4] hover:underline">Sign up</NuxtLink>
        </div>
        </div>
        <div class="mt-6 text-sm text-gray-600">
        <p class="mt-4">Prices and delivery costs are not confirmed until you've reached the checkout.</p>

        <p class="mt-4">Read more about <NuxtLink to="/shipping" class="underline">return and refund policy</NuxtLink>.</p>
        <p class="mt-4">Need help? Please contact <NuxtLink to="/contact" class="underline">Customer Support</NuxtLink>.</p>

      </div>
      </div>
      </div>
    </div>

    <NuxtLink to="/products" class="hover:underline mt-6 inline-block text-gray-800">
      &lsaquo; Back to products
    </NuxtLink>
  </div>
</template>


<script setup>
import { computed } from 'vue'
const { cart, removeFromCart } = useCart()

function formattedPrice(n) {
  return new Intl.NumberFormat('fi-FI', { style: 'currency', currency: 'EUR' }).format(n)
}

function increaseQuantity(index) {
  cart.value[index].quantity++
}

function decreaseQuantity(index) {
  if (cart.value[index].quantity > 1) cart.value[index].quantity--
}

const subtotal = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0))
const deliveryCost = 5.99 // Fixed delivery cost, you can change it
const total = computed(() => subtotal.value + deliveryCost)

const loggedIn = false // Change according to login state

const isLoggedIn = useState('isLoggedIn', () => !!token.value)

useHead({
  title: 'Shopping Cart - ÑShop',
  meta: [
    { name: 'description', content: 'Review your selected products before checkout' }
  ] 
})
</script>

<style scoped>
.btn {
  background-color: #003F5A;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  text-decoration: none;
  display: inline-block;
  font-weight: 500;
}
.btn:hover {
  background-color: #005377;
}
</style>

