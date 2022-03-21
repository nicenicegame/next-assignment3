import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { IProduct } from '../../types'

interface ProductsState {
  products: IProduct[]
}

const initialState: ProductsState = {
  products: []
} as ProductsState

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {}
})

export const {} = productsSlice.actions

export const selectProducts = (state: RootState) => state.products.products

export default productsSlice.reducer
