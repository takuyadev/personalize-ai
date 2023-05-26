// @desc Filter only leads that have no information
export const checkDanger = (item) => !checkSuccess(item) && !checkWarning(item);

// @desc Filter leads that have dedicated keywords
export const checkSuccess = (item) => item.personalization && item.keywords;

// @desc Filter leads that only haev website URLS
export const checkWarning = (item) =>
  (!item.keywords && (item.website_url || item.linkedin_url)) ||
  (!item.personalization && (item.website_url || item.linkedin_url));
