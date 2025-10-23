<template>
  <section class="flex flex-col items-center justify-center h-screen text-center bg-gray-50 px-4">
    <div>
        <span class="text404 block !text-[128px] font-bold text-[#003F5A] mb-4 mt-4">404</span>
    </div>
    <h1 class="text-3xl font-semibold text-gray-600 mb-6">Page Not Found</h1>
    <p class="text-gray-500 mb-6">
      The page you are looking for doesn't exist.
    </p>

    <NuxtLink 
      to="/products" 
      class="uppercase px-6 py-3 bg-[#6494B4] text-[14px] text-white rounded hover:bg-[#003F5A] transition"
    >
      Go to Products
    </NuxtLink>
  </section>
</template>

<style scoped>
.text404 {
    font-size: 100px;
    letter-spacing: -0.05em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    font-family: 'Arial Black', Arial, sans-serif;
    text-transform: uppercase;
    color: #003F5A;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
}
@media screen and (min-width: 640px) {
    .text404 {
        font-size: 10vw;
    }
    
}
</style>