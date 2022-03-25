import styled, { css } from 'styled-components'

type ColorVariantProps = {
  selected: boolean
  color: string
  size: number
  selectedStyle: 'circle' | 'checked'
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

  ${(props) =>
    props.selectedStyle === 'circle'
      ? css`
          outline: 2px solid ${props.selected ? '#bebebe' : 'white'};
          outline-offset: 2px;
        `
      : css`
          display: flex;
          align-items: center;
          justify-content: center;

          svg {
            pointer-events: none;
            display: ${props.selected ? 'block' : 'none'};

            path {
              fill: ${props.color === '#FFFFFF' ? 'black' : 'white'};
            }
          }
        `}
`

export const StyledColorSwatch = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`
