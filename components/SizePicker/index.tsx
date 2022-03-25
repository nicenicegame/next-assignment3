import { StyledSizePicker, SizeButton } from './style'

type SizePickerProps = {
  sizes: string[]
  selectedSize: string | undefined
  sizesStock?: number[]
  onSizeChange: (size: string) => void
}

const SizePicker = ({
  sizes,
  selectedSize,
  sizesStock,
  onSizeChange
}: SizePickerProps) => {
  return (
    <StyledSizePicker id="size-container">
      {sizes.map((size, sizeIndex) => (
        <SizeButton
          key={sizeIndex}
          selected={selectedSize === size}
          disabled={
            sizesStock != undefined ? sizesStock[sizeIndex] === 0 : false
          }
          onClick={() => onSizeChange(size)}
        >
          {size}
        </SizeButton>
      ))}
    </StyledSizePicker>
  )
}

export default SizePicker
