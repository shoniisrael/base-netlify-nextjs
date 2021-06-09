import { RichText } from "prismic-reactjs";
import React, { Component } from "react";
import { linkResolver } from "../../prismic-configuration";
import TextUtils from "../../utils/text";

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
          <span className="font-bold text-xl lg:text-5xl text-primary-dark">
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
      <div className="relative px-5 md:mx-24 md:px-10">
        <div className="absolute w-1 my-10 bg-secondary shadow-md inset-0 left-10 md:mx-auto md:right-0 md:left-0 md:my-48 lg:my-32"></div>
        {items.map((item, index) => this.renderLightCard(item, index))}
      </div>
    );
  }

  renderLightCard(card, index) {
    const { card_title: cardTitle, card_description: cardDescription } = card;
    const lineHeight = this.getLineHeight(index);
    const title = TextUtils.hasRichText(cardTitle);
    const description = TextUtils.hasRichText(cardDescription);
    const aligmentCard = index % 2 === 0 ? "md:ml-auto" : "";
    return (
      <div className="relative my-5">
        <div
          className={`hidden md:block absolute w-1 ${lineHeight} bg-secondary shadow-md inset-0 left-10 md:mx-auto md:right-0 md:left-0`}
        ></div>
        <img
          className="w-10 h-10 -mb-6 ml-0.5 md:w-20 md:h-20 md:absolute md:mx-auto md:my-auto md:top-0 md:bottom-0 md:right-0 md:left-0"
          src="/img/lightblue-circle.svg"
        />
        <div
          className={`bg-primary-lightest px-6 py-8 shadow-md w-full  md:w-1/2 md:px-14 ${aligmentCard}`}
        >
          {title && (
            <div className="font-bold text-primary-blue text-xl uppercase">
              {RichText.render(cardTitle, linkResolver)}
            </div>
          )}
          {description && (
            <div className="mt-5">{RichText.render(cardDescription, linkResolver)}</div>
          )}
        </div>
      </div>
    );
  }

  getLineHeight(index) {
    const { items } = this.props.slice;
    const cardsLength = items.length;
    switch (index) {
      case 0:
        return "h-1/2 top-1/2";
      case cardsLength - 1:
        return "h-1/2 bottom-1/2";
      default:
        return "h-full";
    }
  }
}

export default CommentaryTree;
