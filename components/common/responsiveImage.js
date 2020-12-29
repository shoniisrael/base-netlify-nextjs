import React, { Component } from "react";
import ImageUtils from "../../utils/image";

// resize factors. The image comes in 2x size
const RESIZE_FACTORS = [1, 0.75, 0.5, 0.35, 0.2];
const DEFAULT_RESIZE_FACTOR = 0.5;

class ResponsiveImage extends Component {
  render() {
    const { image, sizes } = this.props;

    if (!image || !image.dimensions) {
      return;
    }

    if (!sizes) {
      throw new Error("ResponsiveImage requires the sizes property");
    }

    return (
      <picture>
        <img
          src={ImageUtils.getSrc(image, DEFAULT_RESIZE_FACTOR)}
          alt={image.alt}
          srcSet={ImageUtils.getSrcSet(image, RESIZE_FACTORS)}
          sizes={sizes}
        />
      </picture>
    );
  }
}

export default ResponsiveImage;
