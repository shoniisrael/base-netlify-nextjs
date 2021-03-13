import { RichText } from "prismic-reactjs";
import React from "react";
import TextUtils from "../../utils/text";
import { Link } from "prismic-reactjs";
import { linkResolver } from "../../prismic-configuration";
import { useAppContext } from "../../pages/_app";
import { useRouter } from "next/router";
const FORM_FIELD_TYPE = {
  TEXT: "text_field",
  SELECT: "select",
  CHECKBOX: "checkbox",
};
const Form = (props) => {
  const { form = { data: {} }, index: formIndex } = props;
  const { redirect_to: redirectToUrl } = form.data;
  const { pages } = useAppContext();
  const linkUrl = Link.url({ ...redirectToUrl, pages }, linkResolver);
  const router = useRouter();
  const renderSubmitButton = () => {
    const { submit_button_label: submitButtonLabel } = form.data;
    return (
      <span className="w-full px-2 mt-5 inline-block">
        <input
          type="submit"
          className="btn filled w-full text-xl cursor-pointer"
          value={submitButtonLabel}
        />
      </span>
    );
  };
  const handleSubmit = () => router.push({ pathname: linkUrl });
  const renderFooterText = () => {
    const { footer_text: footerText } = form.data;
    if (TextUtils.hasRichText(footerText))
      return (
        <div className="font-medium text-center w-full px-2 my-5 inline-block a_text-black a_font-bold">
          {RichText.render(footerText)}
        </div>
      );
  };
  const renderFormFields = () => {
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
                required
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
  };
  return (
    <form name={form.uid} method="post" onSubmit={handleSubmit}>
      {renderFormFields()}
      {renderSubmitButton()}
      {renderFooterText()}
    </form>
  );
};
export default Form;
