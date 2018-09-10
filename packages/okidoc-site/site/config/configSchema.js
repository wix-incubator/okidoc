const Joi = require('joi');

const navigationItemSchema = Joi.object({
  path: Joi.string().when('items', {
    is: Joi.array().min(1),
    otherwise: Joi.string().required(),
  }),
  title: Joi.string().required(),
  items: Joi.array().items(Joi.lazy(() => navigationItemSchema)),
});

const configSchema = {
  docsPath: Joi.string().required(),
  distPath: Joi.string(),
  config: Joi.object({
    siteMetadata: Joi.object(),
    pathPrefix: Joi.string(),
    algoliaApiKey: Joi.string(),
    algoliaIndexName: Joi.string(),
    githubLink: Joi.string(),
  }),
  mdComponents: Joi.object({
    path: Joi.string().required(),
    externalStyles: Joi.array().items(Joi.string()),
    externalScripts: Joi.array().items(Joi.string()),
  }),
  navigation: Joi.alternatives().try(
    Joi.string(),
    Joi.array().items(navigationItemSchema),
  ),
};

module.exports = configSchema;
