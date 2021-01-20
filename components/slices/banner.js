import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import ResponsiveImage from "../common/responsiveImage";
import Button from "../common/button";

export default class Banner extends Component {
  render() {
    const { primary } = this.props.slice;
    const { header_image, image, button_label, button_link, button_style } = primary;
    return (
      <div className="container w-full pt-12 px-6 md:px-14 lg:px-28 mx-auto">
        <div className="flex flex-col items-center justify-center pt-12 pl-4 md:pl-12 my-8 rounded-xl bg-primary-light md:flex-row md:items-start">
          <div className="flex-1 px-6 pb-10">
            {header_image && (
              <ResponsiveImage image={header_image} sizes="94px" className="flex-grow-0 pb-4" />
            )}
            <div className="pb-4 text-xs uppercase md:text-sm">
              {RichText.render(primary.small_title)}
            </div>
            <div className="pb-8 text-lg font-semibold md:text-2xl lg:text-3xl text-primary-dark">
              {RichText.render(primary.title)}
            </div>
            <Button link={button_link} label={button_label} style={button_style} />
          </div>
          <div className="self-end md:w-1/2 lg:w-auto ml-auto md:justify-self-end">
            <ResponsiveImage
              image={image}
              sizes="(min-width: 1280px) 500px, (min-width: 768px) 50vw, 75vw"
              className="rounded-br-xl"
            />
          </div>
        </div>
      </div>
    );
  }
}
