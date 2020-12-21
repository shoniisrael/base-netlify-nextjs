import React, { Component } from "react";
import { default as NextLink } from "next/link";
import { Link } from "prismic-reactjs";
import { linkResolver, hrefResolver } from "../../prismic-configuration";

class CustomLink extends Component {
  render() {
    const { link, children, classes } = this.props;
    if (!link || link.link_type === "Any") {
      return <a className={classes}>{children}</a>;
    }

    const linkUrl = Link.url(link, linkResolver);

    if (link.link_type && link.link_type === "Document") {
      return (
        <NextLink as={linkUrl} href={Link.url(link, hrefResolver)}>
          <a className={classes}>{children}</a>
        </NextLink>
      );
    }

    return (
      <a className={classes} href={linkUrl}>
        {children}
      </a>
    );
  }
}

export default CustomLink;
