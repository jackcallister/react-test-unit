export default function dispatchEvent(comp, event, ...args) {
  if (comp.props[event]) {
    return comp.props[event](...args)
  } else {
    return false
  }
}
