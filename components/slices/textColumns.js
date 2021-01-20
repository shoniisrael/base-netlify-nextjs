import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import ResponsiveImage from "../common/responsiveImage";

class TextColumns extends Component {
  render() {
    return (
      <div className="container m-auto p-6 md:px-14 lg:px-28">
        {this.renderMainTitles()}
        {this.renderMainColumns()}
      </div>
    );
  }

  renderMainTitles() {
    const { slice } = this.props;
    const { primary } = slice;
    const { small_title: smallTitle, big_title: bigTitle, hidden_title: hiddenTitle } = primary;
    return (
      <React.Fragment>
        <div className="p-4 text-xs uppercase md:text-sm">{RichText.render(smallTitle)}</div>
        <div className="text-3xl font-bold text-primary-dark p-4">{RichText.render(bigTitle)}</div>
        <div className="hidden">{RichText.render(hiddenTitle)}</div>
      </React.Fragment>
    );
  }

  renderMainColumns() {
    const { slice } = this.props;
    const { primary } = slice;
    const {
      left_rich_text: leftRichText,
      right_title: rightTitle,
      right_footer: rightFooter,
      left_image: leftImage,
    } = primary;

    return (
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 my-4 px-4 pr-10 p_py-2 li_leading-loose">
          {RichText.render(leftRichText)}
          {leftImage && (
            <div className="w-3/5 m-auto">
              <ResponsiveImage
                image={leftImage}
                sizes="(min-width:1440) 520px, (min-width:768) 40vh, 75vw"
                className="flex-grow-0 pb-4"
              />
            </div>
          )}
        </div>

        <div className="md:w-1/2 my-4 px-4 pl-10">
          <div className="font-bold text-xl text-primary-dark">{RichText.render(rightTitle)}</div>
          {this.renderGrid()}
          <div className="p_py-2 p_leading-loose li_leading-loose">
            {RichText.render(rightFooter)}
          </div>
        </div>
      </div>
    );
  }

  renderGrid() {
    const { slice } = this.props;
    const { items } = slice;
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 py-8 gap-12">
        {items.map((column, index) => this.renderSmallColumn(column, ++index))}
      </div>
    );
  }

  renderSmallColumn(column, index) {
    const { title, rich_text: richText } = column;
    return (
      <div>
        <div className="text-secondary text-4xl pb-3">{index}.</div>
        <div className="font-bold py-2">{RichText.render(title)}</div>
        <div className="p_py-3">{RichText.render(richText)}</div>
      </div>
    );
  }
}

export default TextColumns;
