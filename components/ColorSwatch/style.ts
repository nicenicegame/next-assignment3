import styled from 'styled-components'

type ColorVariantProps = {
  selected: boolean
}

type CircleColorProps = {
  color: string
}

export const ColorVariant = styled.div<ColorVariantProps>`
  border-radius: 50%;
  height: 39px;
  width: 39px;
  border: 2px solid ${(props) => (props.selected ? '#bebebe' : 'white')};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Circle = styled.div<CircleColorProps>`
  cursor: pointer;
  background-color: ${(props) => props.color};
  border: 2px solid
    ${(props) =>
      props.color === '#FFFFFF' ? 'rgba(222, 222, 222, 1)' : 'transparent'};
  border-radius: 50%;
  height: 30px;
  width: 30px;
`

export const StyledColorSwatch = styled.div`
  display: flex;
  gap: 1rem;
`
