import React, { Component } from "react";

import { Client } from "../prismic-configuration";
import Prismic from "prismic-javascript";
import Page from "../components/common/page";
import RoutingUtils from "../utils/routing";

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
  const pages = await Client().query(Prismic.Predicates.at("document.type", "page"), {
    fetch: ["page.uid", "page.parent"],
  });
  const searchableUid = RoutingUtils.getSearchableUid(uid, pages.results);
  const document = await Client().getByUID("page", searchableUid, {
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
