import styled, { css } from 'styled-components'

type StyledLikeButtonProps = {
  isLike: boolean
}

export const StyledLikeButton = styled.div<StyledLikeButtonProps>`
  cursor: pointer;
  min-width: 64px;
  min-height: 64px;
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
