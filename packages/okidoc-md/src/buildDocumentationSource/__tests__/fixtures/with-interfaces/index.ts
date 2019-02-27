import { Type1, Type2 } from './types';

interface Type3 {
  z: number
}

/**
 * Service
 * @doc UI
 */
class Service {
  getType1(): Type1 {
    return {
      x: 1
    }
  }

  getType2() {
    return {
      y: 1
    }
  }

  getType3(): Type3 {
    return {
      z: 1
    }
  }
}

export default Service;