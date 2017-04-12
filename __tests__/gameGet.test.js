import Vector from '../helpers/vectors'
import vectorActions from '../mixins/vectorActions'

const sqEdge = 9

const history = [{
  squares: Array(Math.pow(sqEdge, 2)).fill(null).map((sq, ind) => {
    if (ind === 0 || ind === Math.pow(sqEdge, 2) - 1) {
      return 'X'
    } else if (ind === sqEdge - 1 || ind === Math.pow(sqEdge, 2) - sqEdge) {
      return 'O'
    } else {
      return null
    }
  })
}]

const current = history[0]

it('gets the correct upper left square', () => {
  expect(vectorActions.get(current, Vector({x: 0, y: 0})))
    .toBe('X')
})

it('gets the correct upper right square', () => {
  expect(vectorActions.get(current, Vector({x: sqEdge - 1, y: 0})))
    .toBe('O')
})

it('gets the correct lower left square', () => {
  expect(vectorActions.get(current, Vector({x: 0, y: sqEdge - 1})))
    .toBe('O')
})

it('gets the correct lower right square', () => {
  expect(vectorActions.get(current, Vector({x: sqEdge - 1, y: sqEdge - 1})))
    .toBe('X')
})
