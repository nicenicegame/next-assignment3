import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import client from '../../client'
import { IProduct, IProducts, IVariants } from '../../types'

interface ProductsCategory {
  products: IProduct[]
  variants: IVariants
  selectedColors: string[]
  selectedSizes: string[]
}

const initialState: ProductsCategory = {
  products: [],
  variants: { colors: [], sizes: [], price: [] } as IVariants,
  selectedColors: [],
  selectedSizes: []
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
  reducers: {
    updateSelectedColors: (state, action: PayloadAction<string>) => {
      const color = action.payload
      if (state.selectedColors.includes(color)) {
        state.selectedColors = state.selectedColors.filter((c) => c !== color)
      } else {
        state.selectedColors = [...state.selectedColors, color]
      }
    },
    updateSelectedSizes: (state, action: PayloadAction<string>) => {
      const size = action.payload
      if (state.selectedSizes.includes(size)) {
        state.selectedSizes = state.selectedSizes.filter((s) => s !== size)
      } else {
        state.selectedSizes = [...state.selectedSizes, size]
      }
    },
    clearAllSelectedOptions: (state) => {
      state.selectedColors = []
      state.selectedSizes = []
    }
  },
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

export const {
  updateSelectedColors,
  updateSelectedSizes,
  clearAllSelectedOptions
} = categorySlice.actions

export const selectProducts = (state: RootState) => state.category.products

export const selectVariants = (state: RootState) => state.category.variants

export default categorySlice.reducer
