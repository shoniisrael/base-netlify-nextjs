import React, { Component } from "react";
import Image from "../common/Image";
import CustomLink from "../common/customLink";
import Button from "./../common/button";
import { CARD_STYLE } from "../../utils/constants";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../../prismic-configuration";
import TextUtils from "../../utils/text";
import StyleUtils from "../../utils/styleUtils";

class CardLinks extends Component {
  render() {
    const { primary } = this.props.slice;
    const {
      hidden_title: hiddenTitle,
      title,
      subtitle,
      has_separation_line: hasSeparationLine,
      background_style: backgroundStyle,
      button_label: buttonLabel,
      button_link: buttonLink,
    } = primary;

    const hasTitle = TextUtils.hasRichText(title);
    const hasSubtitle = TextUtils.hasRichText(subtitle);
    const backgroundStyleClass = StyleUtils.getBackgroundStyle(backgroundStyle);
    const titleColorClass = StyleUtils.getTitleColor(backgroundStyle);
    const hasPrimary = hasTitle || hasSubtitle || hasSeparationLine;
    return (
      <div className={`mx-auto px-6 lg:px-28 text-center ${backgroundStyleClass}`}>
        {hasPrimary && (
          <div
            className={`flex flex-col justify-between items-center py-10 px-6 container mx-auto lg:pt-20 lg:pb-28`}
          >
            {TextUtils.hasRichText(hiddenTitle) && (
              <div className="hidden">{RichText.render(hiddenTitle, linkResolver)}</div>
            )}
            {hasTitle && (
              <div className="pb-5">
                <span className={`font-bold text-xl lg:text-3xl ${titleColorClass} `}>
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
            {hasSeparationLine && <div className="border-b-2 border-secondary w-28 pb-5"></div>}
          </div>
        )}
        {this.renderCards()}
        {buttonLabel && (
          <div className="w-4/6 md:w-2/6 xl:w-1/5 mx-auto z-10 pb-10 md:pb-15 xl:pb-15">
            <Button link={buttonLink} label={buttonLabel} style="filled" />
          </div>
        )}
      </div>
    );
  }

  renderCards() {
    const { items: cards } = this.props.slice;
    return (
      <div className="flex flex-col h-auto relative -top-4 lg:-top-20 z-10  md:flex-row md:space-x-7 md:items-center text-primary-dark text-center">
        {cards.map((card, index) => {
          const { card_image, card_title, card_description, card_style, card_link } = card;
          const cardClass =
            card_style === CARD_STYLE.HIGHLIGHTED ? "md:py-16 lg:py-20" : "md:py-11";
          return (
            <CustomLink key={index} link={card_link}>
              <div
                className={`card hover_translate-y-2 h-full w-full flex flex-col items-center mb-10 md:mb-0 py-10 px-8 xl:max-w-1/5 ${cardClass}`}
              >
                <Image image={card_image} />
                <div className=" text-xl font-bold py-6 lg:text-2xl lg:pt-6 lg:pb-12">
                  {RichText.render(card_title, linkResolver)}
                </div>
                <div>{card_description}</div>
              </div>
            </CustomLink>
          );
        })}
      </div>
    );
  }
}

export default CardLinks;
