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

  // FIXME: update markdown renderer for class as return type #75
  it('should not fail when faced with `new` in type declaration, issue #59', async function() {
    const sourceCode = `
      interface ClockConstructor {
        new (hour: number, minute: number): any;
        tick(): string;
      }
      
      interface ClockInterface {
        tick(): any;
      }
      
      /**
      * get clock class
      * @note TODO: update markdown renderer #59
      * @returns clock class
      * @doc UI
      */
      function getClockClass(): ClockConstructor {
        class Clock implements ClockInterface {
          constructor(h: number, m: number) {}
          tick() {
              console.log("beep beep");
          }
        }
        
        return Clock;
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

  // TODO: allow jsx in next major version #69
  it.skip('should support jsx syntax', async function() {
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

  it('should ignore generic constraints', async () => {
    const sourceCode = `
      /**
      * @doc UI
      */
      function fooGood<T extends string>(obj: T): T {}
    `;

    expect(
      await buildDocumentation({
        source: sourceCode,
        tag: 'UI',
        title: 'Documentation',
      }),
    ).toMatchSnapshot();
  });

  it('should handle conditional types', async () => {
    const sourceCode = `
      /**
      * @doc UI
      */
      function fooGood<T>(obj: T extends string ? boolean : number): T {}
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
    const sourceCode = `
      /**
      * @doc UI
      */
      function fooGood<T>(obj T): T {}
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
