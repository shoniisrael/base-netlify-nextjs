import React, { Component } from "react";
import { Client } from "../../prismic-configuration";
import Prismic from "prismic-javascript";
import Layout from "../../components/layout";
import Body from "../../components/body";

class BlogPost extends Component {
  render() {
    const { blogPost, blogPostsSettings = {}, navigation } = this.props;
    const { results = {} } = blogPostsSettings;
    const { data = {} } = results[0];
    return (
      <Layout title={data.meta_title} description={data.meta_description} navigation={navigation}>
        <Body slices={data.body} blogContent={blogPost.data} />
      </Layout>
    );
  }
}

export default BlogPost;

export async function getStaticProps(context) {
  const { params } = context;
  const { blogPostUid } = params;
  const searchableUid = blogPostUid.join("_");
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
    return { params: { blogPostUid: blogPost.uid.split("_") } };
  });

  return {
    fallback: false,
    paths,
  };
}
