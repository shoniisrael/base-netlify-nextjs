import React, { Component } from "react";

import { Client } from "../../prismic-configuration";
import Prismic from "prismic-javascript";
import Page from "../../components/common/page";

class Document extends Component {
  render() {
    const { jobPost, navigation } = this.props;
    return <Page document={jobPost} navigation={navigation} />;
  }
}

export default Document;

export async function getStaticProps(context) {
  const { params } = context;
  const { jobPostUid } = params;
  const searchableUid = jobPostUid.join("_");
  const jobPost = await Client().getByUID("job_post", searchableUid);

  return {
    props: {
      jobPost,
    },
  };
}

export async function getStaticPaths() {
  const jobPosts = await Client().query(Prismic.Predicates.at("document.type", "job_post"));
  const paths = jobPosts.results.map((jobPost) => {
    return { params: { jobPostUid: jobPost.uid.split("_") } };
  });

  return {
    fallback: false,
    paths,
  };
}
