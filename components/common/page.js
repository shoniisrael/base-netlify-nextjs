import React, { Component } from "react";
import Body from "../body";
import Layout from "../layout";

class Page extends Component {
  render() {
    const { document = {}, navigation, forms } = this.props;
    const { data = {} } = document;
    const { header_and_footer_style: headerAndFooterStyle } = data;

    return (
      <Layout
        title={data.meta_title}
        description={data.meta_description}
        navigation={navigation}
        headerAndFooterStyle={headerAndFooterStyle}
      >
        <Body slices={data.body} forms={forms} />
      </Layout>
    );
  }
}

export default Page;
