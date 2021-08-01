import React from "react";
import { Switch, Route } from "react-router";

import Setting from "./Settings";
import Product from "./Products";
import Transaction from "./Transaction";
import Home from "./Home";
const Private = () => {
  return (
    <Switch>
      <Route>
        <Route path="/setting" component={Setting} />
        <Route path="/product" component={Product} />
        <Route path="/transaction" component={Transaction} />
        <Route component={Home} />
      </Route>
    </Switch>
  );
};
export default Private;
