import { RichText } from "prismic-reactjs";
import React, { Component } from "react";
import TextUtils from "../../utils/text";

const FORM_FIELD_TYPE = {
  TEXT: "text_field",
  SELECT: "select",
  CHECKBOX: "checkbox",
};
class Form extends Component {
  render() {
    return (
      <form>
        {this.renderFormFields()}
        {this.renderSubmitButton()}
        {this.renderFooterText()}
      </form>
    );
  }

  renderSubmitButton() {
    const { form = { data: {} } } = this.props;
    const { submit_button_label: submitButtonLabel } = form.data;
    return (
      <span className="w-full px-2 mt-5 inline-block">
        <button type="button" className="btn filled w-full">
          <span className="text-xl">{submitButtonLabel}</span>
        </button>
      </span>
    );
  }

  renderFooterText() {
    const { form = { data: {} } } = this.props;
    const { footer_text: footerText } = form.data;

    if (TextUtils.hasRichText(footerText))
      return (
        <div className="font-medium text-center w-full px-2 my-5 inline-block a_text-black a_font-bold">
          {RichText.render(footerText)}
        </div>
      );
  }

  renderFormFields() {
    const { form = { data: {} }, index: formIndex } = this.props;
    const { body: slices = [] } = form.data;
    return slices.map((slice, index) => {
      const { items, primary, slice_type: sliceType } = slice;
      const { placeholder, type, name, full_width: fullWidth = true, label } = primary;
      const width = fullWidth ? "w-full" : "w-full lg:w-1/2";
      switch (sliceType) {
        case FORM_FIELD_TYPE.TEXT:
          return (
            <span key={index} className={`${width} px-2 inline-block`}>
              <input
                type={type}
                id={`${name}-${formIndex}`}
                name={`${name}-${formIndex}`}
                placeholder={placeholder}
                className="w-full p-4 my-2 bg-gray-light custom-form-input"
              />
            </span>
          );
        case FORM_FIELD_TYPE.SELECT:
          return (
            <span key={index} className={`${width} px-2 inline-block`}>
              <select
                name={`${name}-${formIndex}`}
                id={`${name}-${formIndex}`}
                required
                className="w-full p-4 my-2 bg-gray-light custom-form-input"
              >
                {placeholder && (
                  <option value="" disabled selected hidden>
                    {placeholder}
                  </option>
                )}
                {items.map((item, index) => {
                  return <option key={index} value={`${item.value}`}>{`${item.label}`}</option>;
                })}
              </select>
            </span>
          );
        case FORM_FIELD_TYPE.CHECKBOX:
          return (
            <span key={index} className="flex flex-col my-4 px-2">
              <input
                type="checkbox"
                id={`${name}-${formIndex}`}
                name={`${name}-${formIndex}`}
                className="hidden"
              />
              <label
                htmlFor={`${name}-${formIndex}`}
                className="checkbox-label flex items-center relative"
              >
                <span className="devsu-checkbox" />
                <span className="ml-3">{`${label}`}</span>
              </label>
            </span>
          );
      }
    });
  }
}

export default Form;
