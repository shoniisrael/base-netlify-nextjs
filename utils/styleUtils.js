const BACKGROUND_COLOR = {
  LIGHT: "light",
  DARK: "dark",
  WHITE: "white",
};

const BACKGROUND_STYLE = {
  DOTS_1: "dots1",
  DOTS_2: "dots2",
  DOTS_3: "dots3",
  BLUE_OVAL: "blue-oval",
};

export default class StyleUtils {

  static getBackgroundColor(color) {
    switch (color) {
      case BACKGROUND_COLOR.LIGHT:
        return "bg-primary-lighter";
      case BACKGROUND_COLOR.DARK:
        return "bg-primary-dark";
      case BACKGROUND_COLOR.WHITE:
        return "bg-primary-white";
      default:
        return "bg-white";
    }
  }

  static getTitleColor(backgroundColor) {
    return backgroundColor === BACKGROUND_COLOR.DARK ? "text-secondary" : "text-primary-dark";
  }

  static getBackgroundStyle(style) {
    switch (style) {
      case BACKGROUND_STYLE.DOTS_1:
        return "blue-oval-left-and-dots-right-bg";
      case BACKGROUND_STYLE.DOTS_2:
        return "dots2";
      case BACKGROUND_STYLE.DOTS_3:
        return "dots3";
      case BACKGROUND_STYLE.BLUE_OVAL:
        return "blue-top-right-oval-bg dots2";
      default:
        return "";
    }
  }

  getTextColor(backgroundColor) {
    switch (backgroundColor) {
      case BACKGROUND_COLOR.LIGHT:
        return "text-primary-dark";
      case BACKGROUND_COLOR.DARK:
        return "text-white";
      case BACKGROUND_COLOR.WHITE:
        return "text-primary font-medium";
      default:
        return "text-primary font-medium";
    }
  }
}
