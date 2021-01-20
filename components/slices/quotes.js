import { RichText } from "prismic-reactjs";
import React, { Component } from "react";
import ResponsiveImage from "../common/responsiveImage";
import Image from "../common/Image";
class Quotes extends Component {
  render() {
    const { primary, items } = this.props.slice;
    return (
      <div className="container m-auto px-6 md:px-14 lg:px-28 py-12 md:py-20 lg:py-28 xl:px-40">
        <div className={`text-4xl text-primary-dark text-center font-bold`}>
          {RichText.render(primary.title)}
        </div>
        {items.map((item, i) => {
          const { data } = item.quote;
          const { photo, name, position, logo, quote } = data;
          const isLastItem = !items[i + 1];
          return (
            <div
              key={i}
              className="text-center flex flex-col justify-center items-center pt-12 md:pt-14 lg:pt-16"
            >
              <div className="mx-4 md:mx-16 xl:mx-44 text-base lg:text-lg p_py-2">
                {RichText.render(quote)}
              </div>
              <ResponsiveImage image={photo} sizes="94px" className="pt-8" />
              <div className="pt-5 font-bold">{RichText.render(name)}</div>
              <div>{RichText.render(position)}</div>
              <div className={`h-14 pt-5 ${!isLastItem ? "mb-12 md:mb-10" : ""}`}>
                <Image image={logo} classes={`h-full`} />
              </div>
              {!isLastItem && <div className="separator" />}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Quotes;
