import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAdmin } from "../services/Authservice";

const Protectedroute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/clientlist" /> // Non-admin users will be redirected
        )
      }
    />
  );
};

export default Protectedroute;
