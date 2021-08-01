import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FirebaseProvider from "./Components/FirebaseProvider";
import PrivateRoute from "./Components/PrivateRoute";
import { Registrasi, Login, NotFound, ForgotPassword } from "./Pages";
import Private from "./Pages/Privates";
import { ThemeProvider } from "@material-ui/styles";
// Import Css Baseline from material-ui for normalization browser

import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./Configs/Theme";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <FirebaseProvider>
          <Router>
            <Switch>
              <PrivateRoute path="/" exact component={Private} />
              <Route path="/registrasi" component={Registrasi} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <PrivateRoute path="/setting" component={Private} />
              <PrivateRoute path="/product" component={Private} />
              <PrivateRoute path="/transaction" component={Private} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </FirebaseProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
