import React, { useState } from "react";
import ResponsiveImage from "./common/responsiveImage";
import { RichText } from "prismic-reactjs";
import TextUtils from "../utils/text";
import Image from "../components/common/Image";

const BodyBlog = (props) => {
  const getTitle = (title) => {
    if (TextUtils.hasRichText(title)) {
      return (
        <div className="w-full pt-14 pb-10 text-3xl font-bold leading-8 text-left text-primary-dark  md:text-4xl lg:text-4xl capitalize">
          {RichText.render(title)}
        </div>
      );
    }
  };

  const getChangedImage = (isHover, iconName) => {
    if (isHover) {
      return (
        <Image
          image={{ url: `/img/${iconName}_icon_green.svg`, alt: `${iconName}_icon` }}
          classes="social_media_icon"
        />
      );
    }

    return (
      <Image
        image={{ url: `/img/${iconName}_icon_white.svg`, alt: `${iconName}_icon` }}
        classes="social_media_icon"
      />
    );
  };

  const getMenuSocialMedia = (isShown) => {
    if (isShown) {
      return (
        <div className="absolute flex flex-col items-center pl-6">
          <div className="arrow_up" />
          <div className="social_media">
            <div className="flex flex-col items-center ">
              <div className="mt-3 mb-2 social_media_icon">
                <a
                  href="https://www.facebook.com/DevsuSoftware"
                  onMouseEnter={() => setIsHoverSocialMediaFacebook(true)}
                  onMouseLeave={() => setIsHoverSocialMediaFacebook(false)}
                >
                  {getChangedImage(isHoverSocialMediaFacebook, "facebook")}
                </a>
              </div>

              <div
                className="mb-2 social_media_icon"
                onMouseEnter={() => setIsHoverSocialMediaTwitter(true)}
                onMouseLeave={() => setIsHoverSocialMediaTwitter(false)}
              >
                <a href="https://twitter.com/devsullc">
                  {getChangedImage(isHoverSocialMediaTwitter, "twitter")}
                </a>
              </div>

              <div className="mb-1 social_media_icon">
                <a
                  className=""
                  href="https://www.linkedin.com/company/devsu/"
                  onMouseEnter={() => setIsHoverSocialMediaLinkedin(true)}
                  onMouseLeave={() => setIsHoverSocialMediaLinkedin(false)}
                >
                  {getChangedImage(isHoverSocialMediaLinkedin, "linkedin")}
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const getButton = () => {
    return (
      <div
        className="px-5"
        onMouseEnter={() => setIsShownSocialMediaMenu(true)}
        onMouseLeave={() => setIsShownSocialMediaMenu(false)}
      >
        <div className="w-20 h-7 border-secondary border text-secondary hover:bg-secondary hover:text-white text-center pt-1 pl-1">
          Share
        </div>
        {getMenuSocialMedia(isShownSocialMediaMenu)}
      </div>
    );
  };

  const getSocialMediaBar = () => {
    return (
      <div className="flex justify-end w-full h-20">
        <div className="flex text-sm items-center font-normal">
          <div>SHARE ON SOCIAL</div>
          {getButton()}
        </div>
      </div>
    );
  };

  const getPostImage = (image) => {
    return (
      <div className="pb-9 w-full">
        <ResponsiveImage image={image} sizes="(min-width:1280) 770px, 90vw" />
      </div>
    );
  };

  const [isHoverSocialMediaFacebook, setIsHoverSocialMediaFacebook] = useState(false);
  const [isHoverSocialMediaTwitter, setIsHoverSocialMediaTwitter] = useState(false);
  const [isHoverSocialMediaLinkedin, setIsHoverSocialMediaLinkedin] = useState(false);

  const [isShownSocialMediaMenu, setIsShownSocialMediaMenu] = useState(false);

  const { title, image, content } = props.bodyData;

  return (
    <div className="flex flex-col items-center p_text-lg text-lg justify-center richtext-content-container title_mt-14 title_mb-5 p_mb-5 mx-auto w-5/12">
      {getTitle(title)}

      {getSocialMediaBar()}

      {getPostImage(image)}

      {TextUtils.hasRichText(content) && <div>{RichText.render(content)}</div>}

      {getSocialMediaBar()}
    </div>
  );
};

export default BodyBlog;
