import React, { useEffect, useRef, useState } from 'react'

function TimerSingleProd(props) {
  let [counter, setCounter] = useState({})
  const timer = React.useRef(null)

  useEffect(() => {
    let timer = setInterval(function () {
      dateCounter(props.date)
    }, 1000)
    // checkIfEnded(timer)
    return () => clearInterval(timer)
  }, [props.date])

  const dateCounter = (date) => {
    let deadLine = new Date(date)

    deadLine.setDate(deadLine.getDate() + 30)

    let curentDate = new Date().getTime()

    let distance = deadLine.getTime() + 1 - curentDate

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24))
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((distance % (1000 * 60)) / 1000)

    let dateObj = {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    }

    setCounter(dateObj)

    checkIfEnded(deadLine)
  }
  const checkIfEnded = (deadLine) => {
    // let deadLine = new Date(date)
    console.log(deadLine.getTime() - Date.now())

    if (deadLine.getTime() - Date.now() <= 1) {
      console.log(props.ended)
      clearInterval(timer)
      props.setEnded(true)
    }
  }

  return (
    <React.Fragment>
      <span className="fw-bolder fs-6">
        <span>{counter.days}</span>
        <br />
        <p className=" h6">DAYS</p>
      </span>
      <span className="fw-bolder">
        <span>{counter.hours}</span>
        <br />
        <p className=" h6">HOURS</p>
      </span>
      <span className="fw-bolder">
        <span>{counter.minutes}</span>
        <br />
        <p className=" h6">MINUTES</p>
      </span>
      <span className="fw-bolder">
        <span>{counter.seconds}</span>
        <br />
        <p className=" h6">SECONDS</p>
      </span>
    </React.Fragment>
  )
}

export default TimerSingleProd
{
  /* <span>
{counter.days}
<br />
<p className="fw-bolder fs-6">DAYS</p>
</span>
<span>
{counter.hours}
<br />
<p className="fw-bolder fs-6">HOURS</p>

</span>
<span>
{counter.minutes}
<br />
<p className="fw-bolder fs-6">MINUTES</p>

</span>
<span>
{counter.seconds}
<br />
<p className="fw-bolder fs-6">SECONDS</p>
</span>
</React.Fragment> */
}