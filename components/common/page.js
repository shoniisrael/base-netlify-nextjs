import React, { Component } from "react";
import Body from "../body";
import Layout from "../layout";

class Page extends Component {
  render() {
    const { document = {}, navigation } = this.props;
    const { data = {} } = document;
    const {
      header_style: headerStyle,
      footer_style: footerStyle,
      index,
      follow,
      canonical_url: canonicalUrl,
    } = data;

    return (
      <Layout
        title={data.meta_title || "Devsu | We Build Your Digital Products"}
        description={
          data.meta_description ||
          "Devsu builds your digital products. We provide talented on-demand technology teams to bring your product vision to market fast."
        }
        navigation={navigation}
        headerStyle={headerStyle}
        footerStyle={footerStyle}
        index={index}
        follow={follow}
        canonical_url={canonicalUrl}
        keywords={data.keywords}
      >
        <Body slices={data.body} />
      </Layout>
    );
  }
}

export default Page;
