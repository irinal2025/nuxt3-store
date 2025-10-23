<template>
  <div class="max-w-4xl mx-auto px-4 py-10 mt-10">
    <h1 class="text-center mb-4 text-4xl leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Shipping & Returns</h1>
    <p class="mb-4 text-gray-700">Thank you for shopping with us! Please note that this store is a demo project created for learning purposes. The information below is for demonstration only.</p>

    <h2 class="mb-2 text-2xl font-bold text-gray-900">Shipping</h2>
    <p class="mb-2 text-gray-700">Orders are usually processed within 1-3 business days.</p>
    <p class="mb-2 text-gray-700">Estimated delivery time is 5-10 business days depending on your location.</p>
    <p class="mb-2 text-gray-700">Tracking information will be provided once your order has been shipped.</p>

    <h2 class="mb-2 text-2xl font-bold text-gray-900">Returns</h2>
    <p class="mb-2 text-gray-700">You may return items within 14 days of delivery.</p>
    <p class="mb-2 text-gray-700">Products must be unused and in their original packaging.</p>
    <p class="mb-2 text-gray-700">To start a return, please contact our customer service at demo@nshop.fi.</p>

    <h2 class="mb-2 text-2xl font-bold text-gray-900">Important</h2>
    <p class="mb-2 text-gray-700">This is a practice website. No real products will be shipped, and the policies above are examples only.</p>
    <NuxtLink to="/" class="hover:underline"><span class="text-xl pr-1 text-gray-800">&lsaquo;</span>Home page</NuxtLink>
  </div>
</template>


<script setup lang="ts">
useHead({
  title: 'Shipping & Returns - ÑShop',
  meta: [
    { name: 'description', content: 'Learn about our shipping and return policies' }
  ] 
})
</script>

