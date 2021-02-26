import { RichText } from "prismic-reactjs";
import React, { Component } from "react";

import Image from "../common/Image";
import ResponsiveBgImage from "../common/responsiveBgImage";
import Button from "./../common/button";

const ALIGNMENT = {
  LEFT: "left",
  CENTER: "center",
};

const TITLE_SIZE = {
  MEDIUM: "medium",
};

class Hero2 extends Component {
  getAlignmentClasses(alignment) {
    return alignment === ALIGNMENT.CENTER ? "justify-center text-center" : "";
  }

  getContainerWidth(alignment) {
    return alignment === ALIGNMENT.CENTER ? "" : "md:w-1/2 lg:w-2/5";
  }

  getImageAlignment(alignment) {
    return alignment === ALIGNMENT.CENTER ? "m-auto" : "";
  }

  render() {
    const { slice, index } = this.props;
    const { primary } = slice;
    const {
      bg_image: bgImage,
      description,
      small_title: smallTitle,
      big_title: bigTitle,
      big_title_font_size: btFontSize,
      header_image: headerImage,
      alignment,
      button_link: buttonLink,
      button_label: buttonLabel,
      button_style: buttonStyle,
    } = primary;
    const bigTitleStyle =
      btFontSize === TITLE_SIZE.MEDIUM ? "text-2xl lg:text-4xl" : "text-3xl lg:text-5xl";
    const alignmentClasses = this.getAlignmentClasses(alignment);
    const containerWidth = this.getContainerWidth(alignment);
    const imageAlignment = this.getImageAlignment(alignment);
    const classes = `px-4 lg:px-8 xl:px-20 pb-16 pt-24 md:pb-32 md:pt-32 text-white flex ${alignmentClasses}`;
    return (
      <ResponsiveBgImage index={index} bgImage={bgImage} classes={classes}>
        <div className={`w-full ${containerWidth}`}>
          <Image image={headerImage} classes={`${imageAlignment} pt-10`} />
          <div className="mb-10 p_py-2">
            {smallTitle && <div className={`text-sm uppercase`}>{RichText.render(smallTitle)}</div>}
            <div className={`py-4 ${bigTitleStyle} font-bold`}>{RichText.render(bigTitle)}</div>
            <div className="text-lg">{RichText.render(description)}</div>
          </div>
          <div className="pb-8">
            <Button link={buttonLink} label={buttonLabel} style={`${buttonStyle}`} />
          </div>
        </div>
      </ResponsiveBgImage>
    );
  }
}

export default Hero2;
