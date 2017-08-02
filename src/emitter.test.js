import Emitter from './emitter'
import { EmitterError } from './error'

describe('Emitter', function() {
  beforeEach(() => {
    this.emitter = new Emitter()
  })

  it('#on should register a callback for an event', () => {
    function fn() {}

    this.emitter.on('event', fn)

    expect(this.emitter._events.event.size).toBe(1)
  })

  it('#on should throw an EmitterError if called without a function', () => {
    expect(() => this.emitter.on('event')).toThrowError(
      new EmitterError('requires callback'),
    )

    expect(() => this.emitter.on('event', 100)).toThrowError(
      new EmitterError('requires callback'),
    )
  })

  it('#off should unregister a callback for an event', () => {
    function fn() {}

    this.emitter.on('event', fn)
    this.emitter.off('event', fn)

    expect(this.emitter._events.event.size).toBe(0)
  })

  it('#off should unregister all callbacks for an event', () => {
    function fn() {}
    function fn2() {}

    this.emitter.on('event', fn)
    this.emitter.on('event', fn2)
    this.emitter.off('event')

    expect(this.emitter._events.event.size).toBe(0)
  })

  it('#off should return quickly if an event is undefined', () => {
    this.emitter.off('event')

    expect(this.emitter._events.event).toBe(undefined)
  })

  it('#emit should run all callbacks for an event with the supplied argument', () => {
    const data = []

    function fn(input) {
      data.push(input)
    }
    function fn2(input) {
      data.push(input)
    }

    this.emitter.on('event', fn)
    this.emitter.on('event', fn2)
    this.emitter.emit('event', 'ran')

    expect(data).toEqual(['ran', 'ran'])
  })

  it('#emit should return quickly if an event is undefined', () => {
    this.emitter.emit('event')

    expect(this.emitter._events.event).toBe(undefined)
  })
})
