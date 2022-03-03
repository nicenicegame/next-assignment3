import { StyledSpinner } from './style'

type SpinnerProps = {
  value: number
  maxValue: number | undefined
  onValueChange: (value: number) => void
}

const Spinner = ({ value, maxValue, onValueChange }: SpinnerProps) => {
  return (
    <StyledSpinner id="spinner">
      <button onClick={() => onValueChange(value - 1)} disabled={value === 1}>
        -
      </button>
      <span>{value}</span>
      <button
        onClick={() => onValueChange(value + 1)}
        disabled={value === maxValue}>
        +
      </button>
    </StyledSpinner>
  )
}

export default Spinner
