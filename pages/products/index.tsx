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
import { useRouter } from 'next/router'
import { ICategoryFilter } from '../../types'

const ProductsByCategory: NextPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectProducts)
  const variants = useAppSelector(selectVariants)
  const selectedColors = useAppSelector(
    (state) => state.category.selectedColors
  )
  const selectedSizes = useAppSelector((state) => state.category.selectedSizes)
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false)
  const [priceRange, setPriceRange] = useState<number[]>([100, 1200])
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    dispatch(fetchVariants())
  }, [dispatch])

  useEffect(() => {
    const sizes = router.query['sizes'] || []
    const colors = router.query['colors'] || []
    const params = { sizes, colors } as ICategoryFilter
    dispatch(fetchProductsByCategory(params))
    dispatch(updateSelectedColors(colors))
    dispatch(updateSelectedSizes(sizes))
  }, [dispatch, router.query])

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

  const onConfirm = () => {
    router.push(
      {
        pathname: '/products',
        query: {
          sizes: selectedSizes,
          colors: selectedColors
        }
      },
      undefined,
      { shallow: true }
    )
    setIsOptionsOpen(false)
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
      <Paginator
        maxPage={20}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <SideDrawer isOpen={isOptionsOpen} onCloseSideDrawer={onCloseSideDrawer}>
        <Content>
          <CardHeader>
            <h4>Filter & Sort</h4>
            <CardActions>
              <span onClick={onClearOptions}>Clear All</span>
              <span onClick={onCloseSideDrawer}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.1668 2.47837L15.5218 0.833374L9.00016 7.35504L2.4785 0.833374L0.833496 2.47837L7.35516 9.00004L0.833496 15.5217L2.4785 17.1667L9.00016 10.645L15.5218 17.1667L17.1668 15.5217L10.6452 9.00004L17.1668 2.47837Z"
                    fill="black"
                  />
                </svg>
              </span>
            </CardActions>
          </CardHeader>
          <p>Color</p>
          {variants.colors.length > 0 && (
            <ColorSwatch
              colors={variants.colors}
              selectedColor={selectedColors}
              size="md"
              selectedStyle="checked"
              onColorChange={onColorsChange}
            />
          )}
          <p>Size</p>
          {variants.sizes.length > 0 && (
            <SizePicker
              selectedColor="black"
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
        <ConfirmButton
          onClick={onConfirm}
          disabled={selectedColors.length === 0 && selectedSizes.length === 0}
        >
          Confirm
        </ConfirmButton>
      </SideDrawer>
    </StyledProductsByCategory>
  )
}

export default ProductsByCategory
