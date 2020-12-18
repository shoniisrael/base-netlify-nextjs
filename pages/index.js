import React, { Component } from "react";

import { Client } from "../prismic-configuration";
import Layout from "../components/layout";
import Body from "../components/body";

class Home extends Component {
  render() {
    const { home, menu } = this.props;
    return (
      <Layout title={home.data.meta_title} description={home.data.meta_description} menu={menu}>
        <Body slices={home.data.body} />
      </Layout>
    );
  }
}

export default Home;

export async function getStaticProps() {
  const home = await Client().getByUID("page", "home");
  // const menu = await Client().getByUID("menu", "menu");
  return {
    props: {
      home,
      // menu,
    },
  };
}
