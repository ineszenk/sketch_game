import React, { useEffect, useState, useContext, useReducer } from "react";
import * as tf from "@tensorflow/tfjs";
import { useRounds } from "./Round";
import { Controls } from "./Components/Control";
import { Canvas } from "./Components/Canvas";

import { pointReducer } from "./reducer";

const model = tf.loadLayersModel("./model/model.json");
const labels = require("./labels.json");
let ref = React.createRef();
const GameContext = React.createContext({});

function Game() {
  const [rounds, current, next, reset] = useRounds(labels);
  const [points, dispatch] = useReducer(pointReducer, 0);

  return (
    <div>
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
    </div>
  );
}

export { Game, GameContext };
