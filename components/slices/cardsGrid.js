import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import CustomLink from "../common/customLink";
import Image from "../common/Image";

class CardsGrid extends Component {
  renderCard(card, index) {
    const { image, title, description, link } = card;
    return (
      <CustomLink link={link} key={index}>
        <div className="h-full flex flex-col justify-center items-center px-7 py-16 card-borderless">
          <Image image={image} />
          <span className=" text-lg font-bold text-center py-7 lg:w-3/4 text-primary-dark">
            {RichText.render(title)}
          </span>
          <span className="text-center">{RichText.render(description)}</span>
        </div>
      </CustomLink>
    );
  }

  renderGrid() {
    const { items } = this.props.slice;
    return (
      <div className="py-12 lg:pt-0 px-6 container mx-auto grid grid-cols-1 place-items-stretch gap-y-6 md:grid-cols-3 md:gap-x-6 md:gap-y-8 lg:gap-x-10 lg:gap-y-6 text-sm">
        {items.map((item, index) => this.renderCard(item, index))}
      </div>
    );
  }

  renderPrimary() {
    const { primary } = this.props.slice;
    const { small_title, big_title, description } = primary;
    return (
      <div className="flex flex-col justify-between items-center py-12 px-6 container mx-auto lg:py-28">
        <div className="pb-3">
          <span className="text-xs lg:text-sm font-light capitalize">
            {RichText.render(small_title)}
          </span>
        </div>
        <div className="pb-10">
          <span className=" font-bold text-xl lg:text-5xl text-primary-dark">
            {RichText.render(big_title)}
          </span>
        </div>
        <div className="lg:w-4/5">
          <span className="text-center font-light">{RichText.render(description)}</span>
        </div>
        <div className="border-b-2 border-secondary w-28 pb-10"></div>
      </div>
    );
  }

  render() {
    return (
      <div className="cards-grid">
        {this.renderPrimary()}
        {this.renderGrid()}
      </div>
    );
  }
}

export default CardsGrid;
