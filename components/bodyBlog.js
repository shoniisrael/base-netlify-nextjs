import React, { Component } from "react";
import ResponsiveImage from "./common/responsiveImage";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../prismic-configuration";
import TextUtils from "../utils/text";
import SocialMedia from "./socialMedia";

class BodyBlog extends Component {
  getTitle(title) {
    if (TextUtils.hasRichText(title)) {
      return (
        <div className="w-full pt-14 pb-10 text-3xl font-bold leading-8 text-left text-primary-dark  md:text-4xl lg:text-4xl capitalize">
          {RichText.render(title, linkResolver)}
        </div>
      );
    }
  }

  getSocialMediaBar() {
    const socialMedias = ["facebook", "twitter", "linkedin"];
    return (
      <div className="flex justify-end w-full h-20">
        <div className="flex text-sm items-center font-normal">
          <div>SHARE ON SOCIAL</div>
          <SocialMedia
            socialMediaOrder={socialMedias}
            classNameIcon="w-5 h-5 fill-current text-secondary"
            classNameDiv="pt-4 pl-2"
            classNameFacebook="mx-0"
            classNameLinkedin="mx-0"
            classNameTwitter="mx-2"
          />
        </div>
      </div>
    );
  }

  getPostImage(image) {
    return (
      <div className="pb-9 w-full">
        <ResponsiveImage image={image} sizes="(min-width:1280) 770px, 90vw" />
      </div>
    );
  }

  render() {
    const { title, image, content } = this.props.bodyData;
    return (
      <div className="flex flex-col items-center p_text-lg text-lg justify-center richtext-content-container title_mt-14 title_mb-5 p_mb-5 mx-auto w-1/2">
        {this.getTitle(title)}

        {this.getSocialMediaBar()}

        {this.getPostImage(image)}

        {TextUtils.hasRichText(content) && <div>{RichText.render(content, linkResolver)}</div>}

        {this.getSocialMediaBar()}
      </div>
    );
  }
}

export default BodyBlog;
