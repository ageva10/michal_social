import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import util from 'util'
import path from 'path'
import dayjs from 'dayjs'
import helmet from 'helmet'
import compression from 'compression'
import config from './config'

import Routes from './routes'

const log = console.log.bind(console)

console.log = function (...args) {
  log(`[${dayjs().format('DD/MM/YYYY HH:mm:ss')}]:`, util.format(...args))
}

const app: Application = express()
const PORT: number = config.PORT

app.use(cors({
  origin: config.ORIGIN,
  credentials: config.CREDENTIALS
}))
app.use(helmet())
app.use(compression())
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))

if (config.NODE_ENV === 'production') {
  app.set('trust proxy', true)
}

app.use('/api', new Routes().getRouter())

const root: string = path.join(__dirname, '../public/dist/index.html')
app.use(express.static(path.join(__dirname, '../public/dist')))
app.use('/', (req: Request, res: Response): void => res.sendFile(root))

const closeServer = (): void => {
  console.log('Server closed')
  process.exit()
}

app.listen(PORT, (): void => {
  console.log(`Server running at http://localhost:${PORT}`)
  process.once('SIGINT', closeServer).once('SIGTERM', closeServer)
})
