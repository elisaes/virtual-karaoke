import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./Register";
import Home from "./Home";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Home />} />

          <Route path="/Register" exact render={() => <Register />} />
          {/* <Route path="/login" exact render={() => <Login />} />
          <Route path="/game" exact render={() => <Space />} /> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
