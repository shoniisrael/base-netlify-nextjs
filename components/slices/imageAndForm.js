import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../../prismic-configuration";
import TextUtils from "../../utils/text";
import Form from "../common/form";
import ResponsiveImage from "../common/responsiveImage";
import { useAppContext } from "../../pages/_app";

const FORM_ALIGNMENT = {
  LEFT: "left",
  RIGHT: "right",
};
const BACKGROUND_STYLE = {
  LIGHT: "light",
  DARK: "dark",
};

const TITLE_SIZE = {
  LARGE: "large",
  EXTRA_LARGE: "extra-large",
};
class ImageAndForm extends Component {
  getAlignmentClasses(alignment) {
    if (alignment === FORM_ALIGNMENT.RIGHT) {
      return {
        flexDirection: "lg:flex-row",
        padding: "lg:pl-14 xl:pl-20 2xl:pl-40",
      };
    }
    return {
      flexDirection: "lg:flex-row-reverse",
      padding: "lg:pr-14 xl:pr-20 2xl:pr-40",
    };
  }
  getBackgroundStyle(backgroundStyle) {
    switch (backgroundStyle) {
      case BACKGROUND_STYLE.LIGHT:
        return "bg-primary-lighter blue-top-right-oval-bg";
      case BACKGROUND_STYLE.DARK:
        return "bg-primary-dark dots2-left dark";
      default:
        return "bg-primary-lighter blue-top-right-oval-bg";
    }
  }
  getTextStyle(backgroundStyle) {
    switch (backgroundStyle) {
      case BACKGROUND_STYLE.LIGHT:
        return "text-primary-dark";
      case BACKGROUND_STYLE.DARK:
        return "text-white";
      default:
        return "text-primary-dark";
    }
  }
  getFormStyle(backgroundStyle) {
    switch (backgroundStyle) {
      case BACKGROUND_STYLE.LIGHT:
        return "lg:border-black lg:border lg:bg-white ";
      case BACKGROUND_STYLE.DARK:
        return "border-black  border bg-white ";
      default:
        return "lg:border-black lg:border lg:bg-white";
    }
  }
  getFormFloatingStyle(backgroundStyle) {
    switch (backgroundStyle) {
      case BACKGROUND_STYLE.LIGHT:
        return "lg:-bottom-8 lg:relative ";
      case BACKGROUND_STYLE.DARK:
        return "-bottom-8 relative";
      default:
        return "lg:-bottom-8 lg:relative ";
    }
  }

  render() {
    const { slice, formConfig } = this.props;
    const { primary } = formConfig ? formConfig : slice;
    const { form_alignment: alignment } = primary;

    const { background_style } = slice.primary;
    const { flexDirection, padding } = this.getAlignmentClasses(alignment);
    const backgroundStyle = this.getBackgroundStyle(background_style);
    return (
      <div className={backgroundStyle}>
        <div className="container m-auto pt-12 px-6 md:px-14 lg:px-28 lg:pb-0">
          <div className={`flex flex-col ${flexDirection} 3xl:px-28`}>
            {this.renderTextAndImage()}
            {this.renderForm(padding)}
          </div>
        </div>
      </div>
    );
  }
  renderTextAndImage() {
    const { slice } = this.props;
    const { primary } = slice;
    const {
      small_title: smallTitle,
      big_title: bigTitle,
      big_image: bigImage,
      header_image: headerImage,
      background_style,
      big_title_size: bigTitleSize,
    } = primary;
    const textStyle = this.getTextStyle(background_style);
    const hasHeaderImage = headerImage && headerImage.dimensions;
    const smallTitlePaddingTop = hasHeaderImage ? "pt-10" : "pt-6";
    const bigTitlePadding = hasHeaderImage ? "pb-16" : "pb-16 lg:pb-0";
    const floatingImageStyle = hasHeaderImage
      ? "max-h-80 "
      : "max-h-full lg:max-h-96 lg:-bottom-28 lg:relative flex items-end";
    const bigTitleTextSize =
      bigTitleSize === TITLE_SIZE.EXTRA_LARGE ? "text-5xl md:text-6xl 2xl:text-7xl" : "text-4xl";
    return (
      <div className={`lg:w-1/2 px-2 ${textStyle} custom-check-list`}>
        {headerImage && (
          <ResponsiveImage image={headerImage} className="h-14 w-auto mb-auto" sizes="150px" />
        )}
        {TextUtils.hasRichText(smallTitle) && (
          <div className={`${smallTitlePaddingTop} pb-2 text-xs uppercase md:text-sm`}>
            {RichText.render(smallTitle, linkResolver)}
          </div>
        )}
        {TextUtils.hasRichText(bigTitle) && (
          <div
            className={`${bigTitlePadding} ${bigTitleTextSize} font-bold leading-tight ${textStyle}`}
          >
            {RichText.render(bigTitle, linkResolver)}
          </div>
        )}
        {bigImage && (
          <ResponsiveImage
            image={bigImage}
            sizes="(min-width:1440) 540px,(min-width:1024) 40vw, 90vw"
            className={`overflow-visible ${floatingImageStyle}`}
          />
        )}
      </div>
    );
  }
  renderForm(padding) {
    const { slice, index, formConfig, file, downloadName } = this.props;
    const { forms } = useAppContext();
    const { primary } = formConfig ? formConfig : slice;
    const { form_title: formTitle, form_description: formDescription } = primary;
    const { id } = primary.form;
    const form = id && forms.find((element) => element.id == id);
    const hasFormTitle = TextUtils.hasRichText(formTitle);
    const hasFormDescription = TextUtils.hasRichText(formDescription);
    const formStyle = this.getFormStyle(slice.primary.background_style);
    const formFloatingStyle = this.getFormFloatingStyle(slice.primary.background_style);
    return (
      <div className={`lg:w-1/2 ${padding} text-primary-dark ${formFloatingStyle} flex items-end`}>
        <div className={`${formStyle} w-full lg:px-4 pt-16 lg:pb-8`}>
          {hasFormTitle && (
            <div className="text-primary-dark text-xl font-bold px-2 pb-4">
              {RichText.render(formTitle, linkResolver)}
            </div>
          )}
          {hasFormDescription && (
            <div className="text-primary-dark px-2 pb-4 text-base">
              {RichText.render(formDescription, linkResolver)}
            </div>
          )}
          {form && <Form form={form} index={index} file={file} downloadName={downloadName} />}
        </div>
      </div>
    );
  }
}
export default ImageAndForm;
