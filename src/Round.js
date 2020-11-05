import React, { useState } from "react";

const RoundContext = React.createContext({});

// Use Round Custom Hook
function useRounds(labels) {
  let [currentRound, setCurrentRound] = useState(0);

  const rounds = Array.apply(null, {
    length: labels.length
  }).map((round, index) => <Round labelToDraw={labels[index]} />);

  return [
    rounds,
    currentRound,
    () =>
      currentRound < 10
        ? setCurrentRound(currentRound + 1)
        : setCurrentRound(currentRound),
    () => setCurrentRound(0)
  ];
}

function Round({ labelToDraw }) {
  return (
    <div>
      <RoundContext.Provider value={{ labelToDraw }}>
        <p>Please draw a {labelToDraw} </p>
      </RoundContext.Provider>
    </div>
  );
}

export { Round, useRounds, RoundContext };
