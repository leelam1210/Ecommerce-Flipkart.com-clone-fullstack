import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './containers/HomePage';
import ProductListPage from './containers/ProductListPage';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, updateCart } from './redux/actions';
import ProductDetailsPage from './containers/ProductDetailsPage';
import CartPage from './containers/CartPage';
import CheckoutPage from './containers/CheckoutPage';
import OrderPage from './containers/OrderPage';
import OrderDetailsPage from './containers/OrderDetailsPage';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);



  useEffect(() => {
    dispatch(updateCart());
    if (!isAuthenticated) {
      dispatch(isUserLoggedIn());
    }
  }, [isAuthenticated]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/cart' exact component={CartPage} />
          <Route path='/checkout' component={CheckoutPage} />
          <Route path="/account/orders" component={OrderPage} />
          <Route path="/order_details/:orderId" component={OrderDetailsPage} />
          <Route path='/:productSlug/:productId/detail' component={ProductDetailsPage} />
          <Route path='/:slug' exact component={ProductListPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
