import React, { useContext } from "react";
import NextApp from "next/app";
import "../css/styles.css";
import { Client } from "../prismic-configuration";
import Prismic from "prismic-javascript";
import CookieDisclaimer from "../components/common/cookieDisclaimer";

const AppContext = React.createContext();

export default class App extends NextApp {
  render() {
    const {
      Component,
      pageProps,
      navigation,
      pages,
      jobPosts,
      blogPosts,
      blogCategories,
    } = this.props;
    return (
      <AppContext.Provider value={{ pages, jobPosts, blogPosts, blogCategories }}>
        <Component {...pageProps} navigation={navigation} />
        <CookieDisclaimer />
      </AppContext.Provider>
    );
  }

  static async getInitialProps({ Component, ctx, req }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const { results: pages } = await Client().query(
      Prismic.Predicates.at("document.type", "page"),
      {
        fetch: ["page.uid", "page.parent"],
      },
    );

    const { results: jobPosts } = await Client().query(
      Prismic.Predicates.at("document.type", "job_post"),
    );

    const { results: blogPosts } = await Client().query(
      Prismic.Predicates.at("document.type", "blog_post"),
      { orderings: "[document.first_publication_date desc]" },
    );

    const { results: blogCategories } = await Client().query(
      Prismic.Predicates.at("document.type", "blog_category"),
      { orderings: "[document.last_publication_date desc]" },
    );

    const navigation = await Client(req).getSingle("navigation");
    return { pageProps, navigation, pages, jobPosts, blogPosts, blogCategories };
  }
}

export function useAppContext() {
  return useContext(AppContext);
}
