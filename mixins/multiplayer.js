import Chance from 'chance'

export default {
  newRoomCode () {
    const chance = new Chance()
    const roomCode = chance.string({
      length: 4,
      alpha: true,
      casing: 'upper'
    })
    
    this.setState({
      roomCode: roomCode
    })
  },

  handleFormChange (e) {
    this.setState({
      joinField: e.target.value
    })
  },

  handleFormClick () {
    const { joinField } = this.state
    this.setState({
      roomCode: joinField
    })
  }
}