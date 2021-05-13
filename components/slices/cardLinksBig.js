import React, { Component } from "react";
import Image from "../common/Image";
import CustomLink from "../common/customLink";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../../prismic-configuration";
import TextUtils from "../../utils/text";
import StyleUtils from "../../utils/styleUtils";

class CardLinksBig extends Component {
  render() {
    const { primary } = this.props.slice;
    const {
      hidden_title: hiddenTitle,
      title,
      subtitle,
      background_color: backgroundColor,
    } = primary;

    const hasTitle = TextUtils.hasRichText(title);
    const hasSubtitle = TextUtils.hasRichText(subtitle);
    const backgroundStyles = StyleUtils.getBackgroundColor(backgroundColor);
    const titleColorStyle = StyleUtils.getTitleColor(backgroundColor);
    return (
      <div className={`mx-auto text-center ${backgroundStyles}`}>
        <div
          className={`flex flex-col justify-between items-center py-10 px-12 lg:px-28 mx-auto lg:pt-10`}
        >
          {TextUtils.hasRichText(hiddenTitle) && (
            <div className="hidden">{RichText.render(hiddenTitle, linkResolver)}</div>
          )}
          {hasTitle && (
            <div className="pb-5">
              <span className={`font-bold text-xl lg:text-3xl ${titleColorStyle} `}>
                {RichText.render(title, linkResolver)}
              </span>
            </div>
          )}
          {hasSubtitle && (
            <div className="w-5/6 md:w-3/6 lg:w-3/6 ">
              <span className="text-center font-light">
                {RichText.render(subtitle, linkResolver)}
              </span>
            </div>
          )}
        </div>
        {this.renderCards()}
      </div>
    );
  }

  renderCards() {
    const { items: cards } = this.props.slice;
    return (
      <div className={`px-6 lg:px-28 z-10 md:pb-20`}>
        <div
          className={`flex flex-col h-auto relative -top-4 lg:-top-20 md:flex-row md:space-x-7 md:items-center text-primary-dark text-center`}
        >
          {cards.map((card, index) => {
            const {
              card_header_image,
              card_big_image,
              card_small_title,
              card_big_title,
              card_link,
              card_link_label,
            } = card;
            return (
              <CustomLink key={index} link={card_link}>
                <div
                  className={`card hover_translate-y-2 h-full w-full flex flex-col items-center mb-10 md:mb-0 py-10 px-8 xl:max-w-1/5`}
                >
                  <Image image={card_header_image} />
                  <div className="text-xl font-bold py-6 lg:text-2xl lg:pt-6 lg:pb-12">
                    {RichText.render(card_big_title, linkResolver)}
                  </div>
                  <div className="text-xl font-bold py-6 lg:text-2xl lg:pt-6 lg:pb-12">
                    {RichText.render(card_small_title, linkResolver)}
                  </div>
                  {card_link_label && (
                    <div className="font-bold pt-6 underline">{card_link_label}</div>
                  )}
                  <Image image={card_big_image} />
                </div>
              </CustomLink>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CardLinksBig;
