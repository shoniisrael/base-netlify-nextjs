export default class SortingUtils {
  static getArraySortedByPublicationDate(logPosts) {
    return logPosts.sort(function (a, b) {
      if (a.first_publication_date > b.first_publication_date) {
        return -1;
      }
      if (a.first_publication_date < b.first_publication_date) {
        return 1;
      }
      return 0;
    });
  }
}
