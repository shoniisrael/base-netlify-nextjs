import { RichText } from "prismic-reactjs";
import React, { Component } from "react";

import Image from "../common/Image";
import ResponsiveBgImage from "../common/responsiveBgImage";
import Button from "./../common/button";

const ALIGNMENT = {
  LEFT: "left",
  CENTER: "center",
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
      big_title: bigTitle,
      header_image: headerImage,
      alignment,
      button_link: buttonLink,
      button_label: buttonLabel,
      button_style: buttonStyle,
    } = primary;

    const alignmentClasses = this.getAlignmentClasses(alignment);
    const containerWidth = this.getContainerWidth(alignment);
    const imageAlignment = this.getImageAlignment(alignment);
    const classes = `px-6 lg:px-20 pb-10 pt-20 md:pb-40 md:pt-40 text-white flex ${alignmentClasses}`;
    return (
      <ResponsiveBgImage index={index} bgImage={bgImage} classes={classes}>
        <div className={`w-full ${containerWidth}`}>
          <Image image={headerImage} classes={`${imageAlignment} pt-10`} />
          <div className="mb-10">
            <div className="text-3xl lg:text-5xl font-bold my-6">{RichText.render(bigTitle)}</div>
            <div>{RichText.render(description)}</div>
          </div>
          <Button link={buttonLink} label={buttonLabel} style={buttonStyle} />
        </div>
      </ResponsiveBgImage>
    );
  }
}

export default Hero2;
