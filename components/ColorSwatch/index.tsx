import { IVariant } from '../../types'
import { StyledColorSwatch, ColorVariant } from './style'

type ColorSwatchProps = {
  variants: IVariant[]
  selectedVariant: IVariant
  onVariantChange: (variant: IVariant) => void
  size: 'sm' | 'md'
}

const options = {
  sm: 20,
  md: 30
}

const ColorSwatch = ({
  variants,
  selectedVariant,
  onVariantChange,
  size
}: ColorSwatchProps) => {
  return (
    <StyledColorSwatch id="swatch-container">
      {variants.map((variant) => (
        <ColorVariant
          key={variant.sku}
          selected={variant.color === selectedVariant.color}
          className="color-variant"
          color={variant.color}
          size={options[size]}
          onClick={() => onVariantChange(variant)}
        />
      ))}
    </StyledColorSwatch>
  )
}

export default ColorSwatch
