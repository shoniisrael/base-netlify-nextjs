import Head from "next/head";

import React, { Component } from "react";
class Layout extends Component {
  render() {
    const { children, title, description } = this.props;

    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="robots" content="noindex"></meta>
        </Head>
        {/* TODO: implement Header */}
        {children}
        {/* TODO: implement Footer */}
      </div>
    );
  }
}

export default Layout;
