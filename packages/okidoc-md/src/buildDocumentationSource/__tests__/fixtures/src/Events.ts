/**
 * Events
 * @doc Events
 */
class Events {
  /**
   * add event listener
   */
  addEventListener(fn: Function) {
    console.log('addEventListener')
  }

  /**
   * remove event listener
   */
  removeEventListener(fn: Function) {
    console.log('removeEventListener')
  }
}

export default Events;