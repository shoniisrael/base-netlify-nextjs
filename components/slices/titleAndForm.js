import { RichText } from "prismic-reactjs";
import React, { Component } from "react";
import Form from "../common/form";

const ALIGNMENT = {
  LEFT: "left",
};

class TitleAndForm extends Component {
  render() {
    const { slice, forms } = this.props;
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
    const hasSmallTitle = !!smallTitle.length && !!smallTitle[0].text;
    const hasBigTitle = !!bigTitle.length && !!bigTitle[0].text;
    const hasDescription = !!description.length && description[0].text;

    return (
      <div className=" blue-oval-bg">
        <div className="text-primary-dark px-10 py-28 container mx-auto max-w-4xl">
          <div className={`${alignment} pb-10`}>
            {hasSmallTitle && (
              <div className="text-xs uppercase pb-3">{RichText.render(smallTitle)}</div>
            )}
            {hasBigTitle && (
              <div className="text-2xl md:text-4xl xl:text-5xl py-4 font-bold">
                {RichText.render(bigTitle)}
              </div>
            )}
            {hasDescription && (
              <div className="text-xs py-2 lg:text-base">{RichText.render(description)}</div>
            )}
          </div>
          {form && <Form form={form} />}
        </div>
      </div>
    );
  }
}

export default TitleAndForm;
