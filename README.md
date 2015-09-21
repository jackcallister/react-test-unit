# React Test Unit

A set of utilities to make testing stateless components simple, readable and fast. This is in early stage development. I wouldn't recommend using it just yet.

## Usage

React Test Unit provides a `renderComponent` function which accepts a React component and returns a shallowly rendered output tree.

Under the hood this uses the [`ReactShallowRenderer`](https://facebook.github.io/react/docs/test-utils.html#shallow-rendering) and recursively renders the view tree.

```
import { renderComponent } from 'react-test-unit'

const props = {
  ...
}

const component = renderComponent(<Component {...props}/>)
```

With the component rendered you can make assertions about the output. Notice there is no need to render to the DOM.

To make assertions you'll need to select elements. React Test Unit provides `querySelector` and `querySelectorAll` functions. **Only element types (div, h1 etc) are supported. Classes and ids are also supported.**

```
import { renderComponent, querySelector, querySelectorAll } from 'react-test-unit'

const props = {
  ...
}

const component = renderComponent(<Component {...props}/>)
const divs = querySelectorAll(component, 'div')
const h1 = querySelector(component, '#heading')

assert.equal(2, divs.length)
assert.equal('h1', h1.type)
```

Finally you'll can make sure handlers are correctly bound with the `dispatchEvent` function.

```
import sinon from 'sinon'
import { renderComponent, querySelector, dispatchEvent } from 'react-test-unit'

const spy = sinon.spy()

const props = {
  onClickHandler: spy
}

const component = renderComponent(<Component {...props} />)
const button = querySelector(component, 'button')

dispatchEvent(button, 'onClick')

assert.equal(true, spy.called)
```

Checkout the example usage [here](https://github.com/jarsbe/react-testing-kit).

Special mention must go to [React Shallow Testutils](https://github.com/sheepsteak/react-shallow-testutils) and [React Unit](https://github.com/pzavolinsky/react-unit) for a lot of inspiration and concepts.
