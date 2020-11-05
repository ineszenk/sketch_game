import React, { useEffect, useState, useContext, useReducer } from "react";
import * as tf from "@tensorflow/tfjs";
import { useRounds } from "./Round";
import { Controls } from "./Components/Control";
import { Canvas } from "./Components/Canvas";
import { Link } from "react-router-dom";

import { pointReducer } from "./reducer";

const model = tf.loadLayersModel(process.env.PUBLIC_URL + "/model/model.json");
const labels = require("./labels.json");
let ref = React.createRef();
const GameContext = React.createContext({});

function Game() {
  const [rounds, current, next, reset] = useRounds(labels);
  const [points, dispatch] = useReducer(pointReducer, 0);
  console.log(current);
  return (
    <div>
      {current > 9 ? (
        <div class="nes-container is-dark with-title">
          <h1 class="title">Sketch - End of the round</h1>
          <div>
            {points > 5 ? (
              <div>
                <p>You Win, well done !</p>
                <button type="button" class="nes-btn is-success">
                  You have scored {points}
                </button>
                <Link to="/Home">
                  <button type="button" class="nes-btn is-success">
                    You have scored {points}
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <h1>You've lost</h1>

                <p>Hmm...pretty sure you can do better!</p>
                <button type="button" class="nes-btn is-error">
                  You have scored {points}
                </button>
                <Link to="/Home">
                  <button type="button" class="nes-btn is-success">
                    You have scored {points}
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div class="nes-container is-dark with-title">
          <h1 class="title">Sketch - Round {current + 1} of 10</h1>
          <div>
            <GameContext.Provider
              value={{
                points,
                labels,
                rounds,
                current,
                next,
                reset,
                dispatch,
                ref,
                model
              }}
            >
              <Canvas ref={ref} />
              <Controls theCanvas={ref} model={model} labels={labels} />
              <p> {rounds[current]}</p>
              {/* <Timer theCanvas={ref} model={model} labels={labels} /> */}
              <p>
                Points : {points} / {current + 1}
              </p>
            </GameContext.Provider>
          </div>
        </div>
      )}
    </div>
  );
}

export { Game, GameContext };
