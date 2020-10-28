import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import App from "./App";

function Root() {
  return (
    <BrowserRouter>
      <main>
        <Route exact path="/" component={App} />
        {/* <Route exact path="/Game" component= /> */}
      </main>
    </BrowserRouter>
  );
}

export default Root;
