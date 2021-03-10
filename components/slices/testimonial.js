import { RichText } from "prismic-reactjs";
import React, { Component } from "react";
import ResponsiveImage from "../common/responsiveImage";
class Testimonial extends Component {
  render() {
    const { primary } = this.props.slice;
    const { title, testimonial } = primary;
    const { data } = testimonial;
    const { name_and_position, quote, company_logo } = data;

    return (
      <div className="container mx-auto px-10 md:px-4 lg:px-24 pb-6 pt-28 2xl:px-60">
        <div className={`text-sm uppercase text-center text-primary-dark`}>
          {RichText.render(title)}
        </div>
        <div className="separator-2" />
        <div className="text-center flex flex-col justify-center items-center">
          <div className="mx-4 md:mx-16 xl:mx-44 text-base lg:text-2xl leading-tight pb-5 text-primary-dark">
            {RichText.render(quote)}
          </div>
          <div className="py-4 text-base">{RichText.render(name_and_position)}</div>
          <ResponsiveImage image={company_logo} sizes="82px" className="py-4" />
        </div>
      </div>
    );
  }
}

export default Testimonial;
