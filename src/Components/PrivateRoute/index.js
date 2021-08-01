import React from "react";
import { Route, Redirect } from "react-router";
import { useFirebase } from "../FirebaseProvider";

const PrivateRoute = ({ component: Component, ...restProps }) => {
    const { user } = useFirebase()
    return <Route {...restProps} render={(props) => (
      user ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { 
        from : props.location
      } }} /> )} />;
};

export default PrivateRoute;
