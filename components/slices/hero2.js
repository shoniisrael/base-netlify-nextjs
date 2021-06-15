import { RichText } from "prismic-reactjs";
import React, { Component } from "react";
import { linkResolver } from "../../prismic-configuration";
import TextUtils from "../../utils/text";
import Image from "../common/Image";
import ResponsiveBgImage from "../common/responsiveBgImage";
import Button from "./../common/button";

const ALIGNMENT = {
  LEFT: "left",
  CENTER: "center",
  DOWN: "down",
};

const TITLE_SIZE = {
  MEDIUM: "medium",
  BIG: "extra_large",
};

const WIDTH_DESCRIPTION = {
  FULL: "100%",
  QUARTER: "75%",
  MID: "50%",
};

class Hero2 extends Component {
  getAlignmentClasses(alignment) {
    return alignment === ALIGNMENT.CENTER ? "justify-center text-center" : "";
  }

  getContainerWidth(alignment) {
    if (alignment === ALIGNMENT.DOWN) return "md:w-1/2 lg:w-3/5";
    if (alignment === ALIGNMENT.LEFT) return "md:w-1/2 lg:w-2/5";
    return "";
  }

  getImageAlignment(alignment) {
    return alignment === ALIGNMENT.CENTER ? "m-auto" : "";
  }

  getWidthDescription(widthDescription) {
    switch (widthDescription) {
      case WIDTH_DESCRIPTION.FULL:
        return "w-full";
      case WIDTH_DESCRIPTION.QUARTER:
        return "w-3/4";
      case WIDTH_DESCRIPTION.MID:
        return "w-2/4";
      default:
        return "";
    }
  }

  renderRichText(renderText) {
    return RichText.render(renderText, linkResolver);
  }

  renderTitle(btFontSize, bigTitle, bigSubtitle = "") {
    if (btFontSize === TITLE_SIZE.BIG) {
      return (
        <div className="text-3xl lg:text-5xl text-secondary font-bold w-full">
          {this.renderRichText(bigTitle)}
          {this.renderRichText(bigSubtitle)}
        </div>
      );
    }
    if (btFontSize === TITLE_SIZE.MEDIUM) {
      return (
        <div className="py-4 text-2xl lg:text-4xl font-bold">{this.renderRichText(bigTitle)}</div>
      );
    }
    return (
      <div className="py-4 text-3xl lg:text-5xl font-bold">{this.renderRichText(bigTitle)}</div>
    );
  }

  renderSmallTitle(btFontSize, smallTitle) {
    const textColor = btFontSize === TITLE_SIZE.BIG ? "text-secondary" : "";
    return (
      <div className={`py-5 text-sm lg:text-base ${textColor} uppercase`}>
        {this.renderRichText(smallTitle)}
      </div>
    );
  }

  render() {
    const { slice, index } = this.props;
    const { primary } = slice;
    const {
      bg_image: bgImage,
      description,
      big_title: bigTitle,
      big_subtitle: bigSubtitle,
      big_title_font_size: btFontSize,
      header_image: headerImage,
      alignment,
      button_link: buttonLink,
      button_label: buttonLabel,
      button_style: buttonStyle,
      button_width: buttonWidth,
      width_description: wDescription,
      small_title: smallTitle,
    } = primary;
    const btnWidth = buttonWidth || "";
    const alignmentClasses = this.getAlignmentClasses(alignment);
    const containerWidth = this.getContainerWidth(alignment);
    const imageAlignment = this.getImageAlignment(alignment);
    const widthDescription = this.getWidthDescription(wDescription);

    const aligmentButton = alignment === ALIGNMENT.CENTER ? "justify-center" : "";
    const aligmentDescription = alignment === ALIGNMENT.CENTER ? "mx-auto" : "";
    const hasSmallTitle = TextUtils.hasRichText(smallTitle);

    const classes = `px-4 lg:px-8 xl:px-20 pb-16 pt-24 md:pb-32 md:pt-32 text-white flex ${alignmentClasses}`;
    return (
      <ResponsiveBgImage index={index} bgImage={bgImage} classes={classes}>
        <div className={`w-full ${containerWidth}`}>
          <Image image={headerImage} classes={`${imageAlignment} pt-10`} />
          <div className="mb-10 py-2">
            {hasSmallTitle && this.renderSmallTitle(btFontSize, smallTitle)}
            {this.renderTitle(btFontSize, bigTitle, bigSubtitle)}
            <div className={`text-lg ${widthDescription} mt-10 ${aligmentDescription}`}>
              {RichText.render(description, linkResolver)}
            </div>
          </div>
          <div className={`pb-8 flex ${aligmentButton}`}>
            <Button link={buttonLink} label={buttonLabel} style={`${buttonStyle} ${btnWidth}`} />
          </div>
        </div>
      </ResponsiveBgImage>
    );
  }
}

export default Hero2;
