import * as React from "react";
import { render } from "react-dom";

import confirmReact, { confirmReactPromise } from "./Confirm/Confirm";

import "./styles.css";

class App extends React.Component {
  state = {
    confirmed: false
  };
  saveWithCallback = () => {
    confirmReact({
      title: "Are you sure?",
      onConfirm: () => {
        console.log("Confirmed");
        this.setState({
          confirmed: true
        });
      },
      onCancel: () => {
        console.log("Canceled");
        this.setState({
          confirmed: false
        });
      }
    });
  };
  saveWithPromiseAsync = async () => {
    const confirmed = await confirmReactPromise({
      title: "Are you sure?"
    });

    this.setState({
      confirmed: confirmed
    });
  };
  saveWithPromiseThen = () => {
    const confirmed = confirmReactPromise({
      title: "Are you sure?"
    });

    confirmed.then(confirmed => {
      this.setState({
        confirmed: confirmed
      });
    });
  };
  render() {
    return (
      <div className="App">
        <h1>React confirm alert</h1>
        <h2>Click on any of the buttons bellow to see the prompt</h2>
        <p>Inspired from https://github.com/GA-MO/react-confirm-alert</p>
        <p>No accessibiltiy testign yet... to be added</p>
        <button onClick={this.saveWithCallback}>Save with callback</button>
        <button onClick={this.saveWithPromiseAsync}>
          Save with promise (async/await)
        </button>
        <button onClick={this.saveWithPromiseThen}>
          Save with promise (then)
        </button>
        {this.state.confirmed && <p>Confirmed</p>}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
