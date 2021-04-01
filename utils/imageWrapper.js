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
    this.setDimensions();
    this.setResizeFactors();
    this.setBaseUrl();
    if (this.opts.maxWidth && this.opts.maxHeight) {
      this._setDimensionsFromMaxSize();
    }
  }

  getSrc() {
    return ImageWrapper.getResizedImageUrl(this.baseUrl, this.width, this.height);
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

  setDimensions() {
    this.width = Math.round(this.image.dimensions.width * this.opts.defaultResizeFactor);
    this.height = Math.round(this.image.dimensions.height * this.opts.defaultResizeFactor);
    this.aspectRatio = this.width / this.height;
  }

  setResizeFactors() {
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

  _setDimensionsFromMaxSize() {
    const maxAspectRatio = this.opts.maxWidth / this.opts.maxHeight;
    if (maxAspectRatio < this.aspectRatio) {
      this.width = this.opts.maxWidth;
      this.height = Math.round(this.width / this.aspectRatio);
      return;
    }
    this.height = this.opts.maxHeight;
    this.width = Math.round(this.height * this.aspectRatio);
  }

  setBaseUrl() {
    this.baseUrl = this.image.url;
    if (this.opts.imgix) {
      const params = Object.keys(this.opts.imgix).reduce((accum, item) => {
        return [...accum, item, this.opts.imgix[item]];
      }, []);
      this.baseUrl = UrlUtils.getUrlWithParameters(this.baseUrl, ...params);
    }
  }

  getResizedImageUrlForFactor(factor) {
    const width = Math.round(this.width * factor);
    const height = Math.round(this.height * factor);
    return ImageWrapper.getResizedImageUrl(this.baseUrl, width, height);
  }

  static getResizedImageUrl(imageUrl, width, height) {
    return UrlUtils.getUrlWithParameters(imageUrl, "w", width, "h", height);
  }

  static getUrlAndWidth(src, width) {
    return `${src} ${width}w`;
  }
}
