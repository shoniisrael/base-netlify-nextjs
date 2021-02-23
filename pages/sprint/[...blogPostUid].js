import React, { Component } from "react";
import { Client } from "../../prismic-configuration";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";

class BlogPost extends Component {
  render() {
    const { blogPost } = this.props;
    const { title, content } = blogPost.data;
    return (
      <>
        <div>{RichText.render(title)}</div>
        <div>{RichText.render(content)}</div>
      </>
    );
  }
}

export default BlogPost;

export async function getStaticProps(context) {
  const { params } = context;
  const { blogPostUid } = params;
  const searchableUid = blogPostUid.join("_");
  const blogPost = await Client().getByUID("blog_post", searchableUid);
  return {
    props: {
      blogPost,
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
