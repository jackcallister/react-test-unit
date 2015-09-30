import React, { Component } from 'react'
import assert from 'assert'
import { renderComponent, querySelector, querySelectorAll } from '../src/index'

class Component {

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
  const component = renderComponent(<Component />)

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
  })

  context('ids', () => {
    const selection = querySelector(component, '#id')

    it('should find elements by id', () => {
      assert.equal('h1', selection.type)
    })
  })
})
