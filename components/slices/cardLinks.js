import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../../prismic-configuration";
import CustomLink from "../common/customLink";
import Image from "../common/Image";
import Button from "./../common/button";
import ResponsiveBgImage from "./../common/responsiveBgImage";
import { CARD_STYLE } from "../../utils/constants";
import TextUtils from "../../utils/text";
import StyleUtils, { BACKGROUND_STYLE, TEXT_ALIGN } from "../../utils/styleUtils";

class CardLinks extends Component {
  render() {
    const { slice, index } = this.props;
    const { primary } = slice;
    const {
      hidden_title: hiddenTitle,
      title,
      title_color: titleColor,
      subtitle,
      subtitle_color: subtitleColor,
      header_text_align: headerTextAlign,
      has_separation_line: hasSeparationLine,
      background_image: backgroundImage,
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
    )} ${StyleUtils.getBackgroundStyle(backgroundHeaderStyle)} 
    ${StyleUtils.getTextColor(subtitleColor, backgroundHeaderColor)}`;
    const backgroundBodyStyles = `${StyleUtils.getBackgroundColor(
      backgroundBodyColor,
    )} ${StyleUtils.getBackgroundStyle(backgroundBodyStyle)}`;
    const titleColorStyle = StyleUtils.getTitleColor(titleColor, backgroundHeaderColor);
    const hasPrimary =
      hasTitle ||
      hasSubtitle ||
      hasSeparationLine ||
      backgroundHeaderStyle !== BACKGROUND_STYLE.NONE;
    let paddingBodyStyles = buttonLabel ? "" : "md:pb-20";
    const bodyStyles =
      backgroundBodyStyle === BACKGROUND_STYLE.NONE ? "-top-4 lg:-top-20" : "md:pb-10";
    backgroundHeaderStyles = `${backgroundHeaderStyles} ${
      backgroundBodyStyle === BACKGROUND_STYLE.NONE ? "lg:pb-28" : "lg:pb-12"
    }`;
    backgroundHeaderStyles = `${backgroundHeaderStyles} ${
      headerTextAlign === TEXT_ALIGN.CENTER ? "items-center text-center" : "items-start text-left"
    }`;
    const alignItemsStyle = backgroundBodyStyle === BACKGROUND_STYLE.NONE ? "center" : "stretch";
    paddingBodyStyles = `${paddingBodyStyles} ${
      backgroundBodyStyle === BACKGROUND_STYLE.NONE ? "" : "pb-10"
    }`;
    const titleWidthStyle = headerTextAlign === TEXT_ALIGN.LEFT ? "md:w-3/6" : "";
    return (
      <ResponsiveBgImage index={index} bgImage={backgroundImage} classes={backgroundBodyStyles}>
        {hasPrimary && (
          <div
            className={`flex flex-col justify-between py-10 px-12 lg:px-28 mx-auto lg:pt-10  ${backgroundHeaderStyles}`}
          >
            {TextUtils.hasRichText(hiddenTitle) && (
              <div className="hidden">{RichText.render(hiddenTitle, linkResolver)}</div>
            )}
            {hasTitle && (
              <div className={`pb-5 ${titleWidthStyle}`}>
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
            {hasSeparationLine && <div className="border-b-2 border-secondary w-28 pb-5"></div>}
          </div>
        )}
        {this.renderCards(bodyStyles, paddingBodyStyles, alignItemsStyle)}
        {buttonLabel && (
          <div className="w-4/6 md:w-2/6 xl:w-1/5 mx-auto z-10 pb-10 md:pb-15 xl:pb-15">
            <Button link={buttonLink} label={buttonLabel} style="filled" />
          </div>
        )}
      </ResponsiveBgImage>
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
            const cardClass = card_style === CARD_STYLE.HIGHLIGHTED ? "md:py-16" : "md:py-11";
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
