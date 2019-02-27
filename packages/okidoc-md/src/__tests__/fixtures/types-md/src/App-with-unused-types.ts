import { IRunResult } from './types';

interface IStartResult {
  y: number
}

/**
 * @doc app
 */
class App {
  run() {
    return {
      x: 1
    };
  }

  start() {
    return {
      y: 1
    }
  }
}

export default App;
