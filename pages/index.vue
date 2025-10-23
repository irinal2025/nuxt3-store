<template>
  <section class="relative h-90 bg-[#003F5A]">
  <!-- Hero Section -->
  <div class="relative flex items-center justify-center h-full text-white text-center px-6 md:px-12">
    <div class="max-w-3xl text-center mx-auto py-10">
      <h1 class="text-4xl md:text-6xl font-bold mb-4 !text-gray-200">Welcome to ÑShop</h1>
      <h2 class="text-2xl md:text-4xl font-bold mb-6 !text-gray-200">Your Friendly Online Store!</h2>
      <NuxtLink to="/products" class="uppercase bg-white text-[#003F5A] py-2 px-6 rounded-full text-[14px] font-semibold hover:bg-gray-100 inline-block mt-4">Shop Now</NuxtLink>
    </div>
  </div>
</section>

<IntroSection id="intro">
  <template #default>
    <p>Discover our selection of products in a friendly and simple online shopping experience. DemoShop is a practice project for learning modern web development, designed to help you explore features like browsing products, adding items to the cart, and checking out - all in a safe demo environment.</p>

    <p>Browse our categories, explore featured products, and enjoy a smooth, easy-to-use interface. Whether you&apos;re testing the store or just exploring, we hope you find it fun and informative!</p>
  </template>
</IntroSection>


    <!--AppAlert>
      This is an auto-imported component
    </AppAlert-->

  <!-- Show 1 product from each category -->
  <ProductGrid
    title="New In"
    :products="products"
    :pending="pending"
    :error="error"
    :categories="categories"
    :viewAllLink="'/products'"
  />
  
    <!-- Best Sellers -->
  <ProductGrid
    title="Best Sellers"
    :products="products"
    :pending="pending"
    :error="error"
    :start="4"
    :end="8"
    :viewAllLink="'/products'"
  />



<PromoSection />


  <section class="max-w-7xl mx-auto px-4 py-8">
    <h2 class="text-3xl font-bold mb-6 text-left">Shop by Category</h2>
  <CategoryLinks :showAll="false" />
</section>


<section class="bg-[#6494B4] py-12 relative">
      <!-- Hover Area -->
    <div
      class="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100 bg-gray-800 bg-opacity-50">
      <span class="text-white text-3xl font-bold">We&apos;re Building, Please Wait! 😎</span>
    </div>

  <div class="max-w-2xl mx-auto text-center">
    <h2 class="text-2xl font-bold mb-4">Stay Updated!</h2>
    <p class="mb-6 text-gray-700">Subscribe to our newsletter for latest products and offers.</p>
    <form class="flex flex-col sm:flex-row gap-2 justify-center">
      <input type="email" placeholder="Your email" class="p-2 rounded-lg border border-gray-300 flex-1 text-white" />
      <button type="submit" class="btn !border-1 !border-[#003F5A]">Subscribe</button>
    </form>
  </div>
</section>

</template>


<script setup>
  const config = useRuntimeConfig()
  const { data: products, pending, error } = await useFetch(`${config.public.NUXT_API_BASE}/products`)

  const newInProducts = computed(() => products.value?.slice(0, 4) ?? [])
  const bestSellers = computed(() => products.value?.slice(4, 8) ?? [])

  const categories = ["women\'s clothing", "men\'s clothing", "jewelery", "electronics"]

  useHead({
    title: 'ÑShop',
    meta: [
      { name: 'description', content: 'Welcome to ÑShop, your friendly online store for a variety of products. Shop now and enjoy a seamless shopping experience!' }
    ] 
  })
</script>
