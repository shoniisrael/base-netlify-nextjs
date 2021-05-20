import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../../prismic-configuration";
import ResponsiveImage from "../common/responsiveImage";

import { SCREEN_SIZES, DEFAULT_SPACE_SIZE } from "../../utils/constants.js";

export default class ImagesRow extends Component {
  getSizeForScreen(maxScreenSize, cols) {
    const availableSpace = maxScreenSize - DEFAULT_SPACE_SIZE * (cols + 1);
    const columnSize = Math.round(availableSpace / cols);
    return Math.round((columnSize / maxScreenSize) * 100);
  }

  getSizes(maxWidth, colsMobile, colsTablet) {
    const largeSize = parseInt(SCREEN_SIZES.MD);
    const smallSize = parseInt(SCREEN_SIZES.SM);
    const tablet = this.getSizeForScreen(largeSize, colsTablet);
    const mobile = this.getSizeForScreen(smallSize, colsMobile);
    return `(min-width:${SCREEN_SIZES.LG}) ${maxWidth}px, (min-width:${SCREEN_SIZES.SM}) ${tablet}vw, ${mobile}vw`;
  }

  getAnimationClasses(displayAnimationOnHover) {
    if (displayAnimationOnHover) {
      return {
        image: "transition duration-500 transform group-hover:scale-110",
        text: "text-center text-opacity-0 group-hover:text-opacity-100",
      };
    }
    return {
      image: "",
      text: "",
    };
  }

  getBackgroundClasses(bgColor) {
    switch (bgColor) {
      case "dark":
        return {
          background: "bg-primary-dark",
          titleColor: "text-secondary",
          descriptionColor: "text-white",
        };
      default:
        return {
          background: "bg-white",
          titleColor: "text-primary-dark",
          descriptionColor: "text-primary-dark",
        };
    }
  }
  getAligmentClasses(textAlignment) {
    switch (textAlignment) {
      case "center":
        return {
          text: "text-center",
          item: "",
        };
      default:
        return {
          text: "text-left",
          item: "self-start",
        };
    }
  }

  getGridColsForScreens(columnsMobile, columnsTablet, columnsDesktop) {
    return `grid-cols-${columnsMobile} md:grid-cols-${columnsTablet} lg:grid-cols-${columnsDesktop}`;
  }

  renderImage(icon) {
    const { primary } = this.props.slice;
    const {
      display_animation_on_hover,
      max_width: maxWidth,
      max_height: maxHeight,
      columns_tablet: columnsTablet,
      columns_mobile: columnsMobile,
    } = primary;
    const animationClasses = this.getAnimationClasses(display_animation_on_hover);
    const sizes = this.getSizes(maxWidth, columnsMobile, columnsTablet);
    return (
      <div
        className="flex flex-col items-center justify-center"
        style={{ height: `${maxHeight}px` }}
      >
        <ResponsiveImage
          style={{ maxWidth: `${maxWidth}px`, maxHeight: `${maxHeight}px` }}
          image={icon.image}
          sizes={sizes}
          className={`${animationClasses.image} mx-auto object-contain`}
          options={{ maxWidth, maxHeight }}
        />
      </div>
    );
  }

  displayAnimationHover(hasImage, icon) {
    const { primary } = this.props.slice;
    const { display_animation_on_hover, background_color } = primary;
    const backgroundClasses = this.getBackgroundClasses(background_color);
    const animationClasses = this.getAnimationClasses(display_animation_on_hover);
    return (
      <div
        className={`${backgroundClasses.descriptionColor} ${
          display_animation_on_hover ? animationClasses.text : ""
        } ${hasImage ? "" : "text-base 2xl:text-lg"} max-h-5`}
      >
        {RichText.render(icon.text, linkResolver)}
      </div>
    );
  }

  renderGrid(columnsMobile, columnsTablet, columnsDesktop, numRow = 0) {
    const { primary, items } = this.props.slice;
    const { display_animation_on_hover } = primary;
    const gridColsForScreens = this.getGridColsForScreens(
      columnsMobile,
      columnsTablet,
      columnsDesktop,
    );
    const itemGridClassName =
      "flex flex-col items-center justify-center space-y-6 text-center group hover:border-transparent";
    return (
      <div
        className={`grid justify-items-center items-center w-full text-sm gap-8 ${gridColsForScreens}`}
      >
        {numRow === 0 &&
          items.map((icon, index) => {
            const hasImage = !!Object.values(icon.image).length;
            return (
              <div className={itemGridClassName} key={index}>
                {hasImage && this.renderImage(icon)}
                {(display_animation_on_hover || !hasImage) &&
                  this.displayAnimationHover(hasImage, icon)}
              </div>
            );
          })}
        {numRow === 1 &&
          items.map((icon, index) => {
            const hasImage = !!Object.values(icon.image).length;
            if (index < columnsDesktop) {
              return (
                <div className={itemGridClassName} key={index}>
                  {hasImage && this.renderImage(icon)}
                  {(display_animation_on_hover || !hasImage) &&
                    this.displayAnimationHover(hasImage, icon)}
                </div>
              );
            }
          })}
        {numRow === 2 &&
          items.map((icon, index) => {
            const hasImage = !!Object.values(icon.image).length;
            if (index > columnsDesktop) {
              return (
                <div className={`${itemGridClassName} mt-10`} key={index}>
                  {hasImage && this.renderImage(icon)}
                  {(display_animation_on_hover || !hasImage) &&
                    this.displayAnimationHover(hasImage, icon)}
                </div>
              );
            }
          })}
      </div>
    );
  }

  render() {
    const { primary } = this.props.slice;
    const {
      background_color,
      columns_desktop: columnsDesktop,
      columns_tablet: columnsTablet,
      columns_mobile: columnsMobile,
      text_alignment,
      top_row: topRowHigher,
    } = primary;

    const backgroundClasses = this.getBackgroundClasses(background_color);
    const alignmentClasses = this.getAligmentClasses(text_alignment);

    return (
      <div className={`w-full py-12 ${backgroundClasses.background} md:py-20 lg:py-28`}>
        <div className="container flex flex-col items-center w-full px-6 md:px-14 lg:px-28 mx-auto">
          {primary.small_title && (
            <div
              className={`pb-5 text-xs md:text-sm ${alignmentClasses.item} ${alignmentClasses.text} text-primary-dark`}
            >
              {RichText.render(primary.small_title, linkResolver)}
            </div>
          )}
          <div
            className={`text-2xl font-bold ${alignmentClasses.item} ${alignmentClasses.text} ${backgroundClasses.titleColor} md:text-4xl`}
          >
            {RichText.render(primary.big_title, linkResolver)}
          </div>
          {primary.description && (
            <div
              className={`${backgroundClasses.descriptionColor} ${alignmentClasses.item} ${alignmentClasses.text} p_py-2 leading-relaxed my-7 lg:w-3/4 xl:text-lg`}
            >
              {RichText.render(primary.description, linkResolver)}
            </div>
          )}
          {!topRowHigher && this.renderGrid(columnsMobile, columnsTablet, columnsDesktop)}
          {topRowHigher && (
            <div className="w-full">
              {this.renderGrid(columnsMobile, columnsTablet, columnsDesktop, 1)}
              {this.renderGrid(columnsMobile - 1, columnsTablet - 1, columnsDesktop - 1, 2)}
            </div>
          )}
        </div>
      </div>
    );
  }
}
