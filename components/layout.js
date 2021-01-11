import Head from "next/head";
import React, { Component } from "react";
import Footer from "./footer";
import Header from "./header";
class Layout extends Component {
  render() {
    const { children, title, description, navigation } = this.props;
    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="robots" content="noindex"></meta>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700&display=swap"
            rel="stylesheet"
            media="print"
            onLoad="this.media='all'"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin />
          <link rel="shortcut icon" type="image/x-icon" href="img/logo-devsu.svg " />
        </Head>
        <Header nav={navigation.data.nav} />
        {children}
        <Footer nav={navigation.data.footer} />
      </div>
    );
  }
}
export default Layout;
