import UrlUtils from "./url";

const DEFAULT_OPTS = {
  defaultResizeFactor: 0.5,
  resizeFactors: [2, 1.5, 1, 0.7, 0.4],
};

export default class ImageWrapper {
  constructor(img, opts) {
    this.image = img;
    this.opts = Object.assign({}, DEFAULT_OPTS, opts);
    this._setDimensions();
    if (this.opts.boxWidth && this.opts.boxHeight) {
      this._setDimensionsFromBoxSize();
    }
  }

  getSrc() {
    return ImageWrapper.getResizedImageUrl(this.image.url, this.width, this.height);
  }

  getSrcSet() {
    return this.opts.resizeFactors
      .map((factor) => {
        let imageUrl = this.getResizedImageUrlForFactor(factor);
        imageUrl = ImageWrapper.getUrlAndWidth(imageUrl, Math.round(this.width * factor));
        return imageUrl;
      })
      .join(", ");
  }

  _setDimensions() {
    this.width = Math.round(this.image.dimensions.width * this.opts.defaultResizeFactor);
    this.height = Math.round(this.image.dimensions.height * this.opts.defaultResizeFactor);
    this.aspectRatio = this.width / this.height;
  }

  _setDimensionsFromBoxSize() {
    const boxAspectRatio = this.opts.boxWidth / this.opts.boxHeight;
    if (boxAspectRatio < this.aspectRatio) {
      this.width = this.opts.boxWidth;
      this.height = Math.round(this.width / this.aspectRatio);
      return;
    }
    this.height = this.opts.boxHeight;
    this.width = Math.round(this.height * this.aspectRatio);
  }

  getResizedImageUrlForFactor(factor) {
    const width = Math.round(this.width * factor);
    const height = Math.round(this.height * factor);
    return ImageWrapper.getResizedImageUrl(this.image.url, width, height);
  }

  static getResizedImageUrl(imageUrl, width, height) {
    return UrlUtils.getUrlWithParameters(imageUrl, "w", width, "h", height);
  }

  static getUrlAndWidth(src, width) {
    return `${src} ${width}w`;
  }
}
