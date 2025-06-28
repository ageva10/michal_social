import path from 'path'
import dotenv from 'dotenv'

const envPath: string = path.join(__dirname, '../.env')
dotenv.config({ path: envPath })

interface Config {
  NODE_ENV: string
  PORT: number
  ORIGIN: string
  CREDENTIALS: boolean
  DATABASE_URL: string
}

const config: Config = {
  NODE_ENV: process.env.NODE_ENV!,
  PORT: Number(process.env.PORT),
  ORIGIN: process.env.ORIGIN!,
  CREDENTIALS: process.env.CREDENTIALS === 'true',
  DATABASE_URL: process.env.DATABASE_URL!,
}

export default config
