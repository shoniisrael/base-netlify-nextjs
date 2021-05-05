const STYLE = {
  LIGHT: "light",
  DARK: "dark",
  WHITE: "white",
};

export default class StyleUtils {
  static getBackgroundStyle(style) {
    switch (style) {
      case STYLE.LIGHT:
        return "bg-primary-lighter";
      case STYLE.DARK:
        return "bg-primary-dark";
      case STYLE.WHITE:
        return "bg-primary-white";
      default:
        return "bg-white";
    }
  }
  static getTitleColor(style) {
    return style === STYLE.DARK ? "text-secondary" : "text-primary-dark";
  }

  getTextColor(style) {
    switch (style) {
      case STYLE.LIGHT:
        return "text-primary-dark";
      case STYLE.DARK:
        return "text-white";
      case STYLE.WHITE:
        return "text-primary font-medium";
      default:
        return "text-primary font-medium";
    }
  }
}
