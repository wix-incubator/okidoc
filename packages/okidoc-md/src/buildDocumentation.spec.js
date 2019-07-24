import buildDocumentation from './buildDocumentation';

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

  // waiting for @babel/generator fix deployed and published: https://github.com/babel/babel/pull/10258
  it.skip('should support class static interface', async function() {
    const sourceCode = `
      interface ClockConstructor {
        new (hour: number, minute: number): any;
        test(): string;
      }
      
      interface ClockInterface {
        tick(): any;
      }
      
      const Clock: ClockConstructor = class Clock implements ClockInterface {
        static test() { return 'string'; }
        constructor(h: number, m: number) {}
        tick() {
            console.log("beep beep");
        }
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

  it('should support jsx syntax', async function() {
    const sourceCode = `
      /**
       * @doc UI
       */
      class MyComponent extends React.Component {
        /**
         * Say Hello
         */
        sayHello() {
          
        }
        
        render() {
          return <div>hello</div>
        }
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

  it('should handle optional method in interface, issue #66', async () => {
    const sourceCode = `
      interface IRootContainerAPI {
        getWidth?(): number;
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
