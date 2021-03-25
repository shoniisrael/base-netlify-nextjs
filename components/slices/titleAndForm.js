import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../../prismic-configuration";
import TextUtils from "../../utils/text";
import Form from "../common/form";
import { useAppContext } from "../../pages/_app";

const ALIGNMENT = {
  LEFT: "left",
};

class TitleAndForm extends Component {
  render() {
    const { forms } = useAppContext();
    const { slice, index, file, downloadName } = this.props;
    const { primary } = slice;
    const {
      small_title: smallTitle,
      big_title: bigTitle,
      description,
      text_alignment: textAlignment,
    } = primary;
    const alignment = textAlignment === ALIGNMENT.LEFT ? "text-left" : "text-center";
    const { id } = primary.form;
    const form = id && forms.find((element) => element.id == id);

    return (
      <div className=" blue-oval-bg">
        <div className="text-primary-dark px-10 md:px-14 lg:px-28 py-28 container mx-auto max-w-4xl">
          <div className={`${alignment} pb-10`}>
            {TextUtils.hasRichText(smallTitle) && (
              <div className="text-xs font-medium uppercase pb-3">
                {RichText.render(smallTitle, linkResolver)}
              </div>
            )}
            {TextUtils.hasRichText(bigTitle) && (
              <div className="text-2xl md:text-4xl py-4 font-bold">
                {RichText.render(bigTitle, linkResolver)}
              </div>
            )}
            {TextUtils.hasRichText(description) && (
              <div className="text-xs py-2 lg:text-base">
                {RichText.render(description, linkResolver)}
              </div>
            )}
          </div>
          {form && <Form form={form} index={index} file={file} downloadName={downloadName} />}
        </div>
      </div>
    );
  }
}

export default TitleAndForm;
