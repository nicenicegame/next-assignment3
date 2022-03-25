import { StyledSizePicker, SizeButton } from './style'

type SizePickerProps = {
  sizes: string[]
  selectedSize: string | undefined | string[]
  sizesStock?: number[]
  onSizeChange: (size: string) => void
  selectedColor: 'blue' | 'black'
}

const SizePicker = ({
  sizes,
  selectedSize,
  sizesStock,
  onSizeChange,
  selectedColor
}: SizePickerProps) => {
  return (
    <StyledSizePicker id="size-container">
      {sizes.map((size, sizeIndex) => (
        <SizeButton
          selectedColor={selectedColor}
          key={sizeIndex}
          selected={
            Array.isArray(selectedSize)
              ? selectedSize.includes(size)
              : selectedSize === size
          }
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
