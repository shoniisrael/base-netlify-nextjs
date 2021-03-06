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
      ebook_name: downloadName,
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
        <Body
          slices={settingsData.body}
          ebook={data.body}
          file={file.url}
          downloadName={downloadName}
        />
      </Layout>
    );
  }
}

export default Ebook;

export async function getStaticProps(context) {
  const { params } = context;
  const { ebookUid } = params;
  const searchableUid = ebookUid.join("_");
  const ebook = await Client().getByUID("ebook", searchableUid, {
    ref: context.preview ? context.previewData.ref : undefined,
  });
  const ebookSettings = await Client().query(
    Prismic.Predicates.at("document.type", "ebook_settings"),
    {
      ref: context.preview ? context.previewData.ref : undefined,
    },
  );
  return {
    props: {
      ebook,
      ebookSettings,
    },
  };
}

export async function getStaticPaths(context) {
  const ebooks = await Client().query(Prismic.Predicates.at("document.type", "ebook"), {
    ref: context.preview ? context.previewData.ref : undefined,
  });
  const paths = ebooks.results.map((ebook) => {
    return { params: { ebookUid: ebook.uid.split("_") } };
  });
  return {
    fallback: process.env.ENABLE_PREVIEW_MODE === "true" ? "blocking" : false,
    paths,
  };
}
