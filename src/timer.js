import React, { useState, useEffect, useContext } from "react";
import { RoundContext } from "./Round";

export default function Timer() {
  const [seconds, setSeconds] = useState(20);
  const { labelToDraw } = useContext(RoundContext);

  useEffect(() => {
    setTimeout(() => {
      if (seconds === 0) {
        clearTimeout();
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
  });

  return (
    <div>
      <p>Draw a {labelToDraw} </p>
      <p> Hurry up, you have {seconds} seconds left !</p>
    </div>
  );
}
