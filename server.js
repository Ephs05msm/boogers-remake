const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
var server

var activeGames = []

app.prepare().then(() => {
  server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    handle(req, res, parsedUrl)
  })

  const io = require('socket.io')(server)

  io.on('connection', (socket) => {
    socket.on('player move', (turn) => {
      console.log((turn ? 'X\'s' : 'O\'s') + ' turn')
    })
    socket.on('game created', (code, squares) => {
      activeGames[code] = squares
      console.log(activeGames[code])
    })
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
