import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import Button from "../common/button";
import ResponsiveImage from "../common/responsiveImage";
import AccordionPanel from "../common/accordionPanel";
import TextUtils from "../../utils/text";
import StyleUtils, { BACKGROUND_COLOR } from "../../utils/styleUtils";
import { linkResolver } from "../../prismic-configuration";

const IMAGE_ALIGNMENT = {
  LEFT: "left",
  RIGHT: "right",
};

const IMAGE_SIZE = {
  MEDIUM: "medium",
  LARGE: "large",
};

const TEXT_SIZE = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
};
const BULLET_POINT = {
  GREEN_POINT: "green point",
  GREEN_LINE: "green line",
};

class ImageAndText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
    this.activateTab = this.activateTab.bind(this);
  }

  activateTab(index) {
    this.setState((prev) => ({
      activeTab: prev.activeTab === index ? -1 : index,
    }));
  }

  render() {
    const { primary } = this.props.slice;
    const {
      style: backgroundColor,
      background_style: backgroundStyle,
      small_title: smallTitle,
      button_link: buttonLink,
      button_label: buttonLabel,
      button_style: buttonStyle,
      image_alignment: imageAlignment,
      image_size: imageSize,
      join_top: joinTop,
      join_bottom: joinBottom,
      align_content: alignContent,
    } = primary;

    const bgClasses = `${StyleUtils.getBackgroundColor(backgroundColor)} 
    ${StyleUtils.getBackgroundStyle(backgroundStyle)}`;
    const titleColor = StyleUtils.getTitleColor("", backgroundColor);
    const flexStyles = this.getFlexStyles(imageAlignment, imageSize);
    const textPadding = this.getTextPadding(imageAlignment);
    const textWidth = this.getTextWidth(imageSize);
    const topPadding = joinTop ? "-mt-20" : "pt-12 md:pt-20 lg:pt-28";
    const bottomPadding = joinBottom ? "" : "md:pb-20 lg:pb-28";

    return (
      <div className={`${bgClasses} w-full`}>
        <div className={`pb-12 ${topPadding} ${bottomPadding}`}>
          {this.renderHeader()}
          <div
            className={`overflow-hidden flex container mx-auto w-full px-6 md:px-14 lg:px-28 ${flexStyles} items-stretch`}
          >
            {this.renderImage()}
            <div
              className={`pb-8 md:${textWidth} px-4 ${textPadding} flex flex-wrap content-${alignContent}`}
            >
              {TextUtils.hasRichText(smallTitle) && (
                <div className={`${titleColor} text-xs uppercase mb-8`}>
                  {RichText.render(smallTitle, linkResolver)}
                </div>
              )}
              {this.renderRichTextSections()}
              {buttonLabel && (
                <div className="mt-16">
                  <Button link={buttonLink} label={buttonLabel} style={buttonStyle} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderHeader() {
    const { primary } = this.props.slice;
    const { style, header_title: headerTitle, header_description: headerDescription } = primary;
    const titleColor = StyleUtils.getTitleColor("", style);
    const hasHeaderTitle = TextUtils.hasRichText(headerTitle);
    const hasHeaderDescription = TextUtils.hasRichText(headerDescription);
    return (
      hasHeaderTitle &&
      hasHeaderDescription && (
        <div className="flex flex-col justify-between items-center text-center pt-10 md:pt-0 md:w-3/5 px-12 lg:px-28 mx-auto">
          {hasHeaderTitle && (
            <div className="pb-5">
              <span className={`font-bold text-3xl md:text-4xl ${titleColor} `}>
                {RichText.render(headerTitle, linkResolver)}
              </span>
            </div>
          )}
          {hasHeaderDescription && (
            <div className="pb-5 md:px-5">
              <span className="font-light">{RichText.render(headerDescription, linkResolver)}</span>
            </div>
          )}
        </div>
      )
    );
  }

  renderImage() {
    const { primary } = this.props.slice;
    const { image, image_size: imageSize, align_content: alignContent } = primary;
    const imageWidth = this.getImageWidth(imageSize);
    return (
      <div
        className={`py-10 md:py-0 md:${imageWidth} px-4 h-auto flex flex-wrap content-${alignContent}`}
      >
        <ResponsiveImage image={image} sizes="(min-width:1536) 648px, (min-width:768) 40vw, 75vw" />
      </div>
    );
  }

  renderRichTextSections() {
    const { items } = this.props.slice;
    return items.map((item, index) => {
      const {
        expand_collapse_effect: hasExpandCollapse,
        group_bullet: groupBullet,
        small_image: smallImage,
      } = item;
      const bulletStyle = hasExpandCollapse ? "" : StyleUtils.getBullet(groupBullet);

      return (
        <div key={index} className={bulletStyle}>
          <ResponsiveImage image={smallImage} className="flex-grow-0 pb-4" sizes="76px" />
          {hasExpandCollapse ? this.renderAccordionItem(item, index) : this.renderNormalItem(item)}
        </div>
      );
    });
  }

  renderNormalItem(item) {
    const { primary } = this.props.slice;
    const titleColor = StyleUtils.getTitleColor("", primary.style);
    const { font_size: fontSize, big_title: bigTitle } = item;
    const titleStyle = this.getTitleStyle(fontSize);

    return (
      <div>
        {TextUtils.hasRichText(bigTitle) && (
          <div className={`${titleColor} ${titleStyle} font-bold`}>
            {RichText.render(bigTitle, linkResolver)}
          </div>
        )}
        {this.renderItemDescription(item)}
      </div>
    );
  }

  renderAccordionItem(item, index) {
    const { activeTab } = this.state;
    const { primary } = this.props.slice;
    const titleColor = StyleUtils.getTitleColor("", primary.style);
    const { font_size: fontSize, big_title: bigTitle } = item;
    const titleStyle = `${this.getTitleStyle(fontSize)}`;
    return (
      <AccordionPanel
        label={RichText.render(bigTitle, linkResolver)}
        labelStyles={`${titleColor} ${titleStyle}`}
        activeTab={activeTab}
        index={index}
        activateTab={this.activateTab.bind(null, index)}
      >
        {this.renderItemDescription(item)}
      </AccordionPanel>
    );
  }

  renderItemDescription(item) {
    const { primary } = this.props.slice;
    const textColor = `${StyleUtils.getTextColor("", primary.style)} ${
      !primary.style || primary.style === BACKGROUND_COLOR.WHITE ? "font-medium" : ""
    }`;
    const {
      font_size: fontSize,
      rich_text: richText,
      button_link: buttonLink,
      button_label: buttonLabel,
      expand_collapse_effect: hasExpandCollapse,
    } = item;
    const textStyle = this.getTextStyle(fontSize);
    const bulletPointStyle = hasExpandCollapse
      ? ""
      : this.getBulletPointStyle(primary.bullet_point, primary.list_columns);

    return (
      <div>
        {TextUtils.hasRichText(richText) && (
          <div className={`${textColor} ${bulletPointStyle} ${textStyle}`}>
            {RichText.render(richText, linkResolver)}
          </div>
        )}
        {buttonLabel && (
          <div className="pt-5 pb-10">
            <Button link={buttonLink} label={buttonLabel} style="filled" />
          </div>
        )}
      </div>
    );
  }

  getBulletPointStyle(style, columns) {
    switch (style) {
      case BULLET_POINT.GREEN_POINT:
        return columns === "2" ? "two-column-dot-bullets" : "custom-dot-list";
      case BULLET_POINT.GREEN_LINE:
        return columns === "2" ? "two-column-bullets" : "custom-line-bullets";
      default:
        return columns === "2" ? "two-column-bullets" : "custom-line-bullets";
    }
  }

  getFlexStyles(imagePosition, size) {
    const direction =
      imagePosition === IMAGE_ALIGNMENT.LEFT
        ? "flex-col md:flex-row"
        : "flex-col-reverse md:flex-row-reverse";
    const position = size === IMAGE_SIZE.MEDIUM ? "items-center" : "items-start";
    return `${direction} ${position}`;
  }

  getImageWidth(size) {
    return size === IMAGE_SIZE.MEDIUM ? "w-1/3" : "w-1/2";
  }

  getTextWidth(imageSize) {
    return imageSize === IMAGE_SIZE.MEDIUM ? "w-2/3" : "w-1/2";
  }
  getTextPadding(imagePosition) {
    switch (imagePosition) {
      case IMAGE_ALIGNMENT.LEFT:
        return "md:pl-12 md:pr-0";
      case IMAGE_ALIGNMENT.RIGHT:
        return "md:pl-0 md:pr-12";
      default:
        return "md:px-0";
    }
  }

  getTextStyle(fontSize) {
    switch (fontSize) {
      case TEXT_SIZE.SMALL:
        return "text-sm pb-5";
      case TEXT_SIZE.MEDIUM:
        return "text-sm pb-7 pt-2";
      case TEXT_SIZE.LARGE:
        return "p_leading-loose li_leading-loose text-base lg:text-lg p_mb-10";
      default:
        return "";
    }
  }

  getTitleStyle(fontSize) {
    switch (fontSize) {
      case TEXT_SIZE.SMALL:
        return "text-sm";
      case TEXT_SIZE.MEDIUM:
        return "text-base";
      case TEXT_SIZE.LARGE:
        return "text-3xl pb-4 md:text-4xl lg:pb-8";
      default:
        return "";
    }
  }
}
export default ImageAndText;
