import { RichText } from "prismic-reactjs";
import React, { Component } from "react";
import { linkResolver } from "../../prismic-configuration";
import ResponsiveImage from "../common/responsiveImage";

class DoubleImageText extends Component {
  renderGrid() {
    const { primary } = this.props.slice;
    const {
      left_image: leftImage,
      rigth_image: rightImage,
      text_1: firstText,
      text_2: secondText,
      text_3: thirdText,
    } = primary;
    return (
      <div className="container mx-auto bg-primary-dark ">
        <div className="md:grid md:grid-cols-2 p-5">
          <div className="text-white justify-between flex flex-col items-center">
            <div className="mt-0  pl-0 md:pl-20 md:mt-20">
              <div className="pb-6 ">{RichText.render(firstText, linkResolver)}</div>
              {RichText.render(secondText, linkResolver)}
            </div>
            <div className="">
              <ResponsiveImage image={leftImage} sizes="(min-width:768) 100vw, 25vw" />
            </div>
          </div>

          <div className="text-white flex flex-col items-center justify-between">
            <div className="">
              <ResponsiveImage image={rightImage} sizes="(min-width:768) 100vw, 25vw" />
            </div>
            <div className="pr-0 md:pr-20">{RichText.render(thirdText, linkResolver)}</div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return <>{this.renderGrid()}</>;
  }
}

export default DoubleImageText;
