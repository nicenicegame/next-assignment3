import { IVariant } from '../../types'
import { StyledColorSwatch, ColorVariant, Circle } from './style'

type ColorSwatchProps = {
  variants: IVariant[]
  selectedVariant: IVariant
  onVariantChange: (variant: IVariant) => void
}

const size = {
  sm: '',
  md: ''
}

const ColorSwatch = ({
  variants,
  selectedVariant,
  onVariantChange
}: ColorSwatchProps) => {
  return (
    <StyledColorSwatch id="swatch-container">
      {variants.map((variant) => (
        <ColorVariant
          key={variant.sku}
          selected={variant.color === selectedVariant.color}>
          <Circle
            className="color-circle"
            color={variant.color}
            onClick={() => onVariantChange(variant)}
          />
        </ColorVariant>
      ))}
    </StyledColorSwatch>
  )
}

export default ColorSwatch
