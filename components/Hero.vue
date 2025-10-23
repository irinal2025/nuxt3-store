<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
    <h1 class="text-5xl font-bold mb-4 text-gray-800">
      {{ title }}
    </h1>
    <p class="text-lg text-gray-600 mb-6">
      {{ subtitle }}
    </p>
    <NuxtLink
      :to="link"
      class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
    >
      {{ buttonText }}
    </NuxtLink>
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Welcome to DemoShop - Your Friendly Online Store!' },
  subtitle: { type: String, default: 'This is a demo project for learning web development. Explore products, add items to your cart, and enjoy a simple online shopping experience!' },
  link: { type: String, default: '/products' },
  buttonText: { type: String, default: 'Shop Now' }
})
</script>

