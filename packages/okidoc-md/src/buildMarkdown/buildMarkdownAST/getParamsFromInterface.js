import parseMarkdown from './parseMarkdown';

function getParamsFromInterface(_interface) {
  return _interface.properties.map(property => {
    const tag = _interface.tags.find(
      tag => tag.title === 'property' && tag.name === property.name,
    );

    return {
      ...property,
      description: tag && parseMarkdown(tag.description),
    };
  });
}

export default getParamsFromInterface;
