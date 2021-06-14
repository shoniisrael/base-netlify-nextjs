import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../../prismic-configuration";
import ResponsiveImage from "../common/responsiveImage";
import Button from "../common/button";
import TextUtils from "../../utils/text";
import StyleUtils from "../../utils/styleUtils";

class CardLinksBig extends Component {
  render() {
    const { primary } = this.props.slice;
    const { background_color: backgroundHeaderColor } = primary;
    const backgroundHeaderStyles = StyleUtils.getBackgroundColor(backgroundHeaderColor);
    return (
      <div className={`md:mb-20 ${backgroundHeaderStyles}`}>
        <div className="container mx-auto">
          {this.renderHeader()}
          {this.renderCards()}
        </div>
      </div>
    );
  }

  renderHeader() {
    const { primary } = this.props.slice;
    const {
      small_title: smallTitle,
      title,
      subtitle,
      background_color: backgroundHeaderColor,
    } = primary;

    const hasTitle = TextUtils.hasRichText(title);
    const hasSubtitle = TextUtils.hasRichText(subtitle);
    const titleColorStyle = StyleUtils.getTitleColor("", backgroundHeaderColor);
    const hasPrimary = hasTitle || hasSubtitle;
    return (
      hasPrimary && (
        <div className="flex flex-col justify-between py-10 md:pb-0 md:pt-16 px-12 lg:px-28 mx-auto  items-center text-center">
          {TextUtils.hasRichText(smallTitle) && (
            <div className="pb-5 text-xs lg:text-sm">
              {RichText.render(smallTitle, linkResolver)}
            </div>
          )}
          {hasTitle && (
            <div className="pb-5">
              <span className={`font-bold text-xl lg:text-3xl ${titleColorStyle} `}>
                {RichText.render(title, linkResolver)}
              </span>
            </div>
          )}
          {hasSubtitle && (
            <div className="md:w-4/6 ">
              <span className="font-light">{RichText.render(subtitle, linkResolver)}</span>
            </div>
          )}
        </div>
      )
    );
  }

  renderCards() {
    const { items: cards } = this.props.slice;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 h-auto relative px-6 md:px-14 md:-bottom-16 md:gap-x-4 md:items-stretch text-primary-dark text-center">
        {cards.map((card, index) => {
          const {
            card_header_image: cardHeaderImage,
            card_big_image: cardBigImage,
            card_small_title: cardSmallTitle,
            card_big_title: cardBigTitle,
            card_link: cardLink,
            card_link_label: cardLinkLabel,
            card_link_style: cardLinkStyle,
          } = card;
          return (
            <div
              key={index}
              className="flex flex-col rounded-xl bg-primary-light items-center md:items-start md:text-left md:flex-row mb-10 md:mb-0 pt-10 xl:max-w-1/5"
            >
              <div className="flex flex-col flex-1 pb-10 px-6 md:px-14 md:pr-0 items-center md:items-start">
                {cardHeaderImage && (
                  <ResponsiveImage
                    image={cardHeaderImage}
                    className="flex-grow-0 pb-4"
                    sizes="76px"
                  />
                )}
                <div className="pb-4 text-xs uppercase">
                  {RichText.render(cardSmallTitle, linkResolver)}
                </div>
                <div className="text-xl font-bold pb-6 lg:text-2xl">
                  {RichText.render(cardBigTitle, linkResolver)}
                </div>
                <div className="flex">
                  <Button link={cardLink} label={cardLinkLabel} style={`${cardLinkStyle} w-52`} />
                </div>
              </div>
              <div className="self-end lg:max-w-sm xl:max-w-lg md:w-1/2 lg:w-auto ml-auto md:justify-self-end">
                <ResponsiveImage
                  image={cardBigImage}
                  sizes="(min-width: 1280px) 280px, (min-width: 768px) 50vw, 75vw"
                  className="rounded-br-xl"
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default CardLinksBig;
