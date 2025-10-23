<template>
  <section class="promo-section py-4 bg-gray-50">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-10 text-left">{{ title }}</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="(offer, index) in offers"
          :key="index"
          class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col"
        >
          <!-- Kuva tai emoji -->
          <div class="mb-4 text-center">
            <!--img
              v-if="offer.image"
              :src="offer.image"
              :alt="offer.heading"
              class="mx-auto w-full h-[160px] object-contain"
            /-->
            <NuxtImg
              v-if="offer.image"
              :src="offer.image"
              :alt="offer.heading"
              class="mx-auto w-full h-[160px] object-contain"
              lazy
          />
            <span v-else :class="offer.iconColor + ' text-4xl'">{{ offer.icon }}</span>
          </div>

          <div class="flex-grow">
            <h3 class="font-semibold text-xl mb-2">{{ offer.heading }}</h3>
            <p>{{ offer.description }}</p>
          </div>

          <div class="flex justify-center">
            <button
              v-if="offer.buttonText"
              class="btn mt-4 transition"
            >
              <NuxtLink
                v-if="offer.buttonText"
                :to="offer.link"
                class="btn mt-4 transition"
              >
                {{ offer.buttonText }}
              </NuxtLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
defineProps({
  title: { type: String, default: 'Current Offers' },
  offers: {
    type: Array,
    default: () => [
      {
        icon: '🛒',
        image: '/img/discount-1_1280.jpg', // Image takes precedence
        iconColor: 'text-blue-600',
        heading: 'Special Prices',
        description: 'Regular priced products -20% when you buy 2 items and -25% when you buy at least 3 items',
        buttonText: 'Shop Now',
        link: '/products'
      },
      {
        icon: '💳',
        image: '/img/online-shop-2_1280.png',
        iconColor: 'text-green-600',
        heading: 'Exclusive member offers',
        description: 'Our complimentary loyalty program offers you the ability to seamlessly earn points while enjoying unparalleled perks and promotions.',
        buttonText: 'Learn More',
        link: '/register'
      },
      {
        icon: '📦',
        image: '/img/online-shop-3_1280.jpg',
        iconColor: 'text-yellow-600',
        heading: 'See All Offers',
        description: 'Check out all our ongoing promotions and special deals',
        buttonText: 'View Offers',
        link: '/products'
      }
    ]
  }
})
</script>
