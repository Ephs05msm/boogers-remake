import Chance from 'chance'

export default {
  newRoomCode () {
    const chance = new Chance()
    const roomCode = chance.string({
      length: 4,
      alpha: true,
      casing: 'upper'
    })
    const { history, stepNumber, socket } = this.state
    
    socket.emit('game created', roomCode, history[stepNumber].squares)
    socket.on('create success', (id) => {
      this.setState({
        roomCode: roomCode,
        playerId: id
      })
    })
  },

  handleFormChange (e) {
    this.setState({ // convert to uppercase and limit to 4 chars
      joinField: e.target.value.toUpperCase().slice(0, 4),
      multiError: null
    })
  },

  handleFormClick (e) {
    const { joinField, socket } = this.state

    socket.emit('join request', joinField)
    
    socket.on('join success', (id) => {
      this.setState({
        roomCode: joinField,
        playerId: id
      })
    })

    socket.on('game full', () => {
      this.setState({
        joinField: '',
        multiError: 'Game ' + joinField + ' already has two players.'
      })
    })

    socket.on('no game', () => {
      this.setState({
        joinField: '',
        multiError: 'Game ' + joinField + ' does not exist.'
      })
    })

    e.preventDefault()
  }
}