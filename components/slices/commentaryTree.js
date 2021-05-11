import { RichText } from "prismic-reactjs";
import React, { Component } from "react";
import { linkResolver } from "../../prismic-configuration";

class CommentaryTree extends Component {
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
    return <>{items.map((item, index) => this.renderLightCard(item, index))}</>;
  }

  renderLightCard(card, index) {
    const { card_title: cardTitle, card_description: cardDescription } = card;
    let aligmentCard = index % 2 === 0 ? "flex-row-reverse" : "";
    return (
      <div className="relative container mx-auto px-6 flex space-y-8">
        <div className="absolute z-0 w-1.5 h-full top-8 bg-secondary shadow-md inset-0 left-10 md:mx-auto md:right-10 md: left-0"></div>
        <img
          className="absolute -left-2.5 h-13 w-13 z-10  md:mx-auto md:left-0 md:right-0 md:top-16 lg:top-8"
          src="/img/lightblue-circle.svg"
          alt=""
        />
        <div className={`flex ${aligmentCard}`}>
          <div className="w-full pt-2   bg-primary-lightest px-14 py-4 rounded-md shadow-xl md:w-1/2 lg:right-80">
            <div className="font-bold text-primary-blue uppercase mb-4 mt-4">
              {RichText.render(cardTitle, linkResolver)}
            </div>
            <div>{RichText.render(cardDescription, linkResolver)}</div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="pb-8">
        {this.renderPrimary()}
        {this.renderGridItems()}
      </div>
    );
  }
}

export default CommentaryTree;
