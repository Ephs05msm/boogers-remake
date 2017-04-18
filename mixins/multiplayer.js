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
    const { joinField, socket } = this.state

    socket.emit('join request', joinField)
    
    socket.on('join success', () => {
      this.setState({
        roomCode: joinField
      })
    })

    socket.on('game full', () => {
      console.log('Game ' + joinField + ' already has two players.')
    })

    socket.on('no game', () => {
      console.log('Game ' + joinField + ' does not exist.')
    })
  }
}