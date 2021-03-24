import Prismic from "prismic-javascript";
import RoutingUtils from "./utils/routing";

export const apiEndpoint = "https://devsucom.cdn.prismic.io/api/v2";

export const accessToken = "";

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
  const page = pages.find((page) => page.uid === uid);

  if (doc.type === "page") {
    if (doc.uid === "home") {
      return "/";
    }
    const result = RoutingUtils.getPath(page, pages);
    return `/${result.split("_").join("/")}`;
  }
  if (doc.type === "job_post") {
    return `/careers/${uid.split("_").join("/")}`;
  }
  if (doc.type === "blog_post") {
    const result = RoutingUtils.getBlogPath(uid);
    return `/sprint/${result}`;
  }
  if (doc.type === "blog_category") {
    return `/sprint/${uid.split("_").join("/")}`;
  }
  if (doc.type === "case_studies") {
    return `/case-studies/${uid.split("_").join("/")}`;
  }
  if (doc.type === "ebook") {
    return `/ebooks/${uid.split("_").join("/")}`;
  }
  return "/";
};

// Additional helper function for Next/Link component
export const hrefResolver = linkResolver;
