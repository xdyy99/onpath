import { createSlice } from '@reduxjs/toolkit'
import { resolveVariantId } from '../../lib/shopifyVariants'

const initialState = {
  items: [],
  total: 0,
  totalQuantity: 0,
}

const buildLineId = (item) =>
  `${item.id}::${item.color ?? ''}::${item.size ?? ''}::${item.gender ?? ''}`

const recomputeTotals = (state) => {
  state.total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  state.totalQuantity = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )
}

/** Defaults for grid quick-add (matches Product.jsx initial selections). */
export const buildQuickAddPayload = (product) => {
  const color = product.color?.length ? product.color[0] : null
  const size = product.size?.length
    ? product.size[Math.min(1, product.size.length - 1)]
    : null
  const gender = product.gender?.length ? product.gender[0] : null
  return { ...product, color, size, gender }
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const payload = action.payload
      const color = payload.color ?? null
      const size = payload.size ?? null
      const gender = payload.gender ?? null
      const quantity = payload.quantity ?? 1
      const lineId = buildLineId({ id: payload.id, color, size, gender })

      const variantId = resolveVariantId({ ...payload, color, size, gender })

      const existing = state.items.find((item) => item.lineId === lineId)
      if (existing) {
        existing.quantity += quantity
      } else {
        state.items.push({
          ...payload,
          color,
          size,
          gender,
          variantId,
          quantity,
          lineId,
        })
      }
      recomputeTotals(state)
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.lineId !== action.payload)
      recomputeTotals(state)
    },
    updateQuantity: (state, action) => {
      const { lineId, quantity } = action.payload
      const item = state.items.find((item) => item.lineId === lineId)
      if (item) {
        item.quantity = quantity
        recomputeTotals(state)
      }
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.totalQuantity = 0
    },
  },
})

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions
export default cartSlice.reducer
