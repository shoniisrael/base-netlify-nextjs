const path = require("path");
const fs = require("fs");
const Prismic = require("prismic-javascript");
const { SitemapStream, streamToPromise } = require("sitemap");

const API_ENDPOINT = "https://devsucom.cdn.prismic.io/api/v2";
const SITE_URL = "https://devsu.com";

const getPath = (page, pages, childPages = []) => {
  const { parent } = page.data;
  const { uid: parentUid } = parent;

  if (parentUid) {
    const parentPage = pages.find((page) => page.uid === parentUid);
    childPages.push(page.uid);
    if (childPages.includes(parentPage.uid)) {
      throw new Error(`Circular parent reference on page: ${parentPage.uid}`);
    }
    return this.getPath(parentPage, pages, childPages) + `_${page.uid}`;
  }
  return `${page.uid}`;
};

const linkResolver = (doc, pages) => {
  const { uid } = doc;

  const page = pages.find((page) => page.uid === uid);

  if (doc.type === "page") {
    if (doc.uid === "home") {
      return "/";
    }
    const result = getPath(page, pages);
    return `/${result.split("_").join("/")}`;
  }
  if (doc.type === "job_post") {
    return `/careers/${uid.split("_").join("/")}`;
  }
  if (doc.type === "blog_post") {
    return `/sprint/${uid.split("_").join("/")}`;
  }
  if (doc.type === "blog_category") {
    return `/sprint/category/${uid.split("_").join("/")}`;
  }
  return "/";
};

const run = async () => {
  const api = await Prismic.getApi(API_ENDPOINT);
  const { results: docs } = await api.query(
    Prismic.Predicates.any("document.type", ["page", "job_post", "blog_post", "blog_category"]),
    {
      pageSize: 100,
      fetch: [],
    },
  );
  const { results: pages } = await api.query(
    Prismic.Predicates.at("document.type", "page", { pageSize: 100, fetch: [] }),
  );

  // Create the sitemap according to prismic documents
  const sitemapStream = new SitemapStream({ hostname: SITE_URL });

  const optionsMapPerDocumentType = {
    page: { changefreq: "monthly", priority: 1 },
    job_post: { changefreq: "weekly", priority: 0.7 },
    blog_post: { changefreq: "weekly", priority: 0.9 },
    blog_category: { changefreq: "monthly", priority: 0.8 },
  };

  docs
    .sort((a, b) => (a.type < b.type ? -1 : 1)) // sort by type
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
  if (!fs.existsSync(path.join(__dirname, "../dist"))) {
    fs.mkdirSync(path.join(__dirname, "../dist"), { recursive: true });
  }
  fs.writeFileSync(path.join(__dirname, "../public/sitemap.xml"), sitemapData, "utf-8");

  // Logging
  console.log("Generated sitemap:\n\n", sitemapData.toString());
};

run();
