export default class TextUtils {
  static hasRichText(field) {
    return !!field.length && !!field[0].text;
  }
}
