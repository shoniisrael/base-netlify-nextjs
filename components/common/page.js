import React, { Component } from "react";
import Body from "../body";
import Layout from "../layout";
class Page extends Component {
  render() {
    const { document = {}, navigation } = this.props;
    const { data = {} } = document;

    return (
      <Layout title={data.meta_title} description={data.meta_description} navigation={navigation}>
        <Body slices={data.body} />
      </Layout>
    );
  }
}

export default Page;
