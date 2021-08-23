import React, { useEffect, useState } from 'react'

function Timer(props) {
  let [counter, setCounter] = useState({})

  useEffect(() => {
    let timer = setInterval(function () {
      dateCounter(props.date)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const dateCounter = (date) => {
    let deadLine = new Date(date)

    deadLine.setDate(deadLine.getDate() + 30)
    let curentDate = new Date().getTime()
    // console.log(deadLine);

    let distance = deadLine.getTime() + 1 - curentDate
    // console.log(distance);

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24))
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((distance % (1000 * 60)) / 1000)
    // setCounter({
    //   days: days,
    //   hours: hours,
    //   minutes: minutes,
    //   seconds: seconds,
    // });
    // console.log(seconds);

    let dateObj = {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    }
    console.log('works')

    setCounter(dateObj)
  }
  return (
    <span>
      {counter.days} days {counter.hours} hours {counter.minutes} min{' '}
      {counter.seconds} sec
    </span>
  )
}

export default Timer
