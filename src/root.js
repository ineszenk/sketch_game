import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import App from "./App";
import Home from "./Home";

function Root() {
  return (
    <Router>
      <Switch>
        <Route path="/Home">
          <Home />
        </Route>
        <Route path="/Game">
          <App />
        </Route>
      </Switch>
    </Router>
  );
}

export default Root;
