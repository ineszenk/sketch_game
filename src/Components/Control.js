import React, { useContext, useEffect, useState } from "react";
import { getPrediction } from "../helpers.js";
import { GameContext } from "../Game";
import { useTimer } from "../timer";

const ControlContext = React.createContext({});

function Controls({ theCanvas, model, labels }) {
  let [predict, setPredict] = useState(false);
  const [timer, seconds] = useTimer({ predict, setPredict });

  let [Prediction, setPrediction] = useState(""); // Sets default label to empty string.

  let { next, current, dispatch } = useContext(GameContext);

  useEffect(() => {
    if (current + 1 < 10) {
      clearInterval(timer);
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
    }
  });
  return (
    <div>
      <ControlContext.Provider value={(theCanvas, model, labels)}>
        <div className="button_game">
          <p> Hurry up,</p>
          <p> you have {seconds} seconds left ! </p>
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
        </div>
      </ControlContext.Provider>
    </div>
  );
}

export { Controls, ControlContext };
