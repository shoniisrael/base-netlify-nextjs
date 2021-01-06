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

export async function getStaticProps() {
  const home = await Client().getByUID("page", "home");
  return {
    props: {
      home,
    },
  };
}
