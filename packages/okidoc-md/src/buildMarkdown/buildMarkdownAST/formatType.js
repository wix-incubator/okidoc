import { Syntax } from 'doctrine-temporary-fork';
import u from 'unist-builder';

function t(text) {
  return u('text', text);
}

function c(text) {
  return u('inlineCode', text);
}

function commaList(items, start, end, separator = ', ') {
  let result = [];

  if (start) {
    result.push(t(start));
  }

  items.forEach((item, index) => {
    result = result.concat(formatType(item));

    if (index + 1 !== items.length) {
      result.push(t(separator));
    }
  });

  if (end) {
    result.push(t(end));
  }

  return result;
}

// "inspired" from https://github.com/documentationjs/documentation/blob/v5.4.0/src/output/util/format_type.js#L103

function formatType(node) {
  let result;

  if (!node) {
    return [t('any')];
  }

  switch (node.type) {
    case Syntax.NullableLiteral:
      return [t('?')];
    case Syntax.AllLiteral:
      return [t('any')];
    case Syntax.NullLiteral:
      return [t('null')];
    case Syntax.VoidLiteral:
      return [t('void')];
    case Syntax.UndefinedLiteral:
      return [t('undefined')];
    case Syntax.NameExpression:
      return [t(node.name)];
    case Syntax.ParameterType:
      result = [];

      if (node.name) {
        result.push(c(node.name + ': '));
      }

      return result.concat(formatType(node.expression));

    case Syntax.TypeApplication:
      return formatType(node.expression).concat(
        commaList(node.applications, '<', '>'),
      );
    case Syntax.UnionType:
      return [t('Possible values are ')].concat(
        commaList(node.elements),
        t('.'),
      );
    case Syntax.ArrayType:
      return commaList(node.elements, '[', ']');
    case Syntax.RecordType:
      return commaList(node.fields, '{', '}');

    case Syntax.FieldType:
      if (node.value) {
        return [t(node.key + ': ')].concat(formatType(node.value));
      }
      return [t(node.key)];

    case Syntax.FunctionType:
      result = [t('function (')];

      if (node['this']) {
        if (node['new']) {
          result.push(t('new: '));
        } else {
          result.push(t('this: '));
        }

        result = result.concat(formatType(node['this']));

        if (node.params.length !== 0) {
          result.push(t(', '));
        }
      }

      result = result.concat(commaList(node.params, '', ')'));

      if (node.result) {
        result = result.concat([t(': ')].concat(formatType(node.result)));
      }
      return result;

    case Syntax.RestType:
      // note that here we diverge from doctrine itself, which
      // lets the expression be omitted.
      return [t('...'), formatType(node.expression)];
    case Syntax.OptionalType:
      if (node.default) {
        return [formatType(node.expression), t('?'), t('= ' + c(node.default))];
      }
      return [formatType(node.expression), t('?')];
    case Syntax.NonNullableType:
      return node.prefix
        ? [t('?'), formatType(node.expression)]
        : [formatType(node.expression), t('?')];
    case Syntax.NullableType:
      return [formatType(node.expression), t('?')];
    case Syntax.StringLiteralType:
      return [c(JSON.stringify(node.value))];
    case Syntax.NumericLiteralType:
    case Syntax.BooleanLiteralType:
      return [c(String(node.value))];

    default:
      throw new Error('Unknown type ' + node.type);
  }
}

export { Syntax };

export default formatType;
