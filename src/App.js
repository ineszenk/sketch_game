import logo from "./logo.svg";
import "./App.css";
import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { Game } from "./Game";

function App() {
  return (
    <Router>
      <Game />
    </Router>
  );
}

export default App;
