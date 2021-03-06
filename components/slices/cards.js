import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import TextUtils from "../../utils/text";
import { linkResolver } from "../../prismic-configuration";

const STYLE = {
  ALTERNATIVE: "alternative",
  DARK: "dark",
};
const BG_CARD_LIGHT_WHITE = "white";

class Cards extends Component {
  renderLightCard(card, index) {
    const { title, subtitle, description } = card;
    const { background_style: bgStyleLight } = this.props.slice.primary;
    const bgCardLight = bgStyleLight === BG_CARD_LIGHT_WHITE ? "bg-primary-light" : "bg-white";
    const styleClasses = {
      background: `${bgCardLight} shadow-card rounded-xl`,
      cardTitleColor: "text-primary",
      cardSubtitleColor: "text-primary",
    };
    return (
      <div
        key={index}
        className={`${styleClasses.background} flex flex-col justify-between items-start px-6 py-8`}
      >
        <div className=" lg:text-base font-semibold text-primary-dark">
          {RichText.render(title, linkResolver)}
        </div>
        <div className="border-b-2 border-secondary py-3">
          {RichText.render(subtitle, linkResolver)}
        </div>
        <div className="pt-4 lg:text-base">{RichText.render(description, linkResolver)}</div>
      </div>
    );
  }

  renderDarkCard(card, index) {
    const { title, subtitle, description } = card;
    const styleClasses = {
      background: "bg-primary-dark",
      titleColor: "text-secondary",
      cardTitleColor: "text-white",
      cardSubtitleColor: "text-primary-lightBlue",
    };

    return (
      <div
        key={index}
        className={`${styleClasses.background} flex flex-col items-center text-center xl:px-4 py-6 rounded-xl`}
      >
        <div className={`${styleClasses.cardTitleColor} font-medium text-6xl`}>
          {RichText.render(title, linkResolver)}
        </div>
        <div className={`py-3 text-2xl font-bold ${styleClasses.cardSubtitleColor}`}>
          {RichText.render(subtitle, linkResolver)}
        </div>
        <div className={`lg:text-base ${styleClasses.cardSubtitleColor}`}>
          {RichText.render(description, linkResolver)}
        </div>
      </div>
    );
  }

  renderAlternativeCard(card, index, topImageCircle) {
    const { title, subtitle, description } = card;
    const styleClasses = {
      background: "bg-primary-lightest",
      titleColor: "text-primary-dark",
      cardTitleColor: "text-primary-blue",
      cardSubtitleColor: "text-primary",
    };
    let paddingWithImage = topImageCircle ? "pt-16 lg:pt-24" : "pt-5 rounded-lg mx-5";

    return (
      <div
        key={index}
        className={`${styleClasses.background} relative flex flex-col items-center text-center px-4 xl:px-4 pb-7 ${paddingWithImage}`}
      >
        {topImageCircle && (
          <div className="absolute -top-10">
            <img src="/img/lightblue-circle.svg" alt="" />
          </div>
        )}
        <div
          className={`${styleClasses.cardTitleColor} px-10 font-semibold text-xl md:px-1 xl:px-12 py-4`}
        >
          {RichText.render(title, linkResolver)}
        </div>
        <div className={`py-3 text-2xl font-bold ${styleClasses.cardSubtitleColor}`}>
          {RichText.render(subtitle, linkResolver)}
        </div>
        <div className={`lg:text-base ${styleClasses.cardSubtitleColor}`}>
          {RichText.render(description, linkResolver)}
        </div>
      </div>
    );
  }

  renderStyledCards(style, items) {
    const { top_image_circle_card: topImageCircle } = this.props.slice.primary;
    switch (style) {
      case STYLE.DARK:
        return items.map((item, index) => this.renderDarkCard(item, index));
      case STYLE.ALTERNATIVE:
        return items.map((item, index) => this.renderAlternativeCard(item, index, topImageCircle));
      default:
        return items.map((item, index) => this.renderLightCard(item, index));
    }
  }

  getStyleClasses(style, hasTitle, raiseCards) {
    const commonPadding = "p-10 md:px-14 lg:px-28";
    const { background_style: bgStyleLight } = this.props.slice.primary;
    switch (style) {
      case STYLE.DARK:
        return {
          bgColor: "bg-primary-dark",
          titleColor: "text-secondary",
          padding: raiseCards && !hasTitle ? `${commonPadding} lg:pt-0` : commonPadding,
          gridGap: "md:gap-x-6 gap-y-6 md:gap-y-8 lg:gap-y-6",
          titlesBottomPadding: hasTitle ? "pb-8" : "",
        };
      case STYLE.ALTERNATIVE:
        return {
          bgColor: "bg-white",
          titleColor: "text-primary-dark",
          padding: raiseCards && !hasTitle ? `${commonPadding} lg:pt-14` : commonPadding,
          gridGap: "md:gap-x-6 gap-y-16 lg:gap-y-20",
          titlesBottomPadding: hasTitle ? "pb-16 md:pb-20" : "",
        };
      default:
        return {
          bgColor: bgStyleLight === BG_CARD_LIGHT_WHITE ? "bg-white" : "bg-primary-light",
          titleColor: "text-primary-dark",
          padding: raiseCards && !hasTitle ? `${commonPadding} lg:pt-0` : commonPadding,
          gridGap: "md:gap-x-6 gap-y-6 md:gap-y-16 lg:gap-y-20 xl:gap-x-20",
          titlesBottomPadding: hasTitle ? "pb-8" : "",
        };
    }
  }

  render() {
    const { items, primary } = this.props.slice;
    const {
      small_title: smallTitle,
      big_title: bigTitle,
      hidden_title: hiddenTitle,
      style,
      footer_text: footerText,
      columns_tablet: columnsTablet,
      columns_desktop: columnsDesktop,
      raise_cards: raiseCards,
    } = primary;
    const defaultColumns = 3;

    const hasHiddenTitle = TextUtils.hasRichText(hiddenTitle);
    const hasSmallTitle = TextUtils.hasRichText(smallTitle);
    const hasBigTitle = TextUtils.hasRichText(bigTitle);
    const hasVisibleTitle = hasSmallTitle || hasBigTitle;

    const topPosition =
      raiseCards && !hasVisibleTitle ? "pt-10 md:pt-0 md:relative md:-top-16" : "";
    const gridCols = `md:grid-cols-${columnsTablet || defaultColumns} lg:grid-cols-${
      columnsDesktop || defaultColumns
    }`;
    const { bgColor, titleColor, padding, gridGap, titlesBottomPadding } = this.getStyleClasses(
      style,
      hasVisibleTitle,
      raiseCards,
    );
    return (
      <div className={`w-full ${bgColor}`}>
        <div className={`container mx-auto ${padding}`}>
          {hasVisibleTitle && (
            <div className={`${titleColor} ${titlesBottomPadding}`}>
              {hasSmallTitle && (
                <div className="text-center text-sm py-3 uppercase">
                  {RichText.render(smallTitle, linkResolver)}
                </div>
              )}
              {hasBigTitle && (
                <div className="text-center text-4xl font-bold pt-4">
                  {RichText.render(bigTitle, linkResolver)}
                </div>
              )}
            </div>
          )}
          {hasHiddenTitle && (
            <div className="hidden">{RichText.render(hiddenTitle, linkResolver)}</div>
          )}
          <div
            className={`mx-auto grid grid-cols-1 place-items-stretch pb-6 ${gridCols} ${gridGap} text-sm ${topPosition}`}
          >
            {this.renderStyledCards(style, items)}
          </div>
          <div className="text-right">{RichText.render(footerText, linkResolver)}</div>
        </div>
      </div>
    );
  }
}
export default Cards;
