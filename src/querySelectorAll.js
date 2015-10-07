import React from 'react'

function getSelectorType(selector) {
  const klass = /\..*$/
  const id = /#.*$/

  if (klass.test(selector)) {
    return 'class'
  } else if (id.test(selector)) {
    return 'id'
  } else {
    return 'tag'
  }
}

// Yuck - refactor this!

function querySelectorAllByClass(comp, selector) {
  let matches = []

  if (comp && comp.props && `.${comp.props.className}` === selector) {
    matches = [...matches, comp]
  }

  if (comp && comp.props && React.Children.count(comp.props.children) > 0) {
    React.Children.forEach(comp.props.children, (child) => {
      matches = matches.concat(querySelectorAllByClass(child, selector))
    })
  }

  return matches
}

function querySelectorAllById(comp, selector) {
  let matches = []

  if (comp && comp.props && `#${comp.props.id}` === selector) {
    matches = [...matches, comp]
  }

  if (comp && comp.props && React.Children.count(comp.props.children) > 0) {
    React.Children.forEach(comp.props.children, (child) => {
      matches = matches.concat(querySelectorAllById(child, selector))
    })
  }

  return matches
}

function querySelectorAllByTag(comp, selector) {
  let matches = []

  if (comp && comp.props && comp.type === selector) {
    matches = [...matches, comp]
  }

  if (comp && comp.props && React.Children.count(comp.props.children) > 0) {
    React.Children.forEach(comp.props.children, (child) => {
      matches = matches.concat(querySelectorAll(child, selector))
    })
  }

  return matches
}

export default function querySelectorAll(comp, selector) {
  const selectorType = getSelectorType(selector)

  switch(selectorType){
    case 'class':
      return querySelectorAllByClass(comp, selector)
    case 'id':
      return querySelectorAllById(comp, selector)
    default:
      return querySelectorAllByTag(comp, selector)
  }
}
