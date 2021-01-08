import React, { Component } from "react";
import sal from "sal.js";
import "sal.js/dist/sal.css";

import { SLICE_TYPES } from "../utils/constants";
import {
  Hero1,
  Hero2,
  CardLinks,
  ImagesRow,
  ImageAndText,
  CardsGrid,
  Cards,
  Banner,
  Quotes,
} from "./slices/";

class Body extends Component {
  componentDidMount() {
    sal();
  }
  render() {
    return (
      <main className="text-sm font-light text-primary lg:text-base w-100">
        {this.renderSlices()}
      </main>
    );
  }
  renderSlices() {
    const { slices = [] } = this.props;
    return slices.map((slice, index) => {
      switch (slice.slice_type) {
        case SLICE_TYPES.HERO_1:
          return (
            <section key={index}>
              <Hero1 slice={slice} />
            </section>
          );
        case SLICE_TYPES.HERO_2:
          return (
            <div key={index}>
              <Hero2 index={index} slice={slice} />
            </div>
          );
        case SLICE_TYPES.CARD_LINKS:
          return (
            <div key={index}>
              <CardLinks slice={slice} />
            </div>
          );
        case SLICE_TYPES.IMAGES_ROW:
          return (
            <section key={index}>
              <ImagesRow slice={slice} />
            </section>
          );
        case SLICE_TYPES.IMAGE_AND_TEXT:
          return (
            <section key={index}>
              <ImageAndText slice={slice} />
            </section>
          );
        case SLICE_TYPES.CARDS_GRID:
          return (
            <section key={index}>
              <CardsGrid slice={slice} />
            </section>
          );
        case SLICE_TYPES.CARDS:
          return (
            <section key={index}>
              <Cards slice={slice} />
            </section>
          );
        case SLICE_TYPES.BANNER:
          return (
            <section>
              <Banner slice={slice} />
            </section>
          );
        case SLICE_TYPES.QUOTES:
          return (
            <section>
              <Quotes slice={slice} />
            </section>
          );
      }
    });
  }
}
export default Body;
