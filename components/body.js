import React, { Component } from "react";

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
  FullWidthImageAndText,
  TitleAndForm,
  TextAndForm,
  TextColumns,
  LatestPosts,
} from "./slices/";
import JobPostCards from "./slices/jobPostCards";

class Body extends Component {
  render() {
    return (
      <main className="text-sm font-light text-primary lg:text-base w-100">
        {this.renderSlices()}
      </main>
    );
  }
  renderSlices() {
    const { slices = [], forms } = this.props;
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
            <section key={index}>
              <Hero2 index={index} slice={slice} />
            </section>
          );
        case SLICE_TYPES.CARD_LINKS:
          return (
            <section key={index}>
              <CardLinks slice={slice} />
            </section>
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
        case SLICE_TYPES.FULL_WIDTH_IMAGE_AND_TEXT:
          return (
            <section>
              <FullWidthImageAndText slice={slice} />
            </section>
          );
        case SLICE_TYPES.TITLE_AND_FORM:
          return (
            <section>
              <TitleAndForm slice={slice} forms={forms} />
            </section>
          );
        case SLICE_TYPES.TEXT_AND_FORM:
          return (
            <section>
              <TextAndForm slice={slice} forms={forms} />
            </section>
          );
        case SLICE_TYPES.TEXT_COLUMNS:
          return (
            <section>
              <TextColumns slice={slice} forms={forms} />
            </section>
          );
        case SLICE_TYPES.JOB_POST_CARDS:
          return (
            <section>
              <JobPostCards slice={slice} />
            </section>
          );
        case SLICE_TYPES.LATEST_POSTS:
          return (
            <section key={index}>
              <LatestPosts slice={slice} />
            </section>
          );
        default:
          return <div className="text-red-700 text-3xl">{slice.slice_type} not found</div>;
      }
    });
  }
}
export default Body;
