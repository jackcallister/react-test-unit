import React, { Component, PropTypes } from 'react'
import assert from 'assert'
import { renderComponent } from '../src/index'

class SingleChildComponent extends Component {

  render() {
    return <h1>Test</h1>
  }
}

class NestedComponent extends Component {
  render() {
    return (
      <div>
        <InnerComponent prop='Test Prop' />
      </div>
    )
  }
}

class InnerComponent extends Component {
  render() {
    return (
      <div>
        {this.props.prop}
      </div>
    )
  }
}

class ContextComponent extends Component {

  static contextTypes = {
    prop: PropTypes.string
  }

  render() {
    return (
      <div>
        <div>
          {this.context.prop}
        </div>

        <InnerContextComponent />
      </div>
    )
  }
}

class InnerContextComponent extends Component {

  static contextTypes = {
    prop: PropTypes.string
  }

  render() {
    return (
      <div>
        {this.context.prop}
      </div>
    )
  }
}

class MultipleElementChildrenComponent extends Component {

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

class ComponentComponent extends Component {

  render() {
    return (
      <div>
        <OtherComponent />
      </div>
    )
  }
}

class OtherComponent extends Component {

  render() {
    return (
      <h1>Test</h1>
    )
  }
}

describe('renderComponent', () => {

  context('with a SingleChildComponent', () => {
    const component = renderComponent(SingleChildComponent)

    it('should have the text as the child', () => {
      assert.equal('Test', component.props.children)
    })
  })

  context('with a NestedComponent', () => {
    const component = renderComponent(NestedComponent)

    it('should render the nested component with props', () => {
      assert.equal('Test Prop', component.props.children.props.children)
    })
  })

  context('with a ContextComponent', () => {
    const component = renderComponent(ContextComponent, {}, { prop: 'Test Context' })

    it('should have context props', () => {
      assert.equal('Test Context', component.props.children[0].props.children)
    })

    it('should pass context down', () => {
      assert.equal('Test Context', component.props.children[1].props.children)
    })
  })

  context('with a MultipleElementChildrenComponent', () => {
    const component = renderComponent(MultipleElementChildrenComponent)

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
    const component = renderComponent(ComponentComponent)

    it('should be a div', () => {
      assert.equal('div', component.type)
    })

    it('should have an h1 child', () => {
      assert.equal('h1', component.props.children.type)
    })
  })
})
