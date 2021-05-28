import React from "react";

const Iframe = (props) => {
  const writeHTML = (frame) => {
    if (!frame) {
      return;
    }
    let doc = frame.contentDocument;
    doc.open();
    doc.write(props.content);
    doc.close();
    frame.style.width = props.width;
    frame.style.height = props.height;
  };
  return <iframe src="about:blank" scrolling="no" frameBorder="0" ref={writeHTML} />;
};

export default Iframe;
