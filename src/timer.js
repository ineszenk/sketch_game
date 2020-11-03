import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "./game";
import { getPrediction } from "./helpers.js";

export default function Timer({ theCanvas, model, labels }) {
  let { next, current, dispatch } = useContext(GameContext);
  const [seconds, setSeconds] = useState(10);
  let [Prediction, setPrediction] = useState(""); // Sets default label to empty string.

  useEffect(() => {
    setTimeout(() => {
      if (seconds === 0) {
        console.log(theCanvas);
        getPrediction(theCanvas, model).then(prediction => {
          setPrediction(labels[prediction[0]]);
          labels[prediction[0]] === labels[current]
            ? dispatch({ type: "increment" })
            : console.log("Try Again !");
        });
        setSeconds(10);
        next();
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
  });

  return [seconds, setSeconds];
}
