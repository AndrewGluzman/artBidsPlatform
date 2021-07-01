import React, { useEffect, useState } from "react";

function TimerSingleProd(props) {
  let [counter, setCounter] = useState({});

  useEffect(() => {
    let timer = setInterval(function () {
      dateCounter(props.date);
    }, 1000);
    return () => clearInterval(timer);
  }, [props.date]);

  const dateCounter = (date) => {
    let deadLine = new Date(date);

    deadLine.setDate(deadLine.getDate() + 30);
    let curentDate = new Date().getTime();

    let distance = deadLine.getTime() + 1 - curentDate;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
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
    };
    
    setCounter(dateObj);
    console.log(counter.seconds + "blyat");
  };
  return (
    <React.Fragment>
      <span>{counter.days}<br/>days</span>
              <span>{counter.hours}<br/>hours</span>
              <span>{counter.minutes}<br/>minutes</span>
              <span>{counter.seconds}<br/>seconds</span>
    </React.Fragment>
  );
}

export default TimerSingleProd;
