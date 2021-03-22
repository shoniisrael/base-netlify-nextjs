const path = require("path");
const fs = require("fs");
const Prismic = require("prismic-javascript");
const { SitemapStream, streamToPromise } = require("sitemap");

const API_ENDPOINT = "https://devsucom.cdn.prismic.io/api/v2";
const SITE_URL = "https://devsu.com";

const DOC_TYPES = {
  PAGE: "page",
  JOB_POST: "job_post",
  BLOG_POST: "blog_post",
  BLOG_CATEGORY: "blog_category",
  CASE_STUDIES: "case_studies",
};

const CHANGE_FREQUENCY = {
  DAILY: "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
  YEARLY: "yearly",
};

const OUTPUT_DIRECTORY = "../public";
const FILE_NAME = "sitemap.xml";

const getPath = (page = { data: {} }, pages, childPages = []) => {
  const { parent = {} } = page.data;
  const { uid: parentUid } = parent;

  if (parentUid) {
    const parentPage = pages.find((page) => page.uid === parentUid);
    childPages.push(page.uid);
    if (childPages.includes(parentPage.uid)) {
      throw new Error(`Circular parent reference on page: ${parentPage.uid}`);
    }
    return this.getPath(parentPage, pages, childPages) + `_${page.uid}`;
  }
  return page.uid;
};

const linkResolver = (doc, pages) => {
  const { uid } = doc;

  const page = pages.find((page) => page.uid === uid);

  if (doc.type === DOC_TYPES.PAGE) {
    if (doc.uid === "home") {
      return "/";
    }
    const result = getPath(page, pages);
    return `/${result.split("_").join("/")}`;
  }
  if (doc.type === DOC_TYPES.JOB_POST) {
    return `/careers/${uid.split("_").join("/")}`;
  }
  if (doc.type === DOC_TYPES.BLOG_POST) {
    const result = doc.data.main_category.uid ? `${doc.data.main_category.uid}_${uid}` : uid;
    return `/sprint/${result.split("_").join("/")}`;
  }
  if (doc.type === DOC_TYPES.BLOG_CATEGORY) {
    return `/sprint/${uid.split("_").join("/")}`;
  }
  if (doc.type === DOC_TYPES.CASE_STUDIES) {
    return `/case_studies/${uid.split("_").join("/")}`;
  }
  return "/";
};

const run = async () => {
  const api = await Prismic.getApi(API_ENDPOINT);
  let { results: docs } = await api.query(
    Prismic.Predicates.any("document.type", [
      DOC_TYPES.JOB_POST,
      DOC_TYPES.BLOG_POST,
      DOC_TYPES.BLOG_CATEGORY,
      DOC_TYPES.CASE_STUDIES,
    ]),
    {
      pageSize: 100,
      fetch: [],
    },
  );
  const { results: pages } = await api.query(
    Prismic.Predicates.at("document.type", DOC_TYPES.PAGE),
    {
      pageSize: 100,
      fetch: ["page.uid", "page.parent"],
    },
  );

  // Create the sitemap according to prismic documents
  const sitemapStream = new SitemapStream({ hostname: SITE_URL });

  const optionsMapPerDocumentType = {
    page: { changefreq: CHANGE_FREQUENCY.MONTHLY, priority: 1 },
    job_post: { changefreq: CHANGE_FREQUENCY.WEEKLY, priority: 0.4 },
    blog_post: { changefreq: CHANGE_FREQUENCY.WEEKLY, priority: 0.7 },
    blog_category: { changefreq: CHANGE_FREQUENCY.MONTHLY, priority: 0.6 },
    case_studies: { changefreq: CHANGE_FREQUENCY.MONTHLY, priority: 0.8 },
  };
  docs = [...docs, ...pages];
  docs
    .sort((a, b) => {
      //order by type(z-a) and uid(a-z)
      if (a.type === b.type) {
        return a.uid < b.uid ? -1 : 1;
      }
      return a.type > b.type ? -1 : 1;
    })
    .forEach((doc) => {
      const options = optionsMapPerDocumentType[doc.type];
      sitemapStream.write({
        url: linkResolver(doc, pages),
        ...options,
      });
    });
  sitemapStream.end();

  const sitemapData = await streamToPromise(sitemapStream);

  // Write to filesystem
  if (!fs.existsSync(path.join(__dirname, OUTPUT_DIRECTORY))) {
    fs.mkdirSync(path.join(__dirname, OUTPUT_DIRECTORY), { recursive: true });
  }
  fs.writeFileSync(path.join(__dirname, OUTPUT_DIRECTORY, FILE_NAME), sitemapData, "utf-8");

  // Logging
  console.info("Generated sitemap:\n\n", sitemapData.toString());
};

run();
