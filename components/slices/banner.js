import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import ResponsiveImage from "../common/responsiveImage";
import Button from "../common/button";

export default class Banner extends Component {
  render() {
    const { primary } = this.props.slice;
    const { header_image, image, button_label, button_link, button_style } = primary;
    return (
      <div className="container flex flex-col items-center px-6 mx-auto my-8 rounded-xl bg-primary-light md:flex-row">
        <div className="flex-1 p-8">
          {header_image && <ResponsiveImage image={header_image} sizes="10vw" className="pb-5" />}
          <div className="pb-4 text-sm uppercase">{RichText.render(primary.small_title)}</div>
          <div className="pb-8 text-3xl font-semibold text-primary-dark">
            {RichText.render(primary.title)}
          </div>
          <Button link={button_link} label={button_label} style={button_style} />
        </div>
        <div className="self-end flex-1 md:justify-self-end">
          <ResponsiveImage image={image} sizes="40vw" />
        </div>
      </div>
    );
  }
}
