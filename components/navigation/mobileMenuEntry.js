import React, { Component, Fragment } from "react";
import CustomLink from "../common/customLink";
class MobileMenuEntry extends Component {
  render() {
    const { items: submenuItems } = this.props.menuEntry;
    let arrowImg = null,
      submenus = null;

    const hasSubmenuItems = submenuItems.length > 0;
    if (hasSubmenuItems) {
      arrowImg = (
        <Fragment>
          <img id="closed" src="img/chevron-right.svg" />
          <img id="open" src="img/chevron-down.svg" />
        </Fragment>
      );
      submenus = (
        <div className="hidden submenu-block">
          <ul> {this.renderSubmenuEntries()}</ul>
        </div>
      );
    }
    return (
      <li>
        {this.wrapMenuEntry(arrowImg, hasSubmenuItems)}
        {submenus}
      </li>
    );
  }

  renderSubmenuEntries() {
    const { items: submenuItems } = this.props.menuEntry;
    return submenuItems.map((submenuEntry, index) => {
      return (
        <li key={index}>
          <CustomLink link={submenuEntry.sub_nav_link}>
            {submenuEntry.sub_nav_link_label}
          </CustomLink>
        </li>
      );
    });
  }
  wrapMenuEntry(arrowImg, hasSubmenuItems) {
    const { primary: menu } = this.props.menuEntry;
    const { index } = this.props;
    const menuId = `submenu-toggle${index}`;
    if (hasSubmenuItems) {
      return (
        <Fragment>
          <input className="hidden submenu-toggle" type="checkbox" id={menuId} />
          <label htmlFor={menuId} className="nav-item">
            <div className="flex items-center pointer-cursor">
              <span className="mr-auto">{menu.label}</span>
              {arrowImg}
            </div>
          </label>
        </Fragment>
      );
    } else {
      return (
        <div className="nav-item">
          <CustomLink link={menu.link}>{menu.label}</CustomLink>
        </div>
      );
    }
  }
}

export default MobileMenuEntry;
