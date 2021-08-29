import React, { useEffect, useRef, useState } from 'react'

function TimerSingleProd(props) {
  let [counter, setCounter] = useState({})
  let [timerCountEnd, setTimerCountEnd] = useState(false)
  const timer = React.useRef(null)

  const startTimer = () => {
    timer.current = setInterval(() => {
      dateCounter(props.date)
    }, 1000)
  }

  useEffect(() => {
    // let timer = setInterval(function () {
    //   dateCounter(props.date)
    // }, 1000)
    // checkIfEnded(timer)
    startTimer()
    return () => clearInterval(timer.current)
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
    if (deadLine.getTime() - Date.now() <= 0 || props.status > 0) {
      if (props.ended == false) {
        props.setEnded(true)
      }
      setTimerCountEnd(true)
      clearInterval(timer.current)
    }
  }

  return (
    <React.Fragment>
      {timerCountEnd ? (
        <div className="text-center w-100">
          <h3 className="">Auction Ended</h3>
        </div>
      ) : (
        <>
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
        </>
      )}
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
