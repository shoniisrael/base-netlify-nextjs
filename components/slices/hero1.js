import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import Button from "./../common/button";
import ResponsiveImage from "../common/responsiveImage";

export const BG_COLOR = {
  LIGHT: "lightblue",
  WHITE: "white",
  ALTERNATIVE: "alternative",
  DARK: "dark",
};

export const BG_STYLE = {
  DOTS_1: "dots1",
  DOTS_2: "dots2",
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
    const color = this.getSmallTitleColor(bgColor);
    return <div className={`text-sm uppercase pb-3 ${color}`}>{RichText.render(title)}</div>;
  }

  getSmallTitleColor(bgColor) {
    return bgColor === BG_COLOR.DARK ? "text-secondary" : "text-primary-dark";
  }

  renderBigTitle(bgColor, title) {
    const textColor = this.getTextColor(bgColor);
    return (
      <div
        className={`font-bold text-2xl text-center pb-3 md:text-2xl lg:text-4xl lg:w-5/6 lg:pb-5 leading-6 ${textColor}`}
      >
        {RichText.render(title)}
      </div>
    );
  }

  getTextColor(bgColor) {
    return bgColor === BG_COLOR.DARK ? "text-white" : "text-primary-dark";
  }

  renderDescription(bgColor, description) {
    const textColor = this.getTextColor(bgColor);
    return (
      <div className={`md:w-3/5 lg:w-3/4 pb-8 lg:text-lg md:px-10 px-8 ${textColor}`}>
        {RichText.render(description)}
      </div>
    );
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
        <div className="absolute bottom-0 left-0 w-1/4 md:w-1/5 2xl:w-1/12 h-auto flex justify-start">
          <ResponsiveImage
            image={leftBgImage}
            sizes="(min-width:1536) 8vw, (min-width:768) 20vw, 25vw"
          />
        </div>
        <div className="w-4/5 md:w-4/5 mx-auto z-10">
          <div
            className={`flex flex-col justify-center items-center text-center py-16 lg:py-24 ${textContainerClasses}`}
          >
            {this.renderSmallTitle(bgColor, smallTitle)}
            {this.renderBigTitle(bgColor, bigTitle)}
            {separator && <div className="separator" />}
            {this.renderDescription(bgColor, description)}
            <Button link={buttonLink} label={buttonLabel} style={buttonStyle} />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 md:w-1/5 lg:w-1/4 2xl:w-1/6 h-auto flex justify-end">
          <ResponsiveImage
            image={rightBgImage}
            sizes="(min-width:1536) 8vw, (min-width:768) 20vw, 25vw"
          />
        </div>
      </div>
    );
  }
}

export default Hero1;
