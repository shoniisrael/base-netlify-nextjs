import React, { Component } from "react";
import ResponsiveImage from "./common/responsiveImage";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../prismic-configuration";
import TextUtils from "../utils/text";
import Head from "next/head";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from "react-share";

class BodyBlog extends Component {
  getTitle(title) {
    if (TextUtils.hasRichText(title)) {
      return (
        <div className="w-full pt-14 pb-10 text-3xl font-bold leading-8 text-left text-primary-dark  md:text-4xl lg:text-4xl capitalize">
          {RichText.render(title, linkResolver)}
        </div>
      );
    }
  }

  getSocialMediaBar(urlBlogpost, titleBlogpost, summaryDescription) {
    return (
      <div className="flex justify-end w-full h-20">
        <div className="flex text-sm items-center font-normal">
          <div>SHARE ON SOCIAL</div>

          <FacebookShareButton url={urlBlogpost} quote={titleBlogpost}>
            <img className="h-5 pl-2" src="/img/facebook_icon.svg" alt="facebook-icon" />
          </FacebookShareButton>

          <TwitterShareButton url={urlBlogpost} title={titleBlogpost}>
            <img className="h-5 px-2" src="/img/twitter_icon.svg" alt="twitter-icon" />
          </TwitterShareButton>

          <LinkedinShareButton
            url={urlBlogpost}
            title={titleBlogpost}
            summary={summaryDescription}
            source="Devsu"
          >
            <img className="h-5" src="/img/linkedin_icon.svg" alt="twitter-icon" />
          </LinkedinShareButton>
        </div>
      </div>
    );
  }

  getPostImage(image) {
    return (
      <div className="pb-9">
        <ResponsiveImage image={image} sizes="(min-width:1280) 770px, 100vw" />
      </div>
    );
  }

  render() {
    const { bodyData, uid } = this.props;
    const { title, image, content, meta_description } = bodyData;
    const titleText = title[0].text;
    const linkBlogpost = linkResolver({ uid: uid, type: "blog_post" });
    const homePageLink = "https://devsu.com";
    const getUrlBlogpost = homePageLink + linkBlogpost;

    return (
      <div>
        <Head>
          <meta property="og:title" content={titleText} />
          <meta property="og:type" content="article" />
          <meta property="og:description" content={meta_description} />
          <meta property="og:url" content={getUrlBlogpost} />
          <meta property="og:image" content={image.url} />

          <meta name="twitter:card" content="summary" />
        </Head>
        <div className="flex flex-col items-center p_text-lg text-lg justify-center richtext-content-container title_mt-14 title_mb-5 p_mb-5 mx-auto sm:w-1/2 w-11/12 px-2 sm:px-0 p_lg-text-lg">
          {this.getTitle(title)}

          {this.getSocialMediaBar(getUrlBlogpost, titleText, meta_description)}

          {this.getPostImage(image)}

          {TextUtils.hasRichText(content) && <div>{RichText.render(content, linkResolver)}</div>}

          {this.getSocialMediaBar(getUrlBlogpost, titleText, meta_description)}
        </div>
      </div>
    );
  }
}

export default BodyBlog;
