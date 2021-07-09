import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import ToDoComponent from "./todo"
import Forcast from "./forcast"

var createBrowserHistory = require("history").createBrowserHistory;
const history = createBrowserHistory();

const Router = () => {
  return (
    <HashRouter history={history}>
      <Switch>
        <Route exact path="/todo" component={ToDoComponent} />
        <Route exact path="/forcast" component={Forcast} />
        {/* <Route exact path="/blog/:title/:issueNumber" component={BlogPost}/> */}
      </Switch>
    </HashRouter>
  );
};

export default Router;