import { StyledColorSwatch, ColorVariant } from './style'

type ColorSwatchProps = {
  colors: string[]
  selectedColor: string | string[]
  onColorChange: (color: string) => void
  size: 'sm' | 'md'
  selectedStyle: 'circle' | 'checked'
  id: string
}

const options = {
  sm: 20,
  md: 30
}

const ColorSwatch = ({
  id,
  colors,
  selectedColor,
  onColorChange,
  size,
  selectedStyle
}: ColorSwatchProps) => {
  return (
    <StyledColorSwatch id={id}>
      {colors.map((color, colorIndex) => (
        <ColorVariant
          selectedStyle={selectedStyle}
          key={colorIndex}
          selected={
            Array.isArray(selectedColor)
              ? selectedColor.includes(color)
              : selectedColor === color
          }
          className="color-variant"
          color={color}
          size={options[size]}
          onClick={() => onColorChange(color)}
        >
          {selectedStyle === 'checked' && (
            <svg
              width="18"
              height="13"
              viewBox="0 0 18 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.00015 10.17L2.53015 6.69995C2.34317 6.51298 2.08957 6.40793 1.82515 6.40793C1.56072 6.40793 1.30712 6.51298 1.12015 6.69995C0.933168 6.88693 0.828125 7.14053 0.828125 7.40495C0.828125 7.53589 0.853914 7.66553 0.904019 7.7865C0.954124 7.90746 1.02756 8.01737 1.12015 8.10995L5.30015 12.29C5.69015 12.68 6.32015 12.68 6.71015 12.29L17.2901 1.70996C17.4771 1.52298 17.5822 1.26938 17.5822 1.00496C17.5822 0.740529 17.4771 0.486933 17.2901 0.299955C17.1032 0.112978 16.8496 0.00793457 16.5851 0.00793457C16.3207 0.00793457 16.0671 0.112978 15.8801 0.299955L6.00015 10.17Z"
                fill="white"
              />
            </svg>
          )}
        </ColorVariant>
      ))}
    </StyledColorSwatch>
  )
}

export default ColorSwatch
