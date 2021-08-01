import React from "react";
import { Switch, Route } from "react-router";
import GridProduct from "./Grid";
import EditProduct from "./Edit";

const Product = () => {
  return (
    <Switch>
      <Route path="/product/edit/:productId" component={EditProduct} />
      <Route component={GridProduct} />
    </Switch>
  );
};
export default Product;
