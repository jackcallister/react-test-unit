import React from 'react'
import assert from 'assert'
import sinon from 'sinon'
import { renderComponent, querySelector, dispatchEvent } from '../src/react-test-unit'

class Component {

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
  const onClickHandler = sinon.spy()
  const component = renderComponent(<Component onClickHandler={onClickHandler} />)
  const h1 = querySelector(component, 'h1')

  dispatchEvent(h1, 'onClick')

  it('should call the callback', () => {
    assert.equal(true, onClickHandler.called)
  })
})
