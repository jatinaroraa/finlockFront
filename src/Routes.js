import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./mainPages/login/Login";
import Home from "./mainPages/home/home";

export default function Routes() {
  let token = localStorage.getItem("token");
  console.log(token, "route file");
  return (
    <Switch>
      <ProtectedRoutes exact path="/login" component={Login} />

      <ProtectedRoutes exact path="/" component={Home} />

      {/* <Route component={PageNotFound} /> */}
    </Switch>
  );
}
