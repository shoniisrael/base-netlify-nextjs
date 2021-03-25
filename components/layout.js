import Head from "next/head";
import React, { Component } from "react";
import Footer from "./footer";
import Header from "./header";
class Layout extends Component {
  render() {
    const {
      children,
      title,
      description,
      navigation,
      headerStyle,
      footerStyle,
      index = "index",
      follow = "follow",
      canonical_url: canonicalUrl,
      keywords,
    } = this.props;
    const keywordList =
      keywords && keywords.length >= 1 ? keywords.map((e) => e.keyword).join(",") : "";
    return (
      <div>
        <Head>
          {title && <title>{title}</title>}
          {description && <meta name="description" content={description} />}
          <meta name="robots" content={`${index}, ${follow}`}></meta>
          <meta name="googlebot" content={`${index}, ${follow}`}></meta>
          <meta name="bingbot" content={`${index}, ${follow}`}></meta>
          {keywordList && <meta name="keywords" content={keywordList} />}
          {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700&display=swap"
            rel="stylesheet"
            media="print"
            onLoad="this.media='all'"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin />
          <link rel="shortcut icon" type="image/x-icon" href="/img/favicon.png" />
        </Head>
        <Header headerStyle={headerStyle} nav={navigation.data.nav} />
        {children}
        <Footer footerStyle={footerStyle} nav={navigation.data.footer} />
      </div>
    );
  }
}
export default Layout;
