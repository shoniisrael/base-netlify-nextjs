import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../../prismic-configuration";
import Button from "../common/button";
import SubscribeForm from "../common/subscribeForm";
import StyleUtils from "../../utils/styleUtils";
const CONTACT_TYPE = {
  EMAIL: "Email input",
  BUTTON: "Button",
};
const ALIGMENT_GRID = {
  DEFAULT: "default",
  CENTER: "center",
};
class Subscribe extends Component {
  render() {
    const { primary } = this.props.slice;
    const { background_style: backgroundStyle, aligment } = primary;
    const bgStyle = StyleUtils.getBackgroundStyle(backgroundStyle);
    const aligmentGrid = aligment === ALIGMENT_GRID.DEFAULT ? "lg:flex-row" : "text-center";
    return (
      <div className="container mx-auto py-10 md:py-12 lg:py-16 px-6 md:px-16 lg:px-20">
        <div className={`bg-primary-paleBlue rounded-xl ${bgStyle}`}>
          <div className={`px-7 xl:px-20 pt-20 pb-8 xl:pb-16 flex flex-col ${aligmentGrid}`}>
            {aligment === ALIGMENT_GRID.CENTER
              ? this.renderVerticalGrid()
              : this.renderHorizontalGrid()}
          </div>
        </div>
      </div>
    );
  }

  renderHorizontalGrid() {
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
      <>
        <div className={`w-full lg:${textWidth} text-primary-dark`}>
          <div className="pb-2 text-xs uppercase">{RichText.render(smallTitle, linkResolver)}</div>
          <div className="text-base font-medium">
            {RichText.render(smallDescription, linkResolver)}
          </div>
          <div className="pt-3 pb-4 font-bold text-3xl 2xl:text-4xl">
            {RichText.render(bigTitle, linkResolver)}
          </div>
        </div>
        <div className={`pb-5 text-right flex items-end justify-end w-full lg:${width}`}>
          {this.renderContactSection()}
        </div>
      </>
    );
  }

  renderVerticalGrid() {
    const { primary } = this.props.slice;
    const { big_title: bigTitle } = primary;
    return (
      <>
        <div className="pt-3 pb-4 font-bold text-3xl 2xl:text-4xl text-primary-dark">
          {RichText.render(bigTitle, linkResolver)}
        </div>
        <div className="pt-10">{this.renderButton()}</div>
      </>
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
    return (
      <div className="flex flex-row items-start w-full justify-start">
        <SubscribeForm
          classes="font-medium border-gray-light border border-solid flex px-5 py-4 mb-8 custom-form-input
        w-full md:w-2/3 bg-gray-light md:text-sm lg:text-base"
        />
      </div>
    );
  }
}
export default Subscribe;
