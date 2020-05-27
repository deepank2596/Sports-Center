import React, { Component } from "react";
import Product from "./Product";
import { connect } from "react-redux";

class ProductsGrid extends Component {
  render() {
    return (
      <div className="row mb-2 mt-3">
        {this.props.products.map((p, index) => (
          <Product key={index} product={p} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
});

export default connect(mapStateToProps)(ProductsGrid);
