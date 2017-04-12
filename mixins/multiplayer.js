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
  }
}