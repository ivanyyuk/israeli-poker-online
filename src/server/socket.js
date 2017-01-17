'use strict'

const socketio = require('socket.io');
//io.on('connection', function(socket) {
  //console.log('connected to soxxx')
//
module.exports.listen = (server) => {
  let io = socketio.listen(server);

  io.on('connection', (socket) => {
    console.log('connected what up ')
  })

  return io;

}
//const setUpSocket = io => {
  //io = io;
  //io.on('connection', function(socket) {
    //socket.emit('babelfish')
  //})
//}

//const emitMove = io => {
  //console.log('moving', io)
  //io.emit('move')
//}

//module.exports = {
  //setUpSocket,
  //emitMove
//}
  //io.emit('babelfish');
//const io = require('./index').io;

  //socket.on('moved', function(data) {
    //socket.emit('movedddd')
      //console.log(data, 'moved')
  //})
//})



