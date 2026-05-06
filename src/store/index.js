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

const AUTH_STORAGE_KEY = 'onpath:auth'

const loadAuthState = () => {
  if (typeof window === 'undefined') return undefined
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return undefined
    const data = JSON.parse(raw)
    if (!data?.customerAccessToken || !data?.user) return undefined
    if (data.tokenExpiresAt && Date.now() > data.tokenExpiresAt) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY)
      return undefined
    }
    return {
      user: data.user,
      isAuthenticated: true,
      customerAccessToken: data.customerAccessToken,
      idToken: data.idToken ?? null,
      tokenExpiresAt: data.tokenExpiresAt ?? null,
      loading: false,
      error: null,
    }
  } catch {
    return undefined
  }
}

const saveAuthState = (auth) => {
  if (typeof window === 'undefined') return
  try {
    if (
      auth.isAuthenticated &&
      auth.customerAccessToken &&
      auth.user
    ) {
      window.localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({
          user: auth.user,
          customerAccessToken: auth.customerAccessToken,
          idToken: auth.idToken,
          tokenExpiresAt: auth.tokenExpiresAt,
        })
      )
    } else {
      window.localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  } catch {
    /* ignore */
  }
}

const preloadedCart = loadCartState()
const preloadedAuthSlice = loadAuthState()

const preloadedState = {
  ...(preloadedCart ? { cart: preloadedCart } : {}),
  ...(preloadedAuthSlice ? { auth: preloadedAuthSlice } : {}),
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    products: productReducer,
    blog: blogReducer,
  },
  preloadedState:
    Object.keys(preloadedState).length > 0 ? preloadedState : undefined,
})

let lastCart = store.getState().cart
store.subscribe(() => {
  const currentCart = store.getState().cart
  if (currentCart !== lastCart) {
    lastCart = currentCart
    saveCartState(currentCart)
  }
})

let lastAuth = store.getState().auth
store.subscribe(() => {
  const currentAuth = store.getState().auth
  if (currentAuth === lastAuth) return
  lastAuth = currentAuth
  saveAuthState(currentAuth)
})

export default store
