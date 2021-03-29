import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../../prismic-configuration";
import CustomLink from "../common/customLink";
import { useAppContext } from "../../pages/_app";
import ResponsiveImage from "../common/responsiveImage";
import TextUtils from "../../utils/text";

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
  renderViewMoreButton(buttonLink, buttonLabel, buttonStyle) {
    if (!buttonLabel) {
      return <></>;
    }
    return (
      <div className="flex justify-end w-full md:w-auto">
        <div className="object-right text-right self-start text-2xl md:text-4xl text-primary-dark">
          <CustomLink link={buttonLink} classes={`btn ${buttonStyle} contentBtn `}>
            <span className="mr-2 ">{buttonLabel} </span>
            <img className="w-min" src="/img/chevron-right.svg" alt="" />
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
                  <img
                    className="w-5 h-6 text-secondary"
                    src="/img/facebook_icon.svg"
                    alt="facebook"
                  />
                </a>
              </li>
              <li className="mx-4">
                <a className="hover:text-white" href="https://www.linkedin.com/company/devsu/">
                  <img
                    className="w-5 h-6 fill-current text-secondary"
                    src="/img/linkedin_icon.svg"
                    alt="linkedin"
                  />
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="https://twitter.com/devsullc">
                  <img
                    className="w-5 h-6 fill-current text-secondary"
                    src="/img/twitter_icon.svg"
                    alt="twitter"
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
          if (!card) {
            return <> </>;
          }
          const hasTitle = TextUtils.hasRichText(title);
          const hasContent = TextUtils.hasRichText(content);
          return (
            <CustomLink key={index} link={generatedLink}>
              <div className="border overflow-hidden border-gray-100 shadow-md rounded-none w-full flex flex-col items-center mb-7">
                <div className="w-full">
                  <ResponsiveImage
                    image={image}
                    className={"object-cover object-left-top h-full w-full"}
                    sizes="(min-width:1280) 400px, (min-width:768)25vw, 75vw"
                  />
                </div>
                <div className="h-52 px-6">
                  {hasTitle && (
                    <p className="cardText h-20 my-4 text-xl font-bold text-left w-full overflow-hidden">
                      {RichText.render(title, linkResolver)}
                    </p>
                  )}
                  {hasContent && (
                    <div className="cardText text-left w-full overflow-hidden ">
                      <p className="text-primary">{content[0].text}</p>
                    </div>
                  )}
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
    const { slice, blogCategoryContent: blogCategoryContent } = this.props;
    const {
      grid_title: gridTitle,
      show_social_media: showSocialMedia,
      show_categories: showCategories,
      number_of_post: numberOfPost,
      button_label: buttonLabel,
      button_link: buttonLink,
      button_style: buttonStyle,
    } = slice.primary;
    const validatedNumberOfPost = numberOfPost < 1 ? 1 : numberOfPost;
    const blogPostsArraySorted = blogCategoryContent
      ? blogCategoryContent.blogsByCategory
      : allBlogPostsArray;
    const blogPostsArrayReduced = blogPostsArraySorted.slice(0, validatedNumberOfPost);

    const blogWithStyle = this.getBlogWithStyle(showSocialMedia, showCategories);
    const blogSpacingStyle = this.getBlogSpacingStyle(showSocialMedia, showCategories);

    return (
      <div className="bg-white container mx-auto pt-20 pb-5 px-6 lg:px-20">
        <div className="container flex flex-col  md:px-0 mx-auto">
          <div className="w-full flex flex-col md:flex-row md:justify-between">
            <div className="items-start text-2xl font-bold text-left self-start md:text-4xl text-primary-dark ">
              {RichText.render(gridTitle, linkResolver)}
              <div className="flex justify-start">
                <div className="separator no-margin my-4 md:h-auto  mx-0 items-start" />
              </div>
            </div>
            {this.renderViewMoreButton(buttonLink, buttonLabel, buttonStyle)}
          </div>

          <div className="flex flex-col mt-7 md:flex-row w-full h-auto z-10 text-primary-dark">
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
