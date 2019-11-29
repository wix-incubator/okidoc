import { Syntax } from './formatType';
import parseMarkdown from './parseMarkdown';

function isPromiseType(type) {
  return type.type === Syntax.NameExpression && type.name === 'Promise';
}

function isArrayType(type) {
  return type.type === Syntax.NameExpression && type.name === 'Array';
}

function getInterfaceByType(type, interfaces) {
  if (type.type === Syntax.NameExpression) {
    return interfaces.find(
      _interface =>
        _interface.name === type.name && _interface.properties.length > 0,
    );
  }
}

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

function parseReturnsComment(returns, interfaces) {
  const returnsType = returns.type;

  if (!returnsType) {
    return {
      params: [returns],
    };
  }

  if (
    returnsType.type === Syntax.TypeApplication &&
    (isPromiseType(returnsType.expression) ||
      isArrayType(returnsType.expression))
  ) {
    const returnsInterface = getInterfaceByType(
      returnsType.applications[0],
      interfaces,
    );

    if (returnsInterface) {
      return {
        applicationType: returns.type,
        params: getParamsFromInterface(returnsInterface),
      };
    }
  }

  const returnsInterface = getInterfaceByType(returnsType, interfaces);

  return {
    params: returnsInterface
      ? getParamsFromInterface(returnsInterface)
      : [returns],
  };
}

export default parseReturnsComment;
