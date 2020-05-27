import React, { Component } from "react";
import ShopItem from "./ShopItem";
import { connect } from "react-redux";
import { addToCart } from "../actions/cartActions";
export class Product extends Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.addToCart(this.props.product.id);
  };
  render() {
    const { product } = this.props;
    return (
      <ShopItem
        item={product}
        button={
          <button className="btn btn-primary" onClick={this.handleClick}>
            Add to Cart
          </button>
        }
      />
    );
  }
}

export default connect(null, { addToCart })(Product);
