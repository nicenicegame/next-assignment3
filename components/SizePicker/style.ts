import styled, { css } from 'styled-components'

type SizeButtonProps = {
  selected: boolean
}

export const StyledSizePicker = styled.div`
  display: flex;
  gap: 4px;
`

export const SizeButton = styled.button<SizeButtonProps>`
  cursor: pointer;
  padding: 12px 10.5px;
  font-size: 16px;
  border: 1px solid ${(props) => (props.selected ? '#6BBBFF' : '#bebebe')};
  background-color: white;
  border-radius: 4px;

  ${(props) =>
    props.selected &&
    css`
      background-color: #6bbbff;
      color: white;
    `}

  &:disabled {
    cursor: not-allowed;
  }
`
