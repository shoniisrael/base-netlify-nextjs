import UrlUtils from "./url";

export default class ImageUtils {
  static getSrc(image, resizeFactor) {
    return this.getResizedImageUrl(image, resizeFactor);
  }

  static getSrcSet(image, resizeFactors) {
    return resizeFactors
      .map((factor) => {
        let imageUrl = this.getResizedImageUrl(image, factor);
        imageUrl = this.getUrlAndWidth(imageUrl, Math.round(image.dimensions.width * factor));
        return imageUrl;
      })
      .join(", ");
  }

  static getResizedImageUrl(image, factor) {
    const width = Math.round(image.dimensions.width * factor);
    const height = Math.round(image.dimensions.height * factor);
    return UrlUtils.getUrlWithParameters(image.url, "w", width, "h", height);
  }

  static getUrlAndWidth(src, width) {
    return `${src} ${width}w`;
  }
}
