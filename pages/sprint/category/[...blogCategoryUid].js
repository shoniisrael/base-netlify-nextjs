import React, { Component } from "react";
import { Client } from "../../../prismic-configuration";
import Prismic from "prismic-javascript";
import Layout from "../../../components/layout";
import { ArticleCarousel, LatestPosts, Suscribe } from "../../../components/slices";

class BlogCategory extends Component {
  getCategoryName(blogCategory) {
    return blogCategory.data.name || "Category";
  }
  getArticleCarouselSlice(categoryName, numberOfPost) {
    const lengthForCarousel = numberOfPost >= 3 ? 3 : numberOfPost;
    const textTitle = [{ type: "heading1", text: categoryName, spans: [] }];
    const slicePrimary = {
      hidden_title: textTitle,
      text_title: textTitle,
      background_style: "dots4",
      number_of_post: lengthForCarousel,
      header_configuration: true,
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
  getSubscribeSlice() {
    const slicePrimaryTitle = [{ type: "paragraph", text: "", spans: [] }];
    const slicePrimary = {
      grid_title: slicePrimaryTitle,
      small_description: [
        {
          type: "paragraph",
          text: "Subscribe to our Newsletter",
          spans: [],
        },
      ],
      big_title: [
        {
          type: "paragraph",
          text: "Get the latest insights on technology right in your inbox",
          spans: [],
        },
      ],
      type: "Email input",
      button_label: "Subscribe",
      button_url: { link_type: "Any" },
    };
    const subscribeSlice = { primary: slicePrimary };
    return subscribeSlice;
  }
  render() {
    const { blogCategory, navigation, blogsByCategory } = this.props;
    const categoryName = this.getCategoryName(blogCategory);
    const latestPostsSlice = this.getLatestPostSlice();
    const articleCarouselSlice = this.getArticleCarouselSlice(categoryName, blogsByCategory.length);
    const subscribeSlice = this.getSubscribeSlice();
    return (
      <Layout
        title={blogCategory.data.meta_title}
        description={blogCategory.data.meta_description}
        navigation={navigation}
      >
        <section key={1}>
          <ArticleCarousel slice={articleCarouselSlice} blogs={blogsByCategory} />
        </section>
        <section key={2}>
          <LatestPosts slice={latestPostsSlice} blogs={blogsByCategory} />
        </section>
        <section key={3}>
          <Suscribe slice={subscribeSlice} />
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
