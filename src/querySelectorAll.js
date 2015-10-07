import React from 'react'

function queryAll(tree, test) {
  let matches = test(tree) ? [tree] : []

  if (React.isValidElement(tree)) {
    if (React.Children.count(tree.props.children) > 0) {
      React.Children.forEach(tree.props.children, (child) => {
        matches = matches.concat(queryAll(child, test))
      })
    }
  }

  return matches
}

function hasClassName(classNameList, className) {
  return ` ${classNameList} `.indexOf(` ${className.split('.')[1]} `) !== -1
}

function querySelectorAllByClass(tree, className) {
  return queryAll(tree, component => {
    if (React.isValidElement(component)) {
      if(component.props.className != null) {
        if (className.includes('.')) {
          const classNameList = className.split(/.\./)
          return classNameList.every((val) => {
            return hasClassName(component.props.className, val)
          })
        }
        return hasClassName(component.props.className, className)
      }
      return false
    }
    return false
  })
}

function querySelectorAllByTag(tree, type) {
  return queryAll(tree, component => {
    if (React.isValidElement(component)) {
      if (React.isValidElement(component)) {
        return component.type != null && component.type === type
      }
      return false
    }
    return false
  })
}

export default function querySelectorAll(comp, selector) {
  if (/\..*$/.test(selector)) {
    return querySelectorAllByClass(comp, selector)
  } else {
    return querySelectorAllByTag(comp, selector)
  }
}
