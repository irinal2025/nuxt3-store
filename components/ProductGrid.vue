

<template>
  <section class="max-w-7xl mx-auto px-4 py-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-3xl font-bold !m-0">{{ title }}</h2>
      <span v-if="viewAllLink" class="text-sm text-gray-500">
        <NuxtLink :to="viewAllLink" class="hover:underline uppercase">
          View all<span class="text-xl pl-1 text-gray-800">&rsaquo;</span>
        </NuxtLink>
      </span>
    </div>

    <div v-if="pending" class="text-center">Loading...</div>
    <!--div v-else-if="error" class="text-center text-red-500">Error loading products</div-->
    <div v-else-if="error" class="text-center text-red-500">Something went wrong, please try again later.</div>

    <div v-else class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div
        v-for="product in displayedProducts"
        :key="product.id"
        class="bg-white rounded-xl shadow p-4 flex flex-col h-full justify-between"
      >
        <NuxtLink :to="`/products/${product.id}`" class="block">
          <!--img
            :src="product.image"
            :alt="product.title"
            class="w-full h-48 object-contain mb-2"
          /-->
          <NuxtImg
            :src="product.image"
            :alt="product.title"
            class="w-full h-48 object-contain mb-2"
            lazy
          />
          <h3 class="text-sm font-medium !text-slate-900 hover:!text-gray-700 line-clamp-2">
            {{ product.title }}
          </h3>
        </NuxtLink>
        <div>
        <p class="text-gray-600 mt-1">{{ formattedPrice(product.price) }}</p>
        <NuxtLink
          v-if="props.categories"
          :to="`/products?category=${product.category}`"
          class="text-gray-500 hover:text-gray-700"
        >
          <span v-if="props.categories" class="text-xs uppercase mt-2">
            {{ product.category }}
          </span>
        </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
const props = defineProps<{
  title: string
  products: any[] | null
  pending: boolean
  error: any
  start?: number
  end?: number
  viewAllLink?: string
  categories?: string[]
}>()

function formattedPrice(n) {
  return new Intl.NumberFormat('fi-FI', { style: 'currency', currency: 'EUR' }).format(n)
}
// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// If categories are provided, show one featured product per category
const featuredByCategory = computed(() => {
  if (!props.products || !props.categories) return []
  return props.categories.map(cat =>
    props.products.find(p => p.category.toLowerCase() === cat.toLowerCase())
  ).filter(Boolean)
})

// If categories are not provided, show products slice + shuffle
const displayedProducts = computed(() => {
  if (!props.products) return []
  if (props.categories) return featuredByCategory.value
  const sliced = props.products.slice(props.start ?? 0, props.end ?? props.products.length)
  return shuffleArray(sliced)
})
</script>
