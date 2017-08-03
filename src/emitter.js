export type Callback = (input?: mixed) => void
export type CallbackSet = Set<Callback>
export type EventMap = { string: CallbackSet }

/**
 * Microscopic and speedy event emitter.
 */
export default class Emitter {
  /**
   * Map of strings to Sets for storing callbacks.
   */
  _events: EventMap = {}

  /**
   * Return a an existing or new Set.
   * @param {string} name - name of event
   * @return {Set} existing or new Set
   */
  _event(name: string): CallbackSet {
    return (this._events[name] = this._events[name] || new Set())
  }

  /**
   * Associate a callback with an event name.
   * @param {string} name - name of event
   * @param {function(input: *)} fn - callback
   * @throws {EmitterError} throw error when fn isn't a function
   */
  on(name: string, fn: Callback): void {
    if (typeof fn !== 'function') throw new TypeError('requires callback')
    this._event(name).add(fn)
  }

  /**
   * Disassociate a callback from an event name.
   * @param {string} name - name of event
   * @param {function(input: *)} [fn] - callback
   */
  off(name: string, fn?: Callback): void {
    if (!this._events[name]) return
    if (fn) this._event(name).delete(fn)
    else this._event(name).clear()
  }

  /**
   * Emit an event with the supplied input.
   * @param {string} name - name of event
   * @param {*} [input] - input given to the callbacks
   */
  emit(name: string, input?: mixed): void {
    if (!this._events[name]) return
    this._event(name).forEach(fn => fn(input))
  }
}
