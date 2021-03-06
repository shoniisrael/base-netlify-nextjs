import React, { Component } from "react";
import ImageWrapper from "../../utils/imageWrapper";
import { LazyLoadImage } from "react-lazy-load-image-component";

class ResponsiveImage extends Component {
  render() {
    const { image, sizes, options, className, style = {} } = this.props;

    if (!image || !image.dimensions) {
      return;
    }

    if (!sizes) {
      throw new Error("ResponsiveImage requires the sizes property");
    }

    const imageWrapper = new ImageWrapper(image, options);

    return (
      <picture>
        <LazyLoadImage
          src={imageWrapper.getSrc()}
          alt={image.alt ?? ""}
          srcSet={imageWrapper.getSrcSet()}
          sizes={sizes}
          className={className ?? ""}
          style={style}
        />
      </picture>
    );
  }
}

export default ResponsiveImage;
