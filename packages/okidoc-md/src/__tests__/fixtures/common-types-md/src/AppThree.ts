interface IRunResult {
  x: number;
}

interface IStartResult {
  y: number;
}

/**
 * @doc app-three
 */
class AppThree {
  run(): IRunResult {
    return {
      x: 1
    };
  }

  start() {
    return {
      y: 2
    }
  }
}

export default AppThree;
