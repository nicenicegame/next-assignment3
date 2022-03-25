import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import client from '../../client'
import { IProduct, IProducts, IVariants } from '../../types'

interface ProductsCategory {
  products: IProduct[]
  variants: IVariants
}

const initialState: ProductsCategory = {
  products: [],
  variants: { colors: [], sizes: [], price: [] } as IVariants
}

export const fetchProductsByCategory = createAsyncThunk(
  'category/fetchProductsByCategory',
  async () => {
    const { data } = await client.get<IProducts>('category/originals/products')
    return data
  }
)

export const fetchVariants = createAsyncThunk(
  'category/fetchVariants',
  async () => {
    const { data } = await client.get<IVariants>('category/originals/variants')
    return data
  }
)

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchProductsByCategory.fulfilled,
      (state, action: PayloadAction<IProducts>) => {
        state.products = action.payload.items
      }
    ),
      builder.addCase(
        fetchVariants.fulfilled,
        (state, action: PayloadAction<IVariants>) => {
          state.variants = action.payload
        }
      )
  }
})

export const selectProducts = (state: RootState) => state.category.products

export const selectVariants = (state: RootState) => state.category.variants

export default categorySlice.reducer
