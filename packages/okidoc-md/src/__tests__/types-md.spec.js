import setupFS, { fromFixtures } from '../testUtils/setupFS';
import runCLI from '../cli';

import path from 'path';

describe('with common types', function() {
  const cwd = process.cwd();

  afterEach(() => {
    process.chdir(cwd);
  });


  it('should not render unused types', async () => {
    const testFS = setupFS(
      fromFixtures(path.join(__dirname, '/fixtures/types-md'), [
        'src/types.ts',
        'src/App-with-unused-types.ts',
        'docs.yml',
      ]),
    );

    process.chdir(testFS.cwd);

    await runCLI({
      configPath: testFS.files['/docs.yml'].path,
      outputDir: testFS.files['/docs'].path,
    });

    const app = testFS.files['/docs/app.md'].content;
    expect(app.includes('## IRunResult')).toBeFalsy();
    expect(app.includes('## IStartResult')).toBeFalsy();
  });

  //
  // it('should not render doc markdown for common types if config is missing', async () => {
  //   const testFS = setupFS(
  //     fromFixtures(path.join(__dirname, '/fixtures/common-types-md'), [
  //       'src/types.ts',
  //       'src/App.ts',
  //       'src/AppTwo.ts',
  //       'docs.yml',
  //     ]),
  //   );
  //
  //   process.chdir(testFS.cwd);
  //
  //   await runCLI({
  //     configPath: testFS.files['/docs.yml'].path,
  //     outputDir: testFS.files['/docs'].path,
  //   });
  //
  //   const app = testFS.files['/docs/app.md'].content;
  //   expect(app.includes('## IRunResult')).toBeTruthy();
  //   expect(testFS.files['/docs/types.md'].exists).toBeFalsy();
  // });
  //
  // it('should use common types config if any', async () => {
  //   const testFS = setupFS(
  //     fromFixtures(path.join(__dirname, '/fixtures/common-types-md'), [
  //       'src/types.ts',
  //       'src/App.ts',
  //       'src/AppTwo.ts',
  //       'docs-with-common-types.yml',
  //     ]),
  //   );
  //
  //   process.chdir(testFS.cwd);
  //
  //   await runCLI({
  //     configPath: testFS.files['/docs-with-common-types.yml'].path,
  //     outputDir: testFS.files['/docs'].path,
  //   });
  //
  //   const types = testFS.files['/docs/my-types.md'].content;
  //
  //   expect(types.includes('# My Types')).toBeTruthy();
  //   expect(types).toMatchSnapshot();
  // });
  //
  // it('should render doc markdown for common types inside same md for single page documentation', async () => {
  //   const testFS = setupFS(
  //     fromFixtures(path.join(__dirname, '/fixtures/common-types-md'), [
  //       'src/types.ts',
  //       'src/App.ts',
  //       'docs-single.yml',
  //     ]),
  //   );
  //
  //   process.chdir(testFS.cwd);
  //
  //   await runCLI({
  //     configPath: testFS.files['/docs-single.yml'].path,
  //     outputDir: testFS.files['/docs'].path,
  //   });
  //
  //   expect(
  //     testFS.files['/docs/app.md'].content.includes('## IRunResult'),
  //   ).toBeTruthy(); // should have type definition in doc
  //   expect(testFS.files['/docs/types.md'].exists).toBeFalsy();
  // });
  //
  // it('should render types inside same md for multiple page documentation if common types config is not set', async () => {
  //   const testFS = setupFS(
  //     fromFixtures(path.join(__dirname, '/fixtures/common-types-md'), [
  //       'src/types.ts',
  //       'src/App.ts',
  //       'src/AppTwo.ts',
  //       'docs-multiple.yml',
  //     ]),
  //   );
  //
  //   process.chdir(testFS.cwd);
  //
  //   await runCLI({
  //     configPath: testFS.files['/docs-multiple.yml'].path,
  //     outputDir: testFS.files['/docs'].path,
  //   });
  //
  //   const app = testFS.files['/docs/app.md'].content;
  //   const appTwo = testFS.files['/docs/app-two.md'].content;
  //
  //   expect(app.includes('## IRunResult')).toBeTruthy();
  //   expect(appTwo.includes('## IRunResult')).toBeTruthy();
  //   expect(testFS.files['/docs/types.md'].exists).toBeFalsy();
  // });
  //
  // it('should render types if interface was defined in the same file with class', async () => {
  //   const testFS = setupFS(
  //     fromFixtures(path.join(__dirname, '/fixtures/common-types-md'), [
  //       'src/AppThree.ts',
  //       'docs-with-inline-interface.yml',
  //     ]),
  //   );
  //
  //   process.chdir(testFS.cwd);
  //
  //   await runCLI({
  //     configPath: testFS.files['/docs-with-inline-interface.yml'].path,
  //     outputDir: testFS.files['/docs'].path,
  //   });
  //
  //   const appThree = testFS.files['/docs/app-three.md'].content;
  //   expect(appThree.includes('## IRunResult')).toBeTruthy();
  //   expect(appThree.includes('## IStartResult')).toBeFalsy();
  // });
});
