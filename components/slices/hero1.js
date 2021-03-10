import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import Button from "./../common/button";
import ResponsiveImage from "../common/responsiveImage";
import TextUtils from "../../utils/text";

const BG_COLOR = {
  LIGHT: "lightblue",
  WHITE: "white",
  ALTERNATIVE: "alternative",
  DARK: "dark",
};

const BG_STYLE = {
  DOTS_1: "dots1",
  DOTS_2: "dots2",
  DOTS_3: "dots3",
};

class Hero1 extends Component {
  getBackgroundColorClasses(color) {
    switch (color) {
      case BG_COLOR.LIGHT:
        return "bg-primary-lighter";
      case BG_COLOR.ALTERNATIVE:
        return "bg-primary-light";
      case BG_COLOR.DARK:
        return "bg-primary-dark";
      default:
        return "bg-white";
    }
  }

  getBackgroundStyleClasses(color, style) {
    switch (style) {
      case BG_STYLE.DOTS_1:
        return "dots1";
      case BG_STYLE.DOTS_2:
        return color === BG_COLOR.DARK ? "dots2 dark" : "dots2";
      case BG_STYLE.DOTS_3:
        return "dots3";
      default:
        return "";
    }
  }

  getBackgroundClasses(style, bgColor) {
    return `${this.getBackgroundStyleClasses(bgColor, style)} ${this.getBackgroundColorClasses(
      bgColor,
    )}`;
  }

  checkIfSliceHasImages(leftImage, rightImage) {
    return Object.values(leftImage).length || Object.values(rightImage).length;
  }

  renderSmallTitle(bgColor, title) {
    if (TextUtils.hasRichText(title)) {
      const color = this.getSmallTitleColor(bgColor);
      return <div className={`text-sm uppercase pb-3 ${color}`}>{RichText.render(title)}</div>;
    }
  }

  getSmallTitleColor(bgColor) {
    return bgColor === BG_COLOR.DARK ? "text-secondary" : "text-primary-dark";
  }

  renderBigTitle(bgColor, title) {
    if (TextUtils.hasRichText(title)) {
      const textColor = this.getTextColor(bgColor);
      return (
        <div
          className={`py-4 font-bold text-2xl md:text-4xl text-center pb-3 lg:text-4_5xl xl:text-5xl lg:w-5/6 lg:pb-5 leading-6 ${textColor}`}
        >
          {RichText.render(title)}
        </div>
      );
    }
  }

  getTextColor(bgColor) {
    return bgColor === BG_COLOR.DARK ? "text-white" : "text-primary-dark";
  }

  renderDescription(bgColor, description) {
    if (TextUtils.hasRichText(description)) {
      const textColor = this.getTextColor(bgColor);

      return (
        <div className={`lg:w-5/6 pb-16 lg:text-lg md:px-10 px-8 ${textColor}`}>
          {RichText.render(description)}
        </div>
      );
    }
  }

  getContainerPaddingClasses(hasImages) {
    return hasImages ? "md:pb-6 lg:pb-20" : "";
  }

  getTextContainerPaddingClasses(hasImages) {
    return hasImages ? "lg:px-24" : "";
  }

  render() {
    const { primary } = this.props.slice;
    const {
      separator,
      description,
      background_style: bgStyle,
      background_color: bgColor,
      small_title: smallTitle,
      big_title: bigTitle,
      button_link: buttonLink,
      button_label: buttonLabel,
      button_style: buttonStyle,
      left_background_image: leftBgImage,
      right_background_image: rightBgImage,
    } = primary;
    const backgroundClasses = this.getBackgroundClasses(bgStyle, bgColor);
    const hasImages = this.checkIfSliceHasImages(leftBgImage, rightBgImage);
    const containerPaddingClasses = this.getContainerPaddingClasses(hasImages);
    const textContainerClasses = this.getTextContainerPaddingClasses(hasImages);

    return (
      <div
        className={`flex items-center mx-auto relative xl:h-3/4 ${backgroundClasses} ${containerPaddingClasses}`}
      >
        <div className="absolute bottom-0 left-0 w-1/4 lg:w-80 h-auto flex justify-start">
          <ResponsiveImage image={leftBgImage} sizes="(min-width:1280) 400px, 25vw" />
        </div>
        <div className="w-4/5 md:w-4/5 xl:w-3/5 mx-auto z-10">
          <div
            className={`p_py-2 flex flex-col justify-center items-center text-center py-16 md:py-24 ${textContainerClasses}`}
          >
            {this.renderSmallTitle(bgColor, smallTitle)}
            {this.renderBigTitle(bgColor, bigTitle)}
            {separator && <div className="separator" />}
            {this.renderDescription(bgColor, description)}
            <div>
              <Button link={buttonLink} label={buttonLabel} style={buttonStyle} />
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/4 lg:w-80 h-auto flex justify-end">
          <ResponsiveImage image={rightBgImage} sizes="(min-width:1280) 400px, 25vw" />
        </div>
      </div>
    );
  }
}

export default Hero1;
