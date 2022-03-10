import styled, { css } from 'styled-components'

type StyledLikeButtonProps = {
  isLike: boolean
  size: number
}

export const StyledLikeButton = styled.div<StyledLikeButtonProps>`
  cursor: pointer;
  min-width: ${(props) => props.size}px;
  min-height: ${(props) => props.size}px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => (props.isLike ? 'transparent' : '#c4c4c4')};
  background-color: ${(props) => (props.isLike ? '#6bbbff' : '#ffffff')};

  ${(props) =>
    props.isLike &&
    css`
      path {
        fill: white;
      }
    `}
`
