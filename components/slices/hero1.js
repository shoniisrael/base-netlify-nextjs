import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import Button from "./../common/button";
import ResponsiveImage from "../common/responsiveImage";

class Hero1 extends Component {
  render() {
    const { primary } = this.props.slice;
    const { separator } = primary;
    return (
      <div className="dots1 flex items-center bg-primary-lighter md:pb-6 lg:pb-20 mx-auto relative xl:h-3/4">
        <div className="absolute bottom-0 left-0 w-1/4 md:w-1/5 2xl:w-1/12 h-auto flex justify-start">
          <ResponsiveImage
            image={primary.left_background_image}
            sizes="(min-width:1536) 8vw, (min-width:768) 20vw, 25vw"
          />
        </div>
        <div className="w-4/5 md:w-4/5 mx-auto z-10">
          <div className="flex flex-col justify-center items-center lg:px-24 py-16 lg:py-24 text-center">
            <div className="font-bold text-2xl text-center pb-3 md:text-2xl lg:text-4xl xl:text-6xl lg:w-5/6 lg:pb-5 text-primary-dark">
              {separator && <div className="separator" />}
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
        <div className="absolute top-0 right-0 w-1/3 md:w-1/5 lg:w-1/4 2xl:w-1/6 h-auto flex justify-end">
          <ResponsiveImage
            image={primary.right_background_image}
            sizes="(min-width:1536) 8vw, (min-width:768) 20vw, 25vw"
          />
        </div>
      </div>
    );
  }
}

export default Hero1;
