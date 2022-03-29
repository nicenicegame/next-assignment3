import styled, { css } from 'styled-components'

type SliderBackgroundProps = {
  label: string | number
  width: number
  position: 'left' | 'right'
}

export const StyledRangeSlider = styled.div`
  margin-top: 30px;
  position: relative;
  background-color: #bebebe;
  height: 4px;
  border-radius: 8px;
  z-index: 1;

  input[type='range'] {
    position: absolute;
    width: 100%;
    -webkit-appearance: none;
    appearance: none;
    outline: none;
    background-color: transparent;
    pointer-events: none;

    ::-webkit-slider-runnable-track {
      height: 4px;
    }

    ::-moz-range-track {
      height: 4px;
    }

    ::-webkit-slider-thumb {
      cursor: pointer;
      pointer-events: all;
      -webkit-appearance: none;
      appearance: none;
      width: 30px;
      height: 30px;
      border-radius: 100%;
      border: 1px solid #bebebe;
      background-color: #ffffff;
      margin-top: -13px;
    }

    ::-moz-range-thumb {
      cursor: pointer;
      pointer-events: auto;
      border: none;
      border-radius: 0;
      width: 30px;
      height: 30px;
      border-radius: 100%;
      border: 1px solid #bebebe;
      background-color: #ffffff;
    }
  }
`

export const SliderBackground = styled.div<SliderBackgroundProps>`
  pointer-events: none;
  position: absolute;
  height: 4px;
  top: 0;
  width: ${(props) => props.width}%;

  ::after {
    pointer-events: none;
    content: '${(props) => props.label}';
    width: max-content;
    position: absolute;
    bottom: -40px;
    right: 0;
    transform: translateX(
      calc(100% - ${(props) => (props.width * 30) / 100}px)
    );
  }

  ${(props) =>
    props.position === 'left'
      ? css`
          z-index: -1;
          background-color: #bebebe;
        `
      : css`
          z-index: -2;
          background-color: #2c2c2c;
        `}
`
