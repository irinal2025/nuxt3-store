<template>
  <section class="max-w-7xl mx-auto px-4 py-4 md:py-12">
    <div :class="containerClass">
<NuxtLink
  v-for="cat in categories"
  :key="cat"
  :to="cat === 'All' ? '/products' : `/products?category=${encodeURIComponent(cat.toLowerCase())}`"
  :class="[
    'grow shrink block rounded-xl  text-center uppercase transition btn',
    cat.toLowerCase() === activeCategory
      ? '!bg-[#6494B4] !border-2 !border-[#6494B4] pointer-events-none cursor-not-allowed'
      : '!bg-white !border-2 !border-[#003F5A] !text-[#003F5A] hover:!bg-[#6494B4] hover:!text-white hover:!border-[#6494B4]'
  ]"
>
  {{ cat }}
</NuxtLink>
    </div>
  </section>
</template>


<script setup lang="ts">
import { defineProps, ref, computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{
  categories?: string[]
  showAll?: boolean
}>();

const router = useRouter()
const route = useRoute()

// Categories list
const categories = props.showAll
  ? ['All', ...(props.categories || ["Women's Clothing", "Men's Clothing", "Jewelery", "Electronics"])]
  : (props.categories || ["Women's Clothing", "Men's Clothing", "Jewelery", "Electronics"])

// Flex or grid
const containerClass = props.showAll ? 'flex flex-wrap justify-center gap-4' : 'grid grid-cols-2 sm:grid-cols-4 gap-4'

// Current active category
const activeCategory = ref('all')

watchEffect(() => {
  const cat = route.query.category as string | undefined
  activeCategory.value = cat ? decodeURIComponent(cat).toLowerCase() : 'all'
})

// Navigation function
function goToCategory(cat: string) {
  if (cat.toLowerCase() === 'all') {
    router.push('/products')
  } else {
    router.push(`/products?category=${encodeURIComponent(cat.toLowerCase())}`)
  }
}
</script>
