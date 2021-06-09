import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../../prismic-configuration";
import CustomLink from "../common/customLink";
import StyleUtils from "../../utils/styleUtils";
import Button from "../common/button";
import ResponsiveImage from "../common/responsiveImage";
import TextUtils from "../../utils/text";

const TYPES_GRID = {
  NORMAL: "normal",
  TREE_BY_TWO: "3up-2bottom",
  SPECIAL: "mid-higher",
};

class CardsGrid extends Component {
  renderCard(card, index) {
    const { image, title, description, link } = card;
    return (
      <CustomLink link={link} key={index}>
        <div className="h-full flex flex-col items-center px-7 py-16 card-borderless">
          <ResponsiveImage image={image} sizes="76px" className="h-20" />
          <div className=" text-lg font-bold text-center py-7 text-primary-dark">
            {RichText.render(title, linkResolver)}
          </div>
          <div className="text-center">{RichText.render(description, linkResolver)}</div>
        </div>
      </CustomLink>
    );
  }

  renderGrid() {
    const { items, primary } = this.props.slice;
    const { type_grid, number_columns: numberCols } = primary;
    const divClassName =
      "py-12 lg:pt-0 px-6 container mx-auto grid grid-cols-1  gap-y-6 md:gap-x-6 md:gap-y-8 lg:gap-x-10 lg:gap-y-6 text-sm md:px-40";
    const colsWidth = numberCols === 2 ? "md:w-2/3" : "w-full";
    switch (type_grid) {
      case TYPES_GRID.NORMAL:
        return (
          <div className={`w-full md:grid-cols-${numberCols} ${colsWidth} ${divClassName}`}>
            {items.map((item, index) => this.renderCard(item, index))}
          </div>
        );
      case TYPES_GRID.TREE_BY_TWO:
        return (
          <div>
            <div className={`md:grid-cols-3 ${divClassName}`}>
              {items.map((item, index) => {
                if (index < 3) return this.renderCard(item, index);
              })}
            </div>
            <div className={`md:grid-cols-2 ${divClassName}`}>
              {items.map((item, index) => {
                if (index >= 3) return this.renderCard(item, index);
              })}
            </div>
          </div>
        );
      case TYPES_GRID.SPECIAL:
        return (
          <div className={`md:grid-cols-3 ${divClassName}`}>
            {items.map((item, index) => {
              if (index == 1)
                return (
                  <div key={index} className="row-span-2">
                    {this.renderCard(item, index)}
                  </div>
                );
              return <div key={index}>{this.renderCard(item, index)}</div>;
            })}
          </div>
        );
      default:
        return "";
    }
  }

  renderPrimary() {
    const { primary } = this.props.slice;
    const { small_title, big_title, description, horizontal_ruler } = primary;
    return (
      <div className="flex flex-col justify-between items-center py-12 px-6 container mx-auto lg:pt-20">
        {TextUtils.hasRichText(small_title) && (
          <div className="pb-3">
            <span className="text-xs lg:text-sm font-light capitalize">
              {RichText.render(small_title, linkResolver)}
            </span>
          </div>
        )}
        {TextUtils.hasRichText(big_title) && (
          <div className="pb-10 text-center">
            <span className=" font-bold text-xl lg:text-5xl text-primary-dark">
              {RichText.render(big_title, linkResolver)}
            </span>
          </div>
        )}
        {TextUtils.hasRichText(description) && (
          <div className="lg:w-4/5">
            <span className="text-center font-light">
              {RichText.render(description, linkResolver)}
            </span>
          </div>
        )}
        {horizontal_ruler && <div className="border-b-2 border-secondary w-28 pb-10"></div>}
      </div>
    );
  }

  renderButton() {
    const { primary } = this.props.slice;
    const {
      button_label: buttonLabel,
      button_link: buttonLink,
      button_style: buttonStyle,
    } = primary;
    return (
      buttonLabel && (
        <div className="pb-10 flex justify-center">
          <Button link={buttonLink} label={buttonLabel} style={buttonStyle} />
        </div>
      )
    );
  }

  render() {
    const { primary } = this.props.slice;
    const { background_color, background_style } = primary;
    const backgroundColor = StyleUtils.getBackgroundColor(background_color);
    const backgroundStyle = StyleUtils.getBackgroundStyle(background_style);

    return (
      <div className={`${backgroundStyle} ${backgroundColor}`}>
        {this.renderPrimary()}
        {this.renderGrid()}
        {this.renderButton()}
      </div>
    );
  }
}

export default CardsGrid;
