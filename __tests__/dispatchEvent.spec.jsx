import React, { Component } from 'react'
import assert from 'assert'
import sinon from 'sinon'
import { renderComponent, querySelector, dispatchEvent } from '../lib/react-test-unit'

class TestComponent extends Component {

  render() {
    return (
      <div>
        <div>Test</div>
        <section>
          <h1 onClick={this.props.onClickHandler}>Test</h1>
        </section>
      </div>
    )
  }
}

describe('dispatchEvent', () => {

  context('with a handler', () => {
    const onClickHandler = sinon.spy()
    const component = renderComponent(<TestComponent onClickHandler={onClickHandler} />)
    const h1 = querySelector(component, 'h1')

    dispatchEvent(h1, 'onClick')

    it('should call the callback', () => {
      assert.equal(true, onClickHandler.called)
    })
  })

  context('without a handler', () => {
    const component = renderComponent(<TestComponent />)

    const result = dispatchEvent(component, 'onClick')

    it('should return false', () => {
      assert.equal(false, result)
    })
  })
})
