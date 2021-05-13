const BACKGROUND_COLOR = {
  LIGHT: "light",
  DARK: "dark",
  WHITE: "white",
};

export const BACKGROUND_STYLE = {
  NONE: "none",
  DOTS_1: "dots1",
  DOTS_2: "dots2",
  DOTS_3: "dots3",
  DOTS_DOWN_LEFT_AND_RIHT: "dots-down-left-and-right",
  BLUE_OVAL: "blue-oval",
  BLUE_OVAL_LEFT_AND_DOTS_RIGHT: "blue-oval-left-and-dots-right",
  BLUE_OVAL_UP_LEFT_AND_RIHT: "blue-oval-up-left-and-right",
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
        return "";
    }
  }

  static getTitleColor(backgroundColor) {
    return backgroundColor === BACKGROUND_COLOR.DARK ? "text-secondary" : "text-primary-dark";
  }

  static getBackgroundStyle(style) {
    switch (style) {
      case BACKGROUND_STYLE.DOTS_1:
        return "dots1";
      case BACKGROUND_STYLE.DOTS_2:
        return "dots2";
      case BACKGROUND_STYLE.DOTS_3:
        return "dots3";
      case BACKGROUND_STYLE.DOTS_DOWN_LEFT_AND_RIHT:
        return "dots-down-left-and-right";
      case BACKGROUND_STYLE.BLUE_OVAL:
        return "blue-oval-bg";
      case BACKGROUND_STYLE.BLUE_OVAL_LEFT_AND_DOTS_RIGHT:
        return "blue-oval-left-and-dots-right-bg";
      case BACKGROUND_STYLE.BLUE_OVAL_UP_LEFT_AND_RIHT:
        return "blue-oval-up-left-and-right-bg";
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
