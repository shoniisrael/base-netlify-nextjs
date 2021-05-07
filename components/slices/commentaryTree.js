import { RichText } from "prismic-reactjs";
import React, { Component } from "react";
import { linkResolver } from "../../prismic-configuration";

class CommentaryTree extends Component {
  renderGrid() {
    return (
      <div
        className="py-12 lg:pt-0 px-6 container mx-auto grid grid-cols-1 place-items-stretch gap-y-6 md:grid-cols-3 md:gap-x-6 md:gap-y-8 lg:gap-x-10 lg:gap-y-6 text-sm"
        style={{ backgroundColor: "blue" }}
      ></div>
    );
  }

  renderPrimary() {
    const { primary } = this.props.slice;
    const { title, description } = primary;
    return (
      <div className="flex flex-col justify-between items-center py-8 px-6 container mx-auto lg:py-15">
        <div className="pb-3">
          <span className=" font-bold text-xl lg:text-5xl text-primary-dark">
            {RichText.render(title, linkResolver)}
          </span>
        </div>
        <div className="lg:w-2/5 w-3/4">
          <span className="text-center font-light">
            {RichText.render(description, linkResolver)}
          </span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderPrimary()}
        {this.renderGrid()}
      </div>
    );
  }
}

export default CommentaryTree;
