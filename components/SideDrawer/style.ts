import styled, { css } from 'styled-components'

type ShowableProps = {
  isActive: boolean
}

export const Backdrop = styled.div<ShowableProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.15);

  ${(props) =>
    props.isActive
      ? css`
          opacity: 1;
          pointer-events: all;
        `
      : css`
          opacity: 0;
          pointer-events: none;
        `}
`

export const Drawer = styled.div<ShowableProps>`
  position: fixed;
  padding: 4.5rem;
  width: 600px;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: white;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.15);

  ${(props) =>
    props.isActive
      ? css`
          opacity: 1;
          pointer-events: all;
        `
      : css`
          opacity: 0;
          pointer-events: none;
        `}

  p {
    font-size: 20px;
  }

  .drawer-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`
