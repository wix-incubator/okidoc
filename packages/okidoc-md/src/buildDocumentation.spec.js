import buildDocumentation from './buildDocumentation';

// TODO: move to __tests__ dir, run with cli via setupFS test utils

describe('buildDocumentation', () => {
  it('should build documentation for class ', async () => {
    const sourceCode = `
      /**
      * @doc UI
      */
      class C1 {
        m1() {}
      }
      
      /**
      * @doc UI
      */
      export class C2 {
        m2() {}
      }
      
      /**
      * @doc UI
      */
      export default class C3 {
        m3() {}
      }
    `;

    expect(
      await buildDocumentation({
        source: sourceCode,
        tag: 'UI',
        title: 'Documentation',
      }),
    ).toMatchSnapshot();
  });

  it('should build documentation for functions ', async () => {
    const sourceCode = `
      /**
      * @doc UI
      */
      function functionDeclaration() {}
      
      /**
      * @doc UI
      */
      var varFunctionExpression = function () {}
      
      /**
      * @doc UI
      */
      let letFunctionExpression = function () {}

      /**
      * @doc UI
      */
      const constFunctionExpression = function () {}
      
      /**
      * @doc UI
      */
      const constArrowFunction = () => {}
      
      /**
      * @doc UI
      */
      export const exportConstArrowFunction = () => {}
      
      /**
      * @doc UI
      */
      export default exportDefaultConstArrowFunction = () => {}
    `;

    expect(
      await buildDocumentation({
        source: sourceCode,
        tag: 'UI',
        title: 'Documentation',
      }),
    ).toMatchSnapshot();
  });

  it('should show readable error from `documentation.js`', async () => {
    // NOTE: https://github.com/niieani/typescript-vs-flowtype#bounded-polymorphism
    const sourceCode = `
      /**
      * @doc UI
      */
      function fooGood<T extends { x: number }>(obj: T): T {}
    `;

    expect.assertions(1);

    try {
      await buildDocumentation({
        source: sourceCode,
        tag: 'UI',
        title: 'Documentation',
      });
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});
