import { render } from './tmpl';
import { isEmpty, find, filter } from 'lodash';
import { renderDescription, renderParams, renderReturns } from './ast';

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
  const playerClass = find(
    json,
    ({ name, kind }) => name === 'Player' && kind === 'class',
  );

  const interfaces = filter(json, ({ kind }) => kind === 'interface');

  const headingMarkdown = render('heading', {
    data: {
      name: title,
    },
  });
  const apiMethodsMarkdowns = playerClass.members.instance.map(method =>
    renderNodeMarkdown(method, interfaces, 2),
  );

  return [INITIAL_MARKDOWN, headingMarkdown, ...apiMethodsMarkdowns].join('\n');
}
