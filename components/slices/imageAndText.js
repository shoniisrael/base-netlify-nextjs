import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import Button from "./../common/button";
import ResponsiveImage from "../common/responsiveImage";
import TextUtils from "../../utils/text";

const STYLE = {
  LIGHT: "light",
  DARK: "dark",
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

class ImageAndText extends Component {
  getBackgroundColorClasses(style) {
    switch (style) {
      case STYLE.LIGHT:
        return "bg-primary-lighter top-left-shadow";
      case STYLE.DARK:
        return "bg-primary-dark";
      default:
        return "bg-white";
    }
  }

  getTitleColor(style) {
    return style === STYLE.DARK ? "text-secondary" : "text-primary-dark";
  }

  getTextColor(style) {
    return style === STYLE.DARK ? "text-white" : "text-primary-dark";
  }

  getFlexStyles(imagePosition, size) {
    const direction =
      imagePosition === IMAGE_ALIGNMENT.LEFT ? "md:flex-row" : "md:flex-row-reverse";
    const position = size === IMAGE_SIZE.MEDIUM ? "items-center" : "items-start";
    return `${direction} ${position}`;
  }

  getImageWidth(size) {
    return size === IMAGE_SIZE.MEDIUM ? "w-1/3" : "w-1/2";
  }

  getTextWidth(imageSize) {
    return imageSize === IMAGE_SIZE.MEDIUM ? "w-2/3" : "w-1/2";
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
    const imageWidth = this.getImageWidth(imageSize);
    const textWidth = this.getTextWidth(imageSize);
    return (
      <div className={`${bgClasses} w-full`}>
        <div
          className={`overflow-hidden flex flex-col container mx-auto w-full px-6 md:px-14 lg:px-28 pb-12 ${flexStyles} md:pt-20 lg:py-28`}
        >
          <div className={`py-10 md:py-0 md:${imageWidth} px-4 h-auto`}>
            <ResponsiveImage
              image={image}
              sizes="(min-width:1536) 648px, (min-width:768) 40vw, 75vw"
            />
          </div>
          <div className={`pb-8 md:${textWidth} px-4 md:px-12`}>
            <div className={`${titleColor} text-xs uppercase mb-8`}>
              {RichText.render(smallTitle)}
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
    const listClass = primary.list_columns === "2" ? "two-column-bullets" : "custom-line-bullets";
    return items.map((section, index) => {
      const { font_size: fontSize, big_title: bigTitle, rich_text: richText } = section;
      const textStyle = this.getTextStyle(fontSize);
      const titleStyle = this.getTitleStyle(fontSize);
      return (
        <div key={index}>
          {TextUtils.hasRichText(bigTitle) && (
            <div className={`${titleColor} ${titleStyle} font-bold`}>
              {RichText.render(bigTitle)}
            </div>
          )}
          {TextUtils.hasRichText(richText) && (
            <div className={`${textColor} ${listClass} ${textStyle}`}>
              {RichText.render(richText)}
            </div>
          )}
        </div>
      );
    });
  }
}

export default ImageAndText;
