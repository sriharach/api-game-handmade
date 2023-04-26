import express from 'express'
import io from '../socket.io'

const router = express.Router()

router.get('/', (_req, res) => {
  io.on('connection', (socket) => {
    console.log(`Client ${socket.id} connected__`)

    socket.join("ROOM1");

    io.to("ROOM1").emit("ggo");
    
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
})

export default router
