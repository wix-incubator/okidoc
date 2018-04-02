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
        * @note
        * \`myMethod\` note 1
        *
        * @example <caption>test example caption</caption>
        * console.log('example')
        *
        * @example
        * console.log('example')
        *
        * @note
        * \`myMethod\` note 2
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

    it('should render markdown for methods with `optional` as param', async () => {
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

    it('should render valid markdown with function as argument', async () => {
      const documentationSource = `
        /**
        * @param name - event name 
        * @param fn - event handler 
        */
        function myFunc(name: string, fn: (name: string, data: Object) => any) {}
      `;
      const markdown = await documentation
        .build([{ source: documentationSource }], { shallow: true })
        .then(comments => buildMarkdown(comments, { title: 'Functions' }));

      expect(markdown).toMatchSnapshot();
    });

    it('should render valid markdown with function as return type', async () => {
      const documentationSource = `
        /**
        * @returns myFunc result function
        */
        function myFunc(): (flag: boolean) => void {}
      `;
      const markdown = await documentation
        .build([{ source: documentationSource }], { shallow: true })
        .then(comments => buildMarkdown(comments, { title: 'Functions' }));

      expect(markdown).toMatchSnapshot();
    });

    it('should render valid markdown with function in return type interface', async () => {
      const documentationSource = `
        /**
        * @property update - update entity
        * @property destroy - destroy entity
        */
        interface MyEntity {
          id: string;
          title: string;
          updateTitle(id: string, title: string): Promise<any>;
          destroy(): void;
        }
      
        /**
        * create new entity
        * @param title - entity title
        * @returns new entity
        */
        function create(title: string): MyEntity {}
      `;
      const markdown = await documentation
        .build([{ source: documentationSource }], { shallow: true })
        .then(comments => buildMarkdown(comments, { title: 'Functions' }));

      expect(markdown).toMatchSnapshot();
    });
  });
});
