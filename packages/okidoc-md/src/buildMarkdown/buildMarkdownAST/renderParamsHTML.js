import {
  renderInlineHTML,
  renderMultilineHTML,
  cleanUpMultilineHTML,
} from './renderHTML';
import formatType, { Syntax, commaList } from './formatType';

function renderParamsHTML(params, { title, applicationType }) {
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

  function renderType(type) {
    return renderInlineHTML(formatType(type));
  }

  // TODO: render destruction/rest/.. correctly https://github.com/documentationjs/documentation/blob/v6.2.0/__tests__/fixture/es6.output-toc.md

  return cleanUpMultilineHTML(`
<div class="method-list">
  <table>
    <thead>
      <tr>
        <th class="title">${title}</th>
        <th>${
          applicationType
            ? `<div class="type">${renderType(applicationType)}</div>`
            : ''
        }</th>
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
                  ? `<code class="function-type">${renderType(
                      param.type,
                    )}</code>`
                  : `<div class="type">${renderType(param.type)}</div>`
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
