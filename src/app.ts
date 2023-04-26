import path from 'path'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import paginate from 'express-paginate'
import httpErrors from 'http-errors'
import errorHandle from './middlewares/error-handle'
import http from 'http'
import setting from './setting/env'

/* MongoDB */
import './database/config'

/* routes */
import indexRouter from './routes'
import prohibitedWordRouter from './routes/prohibited-word'
// import socketRouter from './routes/socket'

const normalizePort = (val: string) => {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

const app = express()

app.use((_req, res, next) => {
  res.removeHeader('X-Powered-By')
  next()
})
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(paginate.middleware(10, 50))

app.use('/api', indexRouter)
app.use('/api/game/prohibited', prohibitedWordRouter)
// app.use('/socket.io', socketRouter)
// app.use('/api/authen', authenticationRouter)

app.use((_req, _res, next) => {
  next(httpErrors(404))
})
app.use(errorHandle)

const server = http.createServer(app)

const port = normalizePort(setting.settingCommon.PORT || '3000')

app.set('port', port)

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

export default app
