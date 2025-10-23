<template>
  <article
    class="group relative bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
    :aria-labelledby="'product-' + id"
  >
    <div class="h-full flex flex-col">
      <!-- Image -->
      <div class="relative w-full pb-[75%] overflow-hidden">
        <NuxtLink :to="`/products/${id}`" class="block">
          <!--img
            :src="image"
            :alt="title"
            class="absolute inset-0 h-full m-auto object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          /-->
          <NuxtImg
            :src="image"
            :alt="title"
            class="absolute inset-0 h-full m-auto object-cover transition-transform duration-300 group-hover:scale-105"
            lazy
          />
        </NuxtLink>
      </div>

      <!-- Content -->
      <div class="p-4 flex flex-col gap-3 h-full justify-between">
        <NuxtLink :to="`/products/${id}`" class="block">
          <h3 :id="'product-' + id" class="text-sm font-medium !text-slate-900 hover:!text-gray-700 line-clamp-2">
            {{ title }}
          </h3>
        </NuxtLink>
        <!--<p class="text-xs text-slate-500 uppercase">{{ category }}</p>-->


        <div class="">
        <!-- Price -->
        <div class="text-lg font-semibold text-slate-900">
          {{ formattedPrice(price) }}
        </div>

        <!-- CTA buttons -->
        <div class="flex items-center justify-around gap-2 mt-3">
                <!-- Add to Wishlist / Favorites -->
      <button
        @click="toggleFavorite"
        class="inline-flex items-center justify-center w-10 h-10 rounded-xl transition"
        :aria-label="'Add to favorites ' + title"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          :class="[
            'w-6 h-6 transition-colors',
            isFavorite ? 'text-[#003F5A]' : 'text-gray-400 hover:text-[#6494B4]'
          ]"
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

          <!-- Add to Cart -->
          <button
            @click="addToCart"
            class="btn inline-flex items-center"
            :aria-label="'Add to cart ' + title"
          >
            Add <span class="pl-2"><!--🛒--><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart w-[16px] h-[16px]"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg></span>
          </button>
        </div>
        </div>

      </div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  id: { type: [String, Number], required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, default: '' }
})

const emit = defineEmits(['add', 'wishlist'])

function formattedPrice(n) {
  return new Intl.NumberFormat('fi-FI', { style: 'currency', currency: 'EUR' }).format(n)
}

function addToCart() {
  emit('add', {
    id: props.id,
    title: props.title,
    price: props.price,
    image: props.image
  })
}

const { favorites, addToFavorites, removeFromFavorites } = useFavorites()

// Сheck if the product is already in favorites
const isFavorite = computed(() =>
  favorites.value.some(item => item.id === props.id)
)

function toggleFavorite() {
  if (isFavorite.value) {
    removeFromFavorites(props.id)
  } else {
    addToFavorites({
      id: props.id,
      title: props.title,
      price: props.price,
      image: props.image,
      category: props.category
    })
  }
}
</script>


