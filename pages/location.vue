<template>
  <div class="max-w-4xl mx-auto px-4 py-10 mt-10">
    <h1 class="text-center mb-4 text-4xl leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Our Location</h1>

    <p class="mb-4">
      Welcome to our demo store! Below you can find our sample address and
      location. Please note that this is a practice project, so the address and
      map are for demonstration purposes only.
    </p>

    <div class="mb-4">
      <p class="font-semibold"><!--📍--><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-house-icon lucide-map-pin-house inline-block mr-2"><path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z"/><path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2"/><path d="M18 22v-3"/><circle cx="10" cy="10" r="3"/></svg>  Demo Street 1</p>
      <p>00100 Helsinki</p>
      <p>Finland</p>
    </div>

    <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Opening Hours</h2>
        <ul class="space-y-1">
            <li><!--🕒--><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock9-icon lucide-clock-9 inline-block mr-2"><path d="M12 6v6H8"/><circle cx="12" cy="12" r="10"/></svg> Monday - Friday: 9:00 - 18:00</li>
            <li><!--🕒--><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock10-icon lucide-clock-10 inline-block mr-2"><path d="M12 6v6l-4-2"/><circle cx="12" cy="12" r="10"/></svg> Saturday: 10:00 - 16:00</li>
            <li><!--🕒--><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-alert-icon lucide-clock-alert inline-block mr-2"><path d="M12 6v6l4 2"/><path d="M20 12v5"/><path d="M20 21h.01"/><path d="M21.25 8.2A10 10 0 1 0 16 21.16"/></svg> Sunday: Closed</li>
        </ul>
    </div>

    <p class="mb-6">
      Here’s where our store would be located in a real-world scenario.
    </p>

    <!-- Google Maps Embed -->
    <div class="w-full h-[450px] rounded-lg overflow-hidden shadow">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254498.04830660688!2d24.68904226797427!3d60.11009633898449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46920bc796210691%3A0xcd4ebd843be2f763!2sHelsinki!5e0!3m2!1sfi!2sfi!4v1759261952349!5m2!1sfi!2sfi" width="100%" height="450" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</template>


<script setup lang="ts">
useHead({
  title: 'Our Location - ÑShop',
  meta: [
    { name: 'description', content: 'Find our store location and opening hours' }
  ] 
})  
</script>
