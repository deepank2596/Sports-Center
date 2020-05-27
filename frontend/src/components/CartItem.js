import React, { Component } from "react";
import ShopItem from "./ShopItem";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/cartActions";
export class CartItem extends Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.removeFromCart(this.props.cartId);
  };
  render() {
    const { item } = this.props;
    return (
      <ShopItem
        item={item}
        button={
          <button className="btn btn-primary" onClick={this.handleClick}>
            Remove
          </button>
        }
      />
    );
  }
}

export default connect(null, { removeFromCart })(CartItem);
