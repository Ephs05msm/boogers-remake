import stampit from 'stampit'

const Vector = stampit()
  .init(({x, y}, {instance}) => {
    instance.x = x || 0
    instance.y = y || 0
  })
  .methods({
    add (other) {
      return Vector({x: this.x + other.x, y: this.y + other.y})
    }
  })

export default Vector