import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage
} from 'next'
import client from '../../client'
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
  ConfirmButton
} from '../../styles/ProductsByCategory'
import { IProducts } from '../../types'
import { useEffect, useState } from 'react'
import RangeSlider from '../../components/RangeSlider'
import {
  fetchProductsByCategory,
  fetchVariants,
  selectProducts,
  selectVariants
} from '../../features/category/categorySlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import ColorSwatch from '../../components/ColorSwatch'
import { ColorVariant } from '../../components/ColorSwatch/style'
import SizePicker from '../../components/SizePicker'

const ProductsByCategory: NextPage = () => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectProducts)
  const variants = useAppSelector(selectVariants)

  const [selectedColor, setSelectedColor] = useState<string>(variants.colors[0])
  const [selectedSizes, setSelectedSizes] = useState<string>(variants.sizes[0])
  const [priceRange, setPriceRange] = useState<number[]>([])

  useEffect(() => {
    dispatch(fetchVariants())
    dispatch(fetchProductsByCategory())
  }, [dispatch])

  const onCloseSideDrawer = () => setIsOptionsOpen(false)

  const onRangeChange = (min: number, max: number) => {
    setPriceRange([min, max])
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
        <div className="flex-grow-1">
          <CardHeader>
            <h4>Filter & Sort</h4>
            <CardActions>
              <span>Clear All</span>
              <span onClick={onCloseSideDrawer}>X</span>
            </CardActions>
          </CardHeader>
          <p>Color</p>
          {variants.colors.length > 0 && (
            <ColorSwatch
              colors={variants.colors}
              selectedColor={selectedColor}
              size="sm"
              onColorChange={(color) => setSelectedColor(color)}
            />
          )}
          <p>Size</p>
          {variants.sizes.length > 0 && (
            <SizePicker
              sizes={variants.sizes}
              selectedSize={selectedSizes}
              onSizeChange={(size) => setSelectedSizes(size)}
            />
          )}
          <p>Price Range</p>
          <RangeSlider
            min={100}
            max={1200}
            step={100}
            onRangeChange={onRangeChange}
          />
        </div>
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
