import styled, { createGlobalStyle, css } from 'styled-components'

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Rubik', sans-serif;
        overflow-x: hidden;
    }

    svg, i {
        pointer-events: none;
    }

    input, button, select {
        font-family: inherit;
    }

    .container {
        padding-left: 2rem;
        padding-right: 2rem;

        @media screen and (min-width: 1440px) {
            padding-left: unset;
            padding-right: unset;
            max-width: 1440px;
            margin-left: auto;
            margin-right: auto;
        }
    }

    .flex-grow-1 {
        flex: 1;
    }
`

type HorizontalLineProps = {
  margin?: string
}

export const HorizontalLine = styled.div<HorizontalLineProps>`
  width: 100%;
  height: 1px;
  background-color: #cecece;

  ${(props) =>
    props.margin &&
    css`
      margin: ${props.margin};
    `}
`
