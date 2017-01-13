'use strict'

const io = require('./index');

io.on('connection', function(socket) {
  console.log('connected to soxxx')
  io.emit('babelfish');
})


