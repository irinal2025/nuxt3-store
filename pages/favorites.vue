<template>
  <section class="max-w-7xl mx-auto px-4 py-8 mt-10">
    <h1 class="text-center mb-4 text-4xl leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Favorites</h1>

    <div v-if="favorites.length === 0" class="text-gray-500">
      Your favorites list is empty.
    </div>

    <div v-else class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="item in favorites" :key="item.id" class="bg-white rounded-xl shadow p-4 flex flex-col h-full justify-between">
        <NuxtLink :to="`/products/${item.id}`" class="block mb-2">
          <!--img :src="item.image" :alt="item.title" class="w-full h-48 object-contain mb-2" /-->
          <NuxtImg
            :src="item.image"
            :alt="item.title"
            class="w-full h-48 object-contain mb-2"
            lazy
            />
        
        <h3 class="text-sm font-medium mb-1">{{ item.title }}</h3>
        <p class="text-lg font-semibold mb-2">{{ new Intl.NumberFormat('fi-FI', { style: 'currency', currency: 'EUR' }).format(item.price) }}</p>
        </NuxtLink>
        <div class="text-center">
        <button
          @click="handleRemove(item.id)"
          class="btn !bg-[#6494B4] hover:!bg-[#003F5A]"
        >
          Remove
        </button>
      </div>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
//import { useFavorites } from '~/composables/useFavorites'

const { favorites, removeFromFavorites } = useFavorites()

function handleRemove(id: number | string) {
  removeFromFavorites(id)
}

useHead({
  title: 'Your Favorites - ÑShop',
  meta: [
    { name: 'description', content: 'Browse your favorite products' }
  ] 
})
</script>