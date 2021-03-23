import Head from "next/head";
import React, { Component } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Footer from "./footer";
import Header from "./header";
class Layout extends Component {
  render() {
    const { children, title, description, navigation, headerStyle, footerStyle } = this.props;
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
          <link rel="shortcut icon" type="image/x-icon" href="/img/favicon.png" />
        </Head>
        <Header headerStyle={headerStyle} nav={navigation.data.nav} />
        <GoogleReCaptchaProvider
          useRecaptchaNet
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          scriptProps={{ async: true, defer: true, appendTo: "body" }}
        >
          {children}
          <Footer footerStyle={footerStyle} nav={navigation.data.footer} />
        </GoogleReCaptchaProvider>
      </div>
    );
  }
}
export default Layout;
