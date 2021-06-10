import React, { Component } from "react";
import { HEADER_AND_FOOTER_STYLE } from "../utils/constants";
import MenuEntry from "./navigation/menuEntry";
import MobileMenuEntry from "./navigation/mobileMenuEntry";
import Button from "./common/button";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  handleMobilePlegableMenu() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { headerStyle } = this.props;
    if (HEADER_AND_FOOTER_STYLE.SIMPLE === headerStyle) {
      return this.renderSimpleHeader();
    }
    return this.renderHeaderWithNavigationMenu();
  }

  renderHeaderWithNavigationMenu() {
    const buttonLink = new Object();
    buttonLink.id = "contact-us";
    buttonLink.type = "page";
    buttonLink.tags = ["contact-us"];
    buttonLink.slug = "contact-us";
    buttonLink.lang = "en-us";
    buttonLink.uid = "contact-us";
    buttonLink.link_type = "Document";
    buttonLink.isBroken = false;
    return (
      <header className="sticky top-0 bg-white z-20 text-primary-dark">
        <nav className="shadow-md relative">
          <div className="hidden lg:flex top-0 bg-white container m-auto px-5 items-center justify-between text-sm lg:text-md">
            <div className="flex justify-between w-full">
              <div className="flex">
                <a href="/" className="flex items-center">
                  <img
                    className="mr-5 object-contain"
                    src="/img/logo-devsu.svg"
                    alt="logo devsu"
                    width="101"
                    height="39"
                  />
                </a>
                <ul
                  className="flex items-center font-medium uppercase h-24"
                  style="font-family:sans-serif"
                >
                  {this.renderMenu()}
                </ul>
              </div>
              <div className="flex items-center">
                <Button link={buttonLink} label="Let's Talk" style="filled-bgGreen-textBlue w-32" />
              </div>
            </div>
          </div>
          <div className="lg:hidden">
            <div className="h-24 top-0 bg-white z-20 px-4 md:px-20 flex flex-row justify-between py-3 lg:hidden">
              <div className="flex flex-row">
                <button
                  htmlFor="menu-toggle"
                  className="pointer-cursor self-center"
                  onClick={() => this.handleMobilePlegableMenu()}
                >
                  <svg
                    className="fill-current text-gray"
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="30"
                    viewBox="0 0 20 20"
                  >
                    <path d="m0 3h20v3h-20v-3zm0 6h20v3h-20v-3zm0 6h20v3h-20v-2z"></path>
                  </svg>
                </button>
                <div className="h-9 w-24 self-center ml-5">
                  <a href="/" className="flex items-center">
                    <img src="/img/logo-devsu.svg" alt="logo devsu" width="101" height="39" />
                  </a>
                </div>
              </div>
              <div className="flex self-center">
                <Button
                  link={buttonLink}
                  label="Let's Talk"
                  style="filled-bgGreen-textBlue btn-mobile w-28"
                />
              </div>
            </div>
            <div
              className={`transform ${this.state.isOpen ? "" : "hidden"} w-full px-4 md:px-20`}
              id="menu"
            >
              <ul className="items-center justify-between text-base">{this.renderMobileMenu()}</ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  renderSimpleHeader() {
    return (
      <header className="sticky top-0 bg-white z-20 text-primary-dark">
        <nav className="shadow-md relative">
          <div className="flex bg-white container justify-center m-auto items-center text-sm lg:text-md">
            <div className="flex items-center font-medium uppercase center h-24 text-center">
              <a href="/" className="flex items-center justify-items-center">
                <img
                  className="object-contain"
                  src="/img/logo-devsu.svg"
                  alt="logo devsu"
                  width="101"
                  height="39"
                />
              </a>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  renderMenu() {
    const { nav } = this.props;

    return nav.map((menuEntry, index) => {
      return <MenuEntry key={index} menuEntry={menuEntry} />;
    });
  }

  renderMobileMenu() {
    const { nav } = this.props;

    return nav.map((menuEntry, index) => {
      return (
        <MobileMenuEntry
          key={index}
          index={index + 1}
          menuEntry={menuEntry}
          onClick={() => this.handleMobilePlegableMenu()}
          hamburguerSubMenuOpen={this.state.isOpen}
        />
      );
    });
  }
}

export default Header;
