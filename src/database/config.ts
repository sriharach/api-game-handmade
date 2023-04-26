import { MongoClient } from 'mongodb'
import env from '../setting/env'

const PASSWORD = env.settingCommon.DB_MONGOATLAS_PASSWORD as string
const url = `mongodb+srv://user-sriharach:${PASSWORD}@cluster0.re7aemm.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(url)

async function Client() {
  await client.connect()
  console.log('🚀 Connected successfully to server')

  return client.db('enjoy_system')
}

export default Client()
