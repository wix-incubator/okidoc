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

function renderComment(comment, { depth, interfaces }) {
  // TODO: add render logic for 'var', 'let', 'constant', 'interface', etc

  if (['function', 'member'].includes(comment.kind)) {
    return renderHeading(comment, depth)
      .concat(renderExamplesAndNotes(comment))
      .concat(comment.description ? comment.description.children : [])
      .concat(renderSeeLink(comment))
      .concat(renderParams(comment))
      .concat(renderReturns(comment, interfaces))
      .filter(Boolean);
  }

  if (
    comment.name === API_CLASS_IDENTIFIER &&
    comment.kind === 'class' &&
    !!comment.members.instance.length
  ) {
    return comment.members.instance.reduce(
      (memo, child) =>
        memo.concat(
          renderComment(child, {
            depth: depth,
            interfaces: interfaces,
          }),
        ),
      [],
    );
  }

  return [];
}

export default renderComment;
