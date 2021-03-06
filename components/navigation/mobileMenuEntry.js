import React, { Component, Fragment } from "react";
import CustomLink from "../common/customLink";
class MobileMenuEntry extends Component {
  render() {
    const { items: submenuItems } = this.props.menuEntry;
    const { ...buttonProps } = this.props;

    let arrowImg = null,
      submenus = null;

    const hasSubmenuItems = submenuItems.length > 0;

    if (hasSubmenuItems) {
      arrowImg = (
        <Fragment>
          <img id="closed" src="/img/chevron-right.svg" alt="" />
          <img id="open" src="/img/chevron-down.svg" alt="" />
        </Fragment>
      );

      submenus = (
        <div className="hidden submenu-block">
          <ul> {this.renderSubmenuEntries(buttonProps)}</ul>
        </div>
      );
    }

    return (
      <li>
        {this.wrapMenuEntry(arrowImg, hasSubmenuItems, buttonProps)}
        {submenus}
      </li>
    );
  }

  renderSubmenuEntries(buttonProps) {
    const { items: submenuItems } = this.props.menuEntry;

    return submenuItems.map((submenuEntry, index) => {
      return (
        <li key={index} {...buttonProps}>
          <CustomLink link={submenuEntry.sub_nav_link}>
            {submenuEntry.sub_nav_link_label}
          </CustomLink>
        </li>
      );
    });
  }
  wrapMenuEntry(arrowImg, hasSubmenuItems, buttonProps) {
    const { primary: menu } = this.props.menuEntry;
    const { index, hamburguerSubMenuOpen } = this.props;
    const menuId = `submenu-toggle${index}`;
    if (hasSubmenuItems) {
      return (
        <Fragment>
          {hamburguerSubMenuOpen && (
            <input className="hidden submenu-toggle" type="checkbox" id={menuId} />
          )}
          <label htmlFor={menuId} className="nav-item">
            <div className="flex items-center pointer-cursor">
              <span className="mr-auto">{menu.label}</span>
              {arrowImg}
            </div>
          </label>
        </Fragment>
      );
    }
    return (
      <div className="nav-item" {...buttonProps}>
        <CustomLink link={menu.link}>{menu.label}</CustomLink>
      </div>
    );
  }
}

export default MobileMenuEntry;
