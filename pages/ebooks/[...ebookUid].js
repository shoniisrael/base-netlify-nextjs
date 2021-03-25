import React, { Component } from "react";
import { Client } from "../../prismic-configuration";
import Prismic from "prismic-javascript";
import Layout from "../../components/layout";
import Body from "../../components/body";
class Ebook extends Component {
  render() {
    const { ebook: document, ebookSettings = {}, navigation } = this.props;

    const { results = {} } = ebookSettings;
    const { data: settingsData = {} } = results[0];
    const { header_style: headerStyle, footer_style: footerStyle } = settingsData;

    const { data = {} } = document;
    const {
      meta_title: metaTitle,
      meta_description: metaDescription,
      file = {},
      ebook_name: caseName,
      index,
      follow,
      canonical_url: canonicalUrl,
    } = data;
    return (
      <Layout
        title={metaTitle || "Ebook | Devsu"}
        description={
          metaDescription ||
          "An ebook about how Devsu's team develops quality software that helps companies meet their needs with a smart solution."
        }
        navigation={navigation}
        headerStyle={headerStyle}
        footerStyle={footerStyle}
        index={index || "index"}
        follow={follow || "follow"}
        canonical_url={canonicalUrl}
        keywords={data.keywords}
      >
        <Body slices={settingsData.body} ebook={data.body} file={file.url} caseName={caseName} />
      </Layout>
    );
  }
}

export default Ebook;

export async function getStaticProps(context) {
  const { params } = context;
  const { ebookUid } = params;
  const searchableUid = ebookUid.join("_");
  const ebook = await Client().getByUID("ebook", searchableUid);
  const ebookSettings = await Client().query(
    Prismic.Predicates.at("document.type", "ebook_settings"),
  );
  return {
    props: {
      ebook,
      ebookSettings,
    },
  };
}

export async function getStaticPaths() {
  const ebooks = await Client().query(Prismic.Predicates.at("document.type", "ebook"));
  const paths = ebooks.results.map((ebook) => {
    return { params: { ebookUid: ebook.uid.split("_") } };
  });
  return {
    fallback: false,
    paths,
  };
}
