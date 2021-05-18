import { RichText } from "prismic-reactjs";
import React, { Component } from "react";
import { linkResolver } from "../../prismic-configuration";
import ResponsiveImage from "../common/responsiveImage";

const BG_STYLE = {
  DOTS_7: "dots7",
};

const CARD_STYLE = {
  DARK: "dark",
  LIGHT: "light",
};

class TextColumnImage extends Component {
  getBackgroundClasses(bgStyle) {
    switch (bgStyle) {
      case BG_STYLE.DOTS_7:
        return "dots7";
      default:
        return "";
    }
  }

  getGridColumns(hasImage) {
    if (hasImage) return "justify-items-center grid-cols-1 md:grid-cols-2";
    return "";
  }

  getCardStyleClasses(cardStyle) {
    switch (cardStyle) {
      case CARD_STYLE.LIGHT:
        return {
          background: "bg-primary-lightest rounded-md shadow-md",
          titleColor: "font-bold text-primary-blue",
          descriptionColor: "text-primary",
        };
      case CARD_STYLE.DARK:
        return {
          titleColor: "font-bold",
        };
      default:
        return "";
    }
  }

  renderImageGridHeader() {
    const { title, description, image } = this.props.slice.primary;
    return (
      <>
        <div className="p-7 flex flex-col justify-center">
          <div className="text-secondary font-bold self-end text-xl md:text-4xl lg:text5x1">
            {RichText.render(title, linkResolver)}
          </div>
          <div className="mt-4 pl-0 md:pl-40 md:mt-14">
            {RichText.render(description, linkResolver)}
          </div>
        </div>
        <ResponsiveImage image={image} sizes="(min-width:768) 100vw, 30vw" />
      </>
    );
  }

  renderNormalGridHeader() {
    const { title, description } = this.props.slice.primary;
    return (
      <>
        <div className="p-7 text-center mt-5 sm:py-10 sm:px-20 md:py-20">
          <div className="font-bold text-lg md:text-2xl lg:text-3xl">
            {RichText.render(title, linkResolver)}
          </div>
          <div className="mt-7 md:px-9 lg:px-32 xl:px-60">
            {RichText.render(description, linkResolver)}
          </div>
        </div>
      </>
    );
  }

  renderGrid() {
    const { image } = this.props.slice.primary;
    const hasImage = !!Object.values(image).length;
    const columns = this.getGridColumns(hasImage);
    return (
      <div className={`grid ${columns}`}>
        {hasImage && this.renderImageGridHeader()}
        {!hasImage && this.renderNormalGridHeader()}
      </div>
    );
  }

  renderCards() {
    const { primary, items } = this.props.slice;
    const { card_style: cardStyleBg } = primary;
    const cardStyle = this.getCardStyleClasses(cardStyleBg);
    return (
      <div className="flex flex-wrap justify-center mx-5 mt-5">
        {items.map((item, index) => this.renderStyleCard(item, index, cardStyle))}
      </div>
    );
  }

  renderStyleCard(card, index, cardStyle) {
    const { background, titleColor, descriptionColor } = cardStyle;
    const { card_title: cardTitle, card_description: cardDescription } = card;
    return (
      <div key={index} className={`w-72 mx-5 my-5 py-6 px-6 ${background}`}>
        <div className={`mb-8 text-lg ${titleColor}`}>
          {RichText.render(cardTitle, linkResolver)}
        </div>
        <div className={descriptionColor}>{RichText.render(cardDescription, linkResolver)}</div>
      </div>
    );
  }

  render() {
    const { background_style: backgroundStyle } = this.props.slice.primary;
    const bgStyle = this.getBackgroundClasses(backgroundStyle);
    return (
      <div className={`container mx-auto w-full bg-primary-dark my-5${bgStyle}`}>
        {this.renderGrid()}
        {this.renderCards()}
      </div>
    );
  }
}

export default TextColumnImage;
