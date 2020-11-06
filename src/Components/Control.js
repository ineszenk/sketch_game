import React, { useContext, useEffect, useState } from "react";
import { getPrediction } from "../helpers.js";
import { GameContext } from "../Game";
import { useTimer } from "../timer";

const ControlContext = React.createContext({});

function Controls({ theCanvas, model, labels }) {
  let [predict, setPredict] = useState(false);
  const [timer, seconds] = useTimer({ predict, setPredict });

  let { next, current, dispatch, points } = useContext(GameContext);

  console.log("points", points);

  useEffect(() => {
    if (current + 1 < 10) {
      clearInterval(timer);
      if (seconds === 0) {
        getPrediction(theCanvas, model).then(prediction => {
          console.log(prediction[0]);
          labels[prediction[0]] === labels[current]
            ? dispatch({ type: "increment" })
            : console.log("Try Again !");
        });
      }
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
                  // setPredict(true);
                  if (labels[prediction[0]] === labels[current]) {
                    dispatch({ type: "increment" });
                    next();
                    setPredict(true);
                  } else {
                    alert("Sorry but no...try harder next round !");
                    next();
                    setPredict(true);
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
