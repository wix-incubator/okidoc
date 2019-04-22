/**
 * View
 * @doc UI
 */
class View {
  /**
   * getter for `isHidden` value
   *
   * @example
   * console.log(component.isHidden) // false
   *
   * @returns `true` if hidden
   */
  get isHidden(): boolean {
    return false;
  }

  /**
   * show
   *
   * @example
   * component.show()
   */
  show() {
    console.log('show');
  }

  /**
   * Hide
   *
   * @example
   * component.hide()
   */
  hide() {
    console.log('hide');
  }
}

export default View;
