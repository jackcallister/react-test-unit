import React from 'react/addons'

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

function querySelectorAllByClass(comp, selector) {
  let matches = comp.props != null && `.${comp.props.className}` === selector ? [comp] : []

  if (comp.props && React.Children.count(comp.props.children) > 0) {
    React.Children.forEach(comp.props.children, (child) => {
      matches = matches.concat(querySelectorAllByClass(child, selector))
    })
  }

  return matches
}

function querySelectorAllById(comp, selector) {
  let matches = comp.props != null && `#${comp.props.id}` === selector ? [comp] : []

  if (comp.props && React.Children.count(comp.props.children) > 0) {
    React.Children.forEach(comp.props.children, (child) => {
      matches = matches.concat(querySelectorAllById(child, selector))
    })
  }

  return matches
}

function querySelectorAllByTag(comp, selector) {
  let matches = comp.type != null && comp.type === selector ? [comp] : []

  if (comp.props && React.Children.count(comp.props.children) > 0) {
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
