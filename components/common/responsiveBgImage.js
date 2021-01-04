import React, { Component } from "react";
import { MEDIA_QUERIES } from "../../utils/constants";

class ResponsiveBgImage extends Component {
  render() {
    const { bgImage = {}, index, children, classes } = this.props;
    if (!bgImage.url) {
      throw new Error("ResponsiveBgImage requires the bgImage");
    }

    if (!bgImage.tablet || !bgImage.tablet.url) {
      throw new Error("ResponsiveBgImage requires the bgImage.tablet");
    }

    if (!bgImage.mobile || !bgImage.mobile.url) {
      throw new Error("ResponsiveBgImage requires the bgImage.mobile");
    }
    const style = this.getStyle(bgImage, index);

    return (
      <div>
        {style}
        <div className={`bg-center bg-no-repeat bg-cover bg-image-${index}`}>
          <div className={`container mx-auto w-full ${classes}`}>{children}</div>
        </div>
      </div>
    );
  }

  getStyle(bgImage, index) {
    return (
      <style jsx>
        {`
          ${MEDIA_QUERIES.SMALL_NON_RETINA_SCREEN} {
            .bg-image-${index} {
              background-image: url("${bgImage.mobile.url}");
            }
          }
          ${MEDIA_QUERIES.SMALL_RETINA_AND_MEDIUM_NON_RETINA_SCREEN} {
            .bg-image-${index} {
              background-image: url("${bgImage.tablet.url}");
            }
          }
          ${MEDIA_QUERIES.MEDIUM_RETINA_AND_LARGE_SCREENS} {
            .bg-image-${index} {
              background-image: url("${bgImage.url}");
            }
          }
        `}
      </style>
    );
  }
}

export default ResponsiveBgImage;
