import React from 'react'
import TestUtils from 'react-addons-test-utils'

function mapChildren(children, originalContext) {
  let mappedChildren = []

  React.Children.forEach(children, (child) => {
    mappedChildren.push(recursivelyShallowRenderTree(child, originalContext))
  })

  if (mappedChildren.length === 1) {
    return mappedChildren[0]
  } else {
    return mappedChildren
  }
}

function recursivelyShallowRenderTree(tree, originalContext) {
  // tree (or sub-tree) is a null render
  if (!tree) {
    return null
  }

  if (typeof tree.type === 'function') {
    const Comp = tree.type
    const props = tree.props

    return renderComponent(Comp, props, originalContext)
  }

  if (!tree.props || !tree.props.children || tree.props.children.length === 0) {
    return tree
  }

  // tree is an immutable object
  const clonedTree = {
    ...tree,
    props: {
      ...tree.props
    }
  }

  clonedTree.props.children = mapChildren(clonedTree.props.children, originalContext)

  return clonedTree
}

function renderComponentInRenderer(renderer, Comp, props, context) {
  renderer.render(<Comp {...props} />, context)

  const tree = renderer.getRenderOutput()

  return recursivelyShallowRenderTree(tree, context)
}

export default function renderComponent(Comp, props, context) {
  return renderComponentInRenderer(TestUtils.createRenderer(), Comp, props, context)
}
