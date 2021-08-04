import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    // const isAuthenticated = window.localStorage.getItem("authAdmin");

    return (
        <Route {...rest} component={(props) => {
            if (isAuthenticated) {
                return <Component  {...rest} {...props} />
            } else {
                return <Redirect to={`/signin`} />
            }
        }}
        />
    );
};
export default PrivateRoute;
