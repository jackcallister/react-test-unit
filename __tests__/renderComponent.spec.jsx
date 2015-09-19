import React from 'react'
import assert from 'assert'
import { renderComponent } from '../src/index'

class SingleChildComponent {

  render() {
    return <h1>Test</h1>
  }
}

class MultipleElementChildrenComponent {

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

class ComponentComponent {

  render() {
    return (
      <div>
        <OtherComponent />
      </div>
    )
  }
}

class OtherComponent {

  render() {
    return (
      <h1>Test</h1>
    )
  }
}

describe('renderComponent', () => {

  context('with a SingleChildComponent', () => {
    const component = renderComponent(<SingleChildComponent />)

    it('should have the text as the child', () => {
      assert.equal('Test', component.props.children)
    })
  })

  context('with a MultipleElementChildrenComponent', () => {
    const component = renderComponent(<MultipleElementChildrenComponent />)

    it('should be a div', () => {
      assert.equal('div', component.type)
    })

    it('should have a div as the first child', () => {
      assert.equal('div', component.props.children[0].type)
    })

    it('should have a section as the second child', () => {
      assert.equal('section', component.props.children[1].type)
    })

    context('within the section', () => {
      it('contains an h1', () => {
        assert.equal('h1', component.props.children[1].props.children.type)
      })
    })
  })

  context('with a ComponentComponent', () => {
    const component = renderComponent(<ComponentComponent />)

    it('should be a div', () => {
      assert.equal('div', component.type)
    })

    it('should have an h1 child', () => {
      assert.equal('h1', component.props.children.type)
    })
  })
})
