<template>
  <section class="max-w-5xl mx-auto p-6 mt-10">
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Virhe: {{ error }}</div>
    <div v-else>
      <div class="flex flex-col md:flex-row gap-6">
        <!-- Left: Image -->
        <div class="md:w-1/2 flex justify-center">
          <div class="w-full flex justify-center h-[50vh] md:h-[80vh] overflow-hidden rounded-lg shadow relative cursor-pointer group"
               @click="openModal = true">
            <!--img
              :src="product.image"
              :alt="product.title"
              class="w-full max-w-md h-auto object-contain transition-transform duration-300 ease-in-out transform hover:scale-110 group-hover:scale-110"
            /-->
          <NuxtImg
            :src="product.image"
            :alt="product.title"
            class="w-full max-w-md h-auto object-contain transition-transform duration-300 ease-in-out transform hover:scale-110 group-hover:scale-110"
            lazy
          />
            <!-- Hover overlay -->
            <div class="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
            <!-- Zoom icon -->
            <svg class="absolute inset-0 m-auto w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        <!-- Right: Info -->
        <div class="md:w-1/2 flex flex-col justify-between gap-4">
          <div>
            <h1 class="text-3xl font-bold mb-2">{{ product.title }}</h1>

          <!-- Rating -->
          <div class="mt-4 flex items-center gap-2 mb-4">
            <div class="relative inline-block">
              <div class="flex text-gray-300">
                <template v-for="i in 5" :key="'bg-' + i">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09L5.5 12.545 1 8.455l6.061-.545L10 2l2.939 5.91 6.061.545-4.5 4.09 1.378 5.545z"/>
                  </svg>
                </template>
              </div>
              <div class="absolute top-0 left-0 overflow-hidden" :style="{ width: (product.rating.rate / 5 * 100) + '%' }">
                <span class="text-yellow-500 whitespace-nowrap">
                  <template v-for="i in 5" :key="'fg-' + i">
                    <svg class="w-6 h-6 inline-block" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09L5.5 12.545 1 8.455l6.061-.545L10 2l2.939 5.91 6.061.545-4.5 4.09 1.378 5.545z"/>
                    </svg>
                  </template>
                </span>
              </div>
            </div>
            <span class="text-yellow-500 font-medium">({{ product.rating.rate.toFixed(1) }})</span>
            <span class="text-sm text-gray-500">({{ product.rating.count }})</span>
          </div>
<p class="text-gray-600 mb-4">
  {{ shortDescription }}
  <button
    v-if="isLongDescription"
    @click="showFullDescription = !showFullDescription"
    class="text-gray-500 ml-2 text-sm hover:cursor-pointer hover:underline"
  >
    {{ showFullDescription ? 'Show less &and;' : 'Read more &or;' }}
  </button>
</p>
<button
  @click="toggleFavorite"
  class="inline-flex items-center justify-center w-10 h-10 rounded-xl transition float-right hover:cursor-pointer"
  :aria-label="'Add to wishlist ' + product.title"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    :class="['w-6 h-6 transition-colors', isFavorite ? 'text-[#003F5A]' : 'text-gray-500 hover:text-[#6494B4]']"
  >
    <path
      fill-rule="evenodd"
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
         2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
         C13.09 3.81 14.76 3 16.5 3 
         19.58 3 22 5.42 22 8.5
         c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      clip-rule="evenodd"
    />
  </svg>
</button>
            <p class="text-2xl font-semibold mb-6">{{ formattedPrice(product.price) }}</p>
          </div>

          <!-- Buttons -->
          <div class="flex items-center gap-4 w-full relative">
            <button
              @click="addToCart(product)"
              class="btn w-full justify-center  inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
              :aria-label="'Add to cart ' + product.title"
            >
              Add to cart <!--🛒--><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart w-[16px] h-[16px]"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </button>


          </div>
          <div  class="relative"> 
            <transition name="notification">
              <div  v-if="showNotification"  class="absolute top-0 right-0 bg-green-500 text-white px-4 py-2 rounded shadow z-50">
                {{ notificationMessage }}
              </div>
            </transition>
          </div>


          <!-- Accordion -->
          <div class="mt-6 space-y-2">
            <div v-for="(section, index) in sections" :key="index" class="border-0 rounded-lg">
              <button
                class="w-full px-2 font-medium bg-gray-100 hover:bg-gray-200 uppercase font-[13px] sm:!font-[11px] letter-spacing-[0.5px] h-[40px] leading-[40px] flex flex-row justify-between pt-0 pb-0"
                @click="toggleSection(index)"
              >
                <span class="truncate">{{ section.title }}</span>
                <span class="ml-2 text-2xl w-[24px] leading-[40px] ">{{ openSection === index ? '-' : '+' }}</span>
              </button>
              <transition name="accordion">
                <div v-if="openSection === index" class="px-4 py-2 text-gray-700">
                  {{ section.content }}
                </div>
              </transition>
            </div>
          </div>

          <!-- Category -->
          <div class="mt-6">
            <span class="text-sm text-gray-500">Category:</span>
            <NuxtLink :to="`/products?category=${product.category}`">
              <span class="text-sm text-gray-800 font-medium capitalize ml-1 hover:underline">{{ product.category }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <ToastNotification
      v-if="showToast"
      :type="toastType"
      :title="toastTitle"
      :message="toastMessage"
      :icon="toastIcon"
      @close="showToast = false"
    />
  </section>

  <!-- Modal -->
  <div v-if="openModal" class="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
    <button @click="openModal = false" class="absolute top-2 right-[20px] text-black text-6xl font-medium cursor-pointer hover:text-gray-500 z-51">&times;</button>
    <div class="relative w-full h-full p-4 overflow-hidden">
      <!--img 
        :src="product.image" 
        :alt="product.title" 
        class="w-full h-auto object-contain"
      /-->
        <NuxtImg
            :src="product.image"
            :alt="product.title"
            ref="modalImage"
            class="w-full h-full object-contain transition-transform duration-300 ease-in-out select-none"
            :style="{ transform: `scale(${zoomLevel})` }"
            lazy
          />
    </div>

        <!-- Zoom controls -->
    <div class="absolute bottom-6 flex gap-3">
      <button
        @click="zoomOut"
        :disabled="zoomLevel <= 1"
        class="w-10 h-10 rounded-full bg-white border-1 border-gray-300 text-black text-xl font-bold shadow hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer disabled:hover:bg-white"
        title="Zoom Out"
      >−</button>
      <button
        @click="resetZoom"
        :disabled="zoomLevel === 1"
        class="w-10 h-10 rounded-full bg-white border-1 border-gray-300 text-black text-sm font-semibold shadow hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer disabled:hover:bg-white"
        title="Reset Zoom"
      >⟳</button>
      <button
        @click="zoomIn"
        :disabled="zoomLevel >= 3"
        class="w-10 h-10 rounded-full bg-white border-1 border-gray-300 text-black text-xl font-bold shadow hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer disabled:hover:bg-white"
        title="Zoom In"
      >+</button>
    </div>
  </div>
  


</template>


<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
//import { useCart } from '~/composables/useCart'
//import { useFavorites } from '~/composables/useFavorites'

const route = useRoute()
const openModal = ref(false)
const openSection = ref<number | null>(null)
const showNotification = ref(false)
const notificationMessage = ref('')

// Hide body scroll when modal is open
watch(openModal, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
  zoomLevel.value = 1
})

const config = useRuntimeConfig()
// Fetch product
const { data: product, pending, error } = await useFetch(
  `${config.public.NUXT_API_BASE}/products/${route.params.id}`
)

//Toast
const showToast = ref(false)
const toastType = ref('success')
const toastTitle = ref('Success!')
const toastMessage = ref('')
const toastIcon = ref('check')

// Cart
const { cart, addToCart: addToCartComposable } = useCart()
function addToCart() {
  addToCartComposable({
    id: product.value.id,
    title: product.value.title,
    price: product.value.price,
    image: product.value.image
  })

  notificationMessage.value = `Product "${product.value.title}" added to cart!`
  showNotification.value = true
  setTimeout(() => (showNotification.value = false), 3000)

  toastType.value = 'success'
  toastTitle.value = 'Success!'
  toastMessage.value = `Product "${product.value.title}" added to cart`
  toastIcon.value = 'check'
  showToast.value = true
}

// Favorites
const { favorites, addToFavorites, removeFromFavorites } = useFavorites()

// Check if current product is in favorites
const isFavorite = computed(() =>
  favorites.value.some(item => item.id === product.value.id)
)

function toggleFavorite() {
  if (isFavorite.value) {
    removeFromFavorites(product.value.id)
    toastType.value = 'error';
    toastTitle.value = 'Removed!';
    toastMessage.value = `Product "${product.value.title}" removed from favorites.`;
    toastIcon.value = 'heartMinus';
    showToast.value = true;
  } else {
    addToFavorites({
      id: product.value.id,
      title: product.value.title,
      price: product.value.price,
      image: product.value.image,
      category: product.value.category
    })

    toastType.value = 'success';
    toastTitle.value = 'Added!';
    toastMessage.value = `Product "${product.value.title}" added to favorites.`;
    toastIcon.value = 'heartPlus';
    showToast.value = true;
  }
}

// Price formatting
function formattedPrice(n: number) {
  return new Intl.NumberFormat('fi-FI', { style: 'currency', currency: 'EUR' }).format(n)
}

// Image zoom in modal
const zoomLevel = ref(1)
const maxZoom = 3
const minZoom = 1

function zoomIn() {
  if (zoomLevel.value < maxZoom) {
    zoomLevel.value += 0.2
  }
}
function zoomOut() {
  if (zoomLevel.value > minZoom) {
    zoomLevel.value -= 0.2
  }
}
function resetZoom() {
  zoomLevel.value = 1
}

// Accordion
const sections = ref([
  { title: 'Check in-store availability', content: 'Contact your local store for availability.' },
  { title: 'Materials', content: 'Material info here...' },
  { title: 'Delivery and Payment', content: 'Delivery info here...' }
])
function toggleSection(index: number) {
  openSection.value = openSection.value === index ? null : index
}

// Description toggle
const showFullDescription = ref(false)

const shortDescription = computed(() => {
  if (!product.value?.description) return ''
  if (showFullDescription.value) return product.value.description
  return product.value.description.slice(0, 200) + (product.value.description.length > 200 ? '...' : '')
})

const isLongDescription = computed(() => {
  return product.value?.description && product.value.description.length > 200
})

const pageTitle = product.value ? product.value.title : 'Product Details'

useHead({
  title: pageTitle + ' - ÑShop',
  meta: [
    { name: 'description', content: product.value ? product.value.description : 'Product details' }
  ] 
})
</script>

<style>
.accordion-enter-active, .accordion-leave-active {
  transition: max-height 0.3s ease;
}
.accordion-enter-from, .accordion-leave-to {
  max-height: 0;
  overflow: hidden;
}
.accordion-enter-to, .accordion-leave-from {
  max-height: 200px;
}
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

