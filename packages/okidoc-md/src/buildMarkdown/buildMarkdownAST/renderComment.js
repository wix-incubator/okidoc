import u from 'unist-builder';
import remark from 'remark';
import { API_CLASS_IDENTIFIER } from '../../api';
import renderParamsHTML from './renderParamsHTML';

function parseMarkdown(markdown) {
  return remark().parse(markdown);
}

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
    u('html', renderParamsHTML(comment.params, 'ARGUMENTS'))
  );
}

function renderExamples(comment) {
  return (
    comment.examples.length > 0 &&
    comment.examples.reduce(
      (memo, example) =>
        memo
          .concat(
            example.caption
              ? [u('paragraph', [u('emphasis', example.caption)])]
              : [],
          )
          .concat([u('code', { lang: 'javascript' }, example.description)]),
      [],
    )
  );
}

function renderNotes(comment) {
  const notes = comment.tags.filter(tag => tag.title === 'note');
  return (
    notes.length &&
    notes.reduce(
      (memo, note) =>
        memo.concat([u('blockquote', parseMarkdown(note.description))]),
      [],
    )
  );
}

function renderReturns(comment, interfaces) {
  const returns = comment.returns && comment.returns[0];

  if (!returns) {
    return false;
  }

  const localInterface = interfaces.find(
    ({ name }) => name === returns.type.name,
  );

  const params =
    !localInterface || !localInterface.properties.length
      ? [returns]
      : localInterface.properties.map(property => {
          const tag = localInterface.tags.find(
            tag => tag.title === 'property' && tag.name === property.name,
          );

          return {
            ...property,
            description: tag && parseMarkdown(tag.description),
          };
        });

  return u('html', renderParamsHTML(params, 'RETURN VALUE'));
}

function renderComment(comment, { depth, interfaces }) {
  if (['function', 'member', 'constant', 'var', 'let'].includes(comment.kind)) {
    return renderHeading(comment, depth)
      .concat(renderExamples(comment))
      .concat(renderNotes(comment))
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
