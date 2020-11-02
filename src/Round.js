import React, { useState, useEffect } from "react";
import Timer from "./timer";

const RoundContext = React.createContext({});

function useRounds(labels) {
  let [currentRound, setCurrentRound] = useState(0);

  const rounds = Array.apply(null, {
    length: labels.length
  }).map((round, index) => <Round />);

  return [
    rounds,
    currentRound,
    () => setCurrentRound((currentRound + 1) % labels.length),
    () => setCurrentRound(0)
  ];
}

function Round() {
  return (
    <div>
      <RoundContext.Provider>
        <Timer />
      </RoundContext.Provider>
    </div>
  );
}

export { Round, useRounds, RoundContext };
