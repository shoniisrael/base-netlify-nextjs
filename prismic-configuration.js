import Prismic from "prismic-javascript";
import RoutingUtils from "./utils/routing";

export const apiEndpoint = "https://devsucom.cdn.prismic.io/api/v2";

export const accessToken = "";

const DOC_TYPES = {
  PAGE: "page",
  JOB_POST: "job_post",
  BLOG_POST: "blog_post",
  BLOG_CATEGORY: "blog_category",
  CASE_STUDIES: "case_studies",
  EBOOK: "ebook",
};

// creating a prismic client  object
export const Client = (req = null) =>
  Prismic.client(apiEndpoint, createClientOptions(req, accessToken));

const createClientOptions = (req = null, prismicAccessToken = null) => {
  const reqOption = req ? { req } : {};
  const accessTokenOption = prismicAccessToken ? { accessToken: prismicAccessToken } : {};

  return {
    ...reqOption,
    ...accessTokenOption,
  };
};

// Manages the url links to internal Prismic documents
export const linkResolver = (doc) => {
  const { uid, pages } = doc;
  if (doc.type === DOC_TYPES.PAGE) {
    let result = uid;
    if (doc.uid === "home") {
      return "/";
    }
    if (pages) {
      const page = pages.find((page) => page.uid === uid);
      result = RoutingUtils.getPath(page, pages);
    }
    return `/${result.split("_").join("/")}`;
  }
  if (doc.type === DOC_TYPES.JOB_POST) {
    return `/careers/${uid.split("_").join("/")}`;
  }
  if (doc.type === DOC_TYPES.BLOG_POST) {
    const result = RoutingUtils.getBlogPath(uid);
    return `/sprint/${result}`;
  }
  if (doc.type === DOC_TYPES.BLOG_CATEGORY) {
    return `/sprint/${uid.split("_").join("/")}`;
  }
  if (doc.type === DOC_TYPES.CASE_STUDIES) {
    return `/case-studies/${uid.split("_").join("/")}`;
  }
  if (doc.type === DOC_TYPES.EBOOK) {
    return `/ebooks/${uid.split("_").join("/")}`;
  }
  return "/";
};

// Additional helper function for Next/Link component
export const hrefResolver = linkResolver;
