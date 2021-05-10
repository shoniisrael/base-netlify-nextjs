import React, { Component } from "react";

import { Client } from "../prismic-configuration";
import Page from "../components/common/page";

class Home extends Component {
  render() {
    const { home, navigation } = this.props;
    return <Page document={home} navigation={navigation} />;
  }
}

export default Home;

export async function getStaticProps(context) {
  const home = await Client().getByUID("page", "home", {
    ref: context.preview ? context.previewData.ref : undefined,
  });
  return {
    props: {
      home,
    },
  };
}
