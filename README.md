# React Test Unit

<strong>Warning</strong> Currently in active development, not quite ready for prime time. There WILL be major break changes.

A set of utilities to make testing stateless components simple, readable and fast.

## Usage

Install via NPM. For use with React 0.14.x only.

```
npm install react-test-unit --save-dev
```

React Test Unit provides a `renderComponent` function which accepts a React component and returns a shallowly rendered output tree.

Under the hood this uses the [`ReactShallowRenderer`](https://facebook.github.io/react/docs/test-utils.html#shallow-rendering) and recursively renders the view tree.

```
import { renderComponent } from 'react-test-unit'

const props = {
  ...
}

const component = renderComponent(Component, props)
```

With the component rendered you can make assertions about the output. Notice there is no need to render to the DOM.

To make assertions you'll need to select elements. React Test Unit provides `querySelector` and `querySelectorAll` functions. Single classes and types (div) are supported.

```
import { renderComponent, querySelector, querySelectorAll } from 'react-test-unit'

const props = {
  ...
}

const component = renderComponent(Component, props)
const divs = querySelectorAll(component, 'div')

assert.equal(2, divs.length)
```

Finally you'll can make sure handlers are correctly bound with the `dispatchEvent` function.

```
import sinon from 'sinon'
import { renderComponent, querySelector, dispatchEvent } from 'react-test-unit'

const spy = sinon.spy()

const props = {
  onClickHandler: spy
}

const component = renderComponent(Component, props)
const button = querySelector(component, 'button')

dispatchEvent(button, 'onClick')

assert.equal(true, spy.called)
```

Special mention must go to [React Shallow Testutils](https://github.com/sheepsteak/react-shallow-testutils) and [React Unit](https://github.com/pzavolinsky/react-unit) for a lot of inspiration and concepts.

## State

State and refs are not supported with this library. `setState` eventually modifies the DOM (assuming there are VDOM diffs) so you will need to render the component to a DOM and simulate events as advised on in the React docs. Rendering a component with state and/or refs is absolutely fine, just don't subsequently make `setState` calls.

## API

### `renderComponent`

```
/**
* Recursively runs a shallow render on a React Component class.
*
* @method renderComponent
* @param {Function}(required) component A React Component
* @param {Object}(optional) props A props object to instantiate the component with
* @param {Object}(optional) context A context object to instantiate each component in the tree with
* @return {Object} Returns a fully formed render tree
*/
```

### `querySelectorAll`

```
/**
* Searches a render tree for either class or tag.
*
* @method querySelectorAll
* @param {Object}(required) tree A rendered component tree
* @param {String}(required) selector Either a class ('.class') or tag ('div') to search for
* @return {Array} Returns an array of the found objects in the component tree
*/
```

### `querySelector`

```
/**
* Searches a render tree for either class or tag and returns the first result.
*
* @method querySelector
* @param {Object}(required) tree A rendered component tree
* @param {String}(required) selector Either a class ('.class') or tag ('div') to search for
* @return {Object|Undefined} Returns either undefined or the found object in the component tree
*/
```

### `dispatchEvent`

```
/**
* Calls the handler function for a given event
*
* @method dispatchEvent
* @param {Object}(required) tree A rendered component tree to call the handler on
* @param {String}(required) handler The handler to call
* @param {Args}(optional) arguments Any number of arguments to pass to the handler
* @return {?|False} Returns either the result of the handler or false if no handler exist
*/
```
