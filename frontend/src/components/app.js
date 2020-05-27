import React, { Component } from "react";
import NavBar from "./NavBar";
import ProductsPage from "./products/ProductsPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginForm from "./authforms/LoginForm";
import RegisterForm from "./authforms/RegisterForm";
import { Provider } from "react-redux";
import store from "../store/store";
import { loadUser } from "../actions/authActions";
import CartGrid from "./cart/CartGrid";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alert from "./commons/Alert";
import PrivateRoute from "./commons/PrivateRoute";
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

export class app extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
          <Alert />
          <Router>
            <div>
              <Switch>
                <Route exact path="/sports-center/">
                  <PrivateRoute component={ProductsPage} />
                </Route>
                <Route exact path="/cart">
                  <NavBar />
                  <CartGrid />
                </Route>
                <Route exact path="/login">
                  <LoginForm />
                </Route>
                <Route exact path="/register">
                  <RegisterForm />
                </Route>
              </Switch>
            </div>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default app;
