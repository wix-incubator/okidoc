/*global __PREFIX_PATHS__ */

const PATH_PREFIX =
  typeof __PREFIX_PATHS__ !== 'undefined' && __PREFIX_PATHS__
    ? __PREFIX_PATHS__
    : '';

const EXAMPLE_PATH_PATTERN = /^\/?examples\//;

function getDemoEmbedLink(href) {
  if (!href) {
    return;
  }

  if (href.includes('jsfiddle')) {
    return href + 'embedded/result,js/dark/';
  }

  if (PATH_PREFIX) {
    if (href.indexOf(PATH_PREFIX) !== 0) {
      return;
    }

    href = href.replace(PATH_PREFIX, '');
  }

  if (EXAMPLE_PATH_PATTERN.test(href)) {
    return href;
  }
}

export default getDemoEmbedLink;
