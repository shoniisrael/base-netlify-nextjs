import React, { Component } from "react";
import { Client } from "../../prismic-configuration";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";
import Layout from "../../components/layout";
import { LatestPosts, Subscribe } from "../../components/slices";

class BlogPost extends Component {
  getLatestPostSlice() {
    const slicePrimaryTitle = [{ type: "paragraph", text: "Read more", spans: [] }];
    const slicePrimary = {
      grid_title: slicePrimaryTitle,
      show_button: true,
      show_social_media: false,
      show_categories: false,
      number_of_post: false,
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
    const { blogPost, navigation } = this.props;
    const latestPostsSlice = this.getLatestPostSlice();
    const subscribeSlice = this.getSubscribeSlice();
    return (
      <Layout
        title={blogPost.data.meta_title}
        description={blogPost.data.meta_description}
        navigation={navigation}
      >
        <section key={1}>
          <div>
            <div>{RichText.render(blogPost.data.title)}</div>
            <div>{blogPost.first_publication_date}</div>
            <div>{RichText.render(blogPost.data.content)}</div>
          </div>
        </section>
        <section key={2}>
          <LatestPosts slice={latestPostsSlice} />
        </section>
        <section key={3}>
          <Subscribe slice={subscribeSlice} />
        </section>
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
