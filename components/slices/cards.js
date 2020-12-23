import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
class Cards extends Component {
  renderCard(card, index) {
    const { title, subtitle, description } = card;
    return (
      <div
        key={index}
        className="card-no-hover flex flex-col justify-between items-start px-6 py-8 mb-10"
      >
        <span className=" lg:text-base font-semibold text-primary-dark">
          {RichText.render(title)}
        </span>
        <span className="border-b-2 border-secondary py-3">{RichText.render(subtitle)}</span>
        <span className="pt-4 lg:text-base">{RichText.render(description)}</span>
      </div>
    );
  }
  render() {
    const { items } = this.props.slice;
    return (
      <div className="w-full bg-primary-light">
        <div className="container mx-auto grid grid-cols-1 px-6 place-items-stretch gap-y-6 md:grid-cols-3 md:gap-x-8 md:gap-y-8 lg:gap-x-10 lg:gap-y-6 text-sm md:relative md:-top-16">
          {items.map((item, index) => this.renderCard(item, index))}
        </div>
      </div>
    );
  }
}
export default Cards;
