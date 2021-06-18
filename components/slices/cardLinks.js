import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../../prismic-configuration";
import CustomLink from "../common/customLink";
import Button from "../common/button";
import ResponsiveBgImage from "../common/responsiveBgImage";
import { CARD_STYLE } from "../../utils/constants";
import TextUtils from "../../utils/text";
import StyleUtils, { BACKGROUND_STYLE, TEXT_ALIGN } from "../../utils/styleUtils";
import ResponsiveImage from "../common/responsiveImage";

class CardLinks extends Component {
  render() {
    const { slice, index } = this.props;
    const { primary } = slice;
    const {
      background_image: backgroundImage,
      background_body_style: backgroundBodyStyle,
      background_body_color: backgroundBodyColor,
    } = primary;

    const backgroundBodyStyles = `${StyleUtils.getBackgroundColor(
      backgroundBodyColor,
    )} ${StyleUtils.getBackgroundStyle(backgroundBodyStyle)}`;

    return (
      <ResponsiveBgImage index={index} bgImage={backgroundImage} classes={backgroundBodyStyles}>
        {this.renderHeader()}
        <div className="container mx-auto">
          {this.renderCards()}
          {this.renderFooter()}
        </div>
      </ResponsiveBgImage>
    );
  }

  renderHeader() {
    const { primary } = this.props.slice;
    const {
      small_title: smallTitle,
      title,
      title_color: titleColor,
      subtitle,
      subtitle_color: subtitleColor,
      header_text_align: headerTextAlign,
      has_separation_line: hasSeparationLine,
      background_header_style: backgroundHeaderStyle,
      background_header_color: backgroundHeaderColor,
      background_body_style: backgroundBodyStyle,
    } = primary;

    const hasTitle = TextUtils.hasRichText(title);
    const hasSubtitle = TextUtils.hasRichText(subtitle);
    let backgroundHeaderStyles = `${StyleUtils.getBackgroundColor(
      backgroundHeaderColor,
    )} ${StyleUtils.getBackgroundStyle(backgroundHeaderStyle)} 
    ${StyleUtils.getTextColor(subtitleColor, backgroundHeaderColor)}`;

    const titleColorStyle = StyleUtils.getTitleColor(titleColor, backgroundHeaderColor);
    const hasPrimary =
      hasTitle ||
      hasSubtitle ||
      hasSeparationLine ||
      (backgroundHeaderStyle && backgroundHeaderStyle !== BACKGROUND_STYLE.NONE);

    backgroundHeaderStyles = `${backgroundHeaderStyles} ${
      headerTextAlign === TEXT_ALIGN.LEFT ? "items-start text-left" : "items-center text-center"
    }`;
    backgroundHeaderStyles = `${backgroundHeaderStyles} ${
      !backgroundBodyStyle || backgroundBodyStyle === BACKGROUND_STYLE.NONE
        ? "lg:pb-28"
        : "lg:pb-12"
    }`;

    const titleWidthStyle = headerTextAlign === TEXT_ALIGN.LEFT ? "md:w-3/6" : "";

    return (
      hasPrimary && (
        <div
          className={`flex flex-col justify-between py-10 px-12 lg:px-28 mx-auto lg:pt-10  ${backgroundHeaderStyles}`}
        >
          {TextUtils.hasRichText(smallTitle) && (
            <div className="pb-5 text-xs lg:text-sm uppercase">
              {RichText.render(smallTitle, linkResolver)}
            </div>
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
      )
    );
  }

  renderCards() {
    const { items: cards, primary } = this.props.slice;
    const { background_body_style: backgroundBodyStyle, button_label: buttonLabel } = primary;
    const hasHighlighted = cards.some((x) => x.card_style === CARD_STYLE.HIGHLIGHTED);
    const alignItemsStyle = hasHighlighted ? "md:items-center" : "";
    let paddingBodyStyles = buttonLabel ? "" : "md:pb-20";
    paddingBodyStyles = `${paddingBodyStyles} ${
      !backgroundBodyStyle || backgroundBodyStyle === BACKGROUND_STYLE.NONE ? "" : "pb-10"
    }`;
    const bodyStyles =
      !backgroundBodyStyle || backgroundBodyStyle === BACKGROUND_STYLE.NONE
        ? "-top-4 lg:-top-20"
        : "md:pb-10";

    const cols = cards.length === 4 ? 2 : cards.length;
    paddingBodyStyles = `${paddingBodyStyles} ${
      cols === 2 ? "md:px-40 lg:px-44 xl:px-60" : "lg:px-20"
    }`;

    return (
      <div className={`px-6 lg:px-28 z-10 ${paddingBodyStyles}`}>
        <div
          className={`grid grid-cols-1 md:grid-cols-${cols} gap-y-10 h-auto relative ${bodyStyles} md:gap-x-8 items-stretch ${alignItemsStyle} text-primary-dark text-center`}
        >
          {cards.map((card, index) => {
            const {
              card_image: cardImage,
              card_title: cardTitle,
              card_description: cardDescription,
              card_style: cardStyle,
              card_link: cardLink,
              card_link_label: cardLinkLabel,
            } = card;
            const cardClass =
              cardStyle === CARD_STYLE.HIGHLIGHTED ? "md:py-16 lg:py-20" : "md:py-11";
            return (
              <CustomLink key={index} link={cardLink}>
                <div
                  className={`card hover_translate-y-2 h-full w-full flex flex-col items-center mb-10 md:mb-0 py-10 px-8 xl:max-w-1/5 ${cardClass}`}
                >
                  <ResponsiveImage image={cardImage} sizes="76px" className="h-20" />
                  <div className="text-xl font-bold py-6 lg:text-2xl lg:pt-6 lg:pb-12">
                    {RichText.render(cardTitle, linkResolver)}
                  </div>
                  <div>{cardDescription}</div>
                  {cardLinkLabel && <div className="font-bold pt-6 underline">{cardLinkLabel}</div>}
                </div>
              </CustomLink>
            );
          })}
        </div>
      </div>
    );
  }

  renderFooter() {
    const { primary } = this.props.slice;
    const {
      button_label: buttonLabel,
      button_link: buttonLink,
      button_style: buttonStyle,
    } = primary;
    return (
      buttonLabel && (
        <div className="flex justify-center mb-20">
          <Button link={buttonLink} label={buttonLabel} style={buttonStyle} />
        </div>
      )
    );
  }
}
export default CardLinks;
