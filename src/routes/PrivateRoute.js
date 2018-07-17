import {Redirect, Route} from "react-router-dom";
import authApi from "../api/AuthApi";
import React from "react";

/**
 * Private route that checks for authentication status. If authentication is invalid (i.e. not logged in, expired
 * token), the user will be redirected to the login page
 */
const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            authApi.authenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: props.location}
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;