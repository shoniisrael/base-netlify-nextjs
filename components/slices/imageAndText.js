import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import Button from "./../common/button";
import ResponsiveImage from "../common/responsiveImage";
import TextUtils from "../../utils/text";
import { linkResolver } from "../../prismic-configuration";

const STYLE = {
  LIGHT: "light",
  DARK: "dark",
  WHITE: "white",
};

const IMAGE_ALIGNMENT = {
  LEFT: "left",
  RIGHT: "right",
};

const IMAGE_SIZE = {
  MEDIUM: "medium",
  LARGE: "large",
};

const TITLE_SIZE = {
  MEDIUM: "medium",
};
const BULLET_POINT = {
  GREEN_POINT: "green point",
  GREEN_LINE: "green line",
};

class ImageAndText extends Component {
  getBackgroundColorClasses(style) {
    switch (style) {
      case STYLE.LIGHT:
        return "bg-primary-lighter top-left-shadow";
      case STYLE.DARK:
        return "bg-primary-dark";
      case STYLE.WHITE:
        return "bg-primary-white";
      default:
        return "bg-white";
    }
  }

  getTitleColor(style) {
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
  getBulletPointStyle(style, columns) {
    switch (style) {
      case BULLET_POINT.GREEN_POINT:
        return columns === "2" ? "two-column-dot-bullets" : "custom-dot-list";
      case BULLET_POINT.GREEN_LINE:
        return columns === "2" ? "two-column-bullets" : "custom-line-bullets";
      default:
        return columns === "2" ? "two-column-bullets" : "custom-line-bullets";
    }
  }

  getFlexStyles(imagePosition, size) {
    const direction =
      imagePosition === IMAGE_ALIGNMENT.LEFT
        ? "flex-col md:flex-row"
        : "pt-20 flex-col-reverse md:flex-row-reverse";
    const position = size === IMAGE_SIZE.MEDIUM ? "items-center" : "items-start";
    return `${direction} ${position}`;
  }

  getImageWidth(size) {
    return size === IMAGE_SIZE.MEDIUM ? "w-1/3" : "w-1/2";
  }

  getTextWidth(imageSize) {
    return imageSize === IMAGE_SIZE.MEDIUM ? "w-2/3" : "w-1/2";
  }
  getTextPadding(imagePosition) {
    switch (imagePosition) {
      case IMAGE_ALIGNMENT.LEFT:
        return "md:pl-12 md:pr-0";
      case IMAGE_ALIGNMENT.RIGHT:
        return "md:pl-0 md:pr-12";
      default:
        return "md:px-0";
    }
  }

  getTextStyle(fontSize) {
    return fontSize === TITLE_SIZE.MEDIUM
      ? "text-sm pb-7 pt-2"
      : "p_leading-loose li_leading-loose text-base lg:text-lg p_mb-10";
  }

  getTitleStyle(fontSize) {
    return fontSize === TITLE_SIZE.MEDIUM ? "text-base" : "text-3xl pb-4 md:text-4xl lg:pb-8";
  }

  render() {
    const { primary } = this.props.slice;
    const {
      style,
      image,
      small_title: smallTitle,
      button_link: buttonLink,
      button_label: buttonLabel,
      button_style: buttonStyle,
      image_alignment: imageAlignment,
      image_size: imageSize,
    } = primary;
    const bgClasses = this.getBackgroundColorClasses(style);
    const titleColor = this.getTitleColor(style);
    const flexStyles = this.getFlexStyles(imageAlignment, imageSize);
    const textPadding = this.getTextPadding(imageAlignment);
    const imageWidth = this.getImageWidth(imageSize);
    const textWidth = this.getTextWidth(imageSize);
    return (
      <div className={`${bgClasses} w-full`}>
        <div
          className={`overflow-hidden flex container mx-auto w-full px-6 md:px-14 lg:px-28 pb-12 ${flexStyles} md:pt-20 lg:py-28`}
        >
          <div className={`py-10 md:py-0 md:${imageWidth} px-4 h-auto`}>
            <ResponsiveImage
              image={image}
              sizes="(min-width:1536) 648px, (min-width:768) 40vw, 75vw"
            />
          </div>
          <div className={`pb-8 md:${textWidth} px-4 ${textPadding}`}>
            <div className={`${titleColor} text-xs uppercase mb-8`}>
              {RichText.render(smallTitle, linkResolver)}
            </div>
            {this.renderRichTextSections()}
            {buttonLabel && (
              <div className="mt-16">
                <Button link={buttonLink} label={buttonLabel} style={buttonStyle} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  renderRichTextSections() {
    const { items, primary } = this.props.slice;
    const titleColor = this.getTitleColor(primary.style);
    const textColor = this.getTextColor(primary.style);
    const bulletPointStyle = this.getBulletPointStyle(primary.bullet_point, primary.list_columns);
    return items.map((section, index) => {
      const { font_size: fontSize, big_title: bigTitle, rich_text: richText } = section;
      const textStyle = this.getTextStyle(fontSize);
      const titleStyle = this.getTitleStyle(fontSize);
      return (
        <div key={index}>
          {TextUtils.hasRichText(bigTitle) && (
            <div className={`${titleColor} ${titleStyle} font-bold`}>
              {RichText.render(bigTitle, linkResolver)}
            </div>
          )}
          {TextUtils.hasRichText(richText) && (
            <div className={`${textColor} ${bulletPointStyle} ${textStyle}`}>
              {RichText.render(richText, linkResolver)}
            </div>
          )}
        </div>
      );
    });
  }
}

export default ImageAndText;
