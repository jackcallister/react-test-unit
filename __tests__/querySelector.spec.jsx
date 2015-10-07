import React, { Component } from 'react'
import assert from 'assert'
import { renderComponent, querySelector, querySelectorAll } from '../src/index'

class TestComponent extends Component {

  render() {
    return (
      <div>
        <div>Test</div>
        <section className='class'>
          <h1 id='id'>Test</h1>
        </section>
      </div>
    )
  }
}

describe('querySelector', () => {
  const component = renderComponent(TestComponent)

  context('tags', () => {
    const selection = querySelector(component, 'h1')

    it('should find one h1', () => {
      assert.equal('h1', selection.type)
    })
  })

  context('classes', () => {
    const selection = querySelector(component, '.class')

    it('should find elements by class', () => {
      assert.equal('section', selection.type)
    })

    describe('that don\'t exist', () => {
      const undefinedSelection = querySelector(component, '.notAClass')

      it('should be undefined', () => {
        assert.equal(undefined, undefinedSelection)
      })
    })
  })
})
