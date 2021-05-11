import React, { Component } from "react";
import { Client } from "../../../prismic-configuration";
import Prismic from "prismic-javascript";
import Layout from "../../../components/layout";
import Body from "../../../components/body";
class AllArticles extends Component {
  render() {
    const { allArticles: document, navigation, blogPosts = [] } = this.props;
    const { data = {} } = document;
    const { header_style: headerStyle, footer_style: footerStyle, body = {} } = data;
    const {
      meta_title: metaTitle,
      meta_description: metaDescription,
      index,
      follow,
      canonical_url: canonicalUrl,
    } = data;

    return (
      <Layout
        title={metaTitle}
        description={metaDescription}
        navigation={navigation}
        headerStyle={headerStyle}
        footerStyle={footerStyle}
        index={index || "index"}
        follow={follow || "follow"}
        canonical_url={canonicalUrl}
        keywords={data.keywords}
      >
        <Body slices={body} blogCategoryContent={blogPosts} />
      </Layout>
    );
  }
}

export default AllArticles;

export async function getStaticProps(context) {
  const { results } = await Client().query(
    Prismic.Predicates.at("document.type", "all_articles_settings"),
    {
      ref: context.preview ? context.previewData.ref : undefined,
    },
  );

  const allArticles = results[0];
  const { results: blogPosts } = await Client().query(
    Prismic.Predicates.at("document.type", "blog_post"),
    {
      orderings: "[document.first_publication_date desc]",
      ref: context.preview ? context.previewData.ref : undefined,
    },
  );
  return {
    props: {
      allArticles,
      blogPosts,
    },
  };
}
