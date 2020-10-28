import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import App from "./App";
import Home from "./Home";

function Root() {
  return (
    <BrowserRouter>
      <main>
        <Route exact path="/" component={Home} />
        <Route exact path="/Game" component={App} />
      </main>
    </BrowserRouter>
  );
}

export default Root;
