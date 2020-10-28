import logo from "./logo.svg";
import "./App.css";
import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { Canvas, Controls, Game } from "./game";
import Home from "./Home";

function App() {
  return (
    <Router>
      <div class="nes-container is-dark with-title">
        <h1 class="title">Sketch - Round 10 of 10</h1>
        <Game />
      </div>
    </Router>
  );
}

export default App;
