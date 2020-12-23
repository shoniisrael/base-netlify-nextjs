import React, { Component } from "react";
import CustomLink from "./common/customLink";
class Footer extends Component {
  renderLogoSection() {
    return (
      <div className="flex flex-col items-center md:items-start">
        <div>
          <img src="img/devsu-logo-alt.svg" alt="devsu logo" />
        </div>
        <p className="text-center text-xs py-7 md:text-left font-light leading-6">
          618 East South Street Suite 500
          <br />
          Orlando, FL 32801
        </p>
        <div className="pb-6">
          <ul className="text-secondary flex justify-center items-center text-2xl">
            <li>
              <a className="hover:bg-white" href="https://www.facebook.com/DevsuSoftware">
                <img className="h-6 w-5 text-secondary" src="img/facebook_icon.svg" />
              </a>
            </li>
            <li className="mx-4">
              <a className="hover:text-white" href="https://www.linkedin.com/company/devsu/">
                <img className="h-6 w-5 fill-current text-secondary" src="img/linkedin_icon.svg" />
              </a>
            </li>
            <li>
              <a className="hover:text-white" href="https://twitter.com/devsullc">
                <img className="h-6 w-5 fill-current text-secondary" src="img/twitter_icon.svg" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  renderNewsletterSection() {
    return (
      <div className="flex flex-col items-center md:items-start">
        <p className="text-secondary text-xs pb-3  font-bold">SUBSCRIBE TO OUR NEWSLETTER</p>
        <p className="font-bold pb-4 lg:text-xl">Stay in touch</p>
        <form action="" className="w-full flex flex-col items-center md:flex-row md:items-start">
          <input
            className="custom-input py-4 mb-8 md:w-1/2 lg:w-3/5 px-5 bg-primary md:mb-0 md:text-sm lg:text-base"
            type="text"
            placeholder="Your email"
          />
          <button className="btn md:text-sm lg:text-base whitespace-nowrap">Sign up</button>
        </form>
      </div>
    );
  }
  renderNav() {
    const { nav } = this.props;
    return nav.map((navItem, index) => {
      const { primary, items } = navItem;
      return (
        <div key={index} className="pb-6">
          <p className="text-secondary text-xs text-center pb-3 lg:text-left font-bold">
            {primary.label}
          </p>
          <ul className="text-center text-xs lg:text-left">
            {items.map((subItem, subIndex) => (
              <li key={subIndex} className="py-1">
                <CustomLink link={subItem.sub_nav_link}>{subItem.sub_nav_link_label}</CustomLink>
              </li>
            ))}
          </ul>
        </div>
      );
    });
  }
  render() {
    return (
      <footer className="w-full bg-primary-dark py-10 font-medium">
        <div className="mx-auto container flex flex-col justify-between px-5 md:flex-row md:space-x-10">
          {this.renderLogoSection()}
          <div className="flex flex-col items-center lg:flex-row lg:items-start lg:space-x-10">
            {this.renderNav()}
          </div>
          <div />
          <div />
          {this.renderNewsletterSection()}
        </div>
      </footer>
    );
  }
}
export default Footer;
