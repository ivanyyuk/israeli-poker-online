'use strict'

const io = require('./index').io;

io.on('connection', function(socket) {
  console.log('connected to soxxx')
  io.emit('babelfish');

  socket.on('moved', function(data) {
    socket.emit('movedddd')
      console.log(data, 'moved')
  })
})



