<template>
  <section class="max-w-7xl mx-auto px-4 py-8 mt-10">
    <h1 class="text-center mb-4 text-4xl leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
      Products
    </h1>

    <CategoryLinks :showAll="true" />
    <!-- <p v-if="category" class="text-center mb-8 text-gray-600">Category: <strong>{{ category }}</strong></p>  -->

    <div v-if="pending" class="flex flex-col items-center justify-center py-10">
      <div class="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      <p class="mt-2 text-sm text-gray-600">Loading...</p>
    </div>

    <div v-else-if="error" class="text-red-500 text-center py-10">
      <!--Error loading products. Please try again later.-->
      Something went wrong, please try again later.
    </div>

    <div v-else>
 <div class="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center">
<ProductCard
  v-for="p in visibleProducts"
  :key="p.id"
  :id="p.id"
  :title="p.title"
  :price="p.price"
  :image="p.image"
  :category="p.category"
  @add="handleAddToCart"
  @wishlist="handleWishlist"
/>
      </div>
            <!-- Load More -->
      <div class="flex justify-center mt-8">
        <button
          v-if="visibleCount < filteredProducts.length"
          @click="loadMore"
          class="btn px-6 py-2 !bg-white !border-2 border-[#003F5A] !text-[#003F5A] rounded-full hover:!bg-[#005377] hover:!text-white transition-colors"
        >
          Load More
        </button>
        <p v-else class="text-gray-500">All products are displayed.</p>
      </div>
      <transition name="notification">
  <div v-if="showNotification" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-green-500 text-white px-4 py-2 rounded shadow z-50">
    {{ notificationMessage }}
  </div>
</transition>
    </div>
  </section>
</template>


<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const category = computed(() => route.query.category as string | undefined)

const config = useRuntimeConfig()
const { data: products, pending, error, refresh } = useFetch(`${config.public.NUXT_API_BASE}/products`, {
  lazy: true
})

// Call fetch immediately when component mounts
refresh()

// Filter by category
const filteredProducts = computed(() => {
  if (!products.value) return []
  if (!category.value) return products.value
  return products.value.filter(p => p.category.toLowerCase() === category.value.toLowerCase())
})

// Watch for changes to the query parameter
watch(category, () => {
  // refresh fetches the products again (or you can leave it out if all products are always fetched)
  // here it's not necessary to refresh if all products have already been loaded
  console.log('Category changed:', category.value)
})


//import { useCart } from '~/composables/useCart'

const { cart, addToCart: addToCartComposable } = useCart()
const showNotification = ref(false)
const notificationMessage = ref('')

function handleAddToCart(product) {
  addToCartComposable(product)
  notificationMessage.value = `Product "${product.title}" added to cart!`
  showNotification.value = true
  setTimeout(() => showNotification.value = false, 3000)
}

//import { useFavorites } from '~/composables/useFavorites'

const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites()

function handleWishlist(product: any) {
  addToFavorites(product)
  //alert(`Added to favorites: ${product.title}`)

  notificationMessage.value = `Product "${product.title}" added to favorites!`
  showNotification.value = true
  setTimeout(() => showNotification.value = false, 3000)

}


// LOAD MORE:
const visibleCount = ref(8) // show 8 products initially
const visibleProducts = computed(() => filteredProducts.value.slice(0, visibleCount.value))

function loadMore() {
  visibleCount.value += 8
}

useHead({
  title: 'Products - ÑShop',
  meta: [
    { name: 'description', content: 'Browse our collection of products' }
  ] 
})
</script>


<style>
.notification-enter-active, .notification-leave-active {
  transition: opacity 0.5s;
}
.notification-enter-from, .notification-leave-to {
  opacity: 0;
}
.notification-enter-to, .notification-leave-from {
  opacity: 1;
}
</style>
