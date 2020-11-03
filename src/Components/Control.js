import React, { useContext, useEffect, useState } from "react";
import { getPrediction } from "../helpers.js";
import { RoundContext } from "../Round";
import { GameContext } from "../game";
import { Link } from "react-router-dom";

const ControlContext = React.createContext({});

function Controls({ theCanvas, model, labels }) {
  let [prediction, setPrediction] = useState(""); // Sets default label to empty string.

  let { next, current, dispatch } = useContext(GameContext);

  useEffect(() => {
    console.log(prediction);
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
      </ControlContext.Provider>
    </div>
  );
}

export { Controls, ControlContext };
