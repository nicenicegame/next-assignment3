import { StyledColorSwatch, ColorVariant } from './style'

type ColorSwatchProps = {
  colors: string[]
  selectedColor: string
  onColorChange: (color: string) => void
  size: 'sm' | 'md'
}

const options = {
  sm: 20,
  md: 30
}

const ColorSwatch = ({
  colors,
  selectedColor,
  onColorChange,
  size
}: ColorSwatchProps) => {
  return (
    <StyledColorSwatch id="swatch-container">
      {colors.map((color, colorIndex) => (
        <ColorVariant
          key={colorIndex}
          selected={color === selectedColor}
          className="color-variant"
          color={color}
          size={options[size]}
          onClick={() => onColorChange(color)}
        />
      ))}
    </StyledColorSwatch>
  )
}

export default ColorSwatch
