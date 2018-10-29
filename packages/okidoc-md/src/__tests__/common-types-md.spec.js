import setupFS, { fromFixtures } from '../testUtils/setupFS';
import runCLI from '../cli';

import path from 'path';

describe('with common types', function() {
  const cwd = process.cwd();

  afterEach(() => {
    process.chdir(cwd);
  });

  it('should render doc markdown for common types', async () => {
    const testFS = setupFS(
      fromFixtures(path.join(__dirname, '/fixtures/common-types-md'), [
        'src/types.ts',
        'src/App.ts',
        'src/AppTwo.ts',
        'docs.yml',
      ]),
    );

    process.chdir(testFS.cwd);

    await runCLI({
      configPath: testFS.files['/docs.yml'].path,
      outputDir: testFS.files['/docs'].path,
    });

    const app = testFS.files['/docs/app.md'].content;
    const types = testFS.files['/docs/types.md'].content;

    expect(app.includes('## IRunResult')).toBeFalsy(); // should not have type definition in doc
    expect(types).toMatchSnapshot();
  });

  it('should use common types config if any', async () => {
    const testFS = setupFS(
      fromFixtures(path.join(__dirname, '/fixtures/common-types-md'), [
        'src/types.ts',
        'src/App.ts',
        'src/AppTwo.ts',
        'docs-with-common-types.yml',
      ]),
    );

    process.chdir(testFS.cwd);

    await runCLI({
      configPath: testFS.files['/docs-with-common-types.yml'].path,
      outputDir: testFS.files['/docs'].path,
    });

    const types = testFS.files['/docs/my-types.md'].content;

    expect(types.includes('# My Types')).toBeTruthy();
    expect(types).toMatchSnapshot();
  });

  it('should render doc markdown for common types inside same md for single page documentation', async () => {
    const testFS = setupFS(
      fromFixtures(path.join(__dirname, '/fixtures/common-types-md'), [
        'src/types.ts',
        'src/App.ts',
        'docs-single.yml',
      ]),
    );

    process.chdir(testFS.cwd);

    await runCLI({
      configPath: testFS.files['/docs-single.yml'].path,
      outputDir: testFS.files['/docs'].path,
    });

    expect(
      testFS.files['/docs/app.md'].content.includes('## IRunResult'),
    ).toBeTruthy(); // should have type definition in doc
    expect(testFS.files['/docs/types.md'].exists).toBeFalsy();
  });

  it('should render types inside same md for multiple page documentation if common types config is not set', async () => {
    const testFS = setupFS(
      fromFixtures(path.join(__dirname, '/fixtures/common-types-md'), [
        'src/types.ts',
        'src/App.ts',
        'src/AppTwo.ts',
        'docs-multiple.yml',
      ]),
    );

    process.chdir(testFS.cwd);

    await runCLI({
      configPath: testFS.files['/docs-multiple.yml'].path,
      outputDir: testFS.files['/docs'].path,
    });

    const app = testFS.files['/docs/app.md'].content;
    const appTwo = testFS.files['/docs/app-two.md'].content;

    expect(app.includes('## IRunResult')).toBeTruthy();
    expect(appTwo.includes('## IRunResult')).toBeTruthy();
    expect(testFS.files['/docs/types.md'].exists).toBeFalsy();
  });
});
