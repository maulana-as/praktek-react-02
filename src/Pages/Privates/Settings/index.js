import React from "react";
import { Switch, Route, Redirect } from "react-router";
import UserSetting from "./UserSetting";
import StoreSetting from "./StoreSetting";

const Setting = () => {
  return (
    <Switch>
      <Route path="/setting/user" component={UserSetting} />
      <Route path="/setting/store" component={StoreSetting} />
      <Redirect to="/setting/user" />
    </Switch>
  );
};

export default Setting;
