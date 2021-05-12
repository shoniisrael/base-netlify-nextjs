import React, { Component } from "react";
import { Client } from "../../prismic-configuration";
import Prismic from "prismic-javascript";
import Layout from "../../components/layout";
import Body from "../../components/body";
class CaseStudy extends Component {
  render() {
    const { caseStudy: document, caseStudySettings = {}, navigation } = this.props;
    const { results = {} } = caseStudySettings;
    const { data: settingsData = {} } = results[0];
    const { data = {} } = document;
    const { header_style: headerStyle, footer_style: footerStyle } = settingsData;
    const {
      meta_title: metaTitle,
      meta_description: metaDescription,
      file = {},
      case_study_name: downloadName,
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
          caseStudy={data.body}
          file={file.url}
          downloadName={downloadName}
        />
      </Layout>
    );
  }
}

export default CaseStudy;

export async function getStaticProps(context) {
  const { params } = context;
  const { caseStudyUid } = params;
  const searchableUid = caseStudyUid.join("_");
  const caseStudy = await Client().getByUID("case_studies", searchableUid, {
    ref: context.preview ? context.previewData.ref : undefined,
    fetchLinks: ["testimonial.quote", "testimonial.name_and_position", "testimonial.company_logo"],
  });
  const caseStudySettings = await Client().query(
    Prismic.Predicates.at("document.type", "case_study_settings"),
    {
      ref: context.preview ? context.previewData.ref : undefined,
    },
  );
  return {
    props: {
      caseStudy,
      caseStudySettings,
    },
  };
}

export async function getStaticPaths(context) {
  const caseStudies = await Client().query(Prismic.Predicates.at("document.type", "case_studies"), {
    ref: context.preview ? context.previewData.ref : undefined,
  });
  const paths = caseStudies.results.map((caseStudy) => {
    return { params: { caseStudyUid: caseStudy.uid.split("_") } };
  });
  return {
    fallback: false,
    paths,
  };
}
