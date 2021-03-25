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
    const {
      blogCategory,
      blogsByCategory = {},
      blogCategorySettings,
      blogPost,
      blogPostsSettings,
      navigation,
    } = this.props;

    if (blogCategory && blogCategorySettings) {
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
          <Body slices={settingsData.body} blogCategoryContent={blogCategoryContent} />
        </Layout>
      );
    } else if (blogPost && blogPostsSettings) {
      const { results = {} } = blogPostsSettings;
      const { data: settingsData = {} } = results[0];
      const { header_style: headerStyle, footer_style: footerStyle } = settingsData;

      const { data = {} } = blogPost;
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
          <Body slices={settingsData.body} blogContent={blogPost.data} />
        </Layout>
      );
    }
  }
}

export default BlogCategory;

export async function getStaticProps(context) {
  const { params } = context;
  const { blogPostManager } = params;
  const searchableLastPosition = blogPostManager[blogPostManager.length - 1];
  const blogPost = await Client().getByUID("blog_post", searchableLastPosition);
  if (blogPostManager.length > 1 && blogPost) {
    const blogPostsSettings = await Client().query(
      Prismic.Predicates.at("document.type", "blog_post_settings"),
    );
    return {
      props: {
        blogPost,
        blogPostsSettings,
      },
    };
  } else {
    const searchableUid = blogPostManager.join("_");
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
}

export async function getStaticPaths() {
  const blogCategories = await Client().query(
    Prismic.Predicates.at("document.type", "blog_category"),
  );
  const blogCategoriesPaths = blogCategories.results.map((blogCategory) => {
    const blogPostManager = blogCategory.uid.split("_");
    return {
      params: {
        blogPostManager,
      },
    };
  });

  const blogPosts = await Client().query(Prismic.Predicates.at("document.type", "blog_post"));
  const blogPostsPaths = blogPosts.results.map((blogPost) => {
    let blogPostManager;
    let categoryLevels;
    if (blogPost.data.main_category.uid) {
      const blogCategoryArray = blogPost.data.main_category.uid.split("_");
      blogPostManager = new Array(...blogCategoryArray, blogPost.uid);
    } else {
      blogPostManager = new Array("unlabeled", blogPost.uid);
    }
    return {
      params: {
        categoryLevels,
        blogPostManager,
      },
    };
  });

  const paths = blogCategoriesPaths.concat(blogPostsPaths);
  return {
    fallback: false,
    paths,
  };
}
