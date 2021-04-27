import React, { Component } from "react";
import { Client } from "../../prismic-configuration";
import Prismic from "prismic-javascript";
import Layout from "../../components/layout";
import Body from "../../components/body";
class Document extends Component {
  render() {
    const { jobPost: document, jobPostSettings = {}, navigation } = this.props;
    const { results = {} } = jobPostSettings;
    const { data: settingsData = {} } = results[0];
    const { header_style: headerStyle, footer_style: footerStyle } = settingsData;
    const { data = {} } = document;
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
        {/* <Body slices={settingsData.body} /> */}
        <Body slices={settingsData.body} jobPostContent={document.data} />
      </Layout>
    );
  }
}

export default Document;

export async function getStaticProps(context) {
  const { params } = context;
  const { jobPostUid } = params;
  const searchableUid = jobPostUid.join("_");
  const jobPost = await Client().getByUID("job_post", searchableUid);
  const jobPostSettings = await Client().query(
    Prismic.Predicates.at("document.type", "job_post_settings"),
    {
      fetchLinks: [
        "career_quotes.photo",
        "career_quotes.name",
        "career_quotes.position",
        "career_quotes.logo",
        "career_quotes.quote",
      ],
    },
  );
  return {
    props: {
      jobPost,
      jobPostSettings,
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
