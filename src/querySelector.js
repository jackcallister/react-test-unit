import querySelectorAll from './querySelectorAll'

export default function querySelector(comp, selector) {
  const selections = querySelectorAll(comp, selector)

  return selections ? selections[0] : []
}
