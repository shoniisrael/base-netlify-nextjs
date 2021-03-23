import React, { Component } from "react";
import { SOCIAL_MEDIA } from "../utils/constants";

class SocialMedia extends Component {
  getOrderedSocialMedias(
    socialMediaOrder,
    className,
    classNameFacebook,
    classNameLinkedin,
    classNameTwitter,
  ) {
    return socialMediaOrder.map((socialMediaName) => {
      switch (socialMediaName) {
        case SOCIAL_MEDIA.FACEBOOK:
          return (
            <li className={classNameFacebook}>
              <a className="hover:bg-white" href="https://www.facebook.com/DevsuSoftware">
                <img className={className} src="/img/facebook_icon.svg" />
              </a>
            </li>
          );

        case SOCIAL_MEDIA.LINKEDIN:
          return (
            <li className={classNameLinkedin}>
              <a className="hover:text-white" href="https://www.linkedin.com/company/devsu/">
                <img className={className} src="/img/linkedin_icon.svg" />
              </a>
            </li>
          );

        case SOCIAL_MEDIA.TWITTER:
          return (
            <li className={classNameTwitter}>
              <a className="hover:text-white" href="https://twitter.com/devsullc">
                <img className={className} src="/img/twitter_icon.svg" />
              </a>
            </li>
          );
      }
    });
  }

  render() {
    const {
      socialMediaOrder,
      classNameIcon,
      classNameDiv,
      classNameFacebook,
      classNameLinkedin,
      classNameTwitter,
    } = this.props;
    return (
      <div className={classNameDiv}>
        <ul className="flex items-center justify-center text-2xl text-secondary">
          {this.getOrderedSocialMedias(
            socialMediaOrder,
            classNameIcon,
            classNameFacebook,
            classNameLinkedin,
            classNameTwitter,
          )}
        </ul>
      </div>
    );
  }
}

export default SocialMedia;
