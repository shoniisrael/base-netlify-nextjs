import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import Button from "./../common/button";
import ResponsiveImage from "../common/responsiveImage";
import TextUtils from "../../utils/text";
import StyleUtils, { BACKGROUND_COLOR, BACKGROUND_STYLE } from "../../utils/styleUtils";
import { linkResolver } from "../../prismic-configuration";

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
        : "flex-col-reverse md:flex-row-reverse";
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
      header_title: headerTitle,
      header_description: headerDescription,
      small_title: smallTitle,
      button_link: buttonLink,
      button_label: buttonLabel,
      button_style: buttonStyle,
      image_alignment: imageAlignment,
      image_size: imageSize,
    } = primary;

    const bgClasses = `${StyleUtils.getBackgroundColor(style)} 
    ${StyleUtils.getBackgroundStyle(
      BACKGROUND_COLOR.LIGHT === style ? BACKGROUND_STYLE.BLUE_OVAL_UP_LEFT : "",
    )}`;
    const titleColor = StyleUtils.getTitleColor("", style);
    const flexStyles = this.getFlexStyles(imageAlignment, imageSize);
    const textPadding = this.getTextPadding(imageAlignment);
    const imageWidth = this.getImageWidth(imageSize);
    const textWidth = this.getTextWidth(imageSize);
    const topPadding = primary.join_top ? "-mt-20" : "md:pt-20 lg:py-28";
    const hasHeaderTitle = TextUtils.hasRichText(headerTitle);
    const hasHeaderDescription = TextUtils.hasRichText(headerTitle);
    return (
      <div className={`${bgClasses} w-full`}>
        <div className={topPadding}>
          {hasHeaderTitle && hasHeaderDescription && (
            <div className="flex flex-col justify-between items-center text-center pt-10 md:pt-0 md:w-3/5 px-12 lg:px-28 mx-auto">
              {hasHeaderTitle && (
                <div className="pb-5">
                  <span className={`font-bold text-3xl md:text-4xl ${titleColor} `}>
                    {RichText.render(headerTitle, linkResolver)}
                  </span>
                </div>
              )}
              {hasHeaderDescription && (
                <div className="pb-5 md:px-5">
                  <span className="font-light">
                    {RichText.render(headerDescription, linkResolver)}
                  </span>
                </div>
              )}
            </div>
          )}
          <div
            className={`overflow-hidden flex container mx-auto w-full px-6 md:px-14 lg:px-28 pb-12 ${flexStyles}`}
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
      </div>
    );
  }

  renderRichTextSections() {
    const { items, primary } = this.props.slice;
    const titleColor = StyleUtils.getTitleColor("", primary.style);
    const textColor = StyleUtils.getTextColor("", primary.style);
    const bulletPointStyle = this.getBulletPointStyle(primary.bullet_point, primary.list_columns);
    return items.map((section, index) => {
      const {
        font_size: fontSize,
        big_title: bigTitle,
        rich_text: richText,
        group_bullet: groupBallet,
        small_image: smallImage,
        button_link: buttonLink,
        button_label: buttonLabel,
      } = section;
      const textStyle = this.getTextStyle(fontSize);
      const titleStyle = this.getTitleStyle(fontSize);
      const bulletStyle = StyleUtils.getVignette(groupBallet);
      return (
        <div key={index} className={bulletStyle}>
          <ResponsiveImage image={smallImage} className="flex-grow-0 pb-4" sizes="76px" />
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
          {buttonLabel && (
            <div className="pt-5 pb-10">
              <Button link={buttonLink} label={buttonLabel} style="filled" />
            </div>
          )}
        </div>
      );
    });
  }
}

export default ImageAndText;
