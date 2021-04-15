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

  renderBlogCategoryPage(blogCategorySettings, blogCategory, blogsByCategory, navigation) {
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
    const blogCategoryContent = { blogsByCategory, categoryName };

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
  }

  renderBlogPostPage(blogPostsSettings, blogPost, navigation) {
    const { results = {} } = blogPostsSettings;
    const { data: settingsData = {} } = results[0];
    const { header_style: headerStyle, footer_style: footerStyle } = settingsData;

    const { data = {}, uid } = blogPost;
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
        <Body slices={settingsData.body} blogContent={blogPost.data} uid={uid} />
      </Layout>
    );
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
      return this.renderBlogCategoryPage(
        blogCategorySettings,
        blogCategory,
        blogsByCategory,
        navigation,
      );
    } else if (blogPost && blogPostsSettings) {
      return this.renderBlogPostPage(blogPostsSettings, blogPost, navigation);
    }
  }
}

export default BlogCategory;

async function getBlogCategoriesStaticPaths(blogCategories) {
  const blogCategoriesPaths = blogCategories.results.map((blogCategory) => {
    const blogPostManager = blogCategory.uid.split("_");
    return {
      params: {
        blogPostManager,
      },
    };
  });
  return blogCategoriesPaths;
}
async function getBlogPostsStaticPaths(blogPosts) {
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
  return blogPostsPaths;
}

async function queryBlogPostSettings() {
  return await Client().query(Prismic.Predicates.at("document.type", "blog_post_settings"));
}
async function queryBlogCategorySettings() {
  return await Client().query(Prismic.Predicates.at("document.type", "blog_category_settings"));
}
async function queryBlogsByMainCategory(blogCategory) {
  return await Client().query([
    Prismic.Predicates.at("document.type", "blog_post"),
    Prismic.Predicates.at("my.blog_post.main_category", blogCategory.id),
  ]);
}
async function queryBlogsBySecondaryCategory(blogCategory) {
  return await Client().query([
    Prismic.Predicates.at("document.type", "blog_post"),
    Prismic.Predicates.at("my.blog_post.categories.category", blogCategory.id),
  ]);
}

async function getBlogsByCategory(blogsByMainCategory, blogsBySecondaryCategory) {
  let blogsByTwoCategories = await blogsByMainCategory.concat(blogsBySecondaryCategory);
  var hash = {};
  return blogsByTwoCategories.filter(function (current) {
    var exists = !hash[current.id];
    hash[current.id] = true;
    return exists;
  });
}

export async function getStaticProps(context) {
  const { params } = context;
  const { blogPostManager } = params;
  const searchableLastPosition = blogPostManager[blogPostManager.length - 1];
  const posibleBlogPost = await Client().getByUID("blog_post", searchableLastPosition);
  const isBlog = blogPostManager.length > 1 && posibleBlogPost;

  if (isBlog) {
    const blogPostsSettings = await queryBlogPostSettings();
    return {
      props: {
        blogPost: posibleBlogPost,
        blogPostsSettings,
      },
    };
  } else {
    const searchableUid = blogPostManager.join("_");
    const blogCategory = await Client().getByUID("blog_category", searchableUid);
    const { results: blogsByMainCategory } = await queryBlogsByMainCategory(blogCategory);
    const { results: blogsBySecondaryCategory } = await queryBlogsBySecondaryCategory(blogCategory);

    const blogsByCategory = await getBlogsByCategory(blogsByMainCategory, blogsBySecondaryCategory);
    const blogCategorySettings = await queryBlogCategorySettings();
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
  const blogCategoriesPaths = await getBlogCategoriesStaticPaths(blogCategories);

  const blogPosts = await Client().query(Prismic.Predicates.at("document.type", "blog_post"));
  const blogPostsPaths = await getBlogPostsStaticPaths(blogPosts);

  const paths = blogCategoriesPaths.concat(blogPostsPaths);
  return {
    fallback: false,
    paths,
  };
}
