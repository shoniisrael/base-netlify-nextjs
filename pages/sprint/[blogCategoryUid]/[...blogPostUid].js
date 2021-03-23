import React, { Component } from "react";
import { Client } from "../../../prismic-configuration";
import Prismic from "prismic-javascript";
import Layout from "../../../components/layout";
import Body from "../../../components/body";

class BlogPost extends Component {
  render() {
    const { blogPost, blogPostsSettings = {}, navigation } = this.props;

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
        title={metaTitle || "Blog Post Article | Devsu "}
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
        <Body slices={settingsData.body} blogContent={blogPost.data} />
      </Layout>
    );
  }
}

export default BlogPost;

export async function getStaticProps(context) {
  const { params } = context;
  const { blogPostUid } = params;
  const searchableUid = blogPostUid[blogPostUid.length - 1];
  const blogPost = await Client().getByUID("blog_post", searchableUid);
  const blogPostsSettings = await Client().query(
    Prismic.Predicates.at("document.type", "blog_post_settings"),
  );
  return {
    props: {
      blogPost,
      blogPostsSettings,
    },
  };
}

export async function getStaticPaths() {
  const blogPosts = await Client().query(Prismic.Predicates.at("document.type", "blog_post"));
  const paths = blogPosts.results.map((blogPost) => {
    const blogCategoryUid = blogPost.data.main_category.uid.split("_");
    const blogPostUid = blogPost.uid.split("_");

    if (blogCategoryUid.length > 1) {
      const reducedBlogCategoryUid = blogCategoryUid.slice(1);
      blogPostUid.unshift(...reducedBlogCategoryUid);
    }

    return {
      params: {
        blogCategoryUid: blogCategoryUid[0],
        blogPostUid: blogPostUid,
      },
    };
  });

  return {
    fallback: false,
    paths,
  };
}
