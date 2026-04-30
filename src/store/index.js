import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import authReducer from './slices/authSlice'
import productReducer from './slices/productSlice'
import blogReducer from './slices/blogSlice'

const CART_STORAGE_KEY = 'onpath:cart'

const loadCartState = () => {
  if (typeof window === 'undefined') return undefined
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return undefined
    const parsed = JSON.parse(raw)
    if (!parsed || !Array.isArray(parsed.items)) return undefined
    return {
      items: parsed.items,
      total: Number(parsed.total) || 0,
      totalQuantity: Number(parsed.totalQuantity) || 0,
    }
  } catch {
    return undefined
  }
}

const saveCartState = (cart) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  } catch {
    /* quota or privacy mode — ignore */
  }
}

const preloadedCart = loadCartState()

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    products: productReducer,
    blog: blogReducer,
  },
  preloadedState: preloadedCart ? { cart: preloadedCart } : undefined,
})

let lastCart = store.getState().cart
store.subscribe(() => {
  const currentCart = store.getState().cart
  if (currentCart !== lastCart) {
    lastCart = currentCart
    saveCartState(currentCart)
  }
})

export default store
