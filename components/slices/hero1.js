import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import Button from "./../common/button";
import ResponsiveImage from "../common/responsiveImage";

class Hero1 extends Component {
  render() {
    const { primary } = this.props.slice;
    return (
      <div className="flex items-center bg-primary-lighter md:pb-6 lg:pb-20 mx-auto">
        <div className="w-1/5 h-auto">
          <ResponsiveImage image={primary.left_background_image} />
        </div>
        <div className="w-3/5">
          <div className="flex flex-col justify-center items-center lg:px-24 py-16 lg:py-24 text-center">
            <div className="font-bold text-primary text-2xl text-center pb-3 sm:w-3/5 md:w-3/5 md:text-2xl lg:text-4xl xl:text-6xl lg:w-5/6 lg:pb-5 text-primary-dark">
              {RichText.render(primary.big_title)}
            </div>
            <div className="md:w-3/5 lg:w-3/4 pb-8 lg:text-lg md:px-10 px-8">
              {RichText.render(primary.description)}
            </div>
            <Button
              link={primary.button_link}
              label={primary.button_label}
              style={primary.button_style}
            />
          </div>
        </div>
        <div className="w-1/5 h-auto">
          <ResponsiveImage image={primary.right_background_image} />
        </div>
      </div>
    );
  }
}

export default Hero1;
