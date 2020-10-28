import logo, { ReactComponent } from "./logo.svg";
import "./App.css";
import React from "react";
import "nes.css/css/nes.min.css";
import { Redirect } from "react-router-dom";

class Home extends React.Component {
  onClick = () => {
    this.props.history.push("/Game");
  };

  render() {
    return (
      <div class="nes-container is-dark with-title is-centered">
        <h1 class="title">Welcome to the wonderful Sketch Game</h1>
        <p>
          This game has been modeled-off Google's{" "}
          <a href="Quick, Draw!">Quick, Draw!</a> game, and uses a sampling from
          the Quick, Draw! <a href="dataset">dataset</a>.
        </p>
        <p>Brought to you by the EPFL Extension School.</p>

        <button
          onClick={this.onClick}
          onSubmit={this.onClick}
          type="button"
          class="nes-btn is-primary"
        >
          Play Game
        </button>
        <h6>
          Made with <i class="nes-icon is-small heart"></i> in Geneva
        </h6>
      </div>
    );
  }
}

export default Home;
