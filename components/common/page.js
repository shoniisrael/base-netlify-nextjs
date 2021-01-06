import React, { Component } from "react";
import Body from "../body";
import Layout from "../layout";
class Page extends Component {
  render() {
    const { document = { data: {} }, navigation } = this.props;

    return (
      <Layout
        title={document.data.meta_title}
        description={document.data.meta_description}
        navigation={navigation}
      >
        <Body slices={document.data.body} />
      </Layout>
    );
  }
}

export default Page;
