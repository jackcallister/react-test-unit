import querySelectorAll from './querySelectorAll'

export default function querySelector(comp, selector) {
  return querySelectorAll(comp, selector)[0]
}
