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
          `'${
            location.pathname
          }': invalid file path in md front matter 'include' property`,
        );
      }

      if (!file.childMarkdownRemark) {
        console.error(
          `'${
            location.pathname
          }': invalid file in md front matter 'include' property`,
        );
        return;
      }

      const childMarkdownRemark = file.childMarkdownRemark;

      headings.push(...childMarkdownRemark.headings);
      htmlAst.children.push(...childMarkdownRemark.htmlAst.children);
    });
  }

  return {
    headings,
    htmlAst,
  };
}

export default getPageHeadingsAndHtmlAst;
