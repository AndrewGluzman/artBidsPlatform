import React, { useCallback, useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import './css/multiRangeSlider.css'

const MultiRangeSlider = ({ min, max, onChange, doApi }) => {
  const [minVal, setMinVal] = useState(min)
  const [maxVal, setMaxVal] = useState(max)
  const minValRef = useRef(min)
  const maxValRef = useRef(max)
  const range = useRef(null)

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  )

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal)
    const maxPercent = getPercent(maxValRef.current)

    if (range.current) {
      range.current.style.left = `${minPercent}%`
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [minVal, getPercent])

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current)
    const maxPercent = getPercent(maxVal)

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [maxVal, getPercent])

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal })
  }, [minVal, maxVal, onChange])

  const setRange = () => {
    doApi(minValRef.current, maxValRef.current)
  }
  return (
    <>
      <div className=" w-100 position-relative mb-5">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1)
            setMinVal(value)
            minValRef.current = value
          }}
          className="thumb thumb--left"
          style={{ zIndex: minVal > max - 100 && '5' }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1)
            setMaxVal(value)
            maxValRef.current = value
          }}
          className="thumb thumb--right"
        />

        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
          <div className="slider__left-value">{minVal}</div>
          <div className="slider__right-value">{maxVal}</div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center mt-5">
        <button
          onClick={() => {
            setRange()
          }}
          className="btn btn_filter text-white rounded-pill px-4 py-2  fw-bold"
        >
          FILTER
        </button>
        <p className=" ms-3 my-0 p-0">
          Price:${minValRef.current}-${maxValRef.current}+
        </p>
      </div>
    </>
  )
}

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default MultiRangeSlider
