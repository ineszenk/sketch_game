import React, { useEffect, useState, useContext } from "react";
import { getPrediction } from "./helpers.js";
import * as tf from "@tensorflow/tfjs";
import { useRounds, RoundContext } from "./Round";
import { Link } from "react-router-dom";

const model = tf.loadLayersModel("./model/model.json");
const labels = require("./labels.json");
let ref = React.createRef();

function Controls({ theCanvas, model, labels }) {
  let [prediction, setPrediction] = useState(""); // Sets default label to empty string.
  let { nextRound, resetRounds } = useContext(RoundContext);

  useEffect(() => {
    console.log(prediction);
  });

  return (
    <div>
      <Link to="/">
        <button
          onClick={() => {
            resetRounds();
          }}
        >
          Home{" "}
        </button>
      </Link>
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
          getPrediction(theCanvas, model).then(prediction =>
            setPrediction(labels[prediction[0]])
          );
          nextRound();
        }}
      >
        Predict the drawing.
      </button>
    </div>
  );
}

const Canvas = React.forwardRef((props, ref) => {
  let mouseDown = false;
  let lastX;
  let lastY;

  function drawLine(canvas, x, y, lastX, lastY) {
    let context = canvas.getContext("2d");

    context.strokeStyle = "#000000";
    context.lineWidth = 12;
    context.lineJoin = "round";

    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();

    return [x, y];
  }

  const handleMouseup = () => {
    mouseDown = false;
    [lastX, lastY] = [undefined, undefined];
  };

  const handleMousemove = e => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (mouseDown) {
      [lastX, lastY] = drawLine(e.target, x, y, lastX, lastY);
    }
  };

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.height, canvas.width);
  });

  return (
    <canvas
      height={300}
      width={300}
      ref={ref}
      onMouseDown={() => (mouseDown = true)}
      onMouseUp={handleMouseup}
      onMouseMove={e => handleMousemove(e)}
    />
  );
});

function Game() {
  const [rounds, currentRound, nextRound, resetRounds] = useRounds(labels);

  return (
    <div>
      <div class="nes-container is-dark with-title">
        <h1 class="title">Sketch - Round {currentRound + 1} of 10</h1>
        <div className="game">
          <RoundContext.Provider
            value={{ rounds, currentRound, nextRound, resetRounds }}
          >
            <Canvas ref={ref} />
            <Controls theCanvas={ref} model={model} labels={labels} />
            {rounds[currentRound]}
          </RoundContext.Provider>
        </div>
      </div>
    </div>
  );
}

export { Game, Canvas, Controls };
