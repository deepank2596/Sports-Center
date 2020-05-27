import React, { Component } from "react";
import CartItem from "./CartItem";
import { connect } from "react-redux";

class CartGrid extends Component {
  render() {
    return (
      <div className="row mb-2 mt-3">
        {this.props.cart.map((item, index) => (
          <CartItem key={index} item={item.product} cartId={item.id} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});

export default connect(mapStateToProps)(CartGrid);
