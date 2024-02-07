import { useEffect, useRef, useState } from "react";

function CountDown() {
  let [inputDate, setInputDate] = useState(null);
  let ref = useRef(-1);

  let [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  let [diff, setDiff] = useState(0);

  function startTimer() {
    ref.current = setInterval(() => {
      setDiff(new Date(inputDate) - new Date());
    }, 1000);
  }
  function calculateSeconds(diff) {
    let seconds = Math.trunc(diff / 1000);

    return seconds;
  }

  function calculateMinutes(diff) {
    let seconds = calculateSeconds(diff);

    let minutes = Math.trunc(seconds / 60);

    let actualSeconds = seconds - 60 * minutes;

    return { minutes, seconds: actualSeconds };
  }

  function calculateHours(diff) {
    let seconds = calculateSeconds(diff);

    let hours = Math.trunc(seconds / 3600);
    let remainingSeconds = seconds - 3600 * hours;

    if (remainingSeconds >= 60) {
      let { minutes, seconds } = calculateMinutes(remainingSeconds * 1000);

      return { hours, minutes, seconds };
    }

    return { hours, minutes: 0, seconds: remainingSeconds };
  }

  useEffect(() => {
    if (diff < 0) {
      setDiff(0);
      setTimer({ ...timer, seconds: 0, minutes: 0, hours: 0 });
      clearInterval(ref.current);
    }

    if (diff > 0 && diff < 60000) {
      let seconds = calculateSeconds(diff);
      setTimer({ ...timer, seconds: seconds, hours: 0, minutes: 0 });
    }
    if (diff >= 60000 && diff < 3600000) {
      let { minutes: actualMinutes, seconds: actualSeconds } =
        calculateMinutes(diff);
      setTimer({
        ...timer,
        minutes: actualMinutes,
        seconds: actualSeconds,
        hours: 0,
      });
    }

    if (diff >= 3600000 && diff < 86400000) {
      let {
        hours: actualHours,
        minutes: actualMinutes,
        seconds: actualSeconds,
      } = calculateHours(diff);
      setTimer({
        ...timer,
        hours: actualHours,
        minutes: actualMinutes,
        seconds: actualSeconds,
      });
    }
  }, [diff]);
  return (
    <>
      <input
        type="datetime-local"
        onChange={(e) => setInputDate(e.target.value)}
      ></input>
      <button onClick={startTimer}>Start</button>

      {diff}
      <div>
        <p>hours{timer.hours}</p>
        <p>minute{timer.minutes}</p>
        <p>seconds:{timer.seconds}</p>
      </div>
    </>
  );
}

export default CountDown;
