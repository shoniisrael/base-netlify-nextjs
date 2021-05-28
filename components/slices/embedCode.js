import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../../prismic-configuration";
import ResponsiveBgImage from "../common/responsiveBgImage";
import Iframe from "../common/iframe";

class EmbedCode extends Component {
  render() {
    const { slice, index } = this.props;
    const { primary } = slice;
    const {
      background_image: backgroundImage,
      code_embed: codeEmbed,
      width_embed: widthEmbed,
      height_embed: heightEmbed,
      overlay_line_color: overlayLineColor,
      overlay_circle_color: overlayCircleColor,
    } = primary;

    return (
      <div className="relative">
        <div className="hidden md:block absolute h-1 flex  shadow-md md:w-7/15  top-52">
          <div className={`h-1 bg-${overlayLineColor} relative shadow-md`}>
            <div
              className={`rounded-full bg-${overlayCircleColor} absolute  w-4 h-4 right-0 -top-1.5`}
            ></div>
          </div>
        </div>
        <ResponsiveBgImage
          index={index}
          bgImage={backgroundImage}
          classes="flex flex-col md:flex-row py-10 md:pt-10 md:pb-20"
        >
          {this.renderText()}
          <div className="md:w-7/12 rounded-3xl md:pl-5 md:pr-10 xl:pr-20">
            <Iframe content={codeEmbed} height={heightEmbed} width={widthEmbed} />
          </div>
        </ResponsiveBgImage>
      </div>
    );
  }

  renderText() {
    const { primary } = this.props.slice;
    const { title, description } = primary;

    return (
      <div className="flex flex-col md:w-5/12 py-10 px-10 md:pr-0 xl:pl-28 md:pt-6">
        <div className="pb-10">
          <span className="font-bold text-xl  lg:text-2xl xl:text-3xl lg:leading-10">
            {RichText.render(title, linkResolver)}
          </span>
        </div>
        <div className="md:pt-10 md:pl-10 md:pr-14 lg:pr-28">
          {RichText.render(description, linkResolver)}
        </div>
      </div>
    );
  }
}
export default EmbedCode;
