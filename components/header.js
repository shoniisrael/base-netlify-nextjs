import React, { Component } from "react";
import MenuEntry from "./navigation/menuEntry";
import MobileMenuEntry from "./navigation/mobileMenuEntry";
class Header extends Component {
  render() {
    return (
      <header className="sticky top-0 bg-white z-20 text-primary-dark">
        <nav className="shadow-md relative">
          <div className="hidden lg:flex top-0 bg-white container m-auto px-5 items-center justify-between text-sm lg:text-md">
            <div className="flex">
              <img className="mr-5 object-contain" src="./img/logo-devsu.svg" alt="logo devsu" />
              <ul className="flex items-center font-medium uppercase h-24">{this.renderMenu()}</ul>
            </div>
          </div>
          <div className="lg:hidden">
            <div className="h-24 top-0 bg-white z-20 px-4 md:px-20 grid content-center justify-items-stretch grid-cols-3 py-3 lg:hidden">
              <label htmlFor="menu-toggle" className="pointer-cursor block justify-self-start">
                <svg
                  className="fill-current text-gray"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="30"
                  viewBox="0 0 20 20"
                >
                  <path d="m0 3h20v3h-20v-3zm0 6h20v3h-20v-3zm0 6h20v3h-20v-2z"></path>
                </svg>
              </label>
              <div className="h-9 w-24 justify-self-center">
                <img src="./img/logo-devsu.svg" alt="logo devsu" />
              </div>
            </div>
            <input className="hidden" type="checkbox" id="menu-toggle" />
            <div className="hidden w-full px-4 md:px-20" id="menu">
              <ul className="items-center justify-between text-base ">{this.renderMobileMenu()}</ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
  renderMenu() {
    const { nav } = this.props;

    return nav.map((menuEntry, index) => {
      return <MenuEntry key={index} menuEntry={menuEntry}></MenuEntry>;
    });
  }
  renderMobileMenu() {
    const { nav } = this.props;

    return nav.map((menuEntry, index) => {
      return (
        <MobileMenuEntry key={index} index={index + 1} menuEntry={menuEntry}></MobileMenuEntry>
      );
    });
  }
}

export default Header;
