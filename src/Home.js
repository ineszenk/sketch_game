import "./App.css";
import React from "react";
import "nes.css/css/nes.min.css";
import TypedReact from "./Components/TypedReact";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div class="nes-container is-dark with-title is-centered">
        <h1 class="title">Welcome to the wonderful Sketch Game</h1>
        <p>
          <TypedReact
            strings={[
              "This game has been modeled-off Google's  <a href='https://quickdraw.withgoogle.com/#'>Quick, Draw!</a> game, <p>and uses a sampling from the Quick, Draw! <a href='dataset'>dataset.</a></p>  <p>Brought to you by the EPFL Extension School.</p>"
            ]}
          />
        </p>
        <Link to="/Game">
          <button type="button" class="nes-btn is-primary">
            Play Game
          </button>
        </Link>
        <h6>
          Made with <i class="nes-icon is-small heart"></i> in Geneva
        </h6>
      </div>
    );
  }
}

export default Home;
