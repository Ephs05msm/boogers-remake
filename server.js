const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
var server

var gameSquares = Object.create(null)

app.prepare().then(() => {
  server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    handle(req, res, parsedUrl)
  })

  const io = require('socket.io')(server)

  io.on('connection', (socket) => {
    console.log('player connected')
    
    socket.on('player move', (turn) => {
      console.log((turn ? 'X\'s' : 'O\'s') + ' turn')
      console.log(socket.id)
    })

    socket.on('game created', (code, squares) => {
      socket.join(code, (err) => {
        if (!gameSquares[code]) {
          gameSquares[code] = squares
        }
      })
      console.log(gameSquares)
      io.of('/').in(code).clients((err, clients) => console.log(clients.length))
    })

    socket.on('join request', (code) => {
      io.of('/').in(code).clients((err, clients) => {
        if (clients.length === 2) { // game has two players
          socket.emit('game full')
        } else if (clients.length === 0) { // game has no players
          socket.emit('no game')
        } else if (clients.length === 1) { // game has one player
          socket.emit('join success')
        } else { // do nothing
          return null
        }
      })
    })

    socket.on('disconnecting', () => { // fires before rooms are left
      const affectedGames = Object.keys(socket.rooms)
      .filter((item) => item != socket.id)

      affectedGames.forEach((game) => {
        io.of('/').in(game).clients((err, clients) => {
          // if room has another player (besides currently disconnecting one)
          if (clients.length < 2) {
            delete gameSquares[game]
          }
        })
      })
    })
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
