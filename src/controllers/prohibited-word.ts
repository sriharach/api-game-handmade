import { NextFunction, Response, Request } from 'express'
import collection from '../database/collection'
import { ObjectId } from 'bson'
import { PayloadBodyWord } from '../interfaces/prohibited-word.interface'


interface CustomError extends Error {
  statusCode?: number
}

export const InsertWords = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqBody = req.body as PayloadBodyWord
    const db = await collection()

    if (reqBody.length === 0) {
      const err = new Error('ใส่คำมา') as CustomError
      err.statusCode = 400
      throw err
    }

    const newDate = reqBody.map((e) => ({
      _id: new ObjectId(),
      word: e.word,
      show: true,
    }))

    db.insertMany(newDate)

    res.json({ success: 'OK' })
  } catch (error) {
    next(error)
  }
}

export const RandomWord = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //   const reqBody = req.body as PayloadBodyWord
    const db = await collection()

    const result = (await db.find().toArray()) as PayloadBodyWord

    if (result.length > 0) {
      const yes = result.filter((f) => f.show)
      const _then = yes[Math.floor(Math.random() * yes.length)]
      if (!_then) {
        const err = new Error('หมดแล้ว reset เกม') as CustomError
        err.statusCode = 404
        throw err
      }
      const filter = { _id: new ObjectId(_then._id) }
      db.updateOne(filter, { $set: { show: false } })
        .then(() => {
          res.json({ words: { ..._then, show: false } })
        })
        .catch((err) => res.json({ err }))
    }
  } catch (error) {
    next(error)
  }
}

export const Newgame = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const db = await collection()
    db.updateMany({}, { $set: { show: true } })
    res.json({ success: 'OK' })
  } catch (error) {
    next(error)
  }
}

export const RemoveAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //   const reqBody = req.body as PayloadBodyWord
    const db = await collection()

    const result = await db.deleteMany()

    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const JoinRoom = (req: Request, res: Response, next: NextFunction) => {
//   io.on('connection', (socket) => {
//     console.log(`Client ${socket.id} connected`)
//     // create a new room
//     // const roomName = 'my-room'
//     // socket.join(roomName)

//     // // handle events in the room
//     // io.to(roomName).emit('some event')
//     socket.on('disconnect', () => {
//       console.log('user disconnected')
//     })
//   })
}
