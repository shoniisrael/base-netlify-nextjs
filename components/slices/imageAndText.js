import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import Button from "./../common/button";
import ResponsiveImage from "../common/responsiveImage";

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

  getFlexDirection(position) {
    return position === IMAGE_ALIGNMENT.LEFT ? "flex-row" : "flex-row-reverse";
  }

  getImageWidth(size) {
    return size === IMAGE_SIZE.MEDIUM ? "w-1/3" : "w-1/2";
  }

  getTextWidth(imageSize) {
    return imageSize === IMAGE_SIZE.MEDIUM ? "w-2/3" : "w-1/2";
  }

  render() {
    const { primary } = this.props.slice;
    console.log(primary);
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
    const flexDirection = this.getFlexDirection(imageAlignment);
    const imageWidth = this.getImageWidth(imageSize);
    const textWidth = this.getTextWidth(imageSize);
    return (
      <div className={`${bgClasses} w-full`}>
        <div
          className={`overflow-hidden flex flex-col justify-center items-center container mx-auto w-full px-6 pb-12 md:${flexDirection} md:items-start md:pt-20 lg:py-28`}
        >
          <div
            data-sal="slide-right"
            data-sal-delay="300"
            data-sal-easing="ease-in-sine"
            className={`py-10 md:py-0 md:${imageWidth} px-4 h-auto lg:px-12`}
          >
            <ResponsiveImage
              image={image}
              sizes="(min-width:1536) 648px, (min-width:768) 40vw, 90vw"
            />
          </div>
          <div
            data-sal="slide-left"
            data-sal-delay="300"
            data-sal-easing="ease-in-sine"
            className={`pb-8 md:${textWidth} px-4`}
          >
            <div className={`${titleColor} text-xs uppercase mb-8`}>
              {RichText.render(smallTitle)}
            </div>
            {this.renderRichTextSections()}
            <div className="mt-16">
              <Button link={buttonLink} label={buttonLabel} style={buttonStyle} />
            </div>
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
      return (
        <div key={index}>
          <div className={`${titleColor} text-xl font-bold pb-4 lg:text-5xl lg:pb-8`}>
            {RichText.render(section.big_title)}
          </div>
          <div className={`${textColor} ${listClass} image-and-text`}>
            {RichText.render(section.rich_text)}
          </div>
        </div>
      );
    });
  }
}

export default ImageAndText;
