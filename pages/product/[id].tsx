import type {
  NextPage,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths
} from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import type { IProduct, IProducts, IVariant } from '../../types'
import {
  StyledProductDetail,
  ProductDetailCard,
  ProductDescriptionCard,
  ProductImage,
  ProductOptions,
  TopProductOptions,
  BottomProductOptions,
  AddToCartButton
} from '../../styles/ProductDetail'
import { HorizontalLine } from '../../styles/GlobalStyle'
import client from '../../client'
import { useState, useMemo } from 'react'
import _ from 'lodash'
import ColorSwatch from '../../components/ColorSwatch'
import LikeButton from '../../components/LikeButton'
import SizePicker from '../../components/SizePicker'
import BackButton from '../../components/BackButton'
import Spinner from '../../components/Spinner'
import Head from 'next/head'

type ProductDetailProps = {
  product: IProduct
}

const ProductDetail: NextPage<ProductDetailProps> = ({ product }) => {
  const availableColorVariants = useMemo(
    () => _.uniqBy(product.variants, 'color'),
    [product]
  )

  const router = useRouter()
  const [selectedColorVariant, setSelectedColorVariant] = useState<IVariant>(
    availableColorVariants[0]
  )
  const [selectedSizeVariant, setSelectedSizeVariant] =
    useState<IVariant | null>(null)
  const [quantity, setQuantity] = useState<number>(1)

  const sizesByColor = useMemo(
    () =>
      product.variants.filter(
        (variant) => variant.color === selectedColorVariant.color
      ),
    [selectedColorVariant, product.variants]
  )

  const onSelectColorVariant = (variant: IVariant) => {
    if (variant.color === selectedColorVariant.color) return
    setSelectedColorVariant(variant)
    setSelectedSizeVariant(null)
  }

  const onSelectSizeVariant = (varint: IVariant) => {
    if (varint.size === selectedSizeVariant?.size) return
    setSelectedSizeVariant(varint)
    setQuantity(1)
  }

  const onAddToCart = async () => {
    const cartItem = {
      sku: selectedSizeVariant?.sku,
      qty: quantity
    }
    const cartId = localStorage.getItem('cartId')
    if (!cartId) {
      const { data } = await client.post('/cart', cartItem)
      localStorage.setItem('cartId', data.id)
    } else {
      await client.put(`/cart/${cartId}`, cartItem)
    }
  }

  return (
    <StyledProductDetail className="container">
      <Head>
        <title>{product.name}</title>
      </Head>
      <ProductDetailCard>
        <ProductImage>
          <Image
            src={selectedColorVariant.imageUrl}
            alt={selectedColorVariant.sku}
            layout="fill"
            objectFit="cover"
            priority
          />
          <BackButton onGoBack={() => router.push('/')} />
        </ProductImage>
        <ProductOptions>
          <TopProductOptions>
            <h1 className="product-name">{product.name}</h1>
            <p className="muted-text">{product.brand}</p>
            <HorizontalLine margin="24px 0" />
            <p className="muted-text">Price</p>
            <p className="product-price">
              ${' '}
              {(
                selectedColorVariant.price - selectedColorVariant.discount
              ).toFixed(2)}{' '}
              {selectedColorVariant.discount !== 0 && (
                <span className="product-discount">
                  $ {selectedColorVariant.price}
                </span>
              )}
            </p>
            <HorizontalLine margin="32px 0 24px" />
            <p className="muted-text">Color</p>
            <ColorSwatch
              size="md"
              variants={availableColorVariants}
              selectedVariant={selectedColorVariant}
              onVariantChange={onSelectColorVariant}
            />
            <p className="muted-text product-size">Size</p>
            <SizePicker
              variants={sizesByColor}
              selectedVariant={selectedSizeVariant}
              onVariantChange={onSelectSizeVariant}
            />
            <HorizontalLine margin="3rem 0 0" />
          </TopProductOptions>
          <BottomProductOptions>
            <Spinner
              value={quantity}
              maxValue={selectedSizeVariant?.stock}
              onValueChange={(newValue) => setQuantity(newValue)}
            />
            <AddToCartButton
              id="add-to-cart"
              disabled={!selectedSizeVariant?.sku}
              onClick={onAddToCart}>
              Add To Cart
            </AddToCartButton>
            <LikeButton size="md" />
          </BottomProductOptions>
        </ProductOptions>
      </ProductDetailCard>
      <ProductDescriptionCard>
        <h4>Description</h4>
        <p>{product.description}</p>
      </ProductDescriptionCard>
    </StyledProductDetail>
  )
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { data: product } = await client.get<IProduct>(
    `/products/${context.params?.id}`
  )

  return {
    props: {
      product
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: products } = await client.get<IProducts>('/products')
  const paths = products.items.map((product: IProduct) => ({
    params: { id: product.id }
  }))

  return {
    paths,
    fallback: false
  }
}

export default ProductDetail
