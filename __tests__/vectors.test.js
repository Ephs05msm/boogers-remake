import Vector from '../helpers/vectors'

const defVector = Vector()
const myVector = Vector({x: 3, y: 7})

const addedVec = myVector.add({x: 3, y: 7})

it('sets default props to 0', () => {
  expect(defVector.x).toBe(0)
  expect(defVector.y).toBe(0)
})

it('sets x and y correctly', () => {
  expect(myVector.x).toBe(3)
  expect(myVector.y).toBe(7)
})

it('can add vectors', () => {
  expect(addedVec.x).toBe(6)
  expect(addedVec.y).toBe(14)
})
