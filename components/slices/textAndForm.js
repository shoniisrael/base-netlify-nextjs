import { RichText } from "prismic-reactjs";
import React, { Component } from "react";
import { linkResolver } from "../../prismic-configuration";
import TextUtils from "../../utils/text";
import Form from "../common/form";
import { useAppContext } from "../../pages/_app";

const FORM_ALIGNMENT = {
  LEFT: "left",
  RIGHT: "right",
};
class TextAndForm extends Component {
  getAlignmentClasses(alignment) {
    if (alignment === FORM_ALIGNMENT.RIGHT) {
      return {
        flexDirection: "lg:flex-row",
        padding: "lg:pl-20",
      };
    }
    return {
      flexDirection: "lg:flex-row-reverse",
      padding: "lg:pr-20",
    };
  }
  render() {
    const { slice } = this.props;
    const { primary } = slice;
    const { form_alignment: alignment } = primary;
    const { flexDirection, padding } = this.getAlignmentClasses(alignment);
    return (
      <div className="bg-primary-lighter">
        <div className="container m-auto py-12 px-10 md:px-14 lg:px-28 lg:pb-0">
          <div className={`flex flex-col ${flexDirection} 3xl:px-28`}>
            {this.renderText()}
            {this.renderForm(padding)}
          </div>
        </div>
      </div>
    );
  }
  renderText() {
    const { slice } = this.props;
    const { primary } = slice;
    const { small_title: smallTitle, big_title: bigTitle, rich_text: richText } = primary;

    return (
      <div className="lg:w-1/2 py-10 px-2 text-primary-dark custom-check-list">
        {TextUtils.hasRichText(smallTitle) && (
          <div className="py-4 text-xs uppercase md:text-sm">
            {RichText.render(smallTitle, linkResolver)}
          </div>
        )}
        {TextUtils.hasRichText(bigTitle) && (
          <div className="text-3xl font-bold text-primary-dark py-4">
            {RichText.render(bigTitle, linkResolver)}
          </div>
        )}
        {TextUtils.hasRichText(richText) && (
          <div className="p_py-3 p_leading-loose li_leading-loose">
            {RichText.render(richText, linkResolver)}
          </div>
        )}
      </div>
    );
  }
  renderForm(padding) {
    const { forms } = useAppContext();
    const { slice, index, file, downloadName } = this.props;
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
        <div className="lg:border-black lg:p-4 lg:border lg:bg-white w-full">
          {hasFormTitle && (
            <div className="text-primary-dark text-2xl font-bold px-2 pb-4">
              {RichText.render(formTitle, linkResolver)}
            </div>
          )}
          {hasFormDescription && (
            <div className="text-primary-dark px-2 pb-4">
              {RichText.render(formDescription, linkResolver)}
            </div>
          )}
          {form && <Form form={form} index={index} file={file} downloadName={downloadName} />}
        </div>
      </div>
    );
  }
}
export default TextAndForm;
