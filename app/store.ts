import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../features/products/productsSlice'
import variantsReducer from '../features/variants/variantsSlice'
import cartReducer from '../features/variants/cartSlice'

const store = configureStore({
  reducer: {
    products: productsReducer,
    variants: variantsReducer,
    cart: cartReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
