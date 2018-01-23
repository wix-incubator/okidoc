import { isString, isEmpty, map, get, has, find } from 'lodash';

export function renderDescription(node) {
  if (isString(node)) {
    return node;
  }

  if (isEmpty(node)) {
    return '';
  }

  if (['text'].includes(node.type)) {
    return node.value;
  }

  if (['inlineCode'].includes(node.type)) {
    return `<code>${node.value}</code>`;
  }

  return map(node.children, children => renderDescription(children)).join('');
}

export function renderPossibleValues(param) {
  if (!has(param.type, 'elements')) {
    return '';
  }

  const possibleValues = map(
    param.type.elements,
    element => `<code>${element.value}</code>`,
  ).join(', ');

  return ` Possible values are ${possibleValues}.`;
}

export function renderParams(params) {
  if (isEmpty(params)) {
    return null;
  }

  return map(params, param => {
    return {
      name: param.name,
      type: get(param.type, 'name'),
      description:
        renderDescription(param.description) + renderPossibleValues(param),
    };
  });
}

export function renderReturns(returns, interfaces) {
  if (isEmpty(returns)) {
    return null;
  }

  const returnName = returns[0].type.name;
  const localInterface = find(interfaces, ({ name }) => name === returnName);

  if (!localInterface) {
    return;
  }

  const properties = map(localInterface.properties, property => {
    const tag = find(localInterface.tags, ({ name }) => name === property.name);

    return {
      ...property,
      description: get(tag, 'description'),
    };
  });

  return renderParams(properties);
}
