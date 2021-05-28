import React, { Component } from "react";
import StyleUtils from "../../utils/styleUtils";
import Image from "../common/Image";
import TextUtils from "../../utils/text";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../../prismic-configuration";
import Button from "../common/button";

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
      button_link: buttonLink,
      button_label: buttonLabel,
    } = primary;
    const backgroundColor = StyleUtils.getBackgroundColor(bgColor);
    const backgroundStyle = StyleUtils.getBackgroundStyle(bgStyle);
    const hasImage = Object.values(headerImage).length;
    const hasTitle = TextUtils.hasRichText(title);
    const hasDescription = TextUtils.hasRichText(description);
    const textColor = backgroundColor === BG_WHITE ? "text-primary-dark" : "";
    return (
      <div className={`container mx-auto ${backgroundColor} ${backgroundStyle}`}>
        <div className="p-10 md:p-14 lg:p-16 lg:mx-20">
          {hasImage && this.renderHeaderImage(headerImage)}
          {hasTitle && this.renderTitle(title, textColor)}
          {hasDescription && this.renderDescription(description)}
          {buttonLabel && this.renderButton(buttonLink, buttonLabel)}
        </div>
      </div>
    );
  }

  renderHeaderImage(headerImage) {
    return <div className="mt-5">{<Image image={headerImage} />}</div>;
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

  renderDescription(description) {
    return (
      <div className="w-full sm:w-3/4 xl:w-2/3">{RichText.render(description, linkResolver)}</div>
    );
  }

  renderButton(buttonLink, buttonLabel) {
    return (
      <div className="mt-10 w-4/6 md:w-2/6 xl:w-1/5">
        <Button link={buttonLink} label={buttonLabel} style="filled" />
      </div>
    );
  }
}

export default Hero3;
