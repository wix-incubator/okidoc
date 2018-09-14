const path = require('path');
const portfinder = require('portfinder');
const { createServer } = require('http-server');

const DEFAULT_PORT = 8000;
let server;

async function setup() {
  portfinder.basePort = DEFAULT_PORT;

  return new Promise(resolve => {
    portfinder
      .getPortPromise()
      .then(port => {
        if (port === DEFAULT_PORT) {
          server = createServer({
            root: path.resolve('/sitedist'),
          });
          server.listen(DEFAULT_PORT, 'localhost', () => {
            console.info(
              `test server started on http://localhost:${DEFAULT_PORT} (serving /sitedist)`,
            );
            resolve();
          });
        } else {
          console.warn('server is already running');
          resolve();
        }
      })
      .catch(resolve);
  });
}

async function teardown() {
  if (server) {
    server.close();
  }
}

module.exports = {
  setup,
  teardown,
};
