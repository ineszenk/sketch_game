import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "./Game";
import { Controls } from "./Components/Control";
import { getPrediction } from "./helpers.js";
const TimerContext = React.createContext({});

export default function Timer({ theCanvas, model, labels }) {
  let { next, current, dispatch } = useContext(GameContext);
  const [seconds, setSeconds] = useState(10);
  const [predict, setPredict] = useState(false);
  let [Prediction, setPrediction] = useState(""); // Sets default label to empty string.

  useEffect(() => {
    setTimeout(() => {
      getPrediction(theCanvas, model).then(prediction => {
        setPrediction(labels[prediction[0]]);
        if (labels[prediction[0]] === labels[current]) {
          dispatch({ type: "increment" });
          next();
          setPredict(true);
        } else {
          console.log("Try Again !");
        }
      });
      if (seconds === 0) {
        setSeconds(10);
        next();
      }
      if (predict && seconds !== 0) {
        setSeconds(10);
        setPredict(false);
      } else if (!predict && seconds !== 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
  });

  return (
    <div>
      {" "}
      <Controls
        theCanvas={theCanvas}
        model={model}
        labels={labels}
        setSeconds={setSeconds}
      />
      <p> Hurry up, you have {seconds} seconds left ! </p>
    </div>
  );
}

export { TimerContext };
