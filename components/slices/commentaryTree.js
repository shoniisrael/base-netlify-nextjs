import { RichText } from "prismic-reactjs";
import React, { Component } from "react";
import { linkResolver } from "../../prismic-configuration";

class CommentaryTree extends Component {
  render() {
    return (
      <div className="pb-8 container mx-auto">
        {this.renderPrimary()}
        {this.renderGridItems()}
      </div>
    );
  }
  renderPrimary() {
    const { primary } = this.props.slice;
    const { title, description } = primary;
    return (
      <div className="flex flex-col justify-between items-center py-8 px-6 container mx-auto lg:py-15">
        <div className="pb-3">
          <span className=" font-bold text-xl lg:text-5xl text-primary-dark">
            {RichText.render(title, linkResolver)}
          </span>
        </div>
        <div className="lg:w-2/5 w-3/4">
          <span className="text-center font-light">
            {RichText.render(description, linkResolver)}
          </span>
        </div>
      </div>
    );
  }

  renderGridItems() {
    const { items } = this.props.slice;
    return (
      <div className="relative px-6">
        <div className="absolute z-0 w-1 bg-secondary shadow-md inset-0 left-10.5 top-5 md:bottom-20 md:top-24 md:mx-auto md:right-0 md:left-0 lg:bottom-26"></div>
        {items.map((item, index) => this.renderLightCard(item, index))}
      </div>
    );
  }

  renderLightCard(card, index) {
    const { card_title: cardTitle, card_description: cardDescription } = card;
    let aligmentCard =
      index % 2 === 0
        ? "ml-auto md:mr-9 lg:mr-24 xl:mr-56 2xl:mr-85"
        : "md:ml-9 lg:ml-24 xl:ml-56 2xl:ml-85";
    return (
      <div className="relative z-10 mb-4">
        <img
          className="w-10 h-10 -mb-6  md:w-20 md:h-20 md:mb-0 md:absolute md:top-14 md:mx-auto md:right-0 md:left-0"
          src="/img/lightblue-circle.svg"
        />
        <div
          className={`bg-primary-lightest p-6 shadow-md w-full md:px-8 md:w-80 lg:w-96 ${aligmentCard}`}
        >
          <div className="font-bold text-primary-blue uppercase mb-4 mt-4">
            {RichText.render(cardTitle, linkResolver)}
          </div>
          <div>{RichText.render(cardDescription, linkResolver)}</div>
        </div>
      </div>
    );
  }
}

export default CommentaryTree;
