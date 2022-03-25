import type { NextPage, GetStaticPropsContext, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import type { IProduct, IVariant } from '../../types'
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
  const [selectedSizeVariant, setSelectedSizeVariant] = useState<
    IVariant | undefined
  >()
  const [quantity, setQuantity] = useState<number>(1)

  const sizesByColor = useMemo(
    () =>
      product.variants.filter(
        (variant) => variant.color === selectedColorVariant.color
      ),
    [selectedColorVariant, product.variants]
  )

  const colors = useMemo(
    () => availableColorVariants.map((variant) => variant.color),
    [availableColorVariants]
  )
  const sizes = useMemo(
    () => sizesByColor.map((size) => size.size),
    [sizesByColor]
  )

  const onSelectColorVariant = (color: string) => {
    if (color === selectedColorVariant.color) return
    setSelectedColorVariant(
      availableColorVariants.find((variant) => variant.color === color) ||
        availableColorVariants[0]
    )
    setSelectedSizeVariant(undefined)
  }

  const onSelectSizeVariant = (size: string) => {
    if (size === selectedSizeVariant?.size) return
    setSelectedSizeVariant(
      sizesByColor.find((variant) => variant.size === size)
    )
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
              colors={colors}
              selectedColor={selectedColorVariant.color}
              onColorChange={onSelectColorVariant}
            />
            <p className="muted-text product-size">Size</p>
            <SizePicker
              sizes={sizes}
              selectedSize={selectedSizeVariant?.size}
              onSizeChange={onSelectSizeVariant}
              sizesStock={sizesByColor.map((variant) => variant.stock)}
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
              onClick={onAddToCart}
            >
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

export const getServerSideProps: GetServerSideProps = async (
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

export default ProductDetail
