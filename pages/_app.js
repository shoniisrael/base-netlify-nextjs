import React, { useContext } from "react";
import NextApp from "next/app";
import "../css/styles.css";
import { Client } from "../prismic-configuration";
import Prismic from "prismic-javascript";

const AppContext = React.createContext();

export default class App extends NextApp {
  render() {
    const { Component, pageProps, navigation, pages } = this.props;
    const { results } = pages;
    return (
      <AppContext.Provider value={{ pages: results }}>
        <Component {...pageProps} navigation={navigation} />
      </AppContext.Provider>
    );
  }

  static async getInitialProps({ Component, ctx, req }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const pages = await Client().query(Prismic.Predicates.at("document.type", "page"), {
      fetch: ["page.uid", "page.parent"],
    });

    const navigation = await Client(req).getSingle("navigation");
    return { pageProps, navigation, pages };
  }
}

export function useAppContext() {
  return useContext(AppContext);
}
