import styled, { css } from 'styled-components'

type SizeButtonProps = {
  selected: boolean
  selectedColor: 'blue' | 'black'
}

export const StyledSizePicker = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: nowrap;
`

export const SizeButton = styled.button<SizeButtonProps>`
  cursor: pointer;
  padding: 12px 10.5px;
  font-size: 16px;
  border: 1px solid #bebebe;
  background-color: white;
  border-radius: 4px;

  ${(props) =>
    props.selected &&
    css`
      background-color: ${props.selectedColor === 'blue' ? '#6bbbff' : 'black'};
      border-color: ${props.selectedColor === 'blue' ? '#6bbbff' : 'black'};
      color: white;
    `}

  &:disabled {
    cursor: not-allowed;
  }
`
