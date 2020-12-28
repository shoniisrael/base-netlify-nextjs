import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import Button from "./../common/button";
import ResponsiveImage from "../common/responsiveImage";
class ImageAndText extends Component {
  render() {
    const { primary } = this.props.slice;
    return (
      <div className="bg-primary-dark w-full">
        <div className="overflow-hidden flex flex-col justify-center items-center container mx-auto w-full px-6 pb-12 md:flex-row md:items-start md:pt-20 lg:py-28">
          <div
            data-sal="slide-right"
            data-sal-delay="300"
            data-sal-easing="ease-in-sine"
            className="py-10 md:py-0 md:w-1/2 px-4 h-auto lg:px-12"
          >
            <ResponsiveImage
              image={primary.image}
              sizes="(min-width:1536) 648px, (min-width:768) 40vw, 90vw"
            />
          </div>
          <div
            data-sal="slide-left"
            data-sal-delay="300"
            data-sal-easing="ease-in-sine"
            className="pb-8 md:w-1/2 px-4"
          >
            <div className="text-secondary text-xs uppercase mb-8">
              {RichText.render(primary.small_title)}
            </div>
            {this.renderRichTextSections()}
            <div className="mt-16">
              <Button
                link={primary.button_link}
                label={primary.button_label}
                style={primary.button_style}
              />
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
        <div key={index} className="text-xl">
          <div className="text-secondary font-bold pb-4 lg:text-5xl lg:pb-8">
            {RichText.render(section.big_title)}
          </div>
          <div className="two-column-bullets image-and-text">
            {RichText.render(section.rich_text)}
          </div>
        </div>
      );
    });
  }
}

export default ImageAndText;
