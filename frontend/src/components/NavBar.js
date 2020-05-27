import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";

export class NavBar extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    this.props.logout();
  };
  render() {
    const { isAuthenticated, customer } = this.props;

    const guestLinks = (
      <ul className="navbar-nav mr-0 mt-2 mt-lg-0">
        <li className="nav-item mt-2 mx-2">
          <Link to="/login">Login</Link>
        </li>
        <li className="nav-item mt-2 mx-2">
          <Link to="/register">Register</Link>
        </li>
      </ul>
    );
    const authLinks = (
      <ul className="navbar-nav mr-0 mt-2 mt-lg-0">
        <li className="nav-item mt-3 mx-5">
          <Link to="/cart">
            Cart
            <span className="badge badge-light mx-1">
              {this.props.cart.length}
            </span>
          </Link>
        </li>

        <button
          className="btn btn-outline-danger my-2"
          type="submit"
          onClick={this.handleLogout}
        >
          Logout
        </button>
      </ul>
    );
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            Sports-Center
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active mt-3 mx-2">
                <Link to="/sports-center/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item mt-2 mx-2">
                <a className="nav-link text-danger" href="#">
                  {customer ? `Welcome ${customer.user.username}` : "Guest User"}
                </a>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  customer: state.auth.customer,
  isAuthenticated: state.auth.isAuthenticated,
  cart: state.cart.cart,
});

export default connect(mapStateToProps, { logout })(NavBar);
