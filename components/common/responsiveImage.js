import React, { Component } from "react";
class ResponsiveImage extends Component {
  render() {
    const { image, sizes } = this.props;
    if (!Object.values(image).length) {
      return null;
    }
    const width2X = image.dimensions.width;

    if (!sizes) {
      throw new Error("ResponsiveImage requires the sizes property");
    }

    //Image factors. The image comes in 2x size
    const img2x = 1;
    const img1_5x = 0.75;
    const imgDesktop = 0.5;
    const imgTablet = 0.35;
    const imgMobile = 0.2;

    const factors = [img2x, img1_5x, imgDesktop, imgTablet, imgMobile];

    const srcSet = factors
      .map((factor) => {
        let imageUrl = this.getResizedImageUrl(image, factor);
        imageUrl = this.addWidthDescriptor(imageUrl, Math.round(image.dimensions.width * factor));
        return imageUrl;
      })
      .join(", ");

    const webpSrcSet = factors
      .map((factor) => {
        let imageUrl = this.getResizedImageUrl(image, factor);
        imageUrl = this.getUrlWithParameter(imageUrl, "fm", "webp");
        imageUrl = this.addWidthDescriptor(imageUrl, Math.round(image.dimensions.width * factor));
        return imageUrl;
      })
      .join(", ");

    return (
      <picture>
        <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
        <img
          src={this.getUrlWithParameter(image.url, "w", width2X)}
          alt={image.alt}
          srcSet={srcSet}
          sizes={sizes}
        />
      </picture>
    );
  }

  getResizedImageUrl(image, factor) {
    const width = Math.round(image.dimensions.width * factor);
    const height = Math.round(image.dimensions.height * factor);
    let imageUrl = this.getUrlWithParameter(image.url, "w", width);
    return this.getUrlWithParameter(imageUrl, "h", height);
  }

  getUrlWithParameter(imageUrl, key, value) {
    const url = new URL(imageUrl);
    url.searchParams.set(key, value);
    return url.href;
  }

  addWidthDescriptor(src, width) {
    return `${src} ${width}w`;
  }
}

export default ResponsiveImage;
