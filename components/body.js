import React, { Component } from "react";
import { SLICE_TYPES } from "../utils/constants";
import { Hero1, CardLinks } from "./slices/";

class Body extends Component {
  render() {
    return (
      <div className="text-primary font-light text-sm lg:text-base w-100">
        {this.renderSlices()}
      </div>
    );
  }
  renderSlices() {
    const { slices } = this.props;
    return slices.map((slice, index) => {
      switch (slice.slice_type) {
        case SLICE_TYPES.HERO_1:
          return (
            <div key={index} className="slice-wrapper">
              <Hero1 slice={slice} />
            </div>
          );
        case SLICE_TYPES.CARD_LINKS:
          return (
            <div key={index} className="slice-wrapper">
              <CardLinks slice={slice} />
            </div>
          );
      }
    });
  }
}

export default Body;
