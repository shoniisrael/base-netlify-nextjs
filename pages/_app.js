import React from "react";
import NextApp from "next/app";
import "../css/styles.css";
import { Client } from "../prismic-configuration";

export default class App extends NextApp {
  render() {
    const { Component, pageProps, navigation } = this.props;
    return <Component {...Object.assign(pageProps, { navigation })} />;
  }

  static async getInitialProps({ Component, ctx, req }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const navigation = await Client(req).getSingle("navigation");
    return { pageProps, navigation };
  }
}
