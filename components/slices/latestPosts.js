import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import CustomLink from "../common/customLink";
import { useAppContext } from "../../pages/_app";
import ResponsiveImage from "../common/responsiveImage";

class LatestPosts extends Component {
  getBlogWithStyle(showSocialMedia, showCategories) {
    return showSocialMedia || showCategories ? "md:w-2/3" : "md:w-full";
  }
  getBlogSpacingStyle(showSocialMedia, showCategories) {
    return showSocialMedia || showCategories
      ? "md:grid md:grid-cols-2 md:gap-7 md:pr-7"
      : "md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-7";
  }
  getGeneratedLink(id, type, slug, uid) {
    const link = new Object();
    link.id = id;
    link.type = type;
    link.tags = ["sprint"];
    link.slug = slug;
    link.lang = "en-us";
    link.uid = uid;
    link.link_type = "Document";
    link.isBroken = false;
    return link;
  }
  renderViewMoreButton() {
    const viewMoreLink = this.getGeneratedLink("sprint", "page", "sprint", "sprint");
    return (
      <div className="flex justify-end w-full md:w-auto">
        <div className="object-right text-right self-start text-2xl md:text-4xl text-primary-dark">
          <CustomLink link={viewMoreLink} classes="btn flat contentBtn w-56">
            <span className="mr-2 ">View More Articles </span>
            <img className="w-min" src="/img/chevron-right.svg" />
          </CustomLink>
        </div>
      </div>
    );
  }
  renderSocialMedia() {
    return (
      <div className="h-32">
        GET SOCIAL WITH US
        <div>
          <div className="pb-6 pt-3">
            <ul className="flex items-center mt-2 text-2xl text-secondary">
              <li>
                <a className="hover:bg-white" href="https://www.facebook.com/DevsuSoftware">
                  <img className="w-5 h-6 text-secondary" src="/img/facebook_icon.svg" />
                </a>
              </li>
              <li className="mx-4">
                <a className="hover:text-white" href="https://www.linkedin.com/company/devsu/">
                  <img
                    className="w-5 h-6 fill-current text-secondary"
                    src="/img/linkedin_icon.svg"
                  />
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="https://twitter.com/devsullc">
                  <img
                    className="w-5 h-6 fill-current text-secondary"
                    src="/img/twitter_icon.svg"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  renderCategories(blogCategoriesArray) {
    return (
      <div>
        CATEGORIES
        <div className="my-6 flex flex-wrap ">
          {blogCategoriesArray.map((card, index) => {
            const viewMoreLink = this.getGeneratedLink(
              card.id,
              "blog_category",
              card.slugs[0],
              card.uid,
            );
            return (
              <CustomLink key={index} link={viewMoreLink} classes="btnCategory text-xl">
                {card.data.name}
              </CustomLink>
            );
          })}
        </div>
      </div>
    );
  }
  renderBlogs(blogPostsArray, spacing) {
    return (
      <div className={`md:flex md:flex-wrap ${spacing}`}>
        {blogPostsArray.map((card, index) => {
          const generatedLink = this.getGeneratedLink(
            card.id,
            "blog_post",
            card.slugs[0],
            card.uid,
          );
          const { image, title, content } = card.data;
          return (
            <CustomLink key={index} link={generatedLink}>
              <div className="border overflow-hidden border-gray-100 shadow-sm rounded-md h-105 w-full flex flex-col items-center mb-7">
                <div className="h-56 w-full">
                  <ResponsiveImage
                    image={image}
                    className={"object-cover h-full w-full"}
                    sizes="(min-width:1280) 400px, (min-width:768)25vw, 75vw"
                  />
                </div>
                <p className="cardText h-20 my-4 text-xl font-bold text-left w-full overflow-hidden">
                  {RichText.render(title)}
                </p>
                <div className="cardText text-left w-full overflow-hidden">
                  <p>{content[0].text}</p>
                </div>
              </div>
            </CustomLink>
          );
        })}
      </div>
    );
  }
  render() {
    const { blogPosts: allBlogPostsArray, blogCategories: blogCategoriesArray } = useAppContext();
    const { slice, blogs: categoryBlogPostArray } = this.props;
    const {
      grid_title: gridTitle,
      show_social_media: showSocialMedia,
      show_categories: showCategories,
      number_of_post: showFullPost,
      show_button: showButton,
    } = slice.primary;

    const blogPostsArraySorted = categoryBlogPostArray || allBlogPostsArray;
    const blogPostsArrayReduced = showFullPost
      ? blogPostsArraySorted.slice(0, 15)
      : showSocialMedia || showCategories
      ? blogPostsArraySorted.slice(0, 2)
      : blogPostsArraySorted.slice(0, 3);

    const blogWithStyle = this.getBlogWithStyle(showSocialMedia, showCategories);
    const blogSpacingStyle = this.getBlogSpacingStyle(showSocialMedia, showCategories);

    return (
      <div className="bg-white container mx-auto py-14 px-6 lg:px-20">
        <div className="container flex flex-col  md:px-0 mx-auto">
          <div className="w-full flex flex-col md:flex-row md:justify-between">
            <div className="items-start text-2xl font-bold text-left self-start md:text-4xl text-primary-dark ">
              {RichText.render(gridTitle)}
              <div className="flex justify-start">
                <div className="separator no-margin my-4 mx-0 items-start" />
              </div>
            </div>
            {showButton && this.renderViewMoreButton()}
          </div>

          <div className="flex flex-col my-10 md:flex-row w-full h-auto z-10 lg:-top-20 md:pb-20 text-primary-dark">
            <div className={`md:flex-auto w-full ${blogWithStyle}`}>
              {this.renderBlogs(blogPostsArrayReduced, blogSpacingStyle)}
            </div>
            {(showSocialMedia || showCategories) && (
              <div className="md:flex-auto flex flex-col md:w-1/3">
                {showSocialMedia && this.renderSocialMedia()}
                {showCategories && this.renderCategories(blogCategoriesArray)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default LatestPosts;
