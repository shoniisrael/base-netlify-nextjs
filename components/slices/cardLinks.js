import React, { Component } from "react";
import Image from "../common/Image";
import CustomLink from "../common/customLink";
import Button from "./../common/button";
import { CARD_STYLE } from "../../utils/constants";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../../prismic-configuration";
import TextUtils from "../../utils/text";
import StyleUtils, { BACKGROUND_STYLE } from "../../utils/styleUtils";

class CardLinks extends Component {
  render() {
    const { primary } = this.props.slice;
    const {
      hidden_title: hiddenTitle,
      title,
      subtitle,
      header_text_align: headerTextAlign,
      has_separation_line: hasSeparationLine,
      background_header_style: backgroundHeaderStyle,
      background_header_color: backgroundHeaderColor,
      background_body_style: backgroundBodyStyle,
      background_body_color: backgroundBodyColor,
      button_label: buttonLabel,
      button_link: buttonLink,
    } = primary;

    const hasTitle = TextUtils.hasRichText(title);
    const hasSubtitle = TextUtils.hasRichText(subtitle);
    let backgroundHeaderStyles = `${StyleUtils.getBackgroundColor(
      backgroundHeaderColor,
    )} ${StyleUtils.getBackgroundStyle(backgroundHeaderStyle)}`;
    const backgroundBodyStyles = `${StyleUtils.getBackgroundColor(
      backgroundBodyColor,
    )} ${StyleUtils.getBackgroundStyle(backgroundBodyStyle)}`;
    const titleColorStyle = StyleUtils.getTitleColor(backgroundHeaderColor);
    const hasPrimary =
      hasTitle ||
      hasSubtitle ||
      hasSeparationLine ||
      backgroundHeaderStyle !== BACKGROUND_STYLE.NONE;
    let paddingBodyStyles = buttonLabel ? "" : "md:pb-20";
    const bodyStyles =
      backgroundBodyStyle === BACKGROUND_STYLE.NONE ? "-top-4 lg:-top-20" : "md:pb-10";
    backgroundHeaderStyles =
      backgroundBodyStyle === BACKGROUND_STYLE.NONE
        ? `lg:pb-28 ${backgroundHeaderStyles}`
        : `lg:pb-12 ${backgroundHeaderStyles} `;
    const alignItemsStyle = backgroundBodyStyle === BACKGROUND_STYLE.NONE ? "center" : "stretch";
    paddingBodyStyles =
      backgroundBodyStyle === BACKGROUND_STYLE.NONE
        ? paddingBodyStyles
        : `${paddingBodyStyles} pb-10`;
    return (
      <div className={`mx-auto text-center ${backgroundBodyStyles}`}>
        {hasPrimary && (
          <div
            className={`flex flex-col justify-between items-center text-${headerTextAlign} py-10 px-12 lg:px-28 mx-auto lg:pt-10  ${backgroundHeaderStyles}`}
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
              <div className="w-5/6 md:w-4/6 ">
                <span className={`text-${headerTextAlign} font-light`}>
                  {RichText.render(subtitle, linkResolver)}
                </span>
              </div>
            )}
            {hasSeparationLine && <div className="border-b-2 border-secondary w-28 pb-5"></div>}
          </div>
        )}
        {this.renderCards(bodyStyles, paddingBodyStyles, alignItemsStyle)}
        {buttonLabel && (
          <div className="w-4/6 md:w-2/6 xl:w-1/5 mx-auto z-10 pb-10 md:pb-15 xl:pb-15">
            <Button link={buttonLink} label={buttonLabel} style="filled" />
          </div>
        )}
      </div>
    );
  }

  renderCards(bodyStyles, paddingBodyStyles, alignItemsStyle) {
    const { items: cards } = this.props.slice;
    const cols = cards.length === 4 ? 2 : cards.length;
    paddingBodyStyles = `${paddingBodyStyles} ${cols === 2 ? "lg:px-40" : "lg:px-28"}`;
    alignItemsStyle = cols !== 2 ? alignItemsStyle : "stretch";
    return (
      <div className={`px-6 lg:px-28 z-10 ${paddingBodyStyles}`}>
        <div
          className={`grid grid-cols-1 md:grid-cols-${cols} gap-y-10 h-auto relative ${bodyStyles} md:gap-x-7 md:items-${alignItemsStyle} text-primary-dark text-center`}
        >
          {cards.map((card, index) => {
            const {
              card_image,
              card_title,
              card_description,
              card_style,
              card_link,
              card_link_label,
            } = card;
            const cardClass =
              card_style === CARD_STYLE.HIGHLIGHTED ? "md:py-16 lg:py-20" : "md:py-11";
            return (
              <CustomLink key={index} link={card_link}>
                <div
                  className={`card hover_translate-y-2 h-full w-full flex flex-col items-center mb-10 md:mb-0 py-10 px-8 xl:max-w-1/5 ${cardClass}`}
                >
                  <Image image={card_image} />
                  <div className="text-xl font-bold py-6 lg:text-2xl lg:pt-6 lg:pb-12">
                    {RichText.render(card_title, linkResolver)}
                  </div>
                  <div>{card_description}</div>
                  {card_link_label && (
                    <div className="font-bold pt-6 underline">{card_link_label}</div>
                  )}
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
