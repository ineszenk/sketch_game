import React, { useContext, useEffect, useState } from "react";
import { getPrediction } from "../helpers.js";
import { TimerContext } from "../timer";
import { GameContext } from "../game";
import { Link } from "react-router-dom";

const ControlContext = React.createContext({});

function Controls({ theCanvas, model, labels }) {
  let [prediction, setPrediction] = useState(""); // Sets default label to empty string.

  let { next, current, dispatch } = useContext(GameContext);
  const [seconds, setSeconds] = useState(10);
  const [clickPredict, setclickPredict] = useState(false);
  // let { seconds, setSeconds } = useContext(TimerContext);

  useEffect(() => {
    setTimeout(() => {
      if (seconds === 0) {
        console.log("LABELS", labels);
        getPrediction(theCanvas, model).then(prediction => {
          console.log(prediction[0]);
          setPrediction(labels[prediction[0]]);
          labels[prediction[0]] === labels[current]
            ? dispatch({ type: "increment" })
            : console.log("Try Again !");
        });
        setSeconds(10);
        next();
      }
      if (clickPredict && seconds !== 0) {
        setSeconds(10);
        setclickPredict(false);
      } else if (!clickPredict && seconds !== 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
  });
  return (
    <div>
      <ControlContext.Provider value={(theCanvas, model, labels)}>
        <button
          type="button"
          class="nes-btn is-warning"
          onClick={() => {
            const canvas = theCanvas.current;
            const ctx = canvas.getContext("2d");
            ctx.fillRect(0, 0, canvas.height, canvas.width);
          }}
        >
          Clear the canvas.
        </button>
        <button
          onClick={() => {
            setclickPredict(true);
            getPrediction(theCanvas, model).then(prediction => {
              setPrediction(labels[prediction[0]]);
              labels[prediction[0]] === labels[current]
                ? dispatch({ type: "increment" })
                : console.log("Try Again !");
            });
            next();
          }}
        >
          Predict the drawing.
        </button>
        <p> Hurry up, you have {seconds} seconds left ! </p>
      </ControlContext.Provider>
    </div>
  );
}

export { Controls, ControlContext };
