import React, { Component } from "react";

import { Client } from "../prismic-configuration";
import Prismic from "prismic-javascript";
import Page from "../components/common/page";

class Document extends Component {
  render() {
    const { document, navigation, forms } = this.props;
    return <Page document={document} navigation={navigation} forms={forms} />;
  }
}

export default Document;

export async function getStaticProps(context) {
  const { params } = context;
  const { uid } = params;
  const searchableUid = uid.join("_");

  const document = await Client().getByUID("page", searchableUid, {
    fetchLinks: [
      "career_quotes.photo",
      "career_quotes.name",
      "career_quotes.position",
      "career_quotes.logo",
      "career_quotes.quote",
    ],
  });

  const { results: forms } = await Client().query(Prismic.Predicates.at("document.type", "form"));
  return {
    props: {
      document,
      forms,
    },
  };
}

export async function getStaticPaths() {
  const pages = await Client().query(Prismic.Predicates.at("document.type", "page"), {
    fetch: "page.uid",
  });
  const paths = pages.results.map((page) => {
    return { params: { uid: page.uid.split("_") } };
  });

  return {
    fallback: false,
    paths,
  };
}
