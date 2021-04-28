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

  static async getInitialProps({ Component, ctx, req }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const { results: pages } = await Client().query(
      Prismic.Predicates.at("document.type", "page"),
      {
        pageSize: 100,
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

    const { results: forms } = await Client().query(Prismic.Predicates.at("document.type", "form"));

    const navigation = await Client(req).getSingle("navigation");
    return {
      pageProps,
      navigation,
      pages: pages.map(page => ({
        uid: page.uid,
        data: page.data
      })),
      jobPosts: jobPosts.map(jobPost => ({ 
        data: { is_active: jobPost.data.is_active }
       })),
      blogPosts: blogPosts.map(blogPost => ({
        data: {
          image: blogPost.data.image,
          title: blogPost.data.title,
          content: [blogPost.data.content[0]],
          main_category: { uid: blogPost.data.main_category.uid }
        },
        uid: blogPost.uid,
        slugs: [blogPost.slugs[0]],       
      })),
      usedBlogCategories: usedBlogCategories.map(category => ({ 
        id: category.id,
        uid: category.uid,
        slugs: [category.slugs[0]],
        data: {
          name: category.data.name
        }
      })),
      forms: forms.map(form => ({
        id: form.id,
        uid: form.uid,
        slugs: [form.slugs[0]],
        data: {
          redirect_to: form.data.redirect_to
        }
      })),
    };
  }
}

export function useAppContext() {
  return useContext(AppContext);
}
