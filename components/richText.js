import React, { Component } from "react";
import TextUtils from "../utils/text";
import { RichText } from "prismic-reactjs";

class RichTextProcessor extends Component {
  renderTexts(content) {
    if (TextUtils.hasRichText(content)) {
      return RichText.render(content);
    }
  }

  render() {
    const { content } = this.props;
    return <div className="richtext-content-container">{this.renderTexts(content)}</div>;
  }
}

export default RichTextProcessor;
