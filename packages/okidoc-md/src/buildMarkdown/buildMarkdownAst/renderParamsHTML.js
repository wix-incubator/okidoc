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

  function hasUnionType(param) {
    return !!(param.type && param.type.type === Syntax.UnionType);
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
          ${
            param.type && !hasUnionType(param)
              ? `<div class="type">${renderParamType(param)}</div>`
              : ''
          }
        </td>
        <td>
            ${
              hasDescription(param)
                ? cleanupHTML(renderHTML(param.description))
                : ''
            }
            ${hasUnionType(param) ? renderParamType(param) : ''}
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
