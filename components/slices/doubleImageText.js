import { RichText } from "prismic-reactjs";
import React, { Component } from "react";
import { linkResolver } from "../../prismic-configuration";
import StyleUtils from "../../utils/styleUtils";
import ResponsiveImage from "../common/responsiveImage";

const ALIGMENT_LEFT = "left";
const BG_WHITE = "bg-white";

class DoubleImageText extends Component {
  render() {
    const { primary, items } = this.props.slice;
    const {
      background_color: backgroundColor,
      aligment_image: aligmentImage,
      image,
      join_top,
    } = primary;
    const aligment = aligmentImage === ALIGMENT_LEFT ? "flex-row" : "flex-row-reverse";
    const bgColor = StyleUtils.getBackgroundColor(backgroundColor);
    const textColor = bgColor === BG_WHITE ? "text-primary-dark" : "text-white";
    const joinTop = join_top ? "-mt-20 md:-mt-24 pb-10" : "pt-10";
    return (
      <div className={`${bgColor} ${joinTop}`}>
        <div className="container mx-auto">
          <div
            className={`grid grid-cols-1 items-center py-5 md:mx-20 md:flex md:${aligment} md:justify-center`}
          >
            <div className="mx-auto md:mx-0 w-3/4 md:w-1/3">
              {
                <ResponsiveImage
                  image={image}
                  sizes="(min-width:1536) 648px, (min-width:768) 40vw, 75vw"
                />
              }
            </div>
            <div className={`p-10 md:w-1/2 ${textColor}`}>
              {items.map((item, index) => this.renderText(item, index))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderText(item, index) {
    const { text } = item;
    return (
      <div key={index} className="text-base lg:text-lg mb-7">
        {RichText.render(text, linkResolver)}
      </div>
    );
  }
}

export default DoubleImageText;
