import {
  renderInlineHTML,
  renderMultilineHTML,
  cleanUpInlineHTML,
  cleanUpMultilineHTML,
} from './renderHTML';
import formatType, { Syntax, commaList } from './formatType';

function renderParamsHTML(params, title) {
  function hasDefault(param) {
    return !!param.default;
  }

  function hasDescription(param) {
    return !!(
      param.description &&
      param.description.children &&
      param.description.children.length
    );
  }

  function hasType(param, type) {
    return !!(param.type && param.type.type === type);
  }

  function isUnionWithLiterals(param) {
    const literalTypes = [
      Syntax.NullLiteral,
      Syntax.UndefinedLiteral,
      Syntax.StringLiteralType,
      Syntax.NumericLiteralType,
      Syntax.BooleanLiteralType,
    ];

    return (
      param.type &&
      param.type.type === Syntax.UnionType &&
      param.type.elements.every(item => literalTypes.includes(item.type))
    );
  }

  function renderParamType(param) {
    return renderInlineHTML(formatType(param.type));
  }

  function renderFunctionParamType(param) {
    return cleanUpInlineHTML(`
      <div class="expandable-type">
        <div class="type">function</div>
        <div class="type-details">
            <code>${renderParamType(param)}</code>
        </div>
      </div>
    `);
  }

  return cleanUpMultilineHTML(`
<div class="method-list">
  <table>
    <thead>
      <tr>
        <th>${title}</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    ${params
      .map(
        param => `
      <tr>
        <td class="param">
          ${param.name ? `<code>${param.name}</code>` : ''}
          ${hasDefault(param) ? `<div class="optional">(Optional)</div>` : ''}
        </td>
        <td>
            ${
              !isUnionWithLiterals(param)
                ? hasType(param, Syntax.FunctionType)
                  ? renderFunctionParamType(param)
                  : `<div class="type">${renderParamType(param)}</div>`
                : ''
            }
            ${
              hasDescription(param)
                ? renderMultilineHTML(param.description)
                : ''
            }
            ${
              isUnionWithLiterals(param)
                ? `Possible values are ${renderInlineHTML(
                    commaList(param.type.elements),
                  )}.`
                : ''
            }
        </td>
      </tr>
    `,
      )
      .join('\n')}
    </tbody>
  </table>
</div>
  `);
}

export default renderParamsHTML;
