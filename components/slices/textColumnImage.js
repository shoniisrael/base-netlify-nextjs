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
        <div className="px-12 flex flex-col md:ml-5 lg:ml-20 justify-center">
          <div className="text-secondary font-bold text-3xl md:text-4xl">
            {RichText.render(title, linkResolver)}
          </div>
          <div className="mt-4 md:mt-14">{RichText.render(description, linkResolver)}</div>
        </div>
        <div className="mt-10 md:w-1/2">
          <ResponsiveImage
            image={image}
            sizes="(min-width:1536) 648px, (min-width:768) 40vw, 75vw"
          />
        </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:mx-20">
        {items.map((item, index) => this.renderStyleCard(item, index, cardStyle))}
      </div>
    );
  }

  renderStyleCard(card, index, cardStyle) {
    const { background, titleColor, descriptionColor } = cardStyle;
    const { card_title: cardTitle, card_description: cardDescription } = card;
    return (
      <div key={index} className={`mx-5 my-5 py-6 px-6 ${background}`}>
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
      <div className={`w-full bg-primary-dark py-8 ${bgStyle}`}>
        <div className="container mx-auto">
          {this.renderGrid()}
          {this.renderCards()}
        </div>
      </div>
    );
  }
}

export default TextColumnImage;
