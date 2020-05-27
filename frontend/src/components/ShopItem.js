import React, { Component } from "react";

export class ShopItem extends Component {
  render() {
    const { item } = this.props;

    return (
      <div className="col-md-6">
        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div className="col p-4 d-flex flex-column position-static">
            <h3 className="mb-0">{item.name}</h3>
            <div className="mb-1 text-muted">Price : {item.price} Rs</div>
            <p className="card-text mb-auto">
              {item.description.substring(0, 50)}..
            </p>
            {this.props.button}
          </div>
          <div className="col-auto d-none d-lg-block">
            <a href={item.image}>
              <img
                className="bd-placeholder-img"
                width="200"
                height="250"
                src={item.image}
                aria-label="Placeholder: Thumbnail"
              ></img>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ShopItem;
