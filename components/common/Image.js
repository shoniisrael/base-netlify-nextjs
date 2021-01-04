import React, { Component } from "react";

class Image extends Component {
  render() {
    const { image = {}, classes } = this.props;
    if (!image.url) return null;
    return <img src={image.url} alt={image.alt} className={classes} />;
  }
}

export default Image;
