import React, { Component } from 'react'
import assert from 'assert'
import { renderComponent, querySelectorAll } from '../src/index'

class NormalComponent extends Component {

  render() {
    return (
      <div>
        <div className='class'>Test</div>
        <section className='class'>
          <h1>Test</h1>
        </section>
      </div>
    )
  }
}

class NullChildComponent extends Component {

  render() {
    return (
      <div>
        <div className='class'>Test</div>
        {null}
        <div className='class'>Test</div>
      </div>
    )
  }
}

describe('querySelectorAll', () => {

  context('with a NormalComponent', () => {
    const component = renderComponent(NormalComponent)

    context('single match', () => {
      const selections = querySelectorAll(component, 'h1')

      it('should find one h1', () => {
        assert.equal(1, selections.length)
      })

      it('should be an h1', () => {
        assert.equal('h1', selections[0].type)
      })
    })

    context('multiple matches', () => {
      const selections = querySelectorAll(component, 'div')

      it('should find two divs', () => {
        assert.equal(2, selections.length)
      })
    })

    context('multiple class matches', () => {
      const selections = querySelectorAll(component, '.class')

      it('should find two divs', () => {
        assert.equal(2, selections.length)
      })
    })
  })

  context('with a NullChildComponent', () => {
    const component = renderComponent(NullChildComponent)
    const selections = querySelectorAll(component, '.class')

    it('should find two divs', () => {
      assert.equal(2, selections.length)
    })
  })
})
