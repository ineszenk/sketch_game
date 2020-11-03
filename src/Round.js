import React, { useState } from "react";
import Timer from "./timer";

const RoundContext = React.createContext({});

function useRounds(labels) {
  let [currentRound, setCurrentRound] = useState(0);

  const rounds = Array.apply(null, {
    length: labels.length
  }).map((round, index) => <Round labelToDraw={labels[index]} />);

  return [
    rounds,
    currentRound,
    () => setCurrentRound((currentRound + 1) % 10),
    () => setCurrentRound(0)
  ];
}

function Round({ labelToDraw }) {
  // const timer = Timer();
  // const seconds = timer.seconds;
  // const SetSeconds = timer.setSeconds;

  return (
    <div>
      <RoundContext.Provider value={{ labelToDraw }}>
        <p>Draw a {labelToDraw} </p>
        {/* <p> Hurry up, you have {seconds} seconds left !</p> */}
      </RoundContext.Provider>
    </div>
  );
}

export { Round, useRounds, RoundContext };
