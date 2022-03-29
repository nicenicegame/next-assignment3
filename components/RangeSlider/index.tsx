import React, { useMemo, useState } from 'react'
import { StyledRangeSlider, SliderBackground } from './style'

type RangeSliderProps = {
  min: number
  max: number
  step: number
  onRangeChange: (firstValue: number, secondValue: number) => void
}

const RangeSlider = ({ min, max, step, onRangeChange }: RangeSliderProps) => {
  const [firstSliderValue, setFirstSldierValue] = useState<number>(min)
  const [secondSliderValue, setSecondSliderValue] = useState<number>(max)

  const firstSliderBgWidth = useMemo(
    () => ((firstSliderValue - min) * 100) / (max - min),
    [firstSliderValue, min, max]
  )

  const secondSliderBgWidth = useMemo(
    () => ((secondSliderValue - min) * 100) / (max - min),
    [secondSliderValue, min, max]
  )

  const onFirstSliderValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const firstValue = +e.target.value
    if (firstValue >= secondSliderValue) return
    setFirstSldierValue(firstValue)
    onRangeChange(firstValue, secondSliderValue)
  }

  const onSecondSliderValueChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const secondValue = +e.target.value
    if (secondValue <= firstSliderValue) return
    setSecondSliderValue(secondValue)
    onRangeChange(firstSliderValue, secondValue)
  }

  return (
    <StyledRangeSlider>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={firstSliderValue}
        onChange={onFirstSliderValueChange}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={secondSliderValue}
        onChange={onSecondSliderValueChange}
      />
      <SliderBackground
        position="left"
        width={firstSliderBgWidth}
        label={`$ ${firstSliderValue}`}
      />
      <SliderBackground
        position="right"
        width={secondSliderBgWidth}
        label={`$ ${secondSliderValue}`}
      />
    </StyledRangeSlider>
  )
}

export default RangeSlider
