import { RichText } from "prismic-reactjs";
import React, { Component } from "react";
import { linkResolver } from "../../prismic-configuration";
import ResponsiveImage from "../common/responsiveImage";

class TextColumnImage extends Component {
  renderGrid() {
    const { title, description, image } = this.props.slice.primary;

    return (
      <div className="grid grid-cols-1 justify-items-center md:grid-cols-2">
        <div className="p-7 flex flex-col justify-center">
          <div className="text-secondary font-bold self-end text-xl md:text-4xl lg:text5x1">
            {RichText.render(title, linkResolver)}
          </div>
          <div className="mt-4 pl-0 md:pl-40 md:mt-14">
            {RichText.render(description, linkResolver)}
          </div>
        </div>
        <div className="mt-2 md:-mt-6">
          <ResponsiveImage image={image} sizes="(min-width:768) 100vw, 30vw" />
        </div>
      </div>
    );
  }

  renderCards() {
    const { items } = this.props.slice;
    return (
      <div className="flex flex-wrap justify-evenly mx-5 mt-5">
        {items.map((item, index) => this.renderLightCard(item, index))}
      </div>
    );
  }

  renderLightCard(card, index) {
    const { card_title: cardTitle, card_description: cardDescription } = card;
    return (
      <div key={index} className="w-80 mx-5 my-5 py-2 px-4">
        <div className="font-bold mb-8 text-xl">{RichText.render(cardTitle, linkResolver)}</div>
        {RichText.render(cardDescription, linkResolver)}
      </div>
    );
  }

  render() {
    return (
      <div className="container mx-auto w-full bg-primary-dark ">
        {this.renderGrid()}
        {this.renderCards()}
      </div>
    );
  }
}

export default TextColumnImage;
