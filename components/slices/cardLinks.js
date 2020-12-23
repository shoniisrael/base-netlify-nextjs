import React, { Component } from "react";
import Image from "../common/Image";
import CustomLink from "../common/customLink";
import { CARD_STYLE } from "../../utils/constants";
import { RichText } from "prismic-reactjs";

class CardLinks extends Component {
  render() {
    const { items: cards } = this.props.slice;
    return (
      <div className="container mx-auto px-6 lg:px-20 text-center">
        <div className="flex flex-col h-auto relative -top-4 z-10 lg:-top-20 md:pb-20 md:flex-row md:space-x-7 md:items-center text-primary-dark text-center">
          {cards.map((card, index) => {
            const { card_image, card_title, card_description, card_style, card_link } = card;
            const cardClass =
              card_style === CARD_STYLE.HIGHLIGHTED ? "md:py-16 lg:py-20" : "md:py-11";
            return (
              <CustomLink key={index} link={card_link}>
                <div
                  className={`card h-full w-full flex flex-col items-center mb-10 md:mb-0 py-10 px-8 xl:max-w-1/5 ${cardClass}`}
                >
                  <Image image={card_image} />
                  <div className=" text-xl font-bold py-6 lg:text-2xl lg:pt-6 lg:pb-12">
                    {RichText.render(card_title)}
                  </div>
                  <div>{card_description}</div>
                </div>
              </CustomLink>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CardLinks;
