import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Books from "./Books";

class Root extends Component {
  render() {
    return (
      <divv>
        <Switch>
          <Route exact path="/" component={Books} />
          <Route exact path="/Books/:_id.$oid" component={BookDetail} />
        </Switch>
      </divv>
    );
  }
}
