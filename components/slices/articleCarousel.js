import React, { Component } from "react";
import { useAppContext } from "../../pages/_app";
import { RichText } from "prismic-reactjs";
import CustomLink from "../common/customLink";
import ResponsiveImage from "../common/responsiveImage";
import TextUtils from "../../utils/text";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
const BG_STYLE = {
  NONE: "none",
  DOTS_1: "dots1",
  DOTS_2: "dots2",
  DOTS_3: "dots3",
  DOTS_4: "dots4",
};

class ArticleCarousel extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
    };
    this.onchange = this.onchange.bind(this);
  }
  onchange(value) {
    this.setState({ value });
  }
  getGeneratedLink(id, slug, uid) {
    const link = new Object();
    link.id = id;
    link.type = "blog_post";
    link.tags = ["sprint"];
    link.slug = slug;
    link.lang = "en-us";
    link.uid = uid;
    link.link_type = "Document";
    link.isBroken = false;
    return link;
  }
  getBackgroundStyleClasses(style) {
    switch (style) {
      case BG_STYLE.NONE:
        return "";
      case BG_STYLE.DOTS_1:
        return "dots1";
      case BG_STYLE.DOTS_2:
        return "dots2";
      case BG_STYLE.DOTS_3:
        return "dots3";
      case BG_STYLE.DOTS_4:
        return "dots4";
      default:
        return "";
    }
  }
  renderCarouselItem(image, title, content, index, generatedLink) {
    return (
      <div key={index} className="w-full flex flex-col md:flex-row">
        <div className="md:w-1/2 pb-12 md:pb-0 md:pr-7 xl:pr-12 xl:pt-12">
          <div className="cardText carouselTitle">{RichText.render(title)}</div>
          <p className="cardText carouselText">{content[0].text}</p>
          <div className=" text-2xl md:text-4xl text-primary-dark">
            <CustomLink link={generatedLink} classes="btn flat contentBtn w-40">
              <span className="mr-2 ">Read More </span>
              <img className="w-min" src="/img/chevron-right.svg" />
            </CustomLink>
          </div>
        </div>
        <div className="md:w-1/2 md:h-80">
          <ResponsiveImage
            image={image}
            className="object-cover h-52 w-full md:h-64 md:w-auto  lg:h-80 xl:h-96 mb-auto"
            sizes="
            (min-width:1400) 554px,
            (min-width:768) 42.5vw, 90vw"
          />
        </div>
      </div>
    );
  }
  renderHeader(imageTitle, textTitle, headerConfiguration) {
    return (
      <div className="w-full pb-11">
        {headerConfiguration ? (
          TextUtils.hasRichText(textTitle) && (
            <div className="text-3xl font-bold text-primary-dark py-4">
              {RichText.render(textTitle)}
            </div>
          )
        ) : (
          <ResponsiveImage image={imageTitle} className="h-11" sizes="195px" />
        )}
      </div>
    );
  }
  renderCarousel(blogPostsArrayReduced) {
    return (
      <div className="h-109 md:h-106 lg:h-107 xl:h-108">
        <Carousel
          infinite
          autoPlay={2000}
          value={this.state.value}
          onChange={this.onchange}
          className="mb-24"
        >
          {blogPostsArrayReduced.map((card, index) => {
            const generatedLink = this.getGeneratedLink(card.id, card.slugs[0], card.uid);
            const { image, title, content } = card.data;
            return this.renderCarouselItem(image, title, content, index, generatedLink);
          })}
        </Carousel>
      </div>
    );
  }

  render() {
    const { blogPosts: allBlogPostsArray } = useAppContext();
    const { slice, blogs: categoryBlogPostArray } = this.props;
    const {
      text_title: textTitle,
      background_style: backgroundStyle,
      image_title: imageTitle,
      number_of_post: numberOfPost,
      header_configuration: headerConfiguration,
    } = slice.primary;
    const blogPostsArrayReduced = categoryBlogPostArray
      ? categoryBlogPostArray.slice(0, numberOfPost || 3)
      : allBlogPostsArray.slice(0, numberOfPost || 3);

    const backgroundClasses = this.getBackgroundStyleClasses(backgroundStyle);
    const carouselHasContent = blogPostsArrayReduced && numberOfPost;

    return (
      <div>
        {carouselHasContent && (
          <div
            className={`flex items-center mx-auto relative xl:h-3/4 ${backgroundClasses} bg-primary-aliceBlue`}
          >
            <div className=" container mx-auto pt-24 pb-9 px-6 lg:px-20">
              {this.renderHeader(imageTitle, textTitle, headerConfiguration)}
              {this.renderCarousel(blogPostsArrayReduced)}
              <Dots value={this.state.value} onChange={this.onchange} number={numberOfPost || 3} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ArticleCarousel;
