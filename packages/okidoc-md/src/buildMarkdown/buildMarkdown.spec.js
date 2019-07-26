import documentation from 'documentation';
import buildMarkdown from './';

function getMarkdown(documentationSource, args) {
  return documentation
    .build([{ source: documentationSource }], { shallow: true })
    .then(comments => buildMarkdown(comments, args));
}

describe('buildMarkdown', () => {
  describe('for class', () => {
    it('should render markdown for class with constructor', async () => {
      const documentationSource = `
      /**
      * Component description
      * 
      * @example
      * new Component({visible: true})
      */
      class Component {
        /**
        * creates new Component
        */ 
        constructor(config: any) {}
      
        /**
        * show
        */
        show() {}
      }
    `;
      const markdown = await getMarkdown(documentationSource);

      expect(markdown).toMatchSnapshot();
    });
  });

  describe('for API class', () => {
    const title = 'API Methods';

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
      const markdown = await getMarkdown(documentationSource, { title });

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
      const markdown = await getMarkdown(documentationSource, { title });

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
      const markdown = await getMarkdown(documentationSource, { title });

      expect(markdown).toMatchSnapshot();
    });

    it('should render markdown for methods with UnionType with literals as @param type', async () => {
      const documentationSource = `
      /** Example class jsdoc */
      class API {
        /**
        * myMethod comment
        * @param y - \`y\` comment
        */
        myMethod(y: 'bla' | 'not bla' | 7 | null) {
          return y;
        }
      }
    `;
      const markdown = await getMarkdown(documentationSource, { title });

      expect(markdown).toMatchSnapshot();
    });

    it('should render markdown for methods with UnionType with NOT literal as @param type', async () => {
      const documentationSource = `
      /** Example class jsdoc */
      class API {
        /**
        * myMethod comment
        * @param y - \`y\` comment
        */
        myMethod(y: number | null) {
          return y;
        }
      }
    `;
      const markdown = await getMarkdown(documentationSource, { title });

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
      const markdown = await getMarkdown(documentationSource, { title });

      expect(markdown).toMatchSnapshot();
    });

    it('should render markdown for methods with @deprecated', async () => {
      const documentationSource = `
      /** Example class jsdoc */
      class API {
        /**
        * show component 
        * @deprecated use method \`show()\`
        */
        doShow() {}
        
        /**
        * show component
        */
        show() {}
      }
    `;
      const markdown = await getMarkdown(documentationSource, { title });

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
      const markdown = await getMarkdown(documentationSource, { title });

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
      const markdown = await getMarkdown(documentationSource, { title });

      expect(markdown).toMatchSnapshot();
    });

    // pending resolution: https://github.com/documentationjs/documentation/issues/1267
    it.skip('should render markdown for interface with optional property', async () => {
      const documentationSource = `
      /** MyResult interface */
      interface MyResult {
        /** */
        a?: string;
      }
      `;
      const markdown = await getMarkdown(documentationSource, { title });

      expect(markdown).toMatchSnapshot();
    });

    // todo
    it.skip('should render markdown for interface with method', async () => {
      const documentationSource = `
        /** */
        interface MyResult {
          /** */
          foo(): string;
        }
        
        /** */
        function bar(): MyResult {}
      `;

      const markdown = await getMarkdown(documentationSource, { title });

      expect(markdown).toMatchSnapshot();
    });

    it('should render markdown for interface with method as arrow function', async () => {
      const documentationSource = `
        /** */
        interface MyResult {
          /** */
          foo: () => string;
        }
        
        /** */
        function bar(): MyResult {}
      `;

      const markdown = await getMarkdown(documentationSource, { title });

      expect(markdown).toMatchSnapshot();
    });

    it('should render markdown for methods interface as return type', async () => {
      const documentationSource = `
     /**
      * MyResult interface
      */
      interface MyResult {
        /** @property a - \`a\` description */
        a: string;
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
      const markdown = await getMarkdown(documentationSource, { title });

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
      const markdown = await getMarkdown(documentationSource, { title });

      expect(markdown).toMatchSnapshot();
    });
  });

  describe('for functions', async () => {
    const title = 'Functions';

    it('should render valid markdown', async () => {
      const documentationSource = `
      /**
      * MyFuncResult interface
      */
      interface MyFuncResult {
        /** @property a - \`a\` description */
        a: string;
        /** @property b - \`b\` description */
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
      const markdown = await getMarkdown(documentationSource, { title });

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
      const markdown = await getMarkdown(documentationSource, { title });

      expect(markdown).toMatchSnapshot();
    });

    it('should render valid markdown with UnionType in TypeApplication as argument', async () => {
      const documentationSource = `
        /**
        * @param fn - event handler 
        */
        function myFunc(fn: (value: string | null) => void) {}
      `;
      const markdown = await getMarkdown(documentationSource, { title });

      expect(markdown).toMatchSnapshot();
    });

    it('should render valid markdown with function as return type', async () => {
      const documentationSource = `
        /**
        * @returns myFunc result function
        */
        function myFunc(): (flag: boolean) => void {}
      `;
      const markdown = await getMarkdown(documentationSource, { title });

      expect(markdown).toMatchSnapshot();
    });

    it('should render valid markdown with function in return type interface', async () => {
      const documentationSource = `
        /** */
        interface MyEntity {
          /** */
          id: string;
          /** */
          title: string;
          /** */
          updateTitle: (id: string, title: string) => Promise<any>;
          /** @property destroy - destroy entity */
          destroy: () => void;
        }
      
        /**
        * create new entity
        * @param title - entity title
        * @returns new entity
        */
        function create(title: string): MyEntity {}
      `;
      const markdown = await getMarkdown(documentationSource, { title });

      expect(markdown).toMatchSnapshot();
    });
  });

  describe('with ApplicationType as return type', () => {
    const title = 'API Methods';

    it('should render markdown for methods with Promise as @returns type', async () => {
      const documentationSource = `
      /**
      * @returns returns comment
      */
      function myFn(): Promise<string> {
        return x;
      }
      `;
      const markdown = await getMarkdown(documentationSource, { title });

      expect(markdown).toMatchSnapshot();
    });

    it('should render markdown for methods with Promise & interface as @returns type', async () => {
      const documentationSource = `
      /** */
      interface IResult {
        /** */
        x: number;
        /** */
        y: number;
      }

      /**
      * @returns returns comment
      */
      function myFn(): Promise<IResult> {
        return {x: 1, y: 1};
      }
      `;
      const markdown = await getMarkdown(documentationSource, { title });

      expect(markdown).toMatchSnapshot();
    });

    it('should render markdown for methods with Array as @returns type', async () => {
      const documentationSource = `
      /**
      * @returns returns comment
      */
      function myFn(): string[] {
        return [''];
      }
      `;
      const markdown = await getMarkdown(documentationSource, { title });

      expect(markdown).toMatchSnapshot();
    });

    it('should render markdown for methods with Array & interface as @returns type', async () => {
      const documentationSource = `
      /** */
      interface IResult {
        /** */
        x: number;
        /** */
        y: number;
      }

      /**
      * @returns returns comment
      */
      function myFn(): IResult[] {
        return [{x: 1, y: 1}];
      }
      `;
      const markdown = await getMarkdown(documentationSource, { title });

      expect(markdown).toMatchSnapshot();
    });
  });
});
