import React, { Component } from "react";

class Image extends Component {
  render() {
    const { image = {} } = this.props;
    return <img src={image.url} alt={image.alt} />;
  }
}

export default Image;
