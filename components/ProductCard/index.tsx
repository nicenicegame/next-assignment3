import type { IProduct, IVariant } from '../../types'
import {
  StyledProductCard,
  ProductCardHeader,
  ProductCardImage,
  ProductCardFooter
} from './style'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useMemo } from 'react'
import _ from 'lodash'
import ColorSwatch from '../ColorSwatch'
import LikeButton from '../LikeButton'

type ProductCardProps = {
  product: IProduct
  showLikeButton?: boolean
}

const ProductCard = ({ product, showLikeButton }: ProductCardProps) => {
  const availableColorVariants = useMemo(() => {
    return _.uniqBy(product.variants, 'color')
  }, [product])

  const colors = useMemo(
    () => availableColorVariants.map((variant) => variant.color),
    [availableColorVariants]
  )

  const [selectedColorVariant, setSelectedColorVariant] = useState<IVariant>(
    availableColorVariants[0]
  )
  const router = useRouter()

  const navigateToDetail = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement

    if (target.classList.contains('color-variant') || target.id === 'like-btn')
      return

    router.push(`/product/${product.id}`)
  }

  return (
    <StyledProductCard
      hasLikeButton={!!showLikeButton}
      id={`product-card-${product.id}`}
      onClick={navigateToDetail}
    >
      <ProductCardHeader>
        <h4 className="product-name">{product.name}</h4>
        <p className="product-brand">{product.brand}</p>
      </ProductCardHeader>
      <ProductCardImage>
        <Image
          src={selectedColorVariant.imageUrl}
          alt={selectedColorVariant.sku}
          layout="fill"
          objectFit="cover"
          priority
        />
      </ProductCardImage>
      <ColorSwatch
        selectedStyle="circle"
        size="sm"
        colors={colors}
        selectedColor={selectedColorVariant.color}
        onColorChange={(color) =>
          setSelectedColorVariant(
            availableColorVariants.find((variant) => variant.color === color) ||
              availableColorVariants[0]
          )
        }
      />
      <ProductCardFooter hasLikeButton={!!showLikeButton}>
        <p className="price">
          {selectedColorVariant.discount !== 0 && (
            <span className="discount">
              $ {selectedColorVariant.price.toFixed(2)}
            </span>
          )}
          ${' '}
          {(selectedColorVariant.price - selectedColorVariant.discount).toFixed(
            2
          )}
        </p>
        {showLikeButton && <LikeButton size="sm" />}
      </ProductCardFooter>
    </StyledProductCard>
  )
}

export default ProductCard
