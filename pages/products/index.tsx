import type { NextPage } from 'next'
import Link from 'next/link'
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
  fetchProductsByCategory,
  fetchVariants,
  selectProducts,
  selectVariants,
  setSelectedColors,
  setSelectedSizes,
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
  const pageData = useAppSelector((state) => state.category.pageData)

  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false)
  const [priceRange, setPriceRange] = useState<number[]>([100, 1200])
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    dispatch(fetchVariants())
  }, [dispatch])

  useEffect(() => {
    const sizes = router.query.sizes || []
    const colors = router.query.colors || []
    const params = { sizes, colors } as ICategoryFilter
    dispatch(fetchProductsByCategory(params))
    dispatch(setSelectedColors(colors as string[]))
    dispatch(setSelectedSizes(sizes as string[]))
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
    router.push(
      {
        pathname: '/products'
      },
      undefined,
      { shallow: true }
    )
    onCloseSideDrawer()
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
    onCloseSideDrawer()
  }

  return (
    <StyledProductsByCategory className="container">
      <BreadcrumbNav>
        <Nav>
          <Link href="/">
            <a>
              <h4>Home</h4>
            </a>
          </Link>
          <Link href="/products">
            <a>
              <h4 className="active">/ Adidas Original</h4>
            </a>
          </Link>
        </Nav>
        <OptionsButton id="filter-btn" onClick={() => setIsOptionsOpen(true)}>
          Filter & Sort
        </OptionsButton>
      </BreadcrumbNav>
      <ProductsGrid id={`product-list-page-${pageData.currentPage}`}>
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ProductsGrid>
      <Paginator
        maxPage={pageData.totalPage}
        currentPage={pageData.currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <SideDrawer
        id="filter-menu"
        isOpen={isOptionsOpen}
        onCloseSideDrawer={onCloseSideDrawer}
      >
        <Content>
          <CardHeader>
            <h4>Filter & Sort</h4>
            <CardActions>
              <button
                id="filter-menu-clear-all"
                disabled={!router.query.colors && !router.query.sizes}
                onClick={onClearOptions}
              >
                Clear All
              </button>
              <span id="filter-menu-close-btn" onClick={onCloseSideDrawer}>
                <svg
                  onClick={onCloseSideDrawer}
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
              id="filter-menu-color-swatch-container"
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
              id="filter-menu-size-container"
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
