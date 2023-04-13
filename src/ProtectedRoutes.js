import React, { useEffect } from "react";
import { Route, useHistory, Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
function ProtectedRoutes({ component: Component, ...rest }) {
  const history = useHistory();
  const [cookies, setCookie] = useCookies(["token"]);
  let pass = true;
  console.log(rest, "rest");
  useEffect(() => {
    const token = cookies.token;
    console.log(token, "token in protected routes");
    if (!token) {
      return history.push("/login");
      pass = false;
    }
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    console.log(decodedToken.exp, currentTime, "decodedToken");
    if (decodedToken.exp < currentTime) {
      return history.push("/login");
      pass = false;
    } else {
      console.log("in else");
      if (rest.path == "/login") {
        return history.push("/");
      }
    }

    console.log(pass, "pass in protested");
  }, [history]);

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

export default ProtectedRoutes;
