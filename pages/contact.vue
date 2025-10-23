<template>
  <div class="max-w-4xl mx-auto px-4 py-10 mt-10">
    <h1 class="text-center mb-4 text-4xl leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Contact Us</h1>
    <p>
      We’d love to hear from you! If you have any questions, feedback, or suggestions, feel free to get in touch with us.
    </p>
    <div class="space-y-4 text-left text-gray-700 dark:text-gray-300">
      <p><!--📧--><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail inline-block mr-2"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg> Email: demo@nshop.fi</p>
      <p><!--📞--><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone-icon lucide-phone inline-block mr-2"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg> Phone: +123 456 789</p>
      <p><!--🏢--><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-house-icon lucide-map-pin-house inline-block mr-2"><path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z"/><path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2"/><path d="M18 22v-3"/><circle cx="10" cy="10" r="3"/></svg> Address: Demo Street 1, 00100 Helsinki, Finland</p>
    </div>
    <p class="mt-6 text-sm font-normal text-gray-500">
      (Please note: This is a demo project created for learning purposes. The contact details above are examples only.)
    </p>
  </div>
</template>


<script setup lang="ts">
useHead({
  title: 'Contact Us - ÑShop',
  meta: [
    { name: 'description', content: 'Get in touch with us for any questions or feedback' }
  ] 
})  
</script>
