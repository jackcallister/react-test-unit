import React from 'react'
import assert from 'assert'
import { renderComponent, querySelector } from '../src/react-test-unit'

class Component {

  render() {
    return (
      <div>
        <div>Test</div>
        <section>
          <h1>Test</h1>
        </section>
      </div>
    )
  }
}

describe('querySelector', () => {
  const component = renderComponent(<Component />)

  const selection = querySelector(component, 'h1')

  it('should find one h1', () => {
    assert.equal('h1', selection.type)
  })
})
