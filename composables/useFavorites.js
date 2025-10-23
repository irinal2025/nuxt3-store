import { ref } from 'vue'

const favorites = ref([])

export function useFavorites() {
  function addToFavorites(product) {
    if (!favorites.value.find(p => p.id === product.id)) {
      favorites.value.push(product)
    }
  }

  function removeFromFavorites(id) {
    favorites.value = favorites.value.filter(p => p.id !== id)
  }

  function isFavorite(id) {
    return favorites.value.some(p => p.id === id)
  }

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  }
}
