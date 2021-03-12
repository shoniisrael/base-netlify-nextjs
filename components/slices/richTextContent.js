import { RichText } from "prismic-reactjs";
import React, { Component } from "react";
import TextUtils from "../../utils/text";

class RichTextContent extends Component {
  render() {
    const { primary } = this.props.slice;
    const { rich_text: richText, title, style } = primary;

    return (
      <div className={style === "dots" && "dots6"}>
        <div className="container mx-auto max-w-2xl pt-12 md:pt-16 pb-16 md:pb-29 px-10 md:px-16 xl:px-1 flex flex-col">
          {TextUtils.hasRichText(title) && (
            <div className="text-3xl md:text-4xl font-bold pb-7 text-primary-dark">
              {RichText.render(title)}
            </div>
          )}
          {TextUtils.hasRichText(richText) && (
            <div className="p_leading-relaxed richtext-content-container title_mt-14 title_mb-5 text-base p_lg-text-lg 6 p_mb-14">
              {RichText.render(richText)}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default RichTextContent;
