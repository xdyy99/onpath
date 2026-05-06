import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  customerAccessToken: null,
  idToken: null,
  tokenExpiresAt: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.customerAccessToken = action.payload.customerAccessToken ?? null
      state.idToken = action.payload.idToken ?? null
      state.tokenExpiresAt = action.payload.tokenExpiresAt ?? null
      state.error = null
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload ?? null
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.loading = false
      state.error = null
      state.customerAccessToken = null
      state.idToken = null
      state.tokenExpiresAt = null
    },
    clearAuthError: (state) => {
      state.error = null
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, clearAuthError } =
  authSlice.actions
export default authSlice.reducer
