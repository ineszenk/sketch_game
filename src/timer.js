import React, { useState, useEffect } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(20);

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
      <p>Please draw a ...</p>
      <p> Hurry up, you have {seconds} seconds left !</p>
    </div>
  );
}
