import { RichText } from "prismic-reactjs";
import React, { Component } from "react";
import TextUtils from "../../utils/text";
import Form from "../common/form";
import ResponsiveImage from "../common/responsiveImage";
import { useAppContext } from "../../pages/_app";

const FORM_ALIGNMENT = {
  LEFT: "left",
  RIGHT: "right",
};
class ImageAndForm extends Component {
  getAlignmentClasses(alignment) {
    if (alignment === FORM_ALIGNMENT.RIGHT) {
      return {
        flexDirection: "lg:flex-row",
        padding: "2xl:pl-20",
      };
    }
    return {
      flexDirection: "lg:flex-row-reverse",
      padding: "2xl:pr-20",
    };
  }
  render() {
    const { slice } = this.props;
    const { primary } = slice;
    const { form_alignment: alignment } = primary;
    const { flexDirection, padding } = this.getAlignmentClasses(alignment);
    return (
      <div className="bg-primary-lighter blue-top-right-oval-bg">
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
    } = primary;
    const hasHeaderImage = headerImage && headerImage.dimensions;
    const smallTitlePaddingTop = hasHeaderImage && "pt-10";
    return (
      <div className="lg:w-1/2 px-2 lg:pr-14 xl:pr-20 text-primary-dark custom-check-list">
        {headerImage && (
          <ResponsiveImage image={headerImage} className="h-16 w-auto mb-auto" sizes="150px" />
        )}
        {TextUtils.hasRichText(smallTitle) && (
          <div className={`${smallTitlePaddingTop} pb-2 text-xs uppercase md:text-sm`}>
            {RichText.render(smallTitle)}
          </div>
        )}
        {TextUtils.hasRichText(bigTitle) && (
          <div className="text-4xl pb-16 font-bold leading-tight text-primary-dark">
            {RichText.render(bigTitle)}
          </div>
        )}
        {bigImage && (
          <ResponsiveImage
            image={bigImage}
            sizes="(min-width:1440) 540px,(min-width:1024) 40vw, 90vw"
            className="max-h-80 overflow-visible"
          />
        )}
      </div>
    );
  }
  renderForm(padding) {
    const { slice, index } = this.props;
    const { forms } = useAppContext();
    const { primary } = slice;
    const { form_title: formTitle, form_description: formDescription } = primary;
    const { id } = primary.form;
    const form = id && forms.find((element) => element.id == id);
    const hasFormTitle = TextUtils.hasRichText(formTitle);
    const hasFormDescription = TextUtils.hasRichText(formDescription);
    return (
      <div
        className={`lg:w-1/2 ${padding} text-primary-dark lg:-bottom-8 lg:relative flex items-end`}
      >
        <div className="lg:border-black lg:px-4 pt-16 lg:pb-8 lg:border lg:bg-white w-full">
          {hasFormTitle && (
            <div className="text-primary-dark text-xl font-bold px-2 pb-4">
              {RichText.render(formTitle)}
            </div>
          )}
          {hasFormDescription && (
            <div className="text-primary-dark px-2 pb-4 text-base">
              {RichText.render(formDescription)}
            </div>
          )}
          {form && <Form form={form} index={index} />}
        </div>
      </div>
    );
  }
}
export default ImageAndForm;
