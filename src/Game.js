import React, { useReducer } from "react";
import * as tf from "@tensorflow/tfjs";
import { useRounds } from "./Round";
import { Controls } from "./Components/Control";
import { Canvas } from "./Components/Canvas";
import { Link } from "react-router-dom";
import "./App.css";

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
          <h1 class="title">Sketch - End of the game</h1>
          <div>
            {points > 5 ? (
              <div>
                <p>You Win, well done !</p>
                <button type="button" class="nes-btn is-success">
                  You have scored {points}
                </button>
                <Link to="/Home">
                  <button type="button" class="primary">
                    Click to try again !
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
                  <button type="button" class="primary">
                    Click to try again !
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div class="nes-container is-dark with-title">
          <h1 class="title">Sketch - Round {current + 1} of 10</h1>
          <Link to="/Home">
            <button type="button" class="primary" onClick={() => reset()}>
              Home
            </button>
          </Link>
          <div className="GameContainer">
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
              <div className="canvas">
                <p> {rounds[current]}</p>
                <Canvas ref={ref} />
                <button
                  type="button"
                  class="nes-btn is-warning"
                  onClick={() => {
                    const canvas = ref.current;
                    const ctx = canvas.getContext("2d");
                    ctx.fillRect(0, 0, canvas.height, canvas.width);
                  }}
                >
                  Clear the canvas.
                </button>
                <p>Points : {points}</p>
              </div>
              <div className="comments">
                <Controls theCanvas={ref} model={model} labels={labels} />
              </div>
            </GameContext.Provider>
          </div>
        </div>
      )}
    </div>
  );
}

export { Game, GameContext };
