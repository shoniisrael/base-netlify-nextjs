import React, { Component } from "react";
import ImageWrapper from "../../utils/imageWrapper";

class ResponsiveImage extends Component {
  render() {
    const { image, sizes, options, className } = this.props;

    if (!image || !image.dimensions) {
      return;
    }

    if (!sizes) {
      throw new Error("ResponsiveImage requires the sizes property");
    }

    const imageWrapper = new ImageWrapper(image, options);

    return (
      <picture>
        <img
          src={imageWrapper.getSrc()}
          alt={image.alt}
          srcSet={imageWrapper.getSrcSet()}
          sizes={sizes}
          className={className ?? ""}
        />
      </picture>
    );
  }
}

export default ResponsiveImage;
