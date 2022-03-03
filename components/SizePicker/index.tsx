import { IVariant } from '../../types'
import { StyledSizePicker, SizeButton } from './style'

type SizePickerProps = {
  variants: IVariant[]
  selectedVariant: IVariant | null
  onVariantChange: (variant: IVariant) => void
}

const SizePicker = ({
  variants,
  selectedVariant,
  onVariantChange
}: SizePickerProps) => {
  return (
    <StyledSizePicker id="size-container">
      {variants.map((variant) => (
        <SizeButton
          key={variant.size}
          selected={selectedVariant?.size === variant.size}
          disabled={variant.stock === 0}
          onClick={() => onVariantChange(variant)}>
          {variant.size}
        </SizeButton>
      ))}
    </StyledSizePicker>
  )
}

export default SizePicker
