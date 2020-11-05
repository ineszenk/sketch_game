import React, { useContext, useEffect, useState } from "react";
import { getPrediction } from "../helpers.js";
import { GameContext } from "../Game";

const ControlContext = React.createContext({});

function Controls({ theCanvas, model, labels }) {
  let [prediction, setPrediction] = useState(""); // Sets default label to empty string.

  let { next, current, dispatch } = useContext(GameContext);
  const [seconds, setSeconds] = useState(10);
  const [predict, setPredict] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (current + 1 < 10) {
        getPrediction(theCanvas, model).then(prediction => {
          setPrediction(labels[prediction[0]]);
          if (labels[prediction[0]] === labels[current]) {
            seconds <= 5
              ? dispatch({ type: "increment" })
              : dispatch({ type: "bonus" });

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
            if (current + 1 <= 10) {
              getPrediction(theCanvas, model).then(prediction => {
                setPrediction(labels[prediction[0]]);
                setPredict(true);
                if (labels[prediction[0]] === labels[current]) {
                  seconds <= 5
                    ? dispatch({ type: "increment" })
                    : dispatch({ type: "bonus" });

                  next();
                } else {
                  alert("Sorry but no...try harder next round !");
                  next();
                }
              });
            }
          }}
        >
          Submit early{" "}
        </button>
        <p> Hurry up, you have {seconds} seconds left ! </p>
      </ControlContext.Provider>
    </div>
  );
}

export { Controls, ControlContext };
