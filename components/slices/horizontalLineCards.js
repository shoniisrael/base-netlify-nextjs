import { RichText } from "prismic-reactjs";
import React, { Component } from "react";
import { linkResolver } from "../../prismic-configuration";

class HorizontalLineCards extends Component {
  render() {
    const { items } = this.props.slice;
    return (
      <div className="container mx-auto p-10">
        <div className="relative">
          <div className="hidden md:block absolute h-0.5 bg-secondary shadow-md md:inset-x-28 lg:inset-x-40 xl:inset-x-50 2xl:inset-x-60 top-14"></div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {items.map((item, index) => this.renderCard(item, index))}
          </div>
        </div>
      </div>
    );
  }

  renderCard(card, index) {
    const { title, description } = card;
    return (
      <div className="relative sm:p-3" key={index}>
        <img className="md:mb-7 md:-mt-2 mx-auto" src="/img/lightblue-circle.svg" />
        <div className="p-6 w-full">
          <div className="font-bold text-primary-blue text-center mb-5 text-xl">
            {RichText.render(title, linkResolver)}
          </div>
          <div className="lg:px-10">{RichText.render(description, linkResolver)}</div>
        </div>
      </div>
    );
  }
}

export default HorizontalLineCards;
