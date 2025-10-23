// ~/composables/useCart.js
import { ref, watch } from 'vue'

export const cart = ref([])

export function useCart() {

  if (process.client && cart.value.length === 0) {
    const saved = localStorage.getItem('cart')
    cart.value = saved ? JSON.parse(saved) : []
  }

  function addToCart(product) {
    const existing = cart.value.find(i => i.id === product.id)
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
  }

  function removeFromCart(index) {
    cart.value.splice(index, 1)
  }

  function increaseQuantity(index) {
    cart.value[index].quantity++
  }

  function decreaseQuantity(index) {
    if (cart.value[index].quantity > 1) cart.value[index].quantity--
  }

  watch(cart, (newCart) => {
    if (process.client) localStorage.setItem('cart', JSON.stringify(newCart))
  }, { deep: true })

  return { cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }
}
