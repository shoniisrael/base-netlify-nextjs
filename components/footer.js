import React, { Component } from "react";
import { HEADER_AND_FOOTER_STYLE } from "../utils/constants";
import CustomLink from "./common/customLink";
import SubscribeForm from "./common/subscribeForm";
import SocialMedia from "./socialMedia";

class Footer extends Component {
  renderLogoSection() {
    const socialMedias = ["facebook", "linkedin", "twitter"];
    return (
      <div className="md:w-3/12 lg:w-2/12 flex flex-col items-center md:items-start pb-5">
        <a href="/">
          <img src="/img/devsu-logo-alt.svg" alt="devsu logo" />
        </a>
        <p className="text-xs font-light leading-6 text-center py-7 md:text-left">
          618 East South Street Suite 500 Orlando, FL 32801
        </p>

        <SocialMedia
          socialMediaOrder={socialMedias}
          classNameIcon="w-5 h-6 fill-current text-secondary"
          classNameDiv="pb-6"
          classNameFacebook="mx-0"
          classNameLinkedin="mx-4"
          classNameTwitter="mx-0"
        />
      </div>
    );
  }
  renderNewsletterSection() {
    return (
      <div className="md:w-3/12 flex flex-col items-center md:items-start pb-5">
        <p className="pb-3 text-xs font-bold text-secondary">SUBSCRIBE TO OUR NEWSLETTER</p>
        <p className="pb-4 font-bold lg:text-xl">Stay in touch</p>
        <div className="flex flex-col items-center w-full lg:flex-row md:items-start">
          <SubscribeForm classes="px-5 py-4 mb-8 custom-input w-full lg:w-3/5 bg-primary-darkGray md:text-sm lg:text-base" />
        </div>
      </div>
    );
  }
  renderNav() {
    const { nav } = this.props;
    return nav.map((navItem, index) => {
      const { primary, items } = navItem;
      return (
        <div key={index} className="pb-6 lg:w-1/3">
          <p className="pb-3 text-xs font-bold text-center text-secondary lg:text-left">
            {primary.label}
          </p>
          <ul className="text-xs text-center lg:text-left">
            {items.map((subItem, subIndex) => (
              <li key={subIndex} className="py-2 lg:py-1 font-bold">
                <CustomLink link={subItem.sub_nav_link}>{subItem.sub_nav_link_label}</CustomLink>
              </li>
            ))}
          </ul>
        </div>
      );
    });
  }
  render() {
    const { footerStyle } = this.props;
    if (HEADER_AND_FOOTER_STYLE.SIMPLE === footerStyle) {
      return this.renderSimpleFooter();
    }
    return this.renderFooterWithNavigationMenu();
  }
  renderFooterWithNavigationMenu() {
    return (
      <footer className="w-full py-10 font-medium bg-primary-dark">
        <div className="container flex flex-col justify-between px-5 mx-auto md:flex-row md:space-x-10">
          {this.renderLogoSection()}
          <div className="md:w-3/12 lg:w-7/12 flex flex-col items-center lg:flex-row lg:items-start lg:space-x-10 pb-5">
            {this.renderNav()}
          </div>
          {this.renderNewsletterSection()}
        </div>
      </footer>
    );
  }
  renderSimpleFooter() {
    return (
      <footer className="w-full py-10 md:px-14 lg:px-28 font-medium bg-white">
        <div className="container flex flex-row justify-between px-5 mx-auto md:flex-row md:space-x-10">
          {this.renderSimpleLogoSection()}
        </div>
      </footer>
    );
  }
  renderSimpleLogoSection() {
    return (
      <div className="flex flex-col md:flex-row md:justify-between w-full text-center items-center">
        <a href="/">
          <img src="/img/logo-devsu.svg" alt="devsu logo" className="h-14" />
        </a>
        <div className="py-8">
          <div className="flex items-center justify-center text-base text-primary-dark w-full">
            <div className="pr-5">Find us at</div>
            <div>
              <a href="https://www.facebook.com/DevsuSoftware">
                <img className="h-6" src="/img/facebook2_icon.svg" alt="facebook" />
              </a>
            </div>
            <div className="mx-4">
              <a href="https://twitter.com/devsullc">
                <img className="h-6" src="/img/twitter2_icon.svg" alt="twitter" />
              </a>
            </div>
            <div>
              <a href="https://www.linkedin.com/company/devsu/">
                <img className="h-6" src="/img/linkedin2_icon.svg" alt="linkedin" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Footer;
