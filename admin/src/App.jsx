import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from 'react-redux';
import Products from './containers/Products';

import { isUserLoggedIn, getInitialData } from './redux/actions';
import Orders from "./containers/Orders";
import Category from "./containers/Categorys";
import Pages from "./containers/Pages";

function App() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    //khi render lai kh bi nhay sang signin
    useEffect(() => {
        if (!isAuthenticated)
            dispatch(isUserLoggedIn());
        if (isAuthenticated)
            dispatch(getInitialData());
    }, [isAuthenticated]);

    return (
        <div className="App">
            {/* <Router> */}
            <Switch>
                <PrivateRoute path="/" exact component={Home} />
                <PrivateRoute path="/products" component={Products} />
                <PrivateRoute path="/orders" component={Orders} />
                <PrivateRoute path="/category" component={Category} />
                <PrivateRoute path="/page" component={Pages} />
                <Route path="/signin" component={Signin} />
                <Route path="/signup" component={Signup} />
            </Switch>
            {/* </Router> */}
        </div>
    );
}

export default App;
