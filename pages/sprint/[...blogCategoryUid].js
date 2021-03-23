import React, { Component } from "react";
import { Client } from "../../prismic-configuration";
import Prismic from "prismic-javascript";
import Layout from "../../components/layout";
import Body from "../../components/body";

class BlogCategory extends Component {
  getCategoryName(blogCategory) {
    const categoryName = blogCategory.data.name || "Category";
    return [{ type: "heading1", text: categoryName, spans: [] }];
  }

  render() {
    const { blogCategory, navigation, blogsByCategory, blogCategorySettings = {} } = this.props;

    const { results = {} } = blogCategorySettings;
    const { data: settingsData = {} } = results[0];
    const { header_style: headerStyle, footer_style: footerStyle } = settingsData;

    const { data = {} } = blogCategory;
    const {
      meta_title: metaTitle,
      meta_description: metaDescription,
      index,
      follow,
      canonical_url: canonicalUrl,
    } = data;

    const categoryName = this.getCategoryName(blogCategory);
    const blogCategoryContent = { blogsByCategory: blogsByCategory, categoryName: categoryName };

    return (
      <Layout
        title={metaTitle || "Archives | Devsu "}
        description={
          metaDescription ||
          "The best Blog Posts are in Sprint, the blog of Devsu, Software Developer Company"
        }
        navigation={navigation}
        headerStyle={headerStyle}
        footerStyle={footerStyle}
        index={index || "index"}
        follow={follow || "follow"}
        canonical_url={canonicalUrl}
        keywords={data.keywords}
      >
        <Body slices={settingsData.body} blogCategoryContent={blogCategoryContent} />
      </Layout>
    );
  }
}

export default BlogCategory;

export async function getStaticProps(context) {
  const { params } = context;
  const { blogCategoryUid } = params;
  const searchableUid = blogCategoryUid.join("_");
  const blogCategory = await Client().getByUID("blog_category", searchableUid);

  const { results: blogsByCategory } = await Client().query([
    Prismic.Predicates.at("document.type", "blog_post"),
    Prismic.Predicates.at("my.blog_post.categories.category", blogCategory.id),
  ]);
  const blogCategorySettings = await Client().query(
    Prismic.Predicates.at("document.type", "blog_category_settings"),
  );
  return {
    props: {
      blogCategory,
      blogsByCategory,
      blogCategorySettings,
    },
  };
}

export async function getStaticPaths() {
  const blogCategories = await Client().query(
    Prismic.Predicates.at("document.type", "blog_category"),
  );
  const paths = blogCategories.results.map((blogCategory) => {
    return { params: { blogCategoryUid: blogCategory.uid.split("_") } };
  });

  return {
    fallback: false,
    paths,
  };
}
