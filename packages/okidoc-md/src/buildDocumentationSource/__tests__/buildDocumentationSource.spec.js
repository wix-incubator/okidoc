import path from 'path';
import buildDocumentationSource from '../';

describe('buildDocumentationSource', () => {
  describe('for API class', () => {
    describe('with @doc tag on class members', () => {
      it('should extract methods with tag', () => {
        const sourceCode = `
      class MyComponent {
        /**
         * show
         *
         * @doc UI
         * @example
         * component.show()
         */
        show() {
          console.log('show');
        }
      
        /**
         * Disable
         */
        disable() {
            console.log('disable');
        }
      }`;

        expect(
          buildDocumentationSource({
            source: sourceCode,
            tag: 'UI',
          }),
        ).toMatchSnapshot();
      });

      it('should extract getters and setters with tag', () => {
        const sourceCode = `
      class MyComponent {
        /**
        * node getter
        */
        get node() {}

        /**
         * \`width\` getter
         *
         * @doc UI
         */
        get width() {
          console.log('get width');
        }
        
        /**
         * \`width\` setter
         *
         * @doc UI
         */
        set width(value) {
          console.log('set width', value);
        }
      }`;

        expect(
          buildDocumentationSource({
            source: sourceCode,
            tag: 'UI',
          }),
        ).toMatchSnapshot();
      });

      it('should ignore private methods with tag', () => {
        const sourceCode = `
      class MyComponent {
        /**
         * init
         *
         * @doc UI
         */
        private init() {
          console.log('init');
        }
      }`;

        expect(
          buildDocumentationSource({
            source: sourceCode,
            tag: 'UI',
          }),
        ).toMatchSnapshot();
      });

      it('should ignore methods with different tag', () => {
        const sourceCode = `
      class MyComponent {
        /**
         * show
         *
         * @doc UI
         */
        show() {
          console.log('show');
        }
      
        /**
         * disable
         *
         * @doc Destroy
         */
        destroy() {
            console.log('destroy');
        }
      }`;

        expect(
          buildDocumentationSource({
            source: sourceCode,
            tag: 'UI',
          }),
        ).toMatchSnapshot();
      });
    });

    describe('with @doc tag on class declaration', () => {
      it('should extract class members', () => {
        const sourceCode = `
      /**
      * @doc UI
      */
      class MyComponent {
        /**
        * \`isHidden\` getter
        */
        get isHidden() {}

        /**
         * show
         */
        show() {
          console.log('show');
        }
      
        /**
         * hide
         */
        hide() {
          console.log('hide');
        }
        
        disable() {
          console.log('hide');
        }
      }`;

        expect(
          buildDocumentationSource({
            source: sourceCode,
            tag: 'UI',
          }),
        ).toMatchSnapshot();
      });

      it('should ignore class constructor and private members', () => {
        const sourceCode = `
      /**
      * @doc UI
      */
      class MyComponent {
        constructor()
      
        /**
        * init
        */
        private init() {}
      
        render() {
          console.log('render');
        }
      }`;

        expect(
          buildDocumentationSource({
            source: sourceCode,
            tag: 'UI',
          }),
        ).toMatchSnapshot();
      });
    });

    describe('with custom visitor', () => {
      it('should extract class members', () => {
        const sourceCode = `
        function api() {}
        
        class MyComponent {
          @api()
          get isHidden() {}
  
          /**
           * show
           */
          @api()
          show() {
            console.log('show');
          }
        
          /**
           * hide
           */
          @api()
          hide() {
            console.log('hide');
          }
          
          disable() {
            console.log('hide');
          }
        }`;

        expect(
          buildDocumentationSource({
            source: sourceCode,
            visitor: require.resolve('./fixtures/customApiVisitor.js'),
          }),
        ).toMatchSnapshot();
      });
    });
  });

  describe('for functions', () => {
    describe('with @doc tag on function declaration', () => {
      it('should extract functions with tag', () => {
        const sourceCode = `
      /**
       * initComponent
       */
      function initComponent() {
        console.log('initComponent');
      }

      /**
       * showComponent
       *
       * @doc UI
       */
      function showComponent() {
        console.log('showComponent');
      }
      
      /**
       * hideComponent
       *
       * @doc UI
       */
      function hideComponent() {
        console.log('hideComponent');
      }
      `;

        expect(
          buildDocumentationSource({
            source: sourceCode,
            tag: 'UI',
          }),
        ).toMatchSnapshot();
      });
    });

    describe('with @doc tag on var/let/const declaration', () => {
      it('should extract functions with tag', () => {
        const sourceCode = `
      /**
       * funcToIgnore
       */
      var funcToIgnore = function () {
        console.log('funcToIgnore');
      }

      /**
       * varFunc
       * @doc UI
       */
      var varFunc = function () {
        console.log('varFunc');
      }
      
      /**
       * varArrowFunc
       * @doc UI
       */
      var varArrowFunc = () => {
        console.log('varArrowFunc');
      }

      /**
       * letArrowFunc
       * @doc UI
       */
      let letArrowFunc = () => {
        console.log('letArrowFunc');
      }
      
      /**
       * constArrowFunc
       * @doc UI
       */
      const constArrowFunc = () => {
        console.log('constArrowFunc');
      }
      `;

        expect(
          buildDocumentationSource({
            source: sourceCode,
            tag: 'UI',
          }),
        ).toMatchSnapshot();
      });
    });
  });

  describe('by source entry', () => {
    it('should extract documentation source from entry dependencies', () => {
      expect(
        buildDocumentationSource({
          entry: require.resolve('./fixtures/src/index.ts'),
          tag: 'UI',
        }),
      ).toMatchSnapshot();

      expect(
        buildDocumentationSource({
          entry: require.resolve('./fixtures/src/index.ts'),
          tag: 'Events',
        }),
      ).toMatchSnapshot();
    });
  });

  describe('by source glob pattern', () => {
    it('should extract documentation source from files matched glob', () => {
      expect(
        buildDocumentationSource({
          pattern: `${path.join(__dirname, 'fixtures/src')}/**/*.ts`,
          tag: 'UI',
        }),
      ).toMatchSnapshot();

      expect(
        buildDocumentationSource({
          pattern: `${path.join(__dirname, 'fixtures/src')}/**/*.ts`,
          tag: 'utils',
        }),
      ).toMatchSnapshot();
    });
  });
});
