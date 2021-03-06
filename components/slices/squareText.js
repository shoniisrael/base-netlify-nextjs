import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../../prismic-configuration";
import StyleUtils from "../../utils/styleUtils";

class SquareText extends Component {
  renderSquare(card, index) {
    const { primary } = this.props.slice;
    const { description_color, title_color } = primary;
    const { description, title } = card;
    const descriptionColor = StyleUtils.getTextColor(description_color);
    const titleColor = StyleUtils.getTextColor(title_color);
    return (
      <div key={index} className="p-6">
        <div className={`mb-8 text-lg font-bold ${titleColor}`}>
          {RichText.render(title, linkResolver)}
        </div>
        <div className={descriptionColor}>{RichText.render(description, linkResolver)}</div>
      </div>
    );
  }
  renderGrid() {
    const { primary, items } = this.props.slice;
    const { columns_number: colNumber } = primary;
    return (
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${colNumber} justify-items-center px-5 gap-4`}
      >
        {items.map((item, index) => this.renderSquare(item, index))}
      </div>
    );
  }
  render() {
    const { background_color } = this.props.slice.primary;
    const backgroundColor = StyleUtils.getBackgroundColor(background_color);
    return (
      <div className={`py-10 ${backgroundColor}`}>
        <div className="container mx-auto lg:px-20">{this.renderGrid()}</div>
      </div>
    );
  }
}

export default SquareText;
