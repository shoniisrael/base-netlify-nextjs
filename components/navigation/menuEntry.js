import React, { Component } from "react";
import CustomLink from "../common/customLink";
class MenuEntry extends Component {
  render() {
    const { primary: menu, items: submenuItems } = this.props.menuEntry;

    let arrowImg,
      submenus,
      menuClasses = "mx-6",
      customLinkClasses;
    if (submenuItems.length > 0) {
      arrowImg = <img className="ml-2" src="/img/chevron-down.svg" />;
      submenus = (
        <div className="desktop-submenu hidden absolute top-full -mt-5">
          <ul className="bg-white block px-6 py-2 relative -ml-5 rounded-lg shadow-card text-xs capitalize">
            {this.renderSubmenuEntries()}
          </ul>
        </div>
      );

      menuClasses += " desktop-submenu-toggle flex py-5";
      customLinkClasses = "flex cursor-pointer";
    }
    return (
      <li className={menuClasses}>
        <CustomLink link={menu.link} classes={customLinkClasses}>
          {menu.label}
          {arrowImg}
        </CustomLink>
        {submenus}
      </li>
    );
  }

  renderSubmenuEntries() {
    const { items: submenuItems } = this.props.menuEntry;

    return submenuItems.map((submenuEntry, index) => {
      return (
        <CustomLink key={index} link={submenuEntry.sub_nav_link}>
          <li>{submenuEntry.sub_nav_link_label}</li>
        </CustomLink>
      );
    });
  }
}

export default MenuEntry;
