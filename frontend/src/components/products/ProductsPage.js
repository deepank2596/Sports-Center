import React, { Fragment } from "react";
import ProductsGrid from "./ProductsGrid";
import NavBar from "../NavBar";

const ProductsPage = () => {
  return (
    <Fragment>
      <NavBar />
      <ProductsGrid />
    </Fragment>
  );
};

export default ProductsPage;
