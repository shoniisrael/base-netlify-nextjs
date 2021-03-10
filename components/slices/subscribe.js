import { RichText } from "prismic-reactjs";
import React, { Component } from "react";
import Button from "../common/button";
const CONTACT_TYPE = {
  EMAIL: "Email input",
  BUTTON: "Button",
};
class Subscribe extends Component {
  render() {
    const { primary } = this.props.slice;
    const {
      small_title: smallTitle,
      small_description: smallDescription,
      big_title: bigTitle,
      type,
    } = primary;
    const width = CONTACT_TYPE.EMAIL === type ? "w-2/5" : "w-1/5";
    const textWidth = CONTACT_TYPE.EMAIL === type ? "w-3/5" : "w-4/5";
    return (
      <div className="container mx-auto py-10 md:py-12 lg:py-16 px-6 md:px-16 lg:px-20">
        <div className="bg-primary-paleBlue rounded-xl dots5">
          <div className="px-7 xl:px-20 pt-20 pb-8 xl:pb-16 flex flex-col lg:flex-row">
            <div className={`w-full lg:${textWidth} text-primary-dark`}>
              <div className="pb-2 text-xs uppercase">{RichText.render(smallTitle)}</div>
              <div className="text-base font-medium">{RichText.render(smallDescription)}</div>
              <div className="pt-3 pb-4 font-bold text-3xl 2xl:text-4_5xl">
                {RichText.render(bigTitle)}
              </div>
            </div>
            <div className={`pb-5 text-right flex items-end justify-end w-full lg:${width}`}>
              {this.renderContactSection()}
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderContactSection() {
    const { primary } = this.props.slice;
    const { type } = primary;
    return CONTACT_TYPE.EMAIL === type ? this.renderEmailInputAndButton() : this.renderButton();
  }
  renderButton() {
    const { primary } = this.props.slice;
    const { button_label: buttonLabel, button_url: buttonUrl } = primary;
    return <Button link={buttonUrl} label={buttonLabel} style="filled" />;
  }
  renderEmailInputAndButton() {
    const { primary } = this.props.slice;
    const { button_label: buttonLabel } = primary;
    return (
      <form action="" className="flex flex-row items-start w-full justify-start">
        <input
          className="font-medium border-gray-light border border-solid flex px-5 py-4 mb-8 custom-form-input w-2/3 lg:w-2/3 bg-gray-light lg:mb-0 md:text-sm lg:text-base"
          type="text"
          placeholder="Your email"
        />
        <button className="flex btn filled md:text-sm lg:text-base whitespace-nowrap">
          {buttonLabel}
        </button>
      </form>
    );
  }
}
export default Subscribe;
