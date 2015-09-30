import React, { Component } from 'react'
import assert from 'assert'
import { renderComponent, querySelectorAll } from '../lib/react-test-unit'

class Component {

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

describe('querySelectorAll', () => {
  const component = renderComponent(<Component />)

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
