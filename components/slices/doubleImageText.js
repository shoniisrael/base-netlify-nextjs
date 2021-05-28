import { RichText } from "prismic-reactjs";
import React, { Component } from "react";
import { linkResolver } from "../../prismic-configuration";
import StyleUtils from "../../utils/styleUtils";
import ResponsiveImage from "../common/responsiveImage";

const ALIGMENT_GRID = {
  LEFT: "left",
  RIGHT: "right",
};

class DoubleImageText extends Component {
  render() {
    const { primary, items } = this.props.slice;
    const { background_color: backgroundColor, aligment_image: aligmentImage, image } = primary;
    const bgColor = StyleUtils.getBackgroundColor(backgroundColor);
    const aligment = aligmentImage === ALIGMENT_GRID.LEFT ? "flex-row" : "flex-row-reverse";
    return (
      <div className={`container mx-auto ${bgColor}`}>
        <div
          className={`grid grid-cols-1 items-center py-5 md:flex md:${aligment} md:justify-center`}
        >
          <div className="mx-auto md:mx-0 w-auto">
            {<ResponsiveImage image={image} sizes="(min-width:1280) 400px, 25vw" />}
          </div>
          <div className="p-10 md:w-1/2">
            {items.map((item, index) => this.renderText(item, index))}
          </div>
        </div>
      </div>
    );
  }

  renderText(item, index) {
    const { text } = item;
    return (
      <div key={index} className="my-7">
        {RichText.render(text, linkResolver)}
      </div>
    );
  }
}

export default DoubleImageText;
