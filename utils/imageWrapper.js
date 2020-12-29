import UrlUtils from "./url";

const RESIZE_FACTORS_LARGE = [2, 1.5, 1, 0.7, 0.4];
const RESIZE_FACTORS_SMALL = [2, 1, 0.5];
const IMAGE_SIZE_BREAKPOINT = 320; /* Any image larger than this will have 5 sizes, otherwise it will have 3 */

const DEFAULT_OPTS = {
  defaultResizeFactor: 0.5,
};

export default class ImageWrapper {
  constructor(img, opts) {
    this.image = img;
    this.opts = Object.assign({}, DEFAULT_OPTS, opts);
    this._setDimensions();
    this._setResizeFactors();
    if (this.opts.boxWidth && this.opts.boxHeight) {
      this._setDimensionsFromBoxSize();
    }
  }

  getSrc() {
    return ImageWrapper.getResizedImageUrl(this.image.url, this.width, this.height);
  }

  getSrcSet() {
    return this.resizeFactors
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

  _setResizeFactors() {
    this.resizeFactors = this._getResizeFactors();
  }

  _getResizeFactors() {
    if (this.opts.resizeFactors) {
      return this.opts.resizeFactors;
    }
    if (this.width >= IMAGE_SIZE_BREAKPOINT || this.height >= IMAGE_SIZE_BREAKPOINT) {
      return RESIZE_FACTORS_LARGE;
    }
    return RESIZE_FACTORS_SMALL;
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
