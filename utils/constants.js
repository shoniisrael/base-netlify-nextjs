export const SLICE_TYPES = {
  HERO_1: "hero_1",
  HERO_2: "hero_2",
  CARD_LINKS: "card_links",
  CARDS_GRID: "cards_grid",
  CARDS: "cards",
  JOB_POST_CARDS: "job_post_cards",
  IMAGE_AND_TEXT: "image_and_text",
  IMAGES_ROW: "images_row",
  BANNER: "card",
  QUOTES: "quotes",
  FULL_WIDTH_IMAGE_AND_TEXT: "full_width_image_and_text",
  TITLE_AND_FORM: "title_and_form",
  TEXT_AND_FORM: "text_and_form",
  TEXT_COLUMNS: "text_columns",
  LATEST_POSTS: "latest_posts",
  ARTICLE_CAROUSEL: "article_carousel",
  TESTIMONIALS: "testimonial",
  SUSCRIBE: "suscribe_section",
};

export const SCREEN_SIZES = {
  SM: "640px",
  MD: "768px",
  LG: "1024px",
  XL: "1280px",
  XL2: "1536px",
};

export const CARD_STYLE = {
  NORMAL: "normal",
  HIGHLIGHTED: "highlighted",
};

export const DEFAULT_SPACE_SIZE = 48;

export const MEDIA_QUERIES = {
  SMALL_NON_RETINA_SCREEN: `@media
  only screen and (-webkit-max-device-pixel-ratio: 1.99)      and (max-width: 767px),
  only screen and (   max--moz-device-pixel-ratio: 1.99)      and (max-width: 767px),
  only screen and (     -o-max-device-pixel-ratio: 1.99)    and (max-width: 767px),
  only screen and (        max-device-pixel-ratio: 1.99)      and (max-width: 767px),
  only screen and (                max-resolution: 191dpi) and (max-width: 767px),
  only screen and (                max-resolution: 1.99dppx)  and (max-width: 767px)`,

  SMALL_RETINA: `@media
  only screen and (-webkit-min-device-pixel-ratio: 2)      and (max-width: 767px),
  only screen and (   min--moz-device-pixel-ratio: 2)      and (max-width: 767px),
  only screen and (     -o-min-device-pixel-ratio: 2/1)    and (max-width: 767px),
  only screen and (        min-device-pixel-ratio: 2)      and (max-width: 767px),
  only screen and (                min-resolution: 192dpi) and (max-width: 767px),
  only screen and (                min-resolution: 2dppx)  and (max-width: 767px)`,

  MEDIUM_NON_RETINA_SCREEN: `@media
  only screen and (-webkit-max-device-pixel-ratio: 1.99)      and (min-width: 768px) and (max-width: 1535px),
  only screen and (   max--moz-device-pixel-ratio: 1.99)      and (min-width: 768px) and (max-width: 1535px),
  only screen and (     -o-max-device-pixel-ratio: 1.99)    and (min-width: 768px) and (max-width: 1535px),
  only screen and (        max-device-pixel-ratio: 1.99)      and (min-width: 768px) and (max-width: 1535px),
  only screen and (                max-resolution: 191dpi) and (min-width: 768px) and (max-width: 1535px),
  only screen and (                max-resolution: 1.99dppx)  and (min-width: 768px) and (max-width: 1535px)`,

  MEDIUM_RETINA_AND_LARGE_SCREENS: `@media
  only screen and (-webkit-min-device-pixel-ratio: 2)      and (min-width: 768px),
  only screen and (   min--moz-device-pixel-ratio: 2)      and (min-width: 768px),
  only screen and (     -o-min-device-pixel-ratio: 2/1)    and (min-width: 768px),
  only screen and (        min-device-pixel-ratio: 2)      and (min-width: 768px),
  only screen and (                min-resolution: 192dpi) and (min-width: 768px),
  only screen and (                min-resolution: 2dppx)  and (min-width: 768px),
  only screen and (min-width: 1536px)`,
};

export const HEADER_AND_FOOTER_STYLE = {
  SIMPLE: "Simple (Without navigation)",
  NORMAL: "Normal (With navigation)",
};
