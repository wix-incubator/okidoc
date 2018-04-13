import u from 'unist-builder';
import { API_CLASS_IDENTIFIER } from '../../api';
import parseMarkdown from './parseMarkdown';
import parseReturnsComment from './parseReturnsComment';
import renderParamsHTML from './renderParamsHTML';

function renderHeading(comment, depth) {
  return (
    !!comment.name && [
      u('heading', { depth }, [
        u(
          'text',
          comment.kind === 'function' ? `${comment.name}()` : comment.name,
        ),
      ]),
    ]
  );
}

function renderDescription(comment) {
  return !!comment.description && comment.description.children;
}

function renderSeeLink(comment) {
  return (
    comment.sees.length > 0 &&
    u(
      'list',
      { ordered: false },
      comment.sees.map(see =>
        u('listItem', [
          u('strong', [u('text', 'See Also ')].concat(see.children)),
        ]),
      ),
    )
  );
}

function renderConstructor(comment) {
  if (!comment.constructorComment) {
    return false;
  }

  const constructorComment = comment.constructorComment;
  // TODO: decide which params to render.
  const paramsToRender = constructorComment.params.length
    ? constructorComment.params
    : comment.params;

  return (
    !!constructorComment &&
    [u('inlineCode', `new ${comment.name}()`)]
      .concat(renderDescription(constructorComment))
      .concat(
        paramsToRender.length > 0 &&
          u(
            'html',
            renderParamsHTML(paramsToRender, {
              title: 'ARGUMENTS',
            }),
          ),
      )
  );
}

function renderParams(comment) {
  return (
    comment.params.length > 0 &&
    u('html', renderParamsHTML(comment.params, { title: 'ARGUMENTS' }))
  );
}

function renderExamplesAndNotes(comment) {
  return (
    comment.tags.length > 0 &&
    comment.tags.reduce((memo, tag) => {
      if (tag.title === 'example') {
        const exampleCaption = tag.caption;
        const exampleCode = tag.description;

        return memo.concat(
          exampleCaption
            ? [
                u('blockquote', parseMarkdown(exampleCaption)),
                u('code', { lang: 'javascript' }, exampleCode),
              ]
            : [u('code', { lang: 'javascript' }, exampleCode)],
        );
      }

      if (tag.title === 'note') {
        return memo.concat([u('blockquote', parseMarkdown(tag.description))]);
      }

      return memo;
    }, [])
  );
}

function renderDeprecated(comment) {
  return (
    !!comment.deprecated &&
    [u('text', u('strong', 'DEPRECATED!'))].concat(comment.deprecated.children)
  );
}

function renderReturns(comment, interfaces) {
  const returns = comment.returns && comment.returns[0];

  if (!returns) {
    return false;
  }

  const { applicationType, params } = parseReturnsComment(returns, interfaces);

  return u(
    'html',
    renderParamsHTML(params, {
      title: 'RETURN VALUE',
      applicationType: applicationType,
    }),
  );
}

function renderClassMembers(comment, { depth, interfaces }) {
  return comment.members.instance.reduce(
    (memo, child) => memo.concat(renderComment(child, { depth, interfaces })),
    [],
  );
}

function renderComment(comment, { depth, interfaces }) {
  // TODO: add render logic for 'var', 'let', 'constant', 'interface', etc

  if (['function', 'member'].includes(comment.kind)) {
    return renderHeading(comment, depth)
      .concat(renderExamplesAndNotes(comment))
      .concat(renderDeprecated(comment))
      .concat(renderDescription(comment))
      .concat(renderSeeLink(comment))
      .concat(renderParams(comment))
      .concat(renderReturns(comment, interfaces))
      .filter(Boolean);
  }

  if (comment.kind === 'class') {
    if (
      comment.name === API_CLASS_IDENTIFIER &&
      !!comment.members.instance.length
    ) {
      return renderClassMembers(comment, {
        depth: depth,
        interfaces: interfaces,
      });
    }

    return renderHeading(comment, depth)
      .concat(renderExamplesAndNotes(comment))
      .concat(renderDescription(comment))
      .concat(renderSeeLink(comment))
      .concat(renderConstructor(comment))
      .concat(
        renderClassMembers(comment, {
          depth: depth + 1,
          interfaces: interfaces,
        }),
      )
      .filter(Boolean);
  }

  return [];
}

export default renderComment;
