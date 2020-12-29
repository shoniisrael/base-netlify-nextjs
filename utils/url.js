export default class UrlUtils {
  static getUrlWithParameters(urlString) {
    const url = new URL(urlString);
    const params = Array.from(arguments).slice(1);
    while (params.length >= 2) {
      url.searchParams.set(params.shift(), params.shift());
    }
    return url.href;
  }
}
