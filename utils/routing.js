import { useAppContext } from "../pages/_app";
export default class RoutingUtils {
  static getPath(page = { data: {} }, pages, childPages = []) {
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
    return `${page.uid}`;
  }

  static getBlogPath(uid) {
    const { blogPosts } = useAppContext();
    const blogPost = blogPosts.find((blogPost) => blogPost.uid === uid);
    const urlCategory = blogPost.data.main_category.uid
      ? blogPost.data.main_category.uid.split("_").join("/")
      : "unlabeled";
    return `${urlCategory}/${uid}`;
  }

  static getSearchableUid(uidArray, pages) {
    const lastElement = uidArray.pop();

    const isLastElement = pages.find((page) => page.uid === lastElement);
    if (isLastElement) {
      return lastElement;
    }
    const originalLastElement = uidArray.pop();
    const newLastElement = [originalLastElement, lastElement].join("_");
    uidArray.push(newLastElement);
    return this.getSearchableUid(uidArray, pages);
  }
}
