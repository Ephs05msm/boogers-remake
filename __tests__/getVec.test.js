import Controls from '../mixins/controls'

it('gets the right vector for all four corners', () => {
  expect(Controls.getVec(80).x).toBe(8)
  expect(Controls.getVec(80).y).toBe(8)
  expect(Controls.getVec(72).x).toBe(0)
  expect(Controls.getVec(72).y).toBe(8)
  expect(Controls.getVec(8).x).toBe(8)
  expect(Controls.getVec(8).y).toBe(0)
  expect(Controls.getVec(0).x).toBe(0)
  expect(Controls.getVec(0).y).toBe(0)
})