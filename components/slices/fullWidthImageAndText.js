import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import ResponsiveImage from "../common/responsiveImage";
import TextUtils from "../../utils/text";

const IMAGE_ALIGNMENT = {
  LEFT: "left",
  RIGHT: "right",
};

class FullWidthImageAndText extends Component {
  getFlexStyles(imagePosition) {
    const direction =
      imagePosition === IMAGE_ALIGNMENT.LEFT ? "md:flex-row" : "md:flex-row-reverse";
    const position = "items-start";
    return `${direction} ${position}`;
  }
  render() {
    const { primary } = this.props.slice;
    const {
      image,
      small_title: smallTitle,
      big_title: bigTitle,
      image_alignment: imageAlignment,
    } = primary;
    const bgClasses = "bg-primary-paleBlue";
    const titleColor = "text-primary-dark";
    const flexStyles = this.getFlexStyles(imageAlignment);
    const imageWidth = "w-1/2";
    const textWidth = "w-1/2";
    return (
      <div className={`${bgClasses} w-full`}>
        <div className={`flex flex-col-reverse mx-auto w-full ${flexStyles} `}>
          <div
            className={`py-0 md:py-0 md:${imageWidth} h-auto items-start justify-between
          `}
          >
            <ResponsiveImage
              image={image}
              sizes="(min-width:768) 50vw, 100vw"
              className="md:border-secondary md:border-l-4 md:border-solid"
            />
          </div>
          <div
            className={`py-10 px-11 2xl:pl-40 2xl:pr-24 xl:pt-16 xl:pb-0 md:${textWidth} text-primary-dark`}
          >
            {TextUtils.hasRichText(smallTitle) && (
              <div className={`${titleColor} text-xs uppercase py-2 font-medium`}>
                {RichText.render(smallTitle)}
              </div>
            )}
            {TextUtils.hasRichText(bigTitle) && (
              <div className={`${titleColor} text-3xl md:text-4xl capitalize font-bold mb-5 pb-6`}>
                {RichText.render(bigTitle)}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 xl:gap-x-24 2xl:gap-x-32 2xl:pr-32">
              {this.renderRichTextSections()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderRichTextSections() {
    const { items } = this.props.slice;
    return items.map((section, index) => {
      return (
        <div key={index}>
          <div className="p_py-3 p_2xl_pb-8 strong_pt-6 text-sm">
            {RichText.render(section.column_text)}
          </div>
        </div>
      );
    });
  }
}

export default FullWidthImageAndText;
