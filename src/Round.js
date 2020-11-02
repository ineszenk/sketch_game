import React, { useState, useEffect } from "react";
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
  return (
    <div>
      <RoundContext.Provider value={{ labelToDraw }}>
        <Timer />
      </RoundContext.Provider>
    </div>
  );
}

export { Round, useRounds, RoundContext };
