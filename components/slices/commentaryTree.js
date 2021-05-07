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

  renderGrid() {
    const { items } = this.props.slice;
    return (
      <div className="container mx-auto w-full h-full">
        <div className="relative wrap overflow-hidden p-10 h-full">
          <div
            className="border-2 absolute border-secondary bg-secondary h-full"
            style="left: 49.9%"
          ></div>
          {items.map((item, index) => this.renderLightCard(item, index))}
        </div>
      </div>
    );
  }

  renderLightCard(card, index) {
    const { card_title: cardTitle, card_description: cardDescription } = card;
    const styleClasses = {
      background: "bg-primary-lightest",
      titleColor: "text-primary-blue",
    };

    const aligmentCard = index % 2 === 0 ? "" : "flex-row-reverse";
    return (
      <div key={index} className={`mb-8 flex justify-between ${aligmentCard} items-center w-full`}>
        <div className="lg:w-5/12 md:w-5/12 sm:w-5/12 w-60"></div>
        <div className="mx-auto w-20 h-20">
          <img src="/img/lightblue-circle.svg" alt="" />
        </div>
        <div className={`${styleClasses.background} rounded-lg shadow-xl w-5/12 px-6 py-4`}>
          <div className={`mb-3 font-bold uppercase ${styleClasses.titleColor}`}>
            {RichText.render(cardTitle, linkResolver)}
          </div>
          <div className="">{RichText.render(cardDescription, linkResolver)}</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderPrimary()}
        {this.renderGrid()}
      </div>
    );
  }
}

export default CommentaryTree;
