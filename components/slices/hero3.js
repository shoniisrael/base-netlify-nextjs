import React, { Component } from "react";
import StyleUtils from "../../utils/styleUtils";
import TextUtils from "../../utils/text";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../../prismic-configuration";
import Button from "../common/button";
import ResponsiveImage from "../common/responsiveImage";

const BG_WHITE = "bg-white";

class Hero3 extends Component {
  render() {
    const { primary } = this.props.slice;
    const {
      background_color: bgColor,
      background_style: bgStyle,
      header_image: headerImage,
      title,
      description,
      button_label: buttonLabel,
    } = primary;
    const backgroundColor = StyleUtils.getBackgroundColor(bgColor);
    const backgroundStyle = StyleUtils.getBackgroundStyle(bgStyle);
    const hasImage = Object.values(headerImage).length;
    const hasTitle = TextUtils.hasRichText(title);
    const hasDescription = TextUtils.hasRichText(description);
    const textColor = backgroundColor === BG_WHITE ? "text-primary-dark" : "";
    return (
      <div className={`${backgroundColor} ${backgroundStyle}`}>
        <div className="px-10 container mx-auto pt-10 lg:px-32">
          {hasImage && this.renderHeaderImage(headerImage)}
          {hasTitle && this.renderTitle(title, textColor)}
          {hasDescription && this.renderDescription(description, textColor)}
          {buttonLabel && this.renderButton()}
        </div>
      </div>
    );
  }

  renderHeaderImage(headerImage) {
    return (
      <div className="mt-5">
        <ResponsiveImage image={headerImage} sizes="76px" className="h-14 w-14" />
      </div>
    );
  }

  renderTitle(title, textColor) {
    return (
      <div
        className={`mt-7 mb-8 font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl  ${textColor}`}
      >
        {RichText.render(title, linkResolver)}
      </div>
    );
  }

  renderDescription(description, textColor) {
    return (
      <div className={`w-full xl:w-5/6 2xl:w-3/5 ${textColor}`}>
        {RichText.render(description, linkResolver)}
      </div>
    );
  }

  renderButton() {
    const { primary } = this.props.slice;
    const {
      button_link: buttonLink,
      button_label: buttonLabel,
      button_style: buttonStyle,
      button_width: buttonWidth,
    } = primary;
    const btnWidth = buttonWidth || "";
    return (
      <div className="mt-10 -mb-1 flex">
        <Button link={buttonLink} label={buttonLabel} style={`${buttonStyle} ${btnWidth}`} />
      </div>
    );
  }
}

export default Hero3;
