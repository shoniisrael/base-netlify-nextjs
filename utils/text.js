export default class TextUtils {
  static hasRichText(field) {
    return field && !!field.length && !!field[0].text;
  }
}
