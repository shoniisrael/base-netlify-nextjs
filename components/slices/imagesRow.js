import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../../prismic-configuration";
import ResponsiveImage from "../common/responsiveImage";

import { SCREEN_SIZES, DEFAULT_SPACE_SIZE } from "../../utils/constants.js";
import StyleUtils from "../../utils/styleUtils";

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

  renderGrid() {
    const { primary, items } = this.props.slice;
    const {
      display_animation_on_hover,
      columns_desktop: columnsDesktop,
      columns_tablet: columnsTablet,
      columns_mobile: columnsMobile,
      center_last_item: centerLastItem,
    } = primary;
    const gridColsForScreens = this.getGridColsForScreens(
      columnsMobile,
      columnsTablet,
      columnsDesktop,
    );
    const itemGridClassName =
      "flex flex-col items-center justify-center space-y-6 text-center group hover:border-transparent";
    const itemsLength = items.length - 1;
    let lastChildren = "";
    return (
      <div
        className={`grid justify-items-center items-center w-full text-sm gap-8 ${gridColsForScreens}`}
      >
        {items.map((icon, index) => {
          if (itemsLength === index && centerLastItem) lastChildren = "col-span-2 md:col-auto";
          const hasImage = !!Object.values(icon.image).length;

          return (
            <div className={`${itemGridClassName} ${lastChildren}`} key={index}>
              {hasImage && this.renderImage(icon)}
              {(display_animation_on_hover || !hasImage) &&
                this.displayAnimationHover(hasImage, icon)}
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const { primary } = this.props.slice;
    const {
      background_color,
      text_alignment,
      background_style,
      ruler_top: rulerTop,
      ruler_bottom: rulerBottom,
    } = primary;

    const backgroundClasses = this.getBackgroundClasses(background_color);
    const alignmentClasses = this.getAligmentClasses(text_alignment);
    const backgroundStyle = StyleUtils.getBackgroundStyle(background_style);

    return (
      <div className={`w-full ${backgroundClasses.background} ${backgroundStyle} `}>
        {rulerTop && <div className="pt-5 border-b-4 border-secondary w-1/6 mx-auto"></div>}
        <div className="py-12 container flex flex-col items-center w-full px-6 md:px-14 lg:px-28 mx-auto">
          {primary.small_title && (
            <div
              className={`pb-5 text-xs lg:text-sm uppercase  ${alignmentClasses.item} ${alignmentClasses.text} text-primary-dark`}
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
          {this.renderGrid()}
        </div>
        {rulerBottom && (
          <div className="mt-10 pb-5 border-t-4 border-secondary w-1/6 mx-auto"></div>
        )}
      </div>
    );
  }
}
