import documentation from 'documentation';
import buildMarkdown from './';

function getMarkdown(documentationSource, title) {
  return documentation
    .build([{ source: documentationSource }], { shallow: true })
    .then(comments => buildMarkdown(comments, { title: title }));
}

describe('buildMarkdown', () => {
  describe('for API class', () => {
    it('should render markdown for getters/setters', async () => {
      const documentationSource = `
      /** Example class jsdoc */
      class API {
        /**
        * \`isVisible\` getter comment
        */
        get isVisible(): boolean {
            return true;
        }
        
        /**
        * \`width\` setter comment
        */
        set width(value: number) {
            console.log(value)
        }
      }
    `;
      const markdown = await getMarkdown(documentationSource, 'API Methods');

      expect(markdown).toMatchSnapshot();
    });

    it('should render markdown for methods default value', async () => {
      const documentationSource = `
      /** Example class jsdoc */
      class API {
        /**
        * myMethod comment
        * @param [x=''] - \`x\` description 
        * 
        */
        myMethod(x: string) {}
      }
    `;
      const markdown = await getMarkdown(documentationSource, 'API Methods');

      expect(markdown).toMatchSnapshot();
    });

    it('should render markdown for methods with @returns comment', async () => {
      const documentationSource = `
      /** Example class jsdoc */
      class API {
        /**
        * myMethod comment
        * @param x - \`x\` description 
        * 
        * @returns returns comment
        */
        myMethod(x: string): string {
          return x;
        }
      }
    `;
      const markdown = await getMarkdown(documentationSource, 'API Methods');

      expect(markdown).toMatchSnapshot();
    });

    it('should render markdown for methods with union as @param type', async () => {
      const documentationSource = `
      /** Example class jsdoc */
      class API {
        /**
        * myMethod comment
        * @param y - \`y\` comment
        */
        myMethod(y: 'bla' | 'not bla'): string {
          return y;
        }
      }
    `;
      const markdown = await getMarkdown(documentationSource, 'API Methods');

      expect(markdown).toMatchSnapshot();
    });

    it('should render markdown for methods with @example end @note', async () => {
      const documentationSource = `
      /** Example class jsdoc */
      class API {
        /**
        * myMethod comment
        * @param x - \`x\` description. see http://example.com
        * 
        * @example <caption>test example caption</caption>
        * console.log('example')
        *
        * @example
        * console.log('example')
        *
        * @note
        * \`myMethod\` note 
        * Read more about [myMethod](/my-method)
        *
        */
        myMethod(x: string): string {
          return x;
        }
      }
    `;
      const markdown = await getMarkdown(documentationSource, 'API Methods');

      expect(markdown).toMatchSnapshot();
    });

    it('should render markdown for methods with `...rest` as param', async () => {
      const documentationSource = `
      /** Example class jsdoc */
      class API {
        /**
        * myMethod comment
        */
        myMethod(...arr: string[]): string[] {
          return arr;
        }
      }
    `;
      const markdown = await getMarkdown(documentationSource, 'API Methods');

      expect(markdown).toMatchSnapshot();
    });

    it.only('should render markdown for methods with `optional` as param', async () => {
      const documentationSource = `
      /** Example class jsdoc */
      class API {
        /**
        * myMethod comment
        */
        myMethod(x: ?number): number {
          return number;
        }
      }
    `;
      const markdown = await getMarkdown(documentationSource, 'API Methods');

      expect(markdown).toMatchSnapshot();
    });

    it('should render markdown for methods interface as return type', async () => {
      const documentationSource = `
     /**
      * MyResult interface
      * @property a - \`a\` description
      * @property b - \`b\` description
      */
      interface MyResult {
        a: string;
        b?: number;
      }

      /** Example class jsdoc */
      class API {
        /**
        * myMethod comment
        * @param y - \`y\` comment
        */
        myMethod(y: 'bla' | 'not bla'): MyResult {
          return y;
        }
      }
    `;
      const markdown = await getMarkdown(documentationSource, 'API Methods');

      expect(markdown).toMatchSnapshot();
    });

    it('should render markdown sections in valid order', async () => {
      const documentationSource = `
      /** Example class jsdoc */
      class API {
        /**
        * myMethod1 comment
        * @param x - \`x\` description
        * 
        * @example <caption>test example caption</caption>
        * console.log('example')
        * @note
        * \`myMethod1\` note 
        * Read more about [myMethod](/my-method)
        *
        * @returns returns comment
        */
        myMethod1(x: string): string {
          return x;
        }
        
        /**
        * myMethod2 comment
        * @param y - y comment
        * 
        * @example
        * console.log('example')
        */
        myMethod2(y: 'bla' | 'not bla'): string {
          return y;
        }
      }
    `;
      const markdown = await getMarkdown(documentationSource, 'API Methods');

      expect(markdown).toMatchSnapshot();
    });
  });

  describe('for functions', async () => {
    it('should render valid markdown', async () => {
      const documentationSource = `
      /**
      * MyFuncResult interface
      * @property a - \`a\` description
      * @property b - \`b\` description
      */
      interface MyFuncResult {
        a: string;
        b: number;
      }

      /**
      * myFunc1 description
      * @param x - \`x\` description 
      */
      function myFunc1(x: number): number {}

      /**
      * myFunc2 description
      * @param x - \`x\` description 
      * @param y - \`y\` description
      *
      * @example <caption>MyFunc example</caption>
      * 
      * console.log(myFunc(3, 2))
      * // {a: '3', b: 2}
      */
      function myFunc2(x: number, y:number): MyFuncResult {}
    `;
      const markdown = await documentation
        .build([{ source: documentationSource }], { shallow: true })
        .then(comments => buildMarkdown(comments, { title: 'Functions' }));

      expect(markdown).toMatchSnapshot();
    });
  });

  describe('for functions via var/let/const', async () => {
    it('should render valid markdown', async () => {
      const documentationSource = `
      /**
       * MyFuncResult interface
       * @property a - \`a\` description
       * @property b - \`b\` description
       */
      interface MyFuncResult {
        a: string;
        b: number;
      }
      
      /**
       * myConstFunc description
       *
       * @example
       *
       * myConstFuncFunc()
       */
      const myConstFunc = function() {}
      
      /**
       * myVarArrowFunc description
       * @param x - \`x\` description
       */
      var myVarArrowFunc = (x: number): number => {}
      
      /**
       * myLetArrowFunc description
       * @param x - \`x\` description
       * @param y - \`y\` description
       *
       * @example <caption>MyFunc example</caption>
       *
       * console.log(myFunc(3, 2))
       * // {a: '3', b: 2}
       */
      let myLetArrowFunc = (x: number, y: number): MyFuncResult => {}
      
      /**
       * myConstArrowFunc description
       *
       * @example
       *
       * myConstArrowFunc()
       */
      const myConstArrowFunc = () => {}
    `;
      const markdown = await documentation
        .build([{ source: documentationSource }], { shallow: true })
        .then(comments => buildMarkdown(comments, { title: 'Functions' }));

      expect(markdown).toMatchSnapshot();
    });
  });
});
