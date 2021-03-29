import React, { Component } from "react";
import { default as NextLink } from "next/link";
import { Link } from "prismic-reactjs";
import { linkResolver, hrefResolver } from "../../prismic-configuration";
import { useAppContext } from "../../pages/_app";

class CustomLink extends Component {
  render() {
    const { pages } = useAppContext();
    const { link, children, classes } = this.props;
    if (!link || link.link_type === "Any") {
      return <div className={classes}>{children}</div>;
    }
    if (!pages) {
      throw new Error(`CustomLink requires the pages property ${JSON.stringify(link)}`);
    }

    const linkUrl = Link.url({ ...link, pages }, linkResolver);
    if (link.link_type && link.link_type === "Document") {
      return (
        <NextLink as={linkUrl} href={Link.url({ ...link, pages }, hrefResolver)}>
          <a className={classes}>{children}</a>
        </NextLink>
      );
    }

    return (
      <a className={classes} href={linkUrl} rel="noreferrer" target="_blank">
        {children}
      </a>
    );
  }
}

export default CustomLink;
