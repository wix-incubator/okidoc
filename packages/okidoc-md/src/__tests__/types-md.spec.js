import setupFS, { fromFixtures } from '../testUtils/setupFS';
import runCLI from '../cli';

import path from 'path';

describe('with common types', function() {
  const cwd = process.cwd();

  afterEach(() => {
    process.chdir(cwd);
  });

  it('should prevent unused types from being rendered', async () => {
    const testFS = setupFS(
      fromFixtures(path.join(__dirname, '/fixtures/types-md'), [
        'src/types.ts',
        'src/App-with-unused-types.ts',
        'docs-with-unused-types.yml',
      ]),
    );

    process.chdir(testFS.cwd);

    await runCLI({
      configPath: testFS.files['/docs-with-unused-types.yml'].path,
      outputDir: testFS.files['/docs'].path,
    });

    const app = testFS.files['/docs/app.md'].content;
    expect(app.includes('## IRunResult')).toBeFalsy();
    expect(app.includes('## IStartResult')).toBeFalsy();
  });

  it('should render imported types', async () => {
    const testFS = setupFS(
      fromFixtures(path.join(__dirname, '/fixtures/types-md'), [
        'src/types.ts',
        'src/App-with-imported-types.ts',
        'docs-with-imported-types.yml',
      ]),
    );

    process.chdir(testFS.cwd);

    await runCLI({
      configPath: testFS.files['/docs-with-imported-types.yml'].path,
      outputDir: testFS.files['/docs'].path,
    });

    const app = testFS.files['/docs/app.md'].content;
    expect(app.includes('## IRunResult')).toBeTruthy();
    expect(app.includes('## IStartResult')).toBeFalsy();
  });

  it('should render inline types', async () => {
    const testFS = setupFS(
      fromFixtures(path.join(__dirname, '/fixtures/types-md'), [
        'src/types.ts',
        'src/App-with-inline-types.ts',
        'docs-with-inline-types.yml',
      ]),
    );

    process.chdir(testFS.cwd);

    await runCLI({
      configPath: testFS.files['/docs-with-inline-types.yml'].path,
      outputDir: testFS.files['/docs'].path,
    });

    const app = testFS.files['/docs/app.md'].content;
    expect(app.includes('## IRunResult')).toBeFalsy();
    expect(app.includes('## IStartResult')).toBeTruthy();
  });

  it('should render combined types', async () => {
    const testFS = setupFS(
      fromFixtures(path.join(__dirname, '/fixtures/types-md'), [
        'src/types.ts',
        'src/App-with-combined-types.ts',
        'docs-with-combined-types.yml',
      ]),
    );

    process.chdir(testFS.cwd);

    await runCLI({
      configPath: testFS.files['/docs-with-combined-types.yml'].path,
      outputDir: testFS.files['/docs'].path,
    });

    const app = testFS.files['/docs/app.md'].content;
    expect(app.includes('## IRunResult')).toBeTruthy();
    expect(app.includes('## IStartResult')).toBeTruthy();
    expect(app.includes('## IStopResult')).toBeFalsy();
  });
});
