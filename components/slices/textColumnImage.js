import { RichText } from "prismic-reactjs";
import React, { Component } from "react";
import { linkResolver } from "../../prismic-configuration";
import ResponsiveImage from "../common/responsiveImage";

class TextColumnImage extends Component {
  renderGrid() {
    const { title, description, image } = this.props.slice.primary;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-blue-200">
          {RichText.render(title, linkResolver)}
          {RichText.render(description, linkResolver)}
        </div>
        <div className="bg-red-200">
          <ResponsiveImage image={image} sizes="(min-width:1280) 400px, 50vw" />
        </div>
      </div>
    );
  }

  renderLightCards() {}
  render() {
    return (
      <div className="container w-full bg-primary-dark p-10">
        {this.renderGrid()}
        {this.renderLightCards()}
      </div>
    );
  }
}

export default TextColumnImage;
