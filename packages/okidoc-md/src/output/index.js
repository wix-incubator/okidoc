import { render } from './tmpl';
import { isEmpty, find, filter } from 'lodash';
import { renderDescription, renderParams, renderReturns } from './ast';
import { API_CLASS_IDENTIFIER } from '../api';

const INITIAL_MARKDOWN = `<!-- Generated automatically. Update this documentation by updating the source code. -->\n`;

function renderNodeMarkdown(node, interfaces, depth = 1) {
  const heading = {
    templateName: 'heading',
    data: {
      name: node.name,
      depth,
    },
  };
  const example = {
    templateName: 'example',
    data: node.tags,
  };
  const description = {
    templateName: 'description',
    data: renderDescription(node.description),
  };
  const params = {
    templateName: 'params',
    data: renderParams(node.params),
  };
  const returns = {
    templateName: 'returns',
    data: renderReturns(node.returns, interfaces),
  };

  return [heading, example, description, params, returns].reduce(
    (result, element) => {
      if (isEmpty(element.data)) {
        return result;
      }

      const output = render(element.templateName, { data: element.data });

      return `${result}${output}\n`;
    },
    '',
  );
}

// TODO: refactor next code
export function buildMarkdown({ title, json }) {
  const docClass = find(
    json,
    ({ name, kind }) => name === API_CLASS_IDENTIFIER && kind === 'class',
  );

  const docFunctions = filter(json, ({ kind }) =>
    ['function', 'constant', 'var', 'let'].includes(kind),
  );

  const interfaces = filter(json, ({ kind }) => kind === 'interface');

  const headingMarkdown = render('heading', {
    data: {
      name: title,
    },
  });
  const apiMarkdowns = [...docClass.members.instance, ...docFunctions].map(
    method => renderNodeMarkdown(method, interfaces, 2),
  );

  return [INITIAL_MARKDOWN, headingMarkdown, ...apiMarkdowns].join('\n');
}
