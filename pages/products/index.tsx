import type { NextPage } from 'next'
import SideDrawer from '../../components/SideDrawer'
import Paginator from '../../components/Paginator'
import ProductCard from '../../components/ProductCard'
import {
  StyledProductsByCategory,
  BreadcrumbNav,
  Nav,
  OptionsButton,
  ProductsGrid,
  CardHeader,
  CardActions,
  ConfirmButton,
  Content
} from '../../styles/ProductsByCategory'
import { useEffect, useState } from 'react'
import RangeSlider from '../../components/RangeSlider'
import {
  clearAllSelectedOptions,
  fetchProductsByCategory,
  fetchVariants,
  selectProducts,
  selectVariants,
  updateSelectedColors,
  updateSelectedSizes
} from '../../features/category/categorySlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import ColorSwatch from '../../components/ColorSwatch'
import SizePicker from '../../components/SizePicker'

const ProductsByCategory: NextPage = () => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectProducts)
  const variants = useAppSelector(selectVariants)
  const selectedColors = useAppSelector(
    (state) => state.category.selectedColors
  )
  const selectedSizes = useAppSelector((state) => state.category.selectedSizes)
  const [priceRange, setPriceRange] = useState<number[]>([])

  useEffect(() => {
    dispatch(fetchVariants())
    dispatch(fetchProductsByCategory())
  }, [dispatch])

  const onCloseSideDrawer = () => setIsOptionsOpen(false)

  const onColorsChange = (color: string) => {
    dispatch(updateSelectedColors(color))
  }

  const onSizesChange = (size: string) => {
    dispatch(updateSelectedSizes(size))
  }

  const onRangeChange = (min: number, max: number) => {
    setPriceRange([min, max])
  }

  const onClearOptions = () => {
    dispatch(clearAllSelectedOptions())
  }

  return (
    <StyledProductsByCategory className="container">
      <BreadcrumbNav>
        <Nav>
          <h4>Home</h4>
          <h4 className="active">/ Adidas Original</h4>
        </Nav>
        <OptionsButton onClick={() => setIsOptionsOpen(true)}>
          Filter & Sort
        </OptionsButton>
      </BreadcrumbNav>
      <ProductsGrid>
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ProductsGrid>
      <Paginator />
      <SideDrawer isOpen={isOptionsOpen} onCloseSideDrawer={onCloseSideDrawer}>
        <Content>
          <CardHeader>
            <h4>Filter & Sort</h4>
            <CardActions>
              <span onClick={onClearOptions}>Clear All</span>
              <span onClick={onCloseSideDrawer}>X</span>
            </CardActions>
          </CardHeader>
          <p>Color</p>
          {variants.colors.length > 0 && (
            <ColorSwatch
              colors={variants.colors}
              selectedColor={selectedColors}
              size="md"
              onColorChange={onColorsChange}
            />
          )}
          <p>Size</p>
          {variants.sizes.length > 0 && (
            <SizePicker
              sizes={variants.sizes}
              selectedSize={selectedSizes}
              onSizeChange={onSizesChange}
            />
          )}
          <p>Price Range</p>
          <RangeSlider
            min={100}
            max={1200}
            step={100}
            onRangeChange={onRangeChange}
          />
        </Content>
        <ConfirmButton>Confirm</ConfirmButton>
      </SideDrawer>
    </StyledProductsByCategory>
  )
}

// export const getServerSideProps: GetServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const { data: products } = await client.get<IProducts>(
//     '/category/originals/products',
//     {
//       params: {
//         'size[]': '8 US',
//         'size[]': '5 US',
//         'colors[]': '#FFFFFF',
//         'colors[]': '#000000'
//       }
//     }
//   )

//   return {
//     props: {
//       products
//     }
//   }
// }

export default ProductsByCategory
