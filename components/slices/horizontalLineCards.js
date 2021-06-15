import { RichText } from "prismic-reactjs";
import React, { Component } from "react";
import { linkResolver } from "../../prismic-configuration";

class HorizontalLineCards extends Component {
  render() {
    const { items } = this.props.slice;
    return (
      <div className="container mx-auto p-7 mt-10">
        <div className="relative">
          <area className="hidden md:block absolute h-0.5 bg-secondary shadow-md md:inset-x-28 lg:inset-x-40 xl:inset-x-50 2xl:inset-x-60 top-14" />
          <div className="grid grid-cols-1 md:grid-cols-3">
            {items.map((item, index) => this.renderCard(item, index))}
          </div>
        </div>
      </div>
    );
  }

  renderCard(card, index) {
    const { title, description } = card;
    const lineHeight = this.getLineHeight(index);
    return (
      <div className="relative md:p-3" key={index}>
        <img
          className="h-14 w-14 -ml-1 pl-0.5  md:mb-7 md:-mt-2 md:mx-auto md:h-auto md:w-auto"
          src="/img/lightblue-circle.svg"
        />
        <area
          className={`absolute left-6 w-0.5 bg-secondary shadow-md inset-0 ${lineHeight} md:hidden`}
        />
        <div className="p-6 pl-20 -mt-16 md:pl-0 md:mt-0">
          <div className="font-bold text-primary-blue md:text-center mb-5 text-xl">
            {RichText.render(title, linkResolver)}
          </div>
          <div className="text-sm md:text-base lg:px-10">
            {RichText.render(description, linkResolver)}
          </div>
        </div>
      </div>
    );
  }

  getLineHeight(index) {
    const { items } = this.props.slice;
    const cardsLength = items.length;
    switch (index) {
      case 0:
        return "top-7";
      case cardsLength - 1:
        return "h-7";
      default:
        return "h-full";
    }
  }
}

export default HorizontalLineCards;
