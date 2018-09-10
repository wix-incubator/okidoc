import visit from 'unist-util-visit';
import Slugger from 'github-slugger';

const HEADING_TAG_PATTERN = /^h[1-6]$/;

function fixHeadingLinks(htmlAst) {
  const slugger = new Slugger();

  visit(htmlAst, 'element', element => {
    if (HEADING_TAG_PATTERN.test(element.tagName)) {
      const id = element.properties.id;
      const slug = slugger.slug(id);

      if (id !== slug) {
        element.properties.id = slug;
        element.children.forEach(child => {
          if (child.type === 'element' && child.tagName === 'a') {
            child.properties.href = `#${slug}`;
          }
        });
      }
    }
  });
}

function getPageHeadingsAndHtmlAst(page) {
  const headings = [...page.headings];
  const htmlAst = {
    type: 'root',
    children: [...page.htmlAst.children],
  };

  const includes = page.frontmatter && page.frontmatter.include;

  if (includes && includes.length) {
    includes.forEach(file => {
      if (!file) {
        console.error(
          `Invalid file path in md front matter 'include' property`,
          page,
        );
      }

      if (!file.childMarkdownRemark) {
        console.error(
          `Invalid file in md front matter 'include' property`,
          page,
        );
        return;
      }

      const childMarkdownRemark = file.childMarkdownRemark;

      headings.push(...childMarkdownRemark.headings);
      htmlAst.children.push(...childMarkdownRemark.htmlAst.children);
    });

    // NOTE: fix heading link after joining md includes
    fixHeadingLinks(htmlAst);
  }

  return {
    headings,
    htmlAst,
  };
}

export default getPageHeadingsAndHtmlAst;
