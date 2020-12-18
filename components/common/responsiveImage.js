import React, { Component } from "react";
class ResponsiveImage extends Component {
  render() {
    const { image, sizes = 'sizes="(min-width:768) 30vw, 90vw"' } = this.props;
    const { tablet, mobile } = image;

    const mobileSrc = mobile ? `${this.getImageSrc(mobile)} ${mobile.dimensions.width}w` : null;
    const tabletSrc = tablet ? `${this.getImageSrc(tablet)} ${tablet.dimensions.width}w` : null;
    const baseImageSrc = this.getImageSrc(image);
    const imageSrc = `${baseImageSrc} ${image.dimensions.width}w`;

    const image1_5xSrc = `${this.getUrlWithParameter(baseImageSrc, "dpr", "1.5")} ${
      image.dimensions.width * 1.5
    }w`;
    const image2xSrc = `${this.getUrlWithParameter(baseImageSrc, "dpr", "2")} ${
      image.dimensions.width * 2
    }w`;
    const webpSrcSet = [mobileSrc, tabletSrc, imageSrc, image1_5xSrc, image2xSrc]
      .filter((src) => src)
      .map((src) => {
        const [url, width] = src.split(" ");
        const webpUrl = this.getUrlWithParameter(url, "fm", "webp");
        return [webpUrl, width].join(" ");
      });

    const srcSet = [mobileSrc, tabletSrc, imageSrc, image1_5xSrc, image2xSrc]
      .filter((src) => src)
      .map((src) => `${src}`)
      .join(", ");
    return (
      <picture>
        <source type="image/webp" srcSet={webpSrcSet} />
        <img src={imageSrc} alt={image.alt} srcSet={srcSet} sizes={sizes} />
      </picture>
    );
  }
  getUrlWithParameter(imageUrl, key, value) {
    const url = new URL(imageUrl);
    url.searchParams.set(key, value);
    return url.toString();
  }

  getImageSrc(imageVariant) {
    return this.getUrlWithParameter(imageVariant.url, "width", imageVariant.dimensions.width);
  }
}

export default ResponsiveImage;
