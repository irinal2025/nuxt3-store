<template>
  <div class="max-w-4xl mx-auto px-4 py-10 mt-10">
    <h1 class="mb-4 text-4xl leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Frequently Asked Questions (FAQ)</h1>
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-semibold mb-2">1. Is this a real online store?</h2>
        <p>No, this is a demo project created for learning purposes. You can browse products and use the features, but no real purchases are made.</p>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">2. How long does shipping take?</h2>
        <p>In a real store, shipping usually takes 5-10 business days. Here, shipping information is only for demonstration.</p>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">3. Can I return an item?</h2>
        <p>Yes, in a real shop you would be able to return items within 14 days. In this demo, returns are only shown as an example.</p>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">4. Do you store my personal data?</h2>
        <p>No real personal data is collected or stored. Any account or order information entered here is for demo purposes only.</p>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">5. Can I contact customer service?</h2>
        <p>You can send us a message through the contact page. Please note that the contact details are examples and not monitored.</p>
      </div>
    </div>
    <NuxtLink to="/" class="hover:underline mt-6 inline-block"><span class="text-xl pr-1 text-gray-800">&lsaquo;</span>Home page</NuxtLink>
  </div>
</template>


<script setup lang="ts">
useHead({
  title: 'Frequently Asked Questions - ÑShop',
  meta: [
    { name: 'description', content: 'Find answers to common questions about our store' }
  ] 
})  
</script>
