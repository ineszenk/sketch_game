import "./App.css";
import React from "react";
import "nes.css/css/nes.min.css";
import TypedReact from "./Components/TypedReact";

class Home extends React.Component {
  onClick = () => {
    this.props.history.push("/Game");
  };

  render() {
    return (
      <div class="nes-container is-dark with-title is-centered">
        <h1 class="title">Welcome to the wonderful Sketch Game" </h1>
        <p>
          <TypedReact
            strings={[
              "This game has been modeled-off Google's  <a href='Quick, Draw'>Quick, Draw!</a> game, <p>and uses a sampling from the Quick, Draw! <a href='dataset'>dataset.</a></p>  <p>Brought to you by the EPFL Extension School.</p>"
            ]}
          />
        </p>

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
