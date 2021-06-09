import React, { Component } from "react";
import { MEDIA_QUERIES } from "../../utils/constants";
import ImageWrapper from "../../utils/imageWrapper";

class ResponsiveBgImage extends Component {
  render() {
    const { bgImage = {}, index, children, classes } = this.props;
    if (!bgImage.url || !bgImage.mobile || !bgImage.mobile.url) {
      return (
        <div className="bg-center bg-no-repeat bg-cover">
          <div className={`mx-auto w-full ${classes}`}>{children}</div>
        </div>
      );
    }

    const style = this.getStyle(bgImage, index);

    return (
      <div>
        {style}
        <div className={`bg-center bg-no-repeat bg-cover bg-image-${index}`}>
          <div className={`2xl:container mx-auto w-full ${classes}`}>{children}</div>
        </div>
      </div>
    );
  }

  getStyle(bgImage, index) {
    const nonRetinaFactor = 1;
    const smallImageWrapper = new ImageWrapper(bgImage.mobile);
    const smallNonRetinaUrl = smallImageWrapper.getResizedImageUrlForFactor(nonRetinaFactor);
    const mediumImageWrapper = new ImageWrapper(bgImage);
    const mediumNonRetinaUrl = mediumImageWrapper.getResizedImageUrlForFactor(nonRetinaFactor);

    return (
      <style jsx>
        {`
          ${MEDIA_QUERIES.SMALL_NON_RETINA_SCREEN} {
            .bg-image-${index} {
              background-image: url("${smallNonRetinaUrl}");
            }
          }
          ${MEDIA_QUERIES.SMALL_RETINA} {
            .bg-image-${index} {
              background-image: url("${bgImage.mobile.url}");
            }
          }
          ${MEDIA_QUERIES.MEDIUM_NON_RETINA_SCREEN} {
            .bg-image-${index} {
              background-image: url("${mediumNonRetinaUrl}");
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
