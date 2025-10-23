<template>
  <div class="max-w-4xl mx-auto px-4 py-10 mt-10">
    <h1 class="text-center mb-4 text-4xl leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">About Us</h1>
    <!--p>This is the About page of the Nuxt 3 app.</p-->

    <p>Welcome to &Ntilde;Shop, your friendly online store for all your essentials! This project is a part of a web development practice, designed to explore modern web technologies while creating a simple and functional e-commerce experience.</p>

    <p>At &Ntilde;Shop, we aim to make online shopping straightforward and enjoyable. Although this store is for learning purposes, we focus on clean design, intuitive navigation, and a smooth shopping experience for all visitors.</p>

    <p>Thank you for visiting, and feel free to browse our products and explore the features!</p>
    <NuxtLink to="/"  class="hover:underline mt-6 inline-block"><span class="text-xl pr-1 text-gray-800">&lsaquo;</span>Home page</NuxtLink>
  </div>
</template>


<script setup lang="ts">
useHead({
  title: 'About Us - ÑShop',
  meta: [
    { name: 'description', content: 'Learn more about our store and team' }
  ] 
})  
</script>
