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
      usedBlogCategories: blogCategories,
      forms,
    } = this.props;
    return (
      <AppContext.Provider value={{ pages, jobPosts, blogPosts, blogCategories, forms }}>
        <Component {...pageProps} navigation={navigation} />
        <CookieDisclaimer />
      </AppContext.Provider>
    );
  }

  static async getInitialProps(context) {
    const { Component, ctx, req } = context;
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const { results: pages } = await Client().query(
      Prismic.Predicates.at("document.type", "page"),
      {
        ref: context.preview ? context.previewData.ref : undefined,
        pageSize: 100,
        fetch: ["page.uid", "page.parent"],
      },
    );

    const { results: jobPosts } = await Client().query(
      Prismic.Predicates.at("document.type", "job_post"),
      {
        ref: context.preview ? context.previewData.ref : undefined,
      },
    );

    const { results: blogPosts } = await Client().query(
      Prismic.Predicates.at("document.type", "blog_post"),
      {
        ref: context.preview ? context.previewData.ref : undefined,
        orderings: "[document.first_publication_date desc]",
      },
    );

    const { results: blogCategories } = await Client().query(
      Prismic.Predicates.at("document.type", "blog_category"),
      {
        ref: context.preview ? context.previewData.ref : undefined,
        orderings: "[document.last_publication_date desc]",
      },
    );
    let usedBlogCategories = [];
    blogPosts.forEach((element) => {
      usedBlogCategories.push(element.data.main_category);
      usedBlogCategories.push(...element.data.categories);
    });
    const textUsedBlogCategories = JSON.stringify(usedBlogCategories);
    usedBlogCategories = [];
    blogCategories.forEach((element) => {
      if (textUsedBlogCategories.includes(element.id)) {
        usedBlogCategories.push(element);
      }
    });

    const { results: forms } = await Client().query(
      Prismic.Predicates.at("document.type", "form"),
      {
        ref: context.preview ? context.previewData.ref : undefined,
      },
    );

    const navigation = await Client(req).getSingle("navigation");
    return { pageProps, navigation, pages, jobPosts, blogPosts, usedBlogCategories, forms };
  }
}

export function useAppContext() {
  return useContext(AppContext);
}
