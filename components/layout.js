import Head from "next/head";
import React, { Component } from "react";
import Footer from "./footer";
import Header from "./header";
class Layout extends Component {
  render() {
    const { children, title, description, navigation } = this.props;
    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="robots" content="noindex"></meta>
        </Head>
        <Header nav={navigation.data.nav} />
        {children}
        <Footer nav={navigation.data.footer} />
      </div>
    );
  }
}
export default Layout;
