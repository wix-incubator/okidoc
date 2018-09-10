function interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj.default : obj;
}

const NAVIGATION = interopRequireDefault(
  require(process.env.GATSBY_NAVIGATION_PATH),
);
const MD_COMPONENTS = interopRequireDefault(
  require(process.env.GATSBY_MD_COMPONENTS_PATH),
);

export { NAVIGATION, MD_COMPONENTS };
