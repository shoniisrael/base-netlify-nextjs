import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import ResponsiveImage from "../common/responsiveImage";

import { SCREEN_SIZES, DEFAULT_SPACE_SIZE } from "../../utils/constants.js";

function getSizes(maxWidth, colsMobile, colsTablet) {
  const tablet = getSizeForScreen(SCREEN_SIZES.LG, colsTablet);
  const mobile = getSizeForScreen(SCREEN_SIZES.SM, colsMobile);
  return `(min-width:${SCREEN_SIZES.LG}) ${maxWidth}px, (min-width:${SCREEN_SIZES.SM}) ${tablet}vw, ${mobile}vw`;
}

function getSizeForScreen(maxScreenSize, cols) {
  const availableSpace = maxScreenSize - DEFAULT_SPACE_SIZE * (cols + 1);
  const columnSize = Math.round(availableSpace / cols);
  return Math.round((columnSize / maxScreenSize) * 100);
}

function getAnimationClasses(displayAnimationOnHover) {
  if (displayAnimationOnHover) {
    return {
      image: "transition duration-500 transform group-hover:scale-110",
      text: "text-center text-white text-opacity-0 group-hover:text-opacity-100",
    };
  }
  return {
    image: "",
    text: "",
  };
}

function getBackgroundClasses(bgColor) {
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
function getAligmentClasses(textAlignment) {
  switch (textAlignment) {
    case "center":
      return {
        text: "text-center",
        item: "",
      };
    default:
      return {
        text: "",
        item: "self-start",
      };
  }
}

function getGridColsForScreens(columnsMobile, columnsTablet, columnsDesktop) {
  return `grid-cols-${columnsMobile} md:grid-cols-${columnsTablet} lg:grid-cols-${columnsDesktop}`;
}

export default class ImagesRow extends Component {
  render() {
    const { primary, items } = this.props.slice;
    const {
      background_color,
      columns_desktop,
      columns_tablet,
      columns_mobile,
      text_alignment,
      display_animation_on_hover,
      max_width: maxWidth,
      max_height: maxHeight,
    } = primary;
    const animationClasses = getAnimationClasses(display_animation_on_hover);
    const backgroundClasses = getBackgroundClasses(background_color);
    const alignmentClasses = getAligmentClasses(text_alignment);
    const gridColsForScreens = getGridColsForScreens(
      columns_mobile,
      columns_tablet,
      columns_desktop,
    );
    const sizes = getSizes(maxHeight, columns_mobile, columns_tablet);

    return (
      <div className={`w-full py-12 ${backgroundClasses.background} md:py-20 lg:py-28`}>
        <div className="container flex flex-col items-center w-full px-6 mx-auto">
          {primary.small_title && (
            <div
              className={`pb-5 text-xs md:text-sm ${alignmentClasses.item} ${alignmentClasses.text} text-primary-dark`}
            >
              {RichText.render(primary.small_title)}
            </div>
          )}
          <div
            className={`text-2xl font-bold ${alignmentClasses.item} ${alignmentClasses.text} ${backgroundClasses.titleColor} md:text-4xl`}
          >
            {RichText.render(primary.big_title)}
          </div>
          {primary.description && (
            <div
              className={`${backgroundClasses.descriptionColor} leading-relaxed text-center my-7 lg:w-3/4`}
            >
              {RichText.render(primary.description)}
            </div>
          )}
          <div
            className={`grid justify-items-center items-center w-full text-sm gap-4 ${gridColsForScreens}`}
          >
            {items.map((icon, index) => {
              return (
                <div
                  className="flex flex-col items-center justify-center space-y-3 text-center group hover:border-transparent"
                  key={index}
                >
                  <div style={{ maxWidth: `${maxWidth}px`, maxHeight: `${maxHeight}px` }}>
                    <ResponsiveImage
                      image={icon.image}
                      sizes={sizes}
                      className={animationClasses.image}
                      options={{ maxWidth, maxHeight }}
                    />
                  </div>
                  <div className={animationClasses.text}>{icon.image.alt}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}