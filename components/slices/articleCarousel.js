import React, { Component } from "react";
import { useAppContext } from "../../pages/_app";
import { RichText } from "prismic-reactjs";
import CustomLink from "../common/customLink";
import ResponsiveImage from "../common/responsiveImage";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

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
  render() {
    const { blogPosts: blogPostsArray } = useAppContext();
    const { slice } = this.props;
    const {
      background_style: backgroundStyle,
      image_header: imageHeader,
      number_of_post: numberOfPost,
    } = slice.primary;

    const blogPostsArrayReduced = blogPostsArray.slice(0, numberOfPost || 3);
    return (
      <div
        className={`flex items-center mx-auto relative xl:h-3/4 ${backgroundStyle} bg-primary-aliceBlue`}
      >
        <div className=" container mx-auto pt-24 pb-9 px-6 lg:px-20">
          <div className="w-full pb-11">
            <ResponsiveImage image={imageHeader} className="h-11" sizes="195px" />
          </div>
          <div className="h-109 md:h-106 lg:h-107 xl:h-108">
            <Carousel value={this.state.value} onChange={this.onchange} className="mb-24">
              {blogPostsArrayReduced.map((card, index) => {
                const generatedLink = this.getGeneratedLink(card.id, card.slugs[0], card.uid);
                const { image, title, content } = card.data;
                return this.renderCarouselItem(image, title, content, index, generatedLink);
              })}
            </Carousel>
          </div>
          <Dots value={this.state.value} onChange={this.onchange} number={numberOfPost || 3} />
        </div>
      </div>
    );
  }
}

export default ArticleCarousel;
