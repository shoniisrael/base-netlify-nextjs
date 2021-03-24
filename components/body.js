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
  JobPostCards,
  ArticleCarousel,
  Testimonial,
  Subscribe,
  ImageAndForm,
  RichTextContent,
} from "./slices/";
import BodyBlog from "./bodyBlog";
import BodyJobPost from "./bodyJobPost";
class Body extends Component {
  render() {
    return (
      <main className="text-sm font-light text-primary lg:text-base w-100">
        {this.renderSlices()}
      </main>
    );
  }
  renderSlices() {
    const {
      slices = [],
      blogContent,
      jobPostContent,
      blogCategoryContent,
      caseStudy,
      ebook,
      file,
      form,
      caseName,
    } = this.props;
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
            <section key={index}>
              <Banner slice={slice} />
            </section>
          );
        case SLICE_TYPES.QUOTES:
          return (
            <section key={index}>
              <Quotes slice={slice} />
            </section>
          );
        case SLICE_TYPES.FULL_WIDTH_IMAGE_AND_TEXT:
          return (
            <section key={index}>
              <FullWidthImageAndText slice={slice} />
            </section>
          );
        case SLICE_TYPES.TITLE_AND_FORM:
          return (
            <section key={index}>
              <TitleAndForm slice={slice} index={index} file={file} caseName={caseName} />
            </section>
          );
        case SLICE_TYPES.TEXT_AND_FORM:
          return (
            <section key={index}>
              <TextAndForm slice={slice} index={index} file={file} caseName={caseName} />
            </section>
          );
        case SLICE_TYPES.TEXT_COLUMNS:
          return (
            <section key={index}>
              <TextColumns slice={slice} />
            </section>
          );
        case SLICE_TYPES.JOB_POST_CARDS:
          return (
            <section key={index}>
              <JobPostCards slice={slice} />
            </section>
          );
        case SLICE_TYPES.LATEST_POSTS:
          if (blogCategoryContent) {
            return (
              <section key={index}>
                <LatestPosts slice={slice} blogCategoryContent={blogCategoryContent} />
              </section>
            );
          }
          return (
            <section key={index}>
              <LatestPosts slice={slice} />
            </section>
          );
        case SLICE_TYPES.ARTICLE_CAROUSEL:
          if (blogCategoryContent) {
            return (
              <section key={index}>
                <ArticleCarousel slice={slice} blogCategoryContent={blogCategoryContent} />
              </section>
            );
          }
          return (
            <section key={index}>
              <ArticleCarousel slice={slice} />
            </section>
          );
        case SLICE_TYPES.TESTIMONIALS:
          return (
            <section key={index}>
              <Testimonial slice={slice} />
            </section>
          );
        case SLICE_TYPES.SUBSCRIBE:
          return (
            <section key={index}>
              <Subscribe slice={slice} />
            </section>
          );
        case SLICE_TYPES.BLOG_CONTENT:
          return (
            <section key={index}>
              <BodyBlog bodyData={blogContent} />
            </section>
          );
        case SLICE_TYPES.JOB_POST_CONTENT:
          return (
            <section key={index}>
              <BodyJobPost bodyData={jobPostContent} />
            </section>
          );
        case SLICE_TYPES.IMAGE_AND_FORM:
          return (
            <section key={index}>
              <ImageAndForm
                slice={slice}
                index={index}
                formConfig={form}
                file={file}
                caseName={caseName}
              />
            </section>
          );
        case SLICE_TYPES.CASE_STUDY_CONTENT:
          return (
            <section key={index}>
              <Body slices={caseStudy} form={slice} file={file} caseName={caseName} />
            </section>
          );
        case SLICE_TYPES.EBOOK_CONTENT:
          return (
            <section key={index}>
              <Body slices={ebook} form={slice} file={file} caseName={caseName} />
            </section>
          );
        case SLICE_TYPES.RICH_TEXT:
          return (
            <section key={index}>
              <RichTextContent slice={slice} />
            </section>
          );
        default:
          return <div className="text-red-700 text-3xl">{slice.slice_type} not found</div>;
      }
    });
  }
}
export default Body;
