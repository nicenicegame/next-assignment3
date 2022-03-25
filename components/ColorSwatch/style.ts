import styled from 'styled-components'

type ColorVariantProps = {
  selected: boolean
  color: string
  size: number
}

export const ColorVariant = styled.div<ColorVariantProps>`
  cursor: pointer;
  border-radius: 50%;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  background-color: ${(props) => props.color};
  border: 2px solid
    ${(props) =>
      props.color === '#FFFFFF' ? 'rgba(222, 222, 222, 1)' : 'transparent'};
  outline: 2px solid ${(props) => (props.selected ? '#bebebe' : 'white')};
  outline-offset: 2px;
`

export const StyledColorSwatch = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`
