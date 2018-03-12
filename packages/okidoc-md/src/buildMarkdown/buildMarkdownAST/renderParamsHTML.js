import renderHTML, { inlineHTML, cleanupHTML } from './renderHTML';
import formatType, { Syntax } from './formatType';

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

  function renderParamType(param) {
    return inlineHTML(renderHTML(formatType(param.type)));
  }

  return cleanupHTML(`
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
              param.type && !hasType(param, Syntax.UnionType)
                ? hasType(param, Syntax.FunctionType)
                  ? `<code>${renderParamType(param)}</code>`
                  : `<div class="type">${renderParamType(param)}</div>`
                : ''
            }
            ${
              hasDescription(param)
                ? cleanupHTML(renderHTML(param.description))
                : ''
            }
            ${hasType(param, Syntax.UnionType) ? renderParamType(param) : ''}
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
