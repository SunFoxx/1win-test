const io = require('socket.io')

const server = io.listen(19e3 + 2)

server.on('connection', (socket, data) => {
  socket.emit('sport-list', [
    {
      id: 1,
      name: 'Футбол'
    }, {
      id: 2,
      name: 'Рэгби'
    }, {
      id: 3,
      name: 'Гандбол'
    }, {
      id: 4,
      name: 'Хоккей'
    }, {
      id: 5,
      name: 'Автоспорт'
    }, {
      id: 6,
      name: 'Теннис'
    }
  ])

  socket.on('get-sport', (data) => {
    const {id} = data

    const result = []

    for (let i = 0; i < 5 * id; i++) {
      result.push((Math.random() * 1e10).toString(32))
    }

    socket.emit('get-sport', {response: result, meta: data})
  })
})
