import React, { Component } from "react";
import { Client } from "../../../prismic-configuration";
import Prismic from "prismic-javascript";
import Layout from "../../../components/layout";
import { ArticleCarousel, LatestPosts } from "../../../components/slices";

class BlogCategory extends Component {
  getCategoryName(blogCategory) {
    return blogCategory.data.name || "Category";
  }
  getTitle(categoryName) {
    return `${categoryName} Archives | Devsu`;
  }
  getArticleCarouselSlice(categoryName, numberOfPost) {
    const hiddenTitle = [{ type: "paragraph", text: categoryName, spans: [] }];
    const slicePrimary = {
      hidden_title: hiddenTitle,
      background_style: "dots4",
      number_of_post: numberOfPost,
    };
    const articleCarouselSlice = { primary: slicePrimary };
    return articleCarouselSlice;
  }
  getLatestPostSlice() {
    const slicePrimaryTitle = [{ type: "paragraph", text: "Latest articles", spans: [] }];
    const slicePrimary = {
      grid_title: slicePrimaryTitle,
      show_button: false,
      show_social_media: false,
      show_categories: false,
      number_of_post: true,
    };
    const latestPostsSlice = { primary: slicePrimary };
    return latestPostsSlice;
  }
  render() {
    const { blogCategory, navigation, blogsByCategory } = this.props;
    const categoryName = this.getCategoryName(blogCategory);
    const title = this.getTitle(categoryName);
    const description = this.getTitle(categoryName);
    const latestPostsSlice = this.getLatestPostSlice();
    const articleCarouselSlice = this.getArticleCarouselSlice(categoryName, blogsByCategory.length);
    return (
      <Layout title={title} description={description} navigation={navigation}>
        <section key={1}>
          <ArticleCarousel slice={articleCarouselSlice} blogs={blogsByCategory} />
        </section>
        <section key={2}>
          <LatestPosts slice={latestPostsSlice} blogs={blogsByCategory} />
        </section>
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

  return {
    props: {
      blogCategory,
      blogsByCategory,
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
