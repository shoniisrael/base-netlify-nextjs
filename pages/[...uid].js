import React, { Component } from "react";

import { Client } from "../prismic-configuration";
import Prismic from "prismic-javascript";
import Page from "../components/common/page";
import RoutingUtils from "../utils/routing";

class Document extends Component {
  render() {
    const { document, navigation } = this.props;
    return <Page document={document} navigation={navigation} />;
  }
}

export default Document;

export async function getStaticProps(context) {
  const { params } = context;
  const { uid } = params;
  const pages = await Client().query(Prismic.Predicates.at("document.type", "page"), {
    pageSize: 100,
    fetch: ["page.uid", "page.parent"],
  });
  const searchableUid = RoutingUtils.getSearchableUid(uid, pages.results);
  const document = await Client().getByUID("page", searchableUid, {
    ref: context.preview ? context.previewData.ref : undefined,
    fetchLinks: [
      "career_quotes.photo",
      "career_quotes.name",
      "career_quotes.position",
      "career_quotes.logo",
      "career_quotes.quote",
      "testimonial.quote",
      "testimonial.name_and_position",
      "testimonial.company_logo",
    ],
  });

  return {
    props: {
      document,
    },
  };
}

export async function getStaticPaths() {
  const pages = await Client().query(Prismic.Predicates.at("document.type", "page"), {
    pageSize: 100,
    fetch: ["page.uid", "page.parent"],
  });
  const paths = pages.results.map((page) => {
    return { params: { uid: RoutingUtils.getPath(page, pages.results).split("_") } };
  });

  return {
    fallback: false,
    paths,
  };
}
