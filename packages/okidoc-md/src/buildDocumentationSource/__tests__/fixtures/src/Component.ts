import View from './View';

/**
 * Component
 * @doc UI
 */
class Component extends View {
  private _node: Node;

  constructor() {
    super();
    this._node = document.createElement('div');
  }

  /**
   * Get component node
   */
  getNode(): Node {
    return this._node;
  }

  /**
   * Render component
   */
  render() {
    console.log('render component');
  }
}

export default Component;
