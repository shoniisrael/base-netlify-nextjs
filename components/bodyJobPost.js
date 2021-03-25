import React from "react";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../prismic-configuration";
import TextUtils from "../utils/text";
import Button from "./common/button";
const bodyJobPost = (props) => {
  const { content } = props.bodyData;

  const renderBigTitle = (title) => {
    if (TextUtils.hasRichText(title)) {
      const textColor = "text-primary-dark";
      return (
        <div className={`font-bold text-3xl md:text-4xl 2xl:text-5xl  pt-3 pb-2 ${textColor}`}>
          {RichText.render(title, linkResolver)}
        </div>
      );
    }
  };

  const renderDescription = (description) => {
    if (TextUtils.hasRichText(description)) {
      return (
        <div className="text-primary py-12 richtext-content-container font-medium">
          {RichText.render(description, linkResolver)}
        </div>
      );
    }
  };

  const renderHeroSection = () => {
    const {
      position_title: headerTitle,
      position_summary: headerContent,
      button_label: buttonLabel,
      button_link: buttonLink,
      button_style: buttonStyle,
    } = props.bodyData;
    return (
      <div className="flex items-center mx-auto relative xl:h-3/4 blue-top-right-oval-bg bg-primary-lighter">
        <div className="container lg:px-24 mx-auto z-10">
          <div className="w-full flex flex-col py-16 md:pt-20 lg:pt-36 xl:pl-12 xl:pr-28 px-8">
            {renderBigTitle(headerTitle)}
            {renderDescription(headerContent)}
            <div className="pt-4">
              <Button link={buttonLink} label={buttonLabel} style={buttonStyle} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRichTextSections = (content) => {
    const {
      button_label: buttonLabel,
      button_link: buttonLink,
      button_style: buttonStyle,
    } = props.bodyData;
    const buttonUnderline = `no-underline ${buttonStyle}`;
    return (
      <div className="flex flex-col mx-auto">
        <div className="p_text-lg text-lg richtext-content-container title_mt-14 title_mb-5 p_mt-10 p_mb-5 ul_mt-7 ul_mb-5 font-medium">
          {RichText.render(content, linkResolver)}
        </div>
        <div className="pt-8">
          <Button link={buttonLink} label={buttonLabel} style={buttonUnderline} />
        </div>
      </div>
    );
  };

  return (
    <div>
      <section className="w-full">
        <div>{renderHeroSection()}</div>
      </section>
      <section>
        <div className="bg-white pb-20 lg:pb-28 xl:pb-32">
          <div className="container  lg:px-24 mx-auto pb-5">
            <div className="w-full xl:pl-12 xl:pr-28 px-8 ">
              {TextUtils.hasRichText(content) && renderRichTextSections(content)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default bodyJobPost;
