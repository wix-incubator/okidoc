const expect = require('expect-puppeteer');
const serverEnvironment = require('./serverEnvironment');

describe.only('site', function() {
  beforeAll(async () => {
    await serverEnvironment.setup();
  });

  afterAll(async () => {
    await serverEnvironment.teardown();
  });

  it('should work', async () => {
    await page.goto('http://localhost:8000');

    await expect(page).toMatch('okidoc');
  });
});
